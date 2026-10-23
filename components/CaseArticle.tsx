import { Fragment } from "react";
import type { CaseArticle as CaseArticleContent } from "@/content/types";
import type { Locale } from "@/lib/locale";
import styles from "./CaseArticle.module.css";

const COPY = {
  zh: { title: "完整故事" },
  en: { title: "The full story" },
} as const;

/** The illustrated long-form version of a case: a lead, one section per trait with its screen, and a closing line. */
export function CaseArticle({
  article,
  locale,
}: {
  article: CaseArticleContent;
  locale: Locale;
}) {
  return (
    <section
      id="story"
      className={styles.article}
      aria-labelledby="story-title"
    >
      <h2 id="story-title" className={styles.title}>
        {COPY[locale].title}
      </h2>
      <p className={styles.lead}>{article.lead}</p>
      {article.sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className={`${styles.section} scroll-rise`}
          aria-labelledby={`${section.id}-title`}
        >
          <div className={styles.copy}>
            <p className={styles.trait}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {section.trait}
            </p>
            <h3 id={`${section.id}-title`} className={styles.heading}>
              {/* Break only after a comma, never inside a clause such as 「資料到齊」. */}
              {section.heading.split(/(?<=[，,])\s*/).map((clause, index, clauses) => (
                <Fragment key={clause}>
                  {/* An English comma keeps its space; a full-width comma needs none. */}
                  {index > 0 && clauses[index - 1].endsWith(",") ? " " : null}
                  <span className="inline-block">{clause}</span>
                </Fragment>
              ))}
            </h3>
            {section.stat ? (
              <p className={styles.stat}>
                <strong>{section.stat.value}</strong>
                <span>{section.stat.label}</span>
              </p>
            ) : null}
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
          {section.figure ? (
            <figure className={styles.figure} style={{ maxWidth: section.figure.width }}>
              {/* On a phone the screen is small; a tap opens it at full size. */}
              <a href={section.figure.src} target="_blank" rel="noopener" className={styles.zoom}>
              <img
                src={section.figure.src}
                alt={section.figure.alt}
                width={section.figure.width}
                height={section.figure.height}
                loading="lazy"
                decoding="async"
              />
              </a>
              <figcaption>{section.figure.caption}</figcaption>
            </figure>
          ) : null}
        </section>
      ))}
      <p className={styles.closing}>{article.closing}</p>
    </section>
  );
}
