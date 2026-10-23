export type Locale = "zh" | "en";

export const LOCALES: readonly Locale[] = ["zh", "en"];
export const DEFAULT_LOCALE: Locale = "zh";

const DEFAULT_ORIGIN = "https://chengzeresume.kevin492625.workers.dev";

/**
 * Absolute origin used for canonical / hreflang URLs.
 * Override with NEXT_PUBLIC_SITE_ORIGIN at build time; a value without a scheme
 * (e.g. "chengzeresume.kevin492625.workers.dev") is accepted and normalised, so a dashboard
 * typo cannot fail the build with "Invalid URL".
 */
export const SITE_ORIGIN = normaliseOrigin(process.env.NEXT_PUBLIC_SITE_ORIGIN);

/**
 * Origin of the PocketBase backend (backend/) that serves tailored-link overlays and the /admin/ data.
 * Set NEXT_PUBLIC_BACKEND_ORIGIN at build time; empty turns tailored links and the admin off, and every
 * visitor sees the main copy. Same normalising as SITE_ORIGIN.
 */
export const BACKEND_ORIGIN = normaliseOrigin(process.env.NEXT_PUBLIC_BACKEND_ORIGIN, "");

function normaliseOrigin(raw: string | undefined, fallback = DEFAULT_ORIGIN): string {
  const value = (raw ?? "").trim().replace(/\/+$/, "");
  if (!value) return fallback;
  const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    return new URL(withScheme).origin;
  } catch {
    return fallback;
  }
}

/** Value of <html lang> per locale. Chinese matches :lang(zh-Hant) rules in globals.css. */
export const HTML_LANG: Record<Locale, string> = {
  zh: "zh-Hant-TW",
  en: "en",
};

/** localStorage key holding the visitor's chosen locale. */
export const LOCALE_STORAGE_KEY = "locale";

/** Path prefix of a locale. zh lives at the root, en under /en/. */
export function localePath(locale: Locale, hash = ""): string {
  const base = locale === "zh" ? "/" : "/en/";
  return `${base}${hash}`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "zh" ? "en" : "zh";
}

export function casePath(locale: Locale, id: string): string {
  return `${localePath(locale)}cases/${encodeURIComponent(id)}/`;
}

/** Dedicated index for the selected case studies. */
export function portfolioPath(locale: Locale): string {
  return `${localePath(locale)}portfolio/`;
}

/** One-page, print-ready résumé for HR readers. */
export function resumePath(locale: Locale): string {
  return `${localePath(locale)}resume/`;
}
