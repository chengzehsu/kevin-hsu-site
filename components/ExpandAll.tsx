"use client";

import { useEffect, useState } from "react";
import {
  ArrowsInLineVerticalIcon,
  ArrowsOutLineVerticalIcon,
} from "@phosphor-icons/react/dist/ssr";
import styles from "./Timeline.module.css";

interface ExpandAllProps {
  /** id of the section whose disclosures this button opens and closes. */
  target: string;
  expandLabel: string;
  collapseLabel: string;
}

/**
 * One button for every role in a section. It follows the disclosures' own toggle events, so opening
 * the last closed role by hand flips it to "collapse all". Hidden until hydrated, like the per-role close button.
 */
export function ExpandAll({
  target,
  expandLabel,
  collapseLabel,
}: ExpandAllProps) {
  const [hydrated, setHydrated] = useState(false);
  const [allOpen, setAllOpen] = useState(false);

  useEffect(() => {
    const section = document.getElementById(target);
    if (!section) return;
    const sync = () => {
      const all = section.querySelectorAll<HTMLDetailsElement>(
        "details[data-disclosure]",
      );
      setAllOpen(
        all.length > 0 && Array.from(all).every((details) => details.open),
      );
    };
    sync();
    setHydrated(true);
    // toggle does not bubble; capture it on the section.
    section.addEventListener("toggle", sync, true);
    return () => section.removeEventListener("toggle", sync, true);
  }, [target]);

  function toggleAll() {
    const section = document.getElementById(target);
    section
      ?.querySelectorAll<HTMLDetailsElement>("details[data-disclosure]")
      .forEach((details) => {
        details.open = !allOpen;
      });
  }

  const Icon = allOpen ? ArrowsInLineVerticalIcon : ArrowsOutLineVerticalIcon;
  return (
    <button
      type="button"
      hidden={!hydrated}
      className={styles.expandAll}
      aria-expanded={allOpen}
      onClick={toggleAll}
    >
      <Icon size={16} aria-hidden="true" />
      {allOpen ? collapseLabel : expandLabel}
    </button>
  );
}
