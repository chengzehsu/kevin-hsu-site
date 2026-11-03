import {
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { AiPracticeItem, SectionProps } from "@/content/types";
import { aiOnlyPractice } from "@/lib/aiPractice";
import { casePath, portfolioPath } from "@/lib/locale";
import styles from "./AiHighlights.module.css";

const MORE = {
  zh: (count: number) => `看其他 ${count} 個 AI 專案`,
  en: (count: number) => `See ${count} more AI projects`,
} as const;

/** Home keeps three AI projects that real teammates use; the full set lives on /portfolio/. */
export function AiHighlights({ content, locale }: SectionProps) {
  const practice = content.aiPractice;
  const [build, process] = practice.chapters;
  const picks = [
    build.items[0],
    build.items.find((item) => item.caseId === "namecard"),
    process.lead,
  ].filter((item): item is AiPracticeItem => Boolean(item));
  // "More" counts only what this section does not already show.
  const total = aiOnlyPractice(practice)
    .chapters.flatMap((chapter) => [chapter.lead, ...chapter.items])
    .filter((item) => !picks.some((pick) => pick.title === item.title)).length;

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
            {practice.title}
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
            <li key={item.title} className="scroll-rise">
              <a
                href={
                  item.caseId
                    ? casePath(locale, item.caseId)
                    : portfolioPath(locale)
                }
                className={styles.row}
              >
                <span className={styles.stat}>
                  <strong>{item.stat?.value}</strong>
                  <span>{item.stat?.label}</span>
                </span>
                <span className={styles.copy}>
                  <strong>{item.title}</strong>
                  <span>{item.result}</span>
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
