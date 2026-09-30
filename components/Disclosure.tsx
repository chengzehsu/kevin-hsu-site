"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./Disclosure.module.css";
import { CaretDownIcon, ArrowUpIcon } from "@phosphor-icons/react/dist/ssr";

interface DisclosureProps {
  summary: ReactNode;
  children: ReactNode;
  expandLabel: string;
  collapseLabel: string;
  summaryClassName?: string;
  className?: string;
  actions?: ReactNode;
  kind: "case" | "experience";
  defaultOpen?: boolean;
}

/** Native details keeps the complete text and keyboard interaction usable without JS. */
export function Disclosure({ summary, children, expandLabel, collapseLabel, summaryClassName = "", className = "", actions, kind, defaultOpen = false }: DisclosureProps) {
  const details = useRef<HTMLDetailsElement>(null);
  const heading = useRef<HTMLElement>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  function collapse() {
    const element = heading.current;
    if (!element || !details.current) return;
    // Return to the origin before removing content below it, avoiding scroll clamping.
    const top = element.getBoundingClientRect().top;
    const navBottom = document.querySelector(".site-nav")?.getBoundingClientRect().bottom ?? 0;
    if (top < navBottom + 16 || top > window.innerHeight - 80) {
      element.scrollIntoView({ block: "start", behavior: "instant" });
    }
    element.focus({ preventScroll: true });
    details.current.open = false;
  }

  return (
    <details ref={details} className={`${styles.disclosure} ${className}`} data-disclosure={kind} open={defaultOpen}>
      <summary ref={heading} className={`${styles.summary} ${summaryClassName}`}>
        {summary}
        <span className={styles.affordance}>
          <span className={styles.closedLabel}>{expandLabel}</span>
          <span className={styles.openLabel}>{collapseLabel}</span>
          <CaretDownIcon size={16} className={styles.chevron} aria-hidden="true" />
        </span>
      </summary>
      <div className={styles.body}>
        {children}
        <div className={styles.actions}>
          {actions}
          <button type="button" hidden={!hydrated} className={styles.close} onClick={collapse} data-disclosure-close>
            {collapseLabel}<ArrowUpIcon size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </details>
  );
}
