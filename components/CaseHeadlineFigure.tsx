import type { CSSProperties } from "react";
import type { CaseHeadline } from "@/content/caseArtifacts";
import styles from "./CaseHeadlineFigure.module.css";

/**
 * One outcome in display size. The number never breaks internally; its size is derived from its
 * length and the width of its container, so "12,000 → 20,000" and CJK values like "不做多數決" still fit a 375px column.
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
  // The CSS budget assumes ~.6em per glyph; a CJK glyph is a full 1em, so it counts as ~1.7.
  const chars = Math.max(
    [...headline.value].reduce((n, c) => n + (/[\u2E80-\uFFEF]/.test(c) ? 1.7 : 1), 0),
    4,
  );
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
