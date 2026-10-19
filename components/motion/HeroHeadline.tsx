"use client";

import type { CSSProperties } from "react";
import { useOverlay } from "@/lib/variantStore";

/** Split at clause punctuation so each line is a deliberate unit, never a mid-word wrap. */
function headlineLines(headline: string, chinese: boolean): string[] {
  if (chinese) return headline.split(/(?<=，)/).filter(Boolean);
  return headline.split(/(?<=\.)\s+/).filter(Boolean);
}

/** 【word】 marks the accent words, the same ones the launch film highlights. */
function accented(line: string) {
  return line.split(/【(.+?)】/).map((part, index) =>
    index % 2 === 1 ? <em key={index} className="hero-accent">{part}</em> : part,
  );
}

/** The hero headline; a tailored link may re-word it (hero.headline), with the same 【】 accent markup. */
export function HeroHeadline({ headline, chinese }: { headline: string; chinese: boolean }) {
  const text = useOverlay(chinese ? "zh" : "en").text["hero.headline"] ?? headline;
  return (
    <h1 className={chinese ? "hero-title hero-title-zh" : "hero-title"} data-v="">
      {headlineLines(text, chinese).map((line, index) => (
        <span key={line} className="hero-line" style={{ "--line": index } as CSSProperties}><span>{accented(line)}</span></span>
      ))}
    </h1>
  );
}
