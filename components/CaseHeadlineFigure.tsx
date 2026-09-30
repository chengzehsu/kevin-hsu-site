import type { CSSProperties } from "react";
import type { CaseHeadline } from "@/content/caseArtifacts";
import styles from "./CaseHeadlineFigure.module.css";

/**
 * One outcome in display size. The number never breaks internally; its size is derived from its
 * length and the width of its container, so "12,000 → 20,000" still fits a 375px column.
 */
export function CaseHeadlineFigure({
  headline,
  size = "list",
  className = "",
}: {
  headline: CaseHeadline;
  size?: "list" | "hero";
  className?: string;
}) {
  const chars = Math.max(headline.value.length, 4);
  return (
    <p className={`${styles.figure} ${className}`} data-size={size} style={{ "--chars": chars } as CSSProperties}>
      <span className={styles.label}>{headline.label}</span>
      <span className={styles.line}>
        <strong className={styles.value}>{headline.value}</strong>
        {headline.unit ? <> <span className={styles.unit}>{headline.unit}</span></> : null}
        {headline.delta ? <> <span className={styles.delta}>{headline.delta}</span></> : null}
      </span>
      {headline.also ? <span className={styles.also}>{headline.also}</span> : null}
    </p>
  );
}
