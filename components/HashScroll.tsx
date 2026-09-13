"use client";

import { useEffect } from "react";

function scrollToHash(behavior: ScrollBehavior) {
  const id = decodeURIComponent(window.location.hash.slice(1));
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
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
    const onHashChange = () => scrollToHash("smooth");
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);
  return null;
}
