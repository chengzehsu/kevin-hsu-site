"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export interface RevealProps { children: ReactNode; delay?: number; className?: string }

/** Progressive enhancement: content never waits for hydration or intersection. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { element.dataset.entered = "true"; observer.disconnect(); }
    }, { threshold: .08 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} data-reveal="" className={className} style={{ "--reveal-delay": `${delay}s` } as CSSProperties}>{children}</div>;
}
