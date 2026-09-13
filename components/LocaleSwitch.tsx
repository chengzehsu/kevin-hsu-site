"use client";

import type { MouseEvent } from "react";
import { HTML_LANG, LOCALE_STORAGE_KEY, localePath, otherLocale, type Locale } from "@/lib/locale";

interface LocaleSwitchProps {
  locale: Locale;
  label: string;
  ariaLabel: string;
}

/**
 * Plain anchor to the other locale root, so it works without JS.
 * With JS: stores the preference and keeps the current section hash (/#cases -> /en/#cases).
 * Modified clicks (cmd / ctrl / shift / middle button) fall through to native behaviour.
 */
export function LocaleSwitch({ locale, label, ariaLabel }: LocaleSwitchProps) {
  const other = otherLocale(locale);

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    let stored = false;
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, other);
      stored = true;
    } catch {
      // Storage unavailable (private mode, quota): carry the choice in the URL instead,
      // so the first-visit redirect on / does not bounce the visitor back to /en/.
    }
    const marker = stored ? "" : `?lang=${other}`;
    window.location.assign(`${localePath(other)}${marker}${window.location.hash}`);
  }

  return (
    <a
      href={localePath(other)}
      hrefLang={HTML_LANG[other]}
      aria-label={ariaLabel || undefined}
      onClick={onClick}
      className="rounded-ui border border-line px-2.5 py-1.5 text-sm font-medium whitespace-nowrap transition-transform hover:bg-surface active:scale-[0.98]"
    >
      {label}
    </a>
  );
}
