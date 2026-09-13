"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import type { Locale } from "@/lib/locale";

export interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  locale: Locale;
  className?: string;
}

const NUMBER_LOCALE: Record<Locale, string> = { zh: "zh-TW", en: "en-US" };

export function formatCount(value: number, locale: Locale): string {
  return new Intl.NumberFormat(NUMBER_LOCALE[locale]).format(value);
}

export function CountUp({ value, prefix = "", suffix = "", locale, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReduced = useReducedMotion();

  // Seeded with the final value so the static HTML (and no-JS visitors) read the real number.
  const count = useMotionValue(value);
  const digits = useTransform(count, (v) => formatCount(Math.round(v), locale));
  const finalText = `${prefix}${formatCount(value, locale)}${suffix}`;

  useEffect(() => {
    if (prefersReduced || !isInView) return;
    count.set(0);
    const controls = animate(count, value, { duration: 1.2, ease: "easeOut" });
    return () => controls.stop();
  }, [isInView, prefersReduced, value, count]);

  return (
    <span ref={ref} className={["relative tabular-nums", className].filter(Boolean).join(" ")}>
      {/* Reserves the final width so the layout never shifts while counting. */}
      <span aria-hidden="true" className="invisible whitespace-nowrap">
        {finalText}
      </span>
      <span aria-hidden="true" className="absolute inset-0 whitespace-nowrap">
        {prefix}
        <motion.span>{digits}</motion.span>
        {suffix}
      </span>
      <span className="sr-only">{finalText}</span>
    </span>
  );
}
