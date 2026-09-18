"use client";

import { useEffect } from "react";

function scrollToHash(behavior: ScrollBehavior) {
  let id: string;
  try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  const details = target.querySelector<HTMLDetailsElement>(":scope > details[data-disclosure]");
  if (details) details.open = true;
  target.scrollIntoView({ block: "start", behavior });
}

/**
 * Fragment navigation on this static export does not scroll on its own once the
 * app router is hydrated (observed live: /#cases loads at scrollY 0 and a native
 * #anchor click changes the URL but not the scroll position). Scroll ourselves:
 * instantly after hydration, smoothly on later hash changes. Honours
 * scroll-padding-top from globals.css. Listens to hashchange only, never scroll.
 */
export function HashScroll() {
  useEffect(() => {
    const timer = window.setTimeout(() => scrollToHash("instant"), 50);
    const onHashChange = () => scrollToHash(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth");
    const onRepeatAnchor = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      if (link?.hash && link.hash === window.location.hash) {
        event.preventDefault();
        onHashChange();
      }
    };
    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onRepeatAnchor);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onRepeatAnchor);
    };
  }, []);
  return null;
}
