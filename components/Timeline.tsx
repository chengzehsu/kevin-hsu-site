import { Fragment } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { SectionProps } from "@/content/types";
import styles from "./Timeline.module.css";

const RESUME_LABEL = { zh: "看完整履歷", en: "See the full résumé" } as const;

/** A vertical rail of the representative roles, one result each; the résumé holds every role in full. */
export function Timeline({ content, locale }: SectionProps) {
  const { title, currentLabel, items } = content.experience;
  const shown = items.filter((item) => item.homeHighlight);
  const others = items.filter((item) => !item.homeHighlight);

  return (
    <section
      id="experience"
      className="content-section"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <div className={`${styles.headerRow} scroll-rise`}>
          <header className={styles.header}>
            <h2 id="experience-heading" className="section-title">
              {title}
            </h2>
          </header>
          <a className={`${styles.resumeLink} action-link`} href={content.hero.primaryCta.href}>
            {RESUME_LABEL[locale]}
            <ArrowRightIcon size={18} aria-hidden="true" />
          </a>
        </div>

        {/* Links to a role not shown here still land on this section. */}
        {others.map((item) => (
          <span key={item.id} id={`experience-${item.id}`} aria-hidden="true" />
        ))}
        <ol className={styles.rail}>
          {shown.map((item) => (
            <Fragment key={item.id}>
              <li
                id={`experience-${item.id}`}
                className={`${styles.entry} entry-rail`}
              >
                <span className={styles.node} aria-hidden="true" />
                <div className={styles.summary}>
                  <span className={styles.year}>
                    {item.period}
                    {item.current && currentLabel ? (
                      <span className={styles.now}>{currentLabel}</span>
                    ) : null}
                  </span>
                  <span className={styles.identity}>
                    <strong className={styles.org}>{item.org}</strong>
                    <span className={styles.role}>{item.role}</span>
                  </span>
                  <span className={styles.signal}>{item.homeHighlight}</span>
                </div>
              </li>
            </Fragment>
          ))}
        </ol>
      </div>
    </section>
  );
}
