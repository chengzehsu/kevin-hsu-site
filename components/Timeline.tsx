import type { SectionProps } from "@/content/types";
import { Highlight } from "./Highlight";
import { Disclosure } from "./Disclosure";
import styles from "./Timeline.module.css";

/** A vertical rail: the current role stays open with its evidence, earlier chapters fold to one line each. */
export function Timeline({ content }: SectionProps) {
  const {
    title,
    intro,
    currentLabel,
    skillLabel,
    items,
    expandLabel,
    collapseLabel,
  } = content.experience;

  return (
    <section
      id="experience"
      className="content-section"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <header className={`${styles.header} scroll-rise`}>
          <h2 id="experience-heading" className="section-title">
            {title}
          </h2>
          {intro ? <p className={styles.intro}>{intro}</p> : null}
        </header>

        <ol className={styles.rail}>
          {items.map((item, index) => {
            const current = index === 0;
            return (
              <li
                id={`experience-${item.id}`}
                key={item.id}
                className={`${styles.entry} ${current ? styles.current : ""} scroll-rise`}
              >
                <span className={styles.node} aria-hidden="true" />
                <Disclosure
                  kind="experience"
                  defaultOpen={current}
                  expandLabel={expandLabel}
                  collapseLabel={collapseLabel}
                  className={current ? styles.currentPanel : ""}
                  summaryClassName={
                    current ? styles.currentSummary : styles.summary
                  }
                  summary={
                    current ? (
                      <span className={styles.currentHead}>
                        <span className={styles.currentMeta}>
                          {currentLabel ? (
                            <span className={styles.now}>{currentLabel}</span>
                          ) : null}
                          <span className={styles.period}>{item.period}</span>
                        </span>
                        <strong className={styles.currentOrg}>
                          {item.org}
                        </strong>
                        <span className={styles.currentRole}>{item.role}</span>
                        <span className={styles.currentFocus}>
                          {item.focus}
                        </span>
                      </span>
                    ) : (
                      <>
                        <span className={styles.year}>{item.period}</span>
                        <span className={styles.identity}>
                          <strong className={styles.org}>{item.org}</strong>
                          <span className={styles.role}>{item.role}</span>
                        </span>
                        <span className={styles.signal}>{item.focus}</span>
                      </>
                    )
                  }
                >
                  <div
                    className={current ? styles.currentDetail : styles.detail}
                  >
                    {item.summary && (
                      <p className={styles.context}>
                        <Highlight>{item.summary}</Highlight>
                      </p>
                    )}
                    <ul className={styles.evidence}>
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>
                          <Highlight>{bullet}</Highlight>
                        </li>
                      ))}
                    </ul>
                    <p className={styles.skillSignal}>
                      <span>{skillLabel}</span>
                      {item.skillSignal}
                    </p>
                  </div>
                </Disclosure>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
