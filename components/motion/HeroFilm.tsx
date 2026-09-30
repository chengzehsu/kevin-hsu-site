"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { PauseIcon, PlayIcon } from "@phosphor-icons/react/dist/ssr";
import styles from "./HeroFilm.module.css";

interface ConnectionPreference extends EventTarget {
  saveData?: boolean;
  effectiveType?: string;
}

/**
 * The film carries its own on-screen text, so there is one render per locale. The poster is the sign-off frame (name plus
 * "make it run, then ship it"), legible even at thumbnail size; for visitors who never get motion the sr-only summary narrates the whole film.
 * The film attaches after load, plays only while visible, and never autoplays under reduced motion or data saving;
 * the button always wins.
 */
export function HeroFilm({
  locale,
  pauseLabel,
  playLabel,
  summary,
  link,
}: {
  locale: string;
  pauseLabel: string;
  playLabel: string;
  /** What the film says, for screen readers: the video itself is aria-hidden. */
  summary: string;
  link: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const choice = useRef<"auto" | "play" | "pause">("auto");
  const syncRef = useRef<() => void>(() => {});
  const [sources, setSources] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const element = root.current,
      film = video.current;
    if (!element || !film) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: ConnectionPreference }
    ).connection;
    let visible = false;

    const allowed = () =>
      choice.current === "play" ||
      (choice.current === "auto" &&
        !motion.matches &&
        !connection?.saveData &&
        !["slow-2g", "2g"].includes(connection?.effectiveType ?? ""));
    const sync = () => {
      if (!visible || document.hidden || !allowed()) {
        film.pause();
        return;
      }
      if (!film.querySelector("source")) {
        setSources(true);
        return;
      }
      void film.play().catch(() => {
        choice.current = "pause";
        setPlaying(false);
      });
    };
    const start = () => sync();
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    );

    if (document.readyState === "complete") observer.observe(element);
    else
      window.addEventListener("load", () => observer.observe(element), {
        once: true,
      });
    document.addEventListener("visibilitychange", start);
    motion.addEventListener("change", start);
    syncRef.current = sync;
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", start);
      motion.removeEventListener("change", start);
      film.pause();
      syncRef.current = () => {};
    };
  }, []);

  useEffect(() => {
    if (!sources || !video.current) return;
    video.current.load();
    syncRef.current();
  }, [sources]);

  function toggle() {
    // Read the element, not state: a buffering film is already "playing" as far as the visitor is concerned.
    const running = video.current ? !video.current.paused : playing;
    choice.current = running ? "pause" : "play";
    if (running) video.current?.pause();
    syncRef.current();
  }

  return (
    <>
    <div ref={root} className={styles.film} data-ready={ready}>
      <img
        className={styles.poster}
        src={`/hero-reel-poster.${locale}.webp`}
        srcSet={`/hero-reel-poster-small.${locale}.webp 600w, /hero-reel-poster.${locale}.webp 960w`}
        sizes="(max-width: 1023px) 92vw, 46vw"
        width={960}
        height={600}
        alt=""
        fetchPriority="high"
        decoding="async"
      />
      <video
        ref={video}
        className={styles.video}
        width={960}
        height={600}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
        onLoadedData={() => setReady(true)}
        onPlaying={() => {
          setReady(true);
          setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
      >
        {sources ? (
          <>
            <source src={`/hero-reel.${locale}.webm`} type="video/webm" />
            <source src={`/hero-reel.${locale}.mp4`} type="video/mp4" />
          </>
        ) : null}
      </video>
      <button
        type="button"
        className={styles.toggle}
        onClick={toggle}
        aria-label={playing ? pauseLabel : playLabel}
        aria-pressed={playing}
      >
        {playing ? (
          <PauseIcon size={16} weight="fill" aria-hidden="true" />
        ) : (
          <PlayIcon size={16} weight="fill" aria-hidden="true" />
        )}
      </button>
    </div>
    <figcaption className={styles.figcaption}>
      <span className="sr-only">{summary}</span>
      {link}
    </figcaption>
    </>
  );
}