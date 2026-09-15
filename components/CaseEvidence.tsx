import { caseEvidence, type CaseEvidence as Evidence } from "@/content/caseEvidence";
import type { Locale } from "@/lib/locale";
import type { CSSProperties } from "react";
import styles from "./CaseEvidence.module.css";

interface CaseEvidenceProps {
  caseId: string;
  locale: Locale;
}

export function CaseEvidence({ caseId, locale }: CaseEvidenceProps) {
  const evidence = caseEvidence[locale][caseId];

  if (!evidence) return null;

  return (
    <figure className={styles.figure} aria-label={`${evidence.eyebrow}: ${evidence.title}`}>
      <figcaption className={styles.caption}>
        <span>{evidence.eyebrow}</span>
        <span>{evidence.title}</span>
      </figcaption>

      {evidence.kind === "comparison" ? <Comparison evidence={evidence} /> : null}
      {evidence.kind === "sources" ? <Sources evidence={evidence} /> : null}
      {evidence.kind === "loop" ? <Loop evidence={evidence} /> : null}

      <p className={styles.measure}>{evidence.measure}</p>
    </figure>
  );
}

function Comparison({ evidence }: { evidence: Extract<Evidence, { kind: "comparison" }> }) {
  return (
    <div className={styles.comparison}>
      {[evidence.before, evidence.after].map((item, index) => (
        <div className={styles.barRow} key={item.label}>
          <div className={styles.barMeta}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
          <div className={styles.barTrack}>
            <span
              className={`${styles.barFill} ${index === 1 ? styles.barFillAccent : ""}`}
              style={{ "--bar-width": `${item.width}%` } as CSSProperties}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function Sources({ evidence }: { evidence: Extract<Evidence, { kind: "sources" }> }) {
  return (
    <div className={styles.sources}>
      <div className={styles.sourceList}>
        {evidence.inputs.map((input) => (
          <span key={input}>{input}</span>
        ))}
      </div>
      <div className={styles.sourceLink} aria-hidden="true" />
      <strong className={styles.output}>{evidence.output}</strong>
    </div>
  );
}

function Loop({ evidence }: { evidence: Extract<Evidence, { kind: "loop" }> }) {
  return (
    <ol className={styles.loop}>
      {evidence.steps.map((step, index) => (
        <li key={step}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{step}</strong>
        </li>
      ))}
    </ol>
  );
}
