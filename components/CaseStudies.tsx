import type { SectionProps } from "@/content/types";
import { casePath } from "@/lib/locale";
import { Disclosure } from "./Disclosure";
import { CaseDetails } from "./CaseDetails";
import { CaseShare } from "./CaseShare";
import styles from "./CaseStudies.module.css";

export function CaseStudies({ content, locale }: SectionProps) {
  const cases = content.cases;
  const items = [...cases.items].sort((a, b) => a.rank - b.rank);

  return (
    <section id="cases" className="content-section" aria-labelledby="cases-heading">
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <div className={styles.sectionHeading}>
          <h2 id="cases-heading" className="section-title">{cases.title}</h2>
          <p>{cases.intro}</p>
        </div>
        <div className={styles.list}>
          {items.map((item) => (
            <article id={item.id} key={item.id} className={styles.item}>
              <Disclosure
                kind="case"
                expandLabel={cases.expandLabel}
                collapseLabel={cases.collapseLabel}
                summaryClassName={styles.summary}
                summary={
                  <>
                    <span className={styles.identity}>
                      <strong className={styles.title}>{item.title}</strong>
                      <span className={styles.meta}>{item.org}<span aria-hidden="true"> · </span>{item.period}</span>
                      <span className={styles.ownership}><span>{cases.ownershipLabel}</span>{item.ownership}</span>
                    </span>
                    <span className={styles.impact}>{item.impact}</span>
                  </>
                }
                actions={<CaseShare href={casePath(locale, item.id)} labels={cases} />}
              >
                <CaseDetails item={item} content={content} locale={locale} />
              </Disclosure>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
