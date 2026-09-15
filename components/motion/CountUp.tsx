import type { Locale } from "@/lib/locale";

export interface CountUpProps { value: number; prefix?: string; suffix?: string; locale: Locale; className?: string }
export function formatCount(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "zh" ? "zh-TW" : "en-US").format(value);
}

/** Actual outcomes remain readable immediately; no counters or hidden sizing text. */
export function CountUp({ value, prefix = "", suffix = "", locale, className }: CountUpProps) {
  return <span className={["tabular-nums", className].filter(Boolean).join(" ")}>
    {prefix}{formatCount(value, locale)}<span className="metric-unit">{suffix}</span>
  </span>;
}
