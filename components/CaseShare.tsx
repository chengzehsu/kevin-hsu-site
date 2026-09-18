"use client";

import { useEffect, useRef, useState } from "react";
import type { CasesContent } from "@/content/types";
import styles from "./CaseStudies.module.css";
import { LinkSimpleIcon } from "@phosphor-icons/react/dist/ssr";

type Labels = Pick<CasesContent, "copyLabel" | "copiedLabel" | "copyFallback" | "linkLabel">;

export function CaseShare({ href, labels }: { href: string; labels: Labels }) {
  const [hydrated, setHydrated] = useState(false);
  const [status, setStatus] = useState<"idle" | "copied" | "fallback">("idle");
  const [url, setUrl] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setHydrated(true);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, []);

  useEffect(() => {
    if (status === "fallback") { input.current?.focus(); input.current?.select(); }
  }, [status]);

  async function copy() {
    if (timer.current) clearTimeout(timer.current);
    const absolute = new URL(href, window.location.origin).href;
    setUrl(absolute);
    try {
      await navigator.clipboard.writeText(absolute);
      setStatus("copied");
      timer.current = setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("fallback");
    }
  }

  if (!hydrated) return <a href={href} className={styles.textLink}>{labels.linkLabel}</a>;

  return (
    <div className={styles.share}>
      <button type="button" className={styles.textLink} onClick={copy} data-copy-case>
        <LinkSimpleIcon size={17} aria-hidden="true" />
        {status === "copied" ? labels.copiedLabel : labels.copyLabel}
      </button>
      <span className="sr-only" role="status">{status === "copied" ? labels.copiedLabel : ""}</span>
      {status === "fallback" && (
        <label className={styles.copyFallback}>
          {labels.copyFallback}
          <input ref={input} aria-label={labels.linkLabel} value={url} readOnly onFocus={(event) => event.target.select()} />
        </label>
      )}
    </div>
  );
}
