export type Locale = "zh" | "en";

export const LOCALES: readonly Locale[] = ["zh", "en"];
export const DEFAULT_LOCALE: Locale = "zh";

/** Absolute origin used for canonical / hreflang URLs. Override at build time. */
export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://kevin-hsu.zeabur.app";

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
