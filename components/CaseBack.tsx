"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/lib/locale";

const LABELS = {
  zh: { home: "回到首頁", resume: "回到履歷" },
  en: { home: "Back to home", resume: "Back to résumé" },
} as const;

/** Set on the history entry the case was entered on from the home page or the résumé. */
const ENTRY_MARK = "caseBackEntry";

type Origin = { kind: keyof (typeof LABELS)["zh"]; url: string };

/** Which page sent the reader here, when it is the home page or the résumé on this site. */
function origin(): Origin | null {
  try {
    const from = new URL(document.referrer);
    if (from.origin !== window.location.origin) return null;
    const path = from.pathname
      .replace(/^\/en(?=\/|$)/, "")
      .replace(/\/?$/, "/");
    // The home shelf is where cases are opened from; land on it rather than on the film.
    if (path === "/")
      return { kind: "home", url: `${from.pathname}${from.search}#work` };
    if (path === "/resume/")
      return { kind: "resume", url: `${from.pathname}${from.search}` };
  } catch {}
  return null;
}

/**
 * "Back" returns to where the reader came from: a recruiter who opened a case from the résumé goes back to
 * the résumé instead of being sent to the portfolio. On the entry the case was opened on (no chapter link
 * followed since), history.back() also restores the scroll position there; elsewhere the link navigates.
 * Direct visits, other cases, and the portfolio keep the server-rendered portfolio link.
 */
export function CaseBack({
  href,
  label,
  locale,
  className,
}: {
  href: string;
  label: string;
  locale: Locale;
  className?: string;
}) {
  const [from, setFrom] = useState<Origin | null>(null);

  useEffect(() => {
    const source = origin();
    setFrom(source);
    // Mark the history entry this page was entered on. Chapter links push entries without the mark, and a
    // reload keeps it on the original entry, so "back" can tell whether history.back() reaches the source.
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (source && navigation?.type === "navigate" && !window.location.hash && window.history.length > 1) {
      window.history.replaceState({ ...window.history.state, [ENTRY_MARK]: true }, "");
    }
  }, []);

  const back = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!from || window.history.state?.[ENTRY_MARK] !== true) return;
    event.preventDefault();
    window.history.back();
  };

  return (
    <a
      href={from?.url ?? href}
      className={className}
      onClick={back}
      data-case-back={from?.kind ?? "portfolio"}
    >
      <ArrowLeftIcon size={16} weight="bold" aria-hidden="true" />
      {from ? LABELS[locale][from.kind] : label}
    </a>
  );
}
