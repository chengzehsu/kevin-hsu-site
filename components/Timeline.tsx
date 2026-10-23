import { Fragment } from "react";
import type { SectionProps } from "@/content/types";
import { Highlight } from "./Highlight";
import { Disclosure } from "./Disclosure";
import { ExpandAll } from "./ExpandAll";
import styles from "./Timeline.module.css";
import { TBullets } from "./Tailored";

/** A vertical rail: every role folds to one line of the same weight; the current one only carries a small "now" tag. */
export function Timeline({ content, locale }: SectionProps) {
  const {
    title,
    intro,
    currentLabel,
    skillLabel,
    items,
    expandLabel,
    collapseLabel,
    expandAllLabel,
    collapseAllLabel,
  } = content.experience;

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
            {intro ? (
              <p className={styles.intro}>
                {/* A Chinese line breaks only after the full-width colon, never inside the question. */}
                {intro.split(/(?<=：)/).map((clause) => (
                  <span key={clause} className="inline-block">
                    {clause}
                  </span>
                ))}
              </p>
            ) : null}
          </header>
          {/* Acts on the whole list, so it sits at the section's top right, just above the rail. */}
          <ExpandAll
            target="experience"
            expandLabel={expandAllLabel}
            collapseLabel={collapseAllLabel}
          />
        </div>

        <ol className={styles.rail}>
          {items.map((item, index) => {
            const current = index === 0;
            return (
              <Fragment key={item.id}>
                <li
                  id={`experience-${item.id}`}
                  className={`${styles.entry} scroll-rise`}
                >
                  <span className={styles.node} aria-hidden="true" />
                  <Disclosure
                    kind="experience"
                    expandLabel={expandLabel}
                    collapseLabel={collapseLabel}
                    summaryClassName={styles.summary}
                    summary={
                      <>
                        <span className={styles.year}>
                          {item.period}
                          {current && currentLabel ? (
                            <span className={styles.now}>{currentLabel}</span>
                          ) : null}
                        </span>
                        <span className={styles.identity}>
                          <strong className={styles.org}>{item.org}</strong>
                          <span className={styles.role}>{item.role}</span>
                        </span>
                        <span className={styles.signal}>{item.focus}</span>
                      </>
                    }
                  >
                    <div className={styles.detail}>
                      {item.summary && (
                        <p className={styles.context}>
                          <Highlight>{item.summary}</Highlight>
                        </p>
                      )}
                      <ul className={styles.evidence} data-v="">
                        <TBullets id={item.id} bullets={item.bullets} locale={locale} highlight />
                      </ul>
                      {item.extras ? (
                        <div className={styles.extras}>
                          <p className={styles.extrasTitle}>{item.extras.title}</p>
                          <ul className={styles.evidence}>
                            {item.extras.bullets.map((bullet) => (
                              <li key={bullet}>
                                <Highlight>{bullet}</Highlight>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                      <p className={styles.skillSignal}>
                        <span>{skillLabel}</span>
                        {item.skillSignal}
                      </p>
                    </div>
                  </Disclosure>
                </li>
                {item.gapAfter ? (
                  <li className={styles.gap}>{item.gapAfter}</li>
                ) : null}
              </Fragment>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
