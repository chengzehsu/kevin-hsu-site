import type { SectionProps } from "@/content/types";
import { Highlight } from "./Highlight";
import { Disclosure } from "./Disclosure";
import styles from "./Timeline.module.css";

export function Timeline({ content }: SectionProps) {
  const { title, skillLabel, items, expandLabel, collapseLabel } = content.experience;

  return (
    <section id="experience" className="content-section" aria-labelledby="experience-heading">
      <div className="section-layout mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <h2 id="experience-heading" className="section-title">{title}</h2>
        <ol className={styles.ledger}>
          {items.map((item) => (
            <li id={`experience-${item.id}`} key={item.id} className={styles.entry}>
              <Disclosure
                kind="experience"
                expandLabel={expandLabel}
                collapseLabel={collapseLabel}
                summaryClassName={styles.summary}
                summary={
                  <>
                    <span className={styles.period}>{item.period}</span>
                    <span className={styles.identity}>
                      <strong className={styles.role}>{item.role}</strong>
                      <span className={styles.organization}>{item.org}</span>
                    </span>
                    <span className={styles.focus}>{item.focus}</span>
                  </>
                }
              >
                <div className={styles.detail}>
                  <p className={styles.skillSignal}><span>{skillLabel}</span>{item.skillSignal}</p>
                  {item.summary && <p className={styles.context}><Highlight>{item.summary}</Highlight></p>}
                  <ul className={styles.evidence}>
                    {item.bullets.map((bullet) => <li key={bullet}><Highlight>{bullet}</Highlight></li>)}
                  </ul>
                </div>
              </Disclosure>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
