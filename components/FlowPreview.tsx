"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { ArrowCounterClockwiseIcon, ArrowUpRightIcon, PauseIcon, PlayIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/lib/locale";
import styles from "./FlowPreview.module.css";

type PlayIntent = "auto" | "play" | "pause";
interface ConnectionPreference extends EventTarget { saveData?: boolean; effectiveType?: string }

const captions = {
  zh: ["需求一直進來，交付卻停住了。", "先找出反覆確認的環節。", "釐清規則，把重複工作做成工具。", "讓團隊把時間用在交付。"],
  en: ["Requests keep arriving. Delivery stalls.", "Find the step that needs repeated confirmation.", "Clarify the rules. Turn repeat work into tools.", "Give the team time to deliver."],
};

/** A poster is server-rendered. Film and WebGL each load only when needed. */
export function FlowPreview({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  const preview = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const intentRef = useRef<PlayIntent>("auto");
  const sourcesRequested = useRef(false);
  const endedRef = useRef(false);
  const dialogOpen = useRef(false);
  const reconcile = useRef<() => void>(() => {});
  const canPlayNow = useRef<() => boolean>(() => false);
  const [intent, setIntent] = useState<PlayIntent>("auto");
  const [loadVideo, setLoadVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [filmFailed, setFilmFailed] = useState(false);
  const [phase, setPhase] = useState(0);
  const [opened, setOpened] = useState(false);
  const [failed, setFailed] = useState(false);
  const [Experience, setExperience] = useState<ComponentType<{ locale: Locale }> | null>(null);

  useEffect(() => {
    const element = preview.current, candidate = video.current;
    if (!element || !candidate) return;
    const film: HTMLVideoElement = candidate;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: ConnectionPreference }).connection;
    let alive = true, visible = false, pageLoaded = document.readyState === "complete", playPending = false;
    let idle: number | null = null, timer: number | null = null;

    function automaticallyAllowed() {
      return !media.matches && !connection?.saveData && !["slow-2g", "2g"].includes(connection?.effectiveType ?? "");
    }
    function wantsPlayback() {
      return intentRef.current === "play" || (intentRef.current === "auto" && automaticallyAllowed());
    }
    function allowedNow() {
      return alive && visible && !document.hidden && !dialogOpen.current && !endedRef.current && wantsPlayback();
    }
    canPlayNow.current = allowedNow;
    function cancelPendingLoad() {
      if (idle !== null) window.cancelIdleCallback(idle);
      if (timer !== null) window.clearTimeout(timer);
      idle = timer = null;
    }
    function attachSources() {
      idle = timer = null;
      if (!pageLoaded || !allowedNow() || sourcesRequested.current) return;
      sourcesRequested.current = true;
      setLoadVideo(true);
    }
    function updatePlayback() {
      if (!allowedNow()) {
        cancelPendingLoad();
        film.pause();
        return;
      }
      if (!sourcesRequested.current) {
        if (!pageLoaded || idle !== null || timer !== null) return;
        if (typeof window.requestIdleCallback === "function") idle = window.requestIdleCallback(attachSources, { timeout: 1600 });
        else timer = window.setTimeout(attachSources, 200);
        return;
      }
      if (playPending || !film.paused || !film.querySelector("source")) return;
      playPending = true;
      void film.play().catch((error: unknown) => {
        if (!alive || (error instanceof DOMException && error.name === "AbortError")) return;
        // An autoplay rejection is a request for a click, not a broken poster.
        intentRef.current = "pause";
        setIntent("pause");
        setPlaying(false);
      }).finally(() => {
        playPending = false;
        if (allowedNow() && film.paused && !film.error) updatePlayback();
      });
    }
    reconcile.current = updatePlayback;
    function loaded() { pageLoaded = true; updatePlayback(); }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= .2;
      updatePlayback();
    }, { threshold: [0, .2] });
    observer.observe(element);
    window.addEventListener("load", loaded, { once: true });
    document.addEventListener("visibilitychange", updatePlayback);
    media.addEventListener("change", updatePlayback);
    connection?.addEventListener("change", updatePlayback);

    return () => {
      alive = false;
      cancelPendingLoad();
      observer.disconnect();
      window.removeEventListener("load", loaded);
      document.removeEventListener("visibilitychange", updatePlayback);
      media.removeEventListener("change", updatePlayback);
      connection?.removeEventListener("change", updatePlayback);
      film.pause();
      reconcile.current = () => {};
      canPlayNow.current = () => false;
    };
  }, []);

  useEffect(() => {
    if (!loadVideo) return;
    if (video.current) {
      video.current.load();
    }
    reconcile.current();
  }, [loadVideo]);

  useEffect(() => {
    if (!opened) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [opened]);

  function requestPlay(restart = false) {
    intentRef.current = "play";
    setIntent("play");
    if (restart || endedRef.current) {
      if (video.current) video.current.currentTime = 0;
      endedRef.current = false;
      setEnded(false);
      setPhase(0);
    }
    if (filmFailed) {
      setFilmFailed(false);
      video.current?.load();
    }
    reconcile.current();
  }
  function pause() {
    intentRef.current = "pause";
    setIntent("pause");
    video.current?.pause();
    setPlaying(false);
    reconcile.current();
  }
  function open() {
    dialogOpen.current = true;
    video.current?.pause();
    if (!dialog.current?.open) dialog.current?.showModal();
    setOpened(true); setFailed(false);
    if (!Experience) import("./BuilderLoop").then((module) => setExperience(() => module.BuilderLoop)).catch(() => setFailed(true));
  }
  function close() { dialog.current?.close(); }
  const preparing = loadVideo && !videoReady && !filmFailed && intent !== "pause";
  const pauseAction = playing || preparing;

  return <>
    <section ref={preview} className={styles.preview} aria-label={zh ? "流程重組作品預覽" : "Workflow redesign preview"}>
      <header className={styles.header}>
        <div className={styles.heading}><span>{zh ? "流程重組" : "Workflow redesign"}</span><span>{zh ? "8 秒示意" : "8-second study"}</span></div>
        <h2 className={styles.title}>{zh ? "需求卡住時，我怎麼處理？" : "When work gets stuck."}</h2>
      </header>
      <div className={styles.film} data-film-ready={videoReady} data-film-failed={filmFailed}>
        <img src="/flow-preview.webp" srcSet="/flow-preview-small.webp 600w, /flow-preview.webp 960w" sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1023px) 720px, 520px" width={960} height={600} alt="" className={styles.image} fetchPriority="high" decoding="async" />
        <video ref={video} data-flow-film className={styles.video} width={960} height={600} muted playsInline preload="none" aria-hidden="true" tabIndex={-1} disablePictureInPicture
          onLoadedData={() => { if ((video.current?.readyState ?? 0) >= 2) setVideoReady(true); }}
          onCanPlay={() => reconcile.current()}
          onPlaying={(event) => { if (!canPlayNow.current()) { event.currentTarget.pause(); return; } setVideoReady(true); setPlaying(true); }}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(event) => { const time = event.currentTarget.currentTime * 1.75; const next = time < 3 ? 0 : time < 6 ? 1 : time < 10 ? 2 : 3; setPhase((current) => current === next ? current : next); }}
          onEnded={() => { endedRef.current = true; setEnded(true); setPlaying(false); setPhase(3); }}
          onError={(event) => { if (event.target !== event.currentTarget || !event.currentTarget.error) return; setFilmFailed(true); setVideoReady(false); setPlaying(false); setPhase(0); intentRef.current = "pause"; setIntent("pause"); }}>
          {loadVideo && <><source src="/flow-film.mp4" type="video/mp4" /><source src="/flow-film.webm" type="video/webm" /></>}
        </video>
      </div>
      <div className={styles.caption}><p>{captions[locale][phase]}</p></div>
      <div className={styles.controls}>
        <div className={styles.transport}>
          <button type="button" data-film-play onClick={() => pauseAction ? pause() : requestPlay()} aria-label={preparing ? (zh ? "取消播放" : "Cancel playback") : pauseAction ? (zh ? "暫停預覽" : "Pause preview") : ended ? (zh ? "重播預覽" : "Replay preview") : (zh ? "播放預覽" : "Play preview")} aria-pressed={playing}>
            {pauseAction ? <PauseIcon size={17} weight="fill" aria-hidden="true" /> : <PlayIcon size={17} weight="fill" aria-hidden="true" />}
          </button>
          <button type="button" data-film-replay onClick={() => requestPlay(true)} aria-label={zh ? "從頭播放預覽" : "Replay preview from the start"}><ArrowCounterClockwiseIcon size={19} aria-hidden="true" /></button>
        </div>
        <button ref={trigger} type="button" data-open-experiment className={styles.explore} onClick={open} aria-haspopup="dialog"><span>{zh ? "試試不同決策" : "Try a decision"}</span><ArrowUpRightIcon size={17} aria-hidden="true" /></button>
      </div>
    </section>
    <dialog ref={dialog} className={styles.dialog} aria-label={zh ? "3D 流程重組互動作品" : "3D workflow experiment"} onClose={() => { dialogOpen.current = false; setOpened(false); trigger.current?.focus({ preventScroll: true }); reconcile.current(); }} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      <div className={styles.dialogContent}>
        <div className={styles.dialogBar}><span>{zh ? "流程重組" : "Workflow experiment"}</span><button type="button" onClick={close} aria-label={zh ? "關閉體驗" : "Close experience"}><XIcon size={20} aria-hidden="true" /></button></div>
        {opened && (Experience ? <Experience locale={locale} /> : <div className={styles.loading} role="status">
          <p>{failed ? (zh ? "互動暫時無法開啟。你可以繼續看下方案例。" : "The experience could not load. The case studies are still available below.") : (zh ? "正在準備互動作品…" : "Preparing the experience…")}</p>
          {failed && <button type="button" onClick={open}>{zh ? "再試一次" : "Try again"}</button>}
        </div>)}
      </div>
    </dialog>
  </>;
}
