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

  const count = useMotionValue(0);
  const digits = useTransform(count, (v) => formatCount(Math.round(v), locale));
  const finalText = `${prefix}${formatCount(value, locale)}${suffix}`;

  useEffect(() => {
    // Reduced motion: show the final number as soon as we know the preference.
    if (prefersReduced) {
      count.set(value);
      return;
    }
    if (!isInView) return;
    if (count.get() === value) return;
    const controls = animate(count, value, { duration: 1.2, ease: "easeOut" });
    return () => controls.stop();
  }, [isInView, prefersReduced, value, count]);

  return (
    <span ref={ref} className={["relative inline-block tabular-nums", className].filter(Boolean).join(" ")}>
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
