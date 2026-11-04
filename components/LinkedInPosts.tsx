import type { SectionProps } from "@/content/types";
import { aiOnlyPractice } from "@/lib/aiPractice";
import { caseName } from "@/lib/cases";
import { casePath } from "@/lib/locale";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Disclosure } from "./Disclosure";
import styles from "./LinkedInPosts.module.css";

/**
 * The AI work without a case of its own, one row each below the case cards. A row holds
 * the title and one figure; the problem, the AI and human halves, and the source expand in place.
 * The anchor keeps its old id so links already sent still land here.
 */
export function LinkedInPosts({ content, locale }: SectionProps) {
  const practice = aiOnlyPractice(content.aiPractice);
  const { labels } = practice;
  const colon = locale === "zh" ? "：" : ": ";
  const caseNames = Object.fromEntries(
    content.cases.items.map((item) => [item.id, caseName(item)]),
  );

  return (
    <section
      id="linkedin-posts"
      className={`${styles.section} content-section`}
      aria-labelledby="linkedin-posts-heading"
    >
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <div className={styles.heading}>
          <h2 id="linkedin-posts-heading" className="section-title">
            {practice.title}
          </h2>
          <p>{practice.intro}</p>
        </div>
        <div className={styles.groups}>
          {practice.chapters.map((chapter) => (
            <div
              key={chapter.id}
              id={chapter.id}
              className={styles.group}
              data-ai-chapter={chapter.id}
            >
              {/* The process and life chapters merged into the first group; links sent earlier still land on it. */}
              {chapter.id === "ai-build" ? (
                <>
                  <span id="ai-process" aria-hidden="true" />
                  <span id="ai-life" aria-hidden="true" />
                </>
              ) : null}
              <h3 className={styles.groupTitle}>{chapter.title}</h3>
              <ul className={styles.rows}>
                {[chapter.lead, ...chapter.items].map((item) => (
                  <li key={item.title} className={styles.row} data-ai-item>
                    <Disclosure
                      kind="ai"
                      summary={
                        <span className={styles.rowHead}>
                          <span className={styles.rowTitle}>{item.title}</span>
                          {item.stat ? (
                            <span className={styles.stat}>
                              <b>{item.stat.value}</b> {item.stat.label}
                            </span>
                          ) : null}
                        </span>
                      }
                      summaryClassName={styles.rowSummary}
                      expandLabel={labels.expand}
                      collapseLabel={labels.collapse}
                    >
                      <dl className={styles.detail}>
                        <div>
                          <dt>{labels.stuck}</dt>
                          <dd>{item.stuck}</dd>
                        </div>
                        <div data-role="ai">
                          <dt>{labels.ai}</dt>
                          <dd>{item.ai}</dd>
                        </div>
                        <div data-role="human">
                          <dt>{labels.human}</dt>
                          <dd>{item.human}</dd>
                        </div>
                        <div>
                          <dt>{labels.result}</dt>
                          <dd>{item.result}</dd>
                        </div>
                      </dl>
                      <p className={styles.source}>
                        {labels.source}
                        {colon}
                        {item.source}
                      </p>
                      {item.caseId || item.href ? (
                        <p className={styles.links}>
                          {item.caseId ? (
                            <a
                              className={`${styles.link} action-link`}
                              href={casePath(locale, item.caseId)}
                            >
                              {labels.caseLink}
                              {colon}
                              {caseNames[item.caseId]}
                              <ArrowRightIcon size={18} aria-hidden="true" />
                            </a>
                          ) : null}
                          {item.href ? (
                            <a
                              className={`${styles.link} action-link`}
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {labels.read}
                              <span className="sr-only">
                                {locale === "zh"
                                  ? `：${item.title}（LinkedIn）`
                                  : `: ${item.title} (LinkedIn)`}
                              </span>
                              <ArrowUpRightIcon size={18} aria-hidden="true" />
                            </a>
                          ) : null}
                        </p>
                      ) : null}
                    </Disclosure>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
