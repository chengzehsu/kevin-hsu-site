import {
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { SectionProps } from "@/content/types";
import { aiOnlyCount } from "@/lib/aiPractice";
import { casePath, portfolioPath } from "@/lib/locale";
import styles from "./AiHighlights.module.css";

const MORE = {
  zh: (count: number) => `看其他 ${count} 個 AI 專案`,
  en: (count: number) => `See ${count} more AI projects`,
} as const;

/** Home shows tools Kevin built himself. Each row leads with the problem; the full set lives on /portfolio/. */
export function AiHighlights({ content, locale }: SectionProps) {
  const practice = content.aiPractice;
  const picks = practice.highlights;
  // "More" counts the AI list on the portfolio, minus the rows here that come from it (those without a case).
  const total =
    aiOnlyCount(practice) - picks.filter((pick) => !pick.caseId).length;

  return (
    <section id="ai" className="content-section" aria-labelledby="ai-heading">
      {/* Links sent before the AI section moved to /portfolio/ still land on this section. */}
      <span id="linkedin-posts" aria-hidden="true" />
      <span id="ai-build" aria-hidden="true" />
      <span id="ai-process" aria-hidden="true" />
      <span id="ai-life" aria-hidden="true" />
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <div className={`${styles.heading} scroll-rise`}>
          <h2 id="ai-heading" className="section-title">
            {practice.highlightsTitle}
          </h2>
          <a
            className={`${styles.more} action-link`}
            href={`${portfolioPath(locale)}#linkedin-posts`}
          >
            {MORE[locale](total)}
            <ArrowRightIcon size={18} aria-hidden="true" />
          </a>
        </div>
        <ul className={styles.list}>
          {picks.map((item) => (
            <li key={item.problem} className="entry-unveil">
              <a
                href={
                  item.caseId
                    ? `${casePath(locale, item.caseId)}${item.anchor ? `#${item.anchor}` : ""}`
                    : `${portfolioPath(locale)}#ai-build`
                }
                className={styles.row}
              >
                <span className={styles.copy}>
                  <strong>{item.problem}</strong>
                  <span>{item.solution}</span>
                </span>
                <span className={styles.stat}>
                  <strong>{item.stat.value}</strong>
                  <span>{item.stat.label}</span>
                </span>
                <ArrowUpRightIcon
                  className={styles.arrow}
                  size={20}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
