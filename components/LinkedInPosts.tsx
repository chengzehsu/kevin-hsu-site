import type { SectionProps } from "@/content/types";
import { AiPracticeTabs } from "./AiPracticeTabs";
import styles from "./LinkedInPosts.module.css";

/**
 * 「用 AI 解決問題」: one principle line, then three chapters behind tabs so a reader scans one chapter of
 * covers at a time. Cards show only cover, title, and one figure; the problem, the AI and human halves,
 * and the source sit behind 「看做法」. The anchor keeps its old id so links already sent still land here.
 */
export function LinkedInPosts({ content, locale }: SectionProps) {
  const practice = content.aiPractice;
  // The short case name is the part before the colon: "AI 節能產品：…" / "AI energy product: …".
  const caseNames = Object.fromEntries(
    content.cases.items.map((item) => [item.id, item.title.split(/[：:]/)[0]]),
  );

  return (
    <section
      id="linkedin-posts"
      className="content-section"
      aria-labelledby="linkedin-posts-heading"
    >
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <div className={`${styles.heading} scroll-rise`}>
          <h2 id="linkedin-posts-heading" className="section-title">
            {practice.title}
          </h2>
          <p>{practice.intro}</p>
        </div>
        <AiPracticeTabs
          practice={practice}
          locale={locale}
          caseNames={caseNames}
        />
      </div>
    </section>
  );
}
