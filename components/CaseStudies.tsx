import type { SectionProps } from "@/content/types";
import { casePath } from "@/lib/locale";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { CaseArtifact } from "./CaseArtifact";
import styles from "./CaseStudies.module.css";

export function CaseStudies({ content, locale }: SectionProps) {
  const cases = content.cases;
  const items = [...cases.items].sort((a, b) => a.rank - b.rank);
  const decisionLabel = locale === "zh" ? "我的關鍵判斷" : "Key product judgment";

  return (
    <section id="cases" className={`${styles.section} content-section`} aria-labelledby="cases-heading">
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <div className={styles.sectionHeading}>
          <div><span>01—04</span><h2 id="cases-heading" className="section-title">{cases.title}</h2></div>
          <p>{cases.intro}</p>
        </div>
        <div className={styles.list}>
          {items.map((item, index) => (
            <article id={item.id} key={item.id} className={styles.item} data-case-card="ledger">
              <div className={styles.identity}>
                <span className={styles.itemIndex} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <p className={styles.meta}>{item.role}<span aria-hidden="true"> · </span>{item.org}<span aria-hidden="true"> · </span>{item.period}</p>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.scope}>{item.scope}</p>
                <div className={styles.outcome}>
                  <span className={styles.decisionEyebrow}>{cases.columns.result}</span>
                  <strong className={styles.outcomeImpact}>{item.impact}</strong>
                  <p className={styles.proofNote}><span>{cases.measurementLabel}</span>{item.measurementSummary}</p>
                </div>
                <div className={styles.caseDecision}>
                  <span className={styles.decisionEyebrow}>{decisionLabel}</span>
                  <p>{item.decisionSummary}</p>
                </div>
              </div>
              <div className={styles.caseVisual}>
                <div className={styles.itemEvidence}><CaseArtifact caseId={item.id} locale={locale} compact /></div>
                <a className={styles.caseLink} href={casePath(locale, item.id)} aria-label={`${cases.readLabel}: ${item.title}`}>
                  {cases.readLabel}<ArrowUpRightIcon size={18} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
