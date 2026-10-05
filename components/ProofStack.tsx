import Image from "next/image";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { SectionProps } from "@/content/types";
import { CASE_POSTERS, CASE_POSTER_SIZE } from "@/content/caseArtifacts";
import { casePath, portfolioPath } from "@/lib/locale";
import { KeepTogether } from "./KeepTogether";
import styles from "./ProofStack.module.css";

/**
 * Home case index: the four work cases as posters, one artifact and one outcome each. The side projects
 * and the full cases live on /portfolio/, and the link says so, so the home count never reads as the total.
 */
export function ProofStack({ content, locale }: SectionProps) {
  const { cases } = content;
  const items = cases.items
    .filter((item) => item.kind !== "side")
    .sort((a, b) => a.rank - b.rank);

  return (
    <section
      id="work"
      className={`content-section ${styles.section}`}
      aria-labelledby="work-heading"
    >
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <div className={`${styles.header} scroll-rise`}>
          <h2 id="work-heading" className="section-title">
            {cases.workTitle}
          </h2>
          <a
            className={`${styles.all} action-link`}
            href={portfolioPath(locale)}
          >
            {cases.allLabel}
            <ArrowRightIcon size={18} aria-hidden="true" />
          </a>
        </div>
        <ol className={styles.row}>
          {items.map((item) => {
            const poster = CASE_POSTERS[item.id];
            // The first clause is the headline outcome; the rest stays on the case page.
            // zh separates clauses with "｜", en with " | ".
            const outcome = item.impact.split(/\s*[｜|]\s*/)[0];
            return (
              <li key={item.id} className={`${styles.poster} scroll-rise`}>
                <a
                  className={styles.link}
                  href={casePath(locale, item.id)}
                  aria-label={`${cases.readLabel}: ${item.title}`}
                >
                  {poster ? (
                    <Image
                      src={poster}
                      alt=""
                      {...CASE_POSTER_SIZE}
                      sizes="(max-width: 767px) 78vw, (max-width: 1023px) 45vw, 22vw"
                      className={styles.image}
                    />
                  ) : null}
                  <span className={styles.copy}>
                    <span className={styles.meta}>{item.org}</span>
                    <span className={styles.outcome}>
                      <KeepTogether text={outcome} />
                    </span>
                    <span className={styles.title}>
                      <KeepTogether text={item.title} title />
                    </span>
                    <ArrowUpRightIcon
                      className={styles.arrow}
                      size={20}
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
