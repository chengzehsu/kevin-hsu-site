import type { SectionProps } from "@/content/types";
import { Highlight } from "./Highlight";
import styles from "./Timeline.module.css";

export function Timeline({ content }: SectionProps) {
  const { title, skillLabel, items } = content.experience;

  return (
    <section id="experience" className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">{title}</h2>

        <ol className={styles.ledger}>
          {items.map((item, i) => (
            <li key={`${item.org}-${item.period}-${i}`} className={styles.entry}>
              <span className={styles.sequence} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className={styles.chronology}>
                <p className={styles.period}>{item.period}</p>
              </div>

              <article className={styles.record}>
                <header className={styles.recordHeader}>
                  <h3 className={styles.role}>{item.role}</h3>
                  <p className={styles.organization}>{item.org}</p>
                </header>

                <p className={styles.skillSignal}>
                  <span>{skillLabel}</span>
                  {item.skillSignal}
                </p>

                {item.summary ? (
                  <p className={styles.summary}>
                    <Highlight>{item.summary}</Highlight>
                  </p>
                ) : null}

                {item.bullets.length > 0 ? (
                  <ul className={styles.evidence}>
                    {item.bullets.map((bullet, j) => (
                      <li key={`${j}-${bullet}`} className={styles.evidenceItem}>
                        <span className={styles.evidenceText}>
                          <Highlight>{bullet}</Highlight>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
