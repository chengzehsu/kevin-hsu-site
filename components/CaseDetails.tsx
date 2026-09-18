import type { CaseStudy, SectionProps } from "@/content/types";
import { Highlight } from "./Highlight";
import { CaseEvidence } from "./CaseEvidence";
import { CaseFilm } from "./CaseFilm";
import styles from "./CaseStudies.module.css";

const COLUMN_ORDER = ["situation", "bottleneck", "hypothesis", "result"] as const;

/** The inline disclosure and shareable page render the same source and evidence. */
export function CaseDetails({ item, content, locale, headingLevel = 3 }: SectionProps & { item: CaseStudy; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className={styles.details}>
      <div className={styles.narrative}>
        {COLUMN_ORDER.map((key) => (
          <div key={key} className={key === "result" ? styles.result : styles.chapter}>
            <Heading>{content.cases.columns[key]}</Heading>
            <p><Highlight>{item[key]}</Highlight></p>
          </div>
        ))}
      </div>
      <aside className={styles.evidence}>
        <CaseEvidence caseId={item.id} locale={locale} />
        {content.awards.items.filter((award) => award.kind === "feature" && award.caseId === item.id).map((award) => (
          <a key={award.id} className={styles.textLink} href={award.link.href} target="_blank" rel="noopener noreferrer">
            {award.link.label}<span aria-hidden="true">↗</span>
          </a>
        ))}
        {item.id === "grocery" && <CaseFilm locale={locale} label={content.cases.filmLabel} />}
      </aside>
    </div>
  );
}
