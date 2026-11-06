import type { CaseStudy, SectionProps } from "@/content/types";
import { caseTransition } from "@/lib/viewTransition";
import { CASE_CARD_COVERS, caseArtifacts } from "@/content/caseArtifacts";
import { caseName, fillCounts, listedCases, orderCases, WIDE_CASES } from "@/lib/cases";
import { casePath } from "@/lib/locale";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { CaseArtifact } from "./CaseArtifact";
import { CaseHeadlineFigure } from "./CaseHeadlineFigure";
import { KeepTogether } from "./KeepTogether";
import styles from "./CaseStudies.module.css";

/** Every case as one card in rank order: what it is, what it achieved, and what it took. */
export function CaseStudies({ content, locale }: SectionProps) {
  const cases = content.cases;

  return (
    <section
      id="cases"
      className={`${styles.section} content-section`}
      aria-labelledby="cases-heading"
    >
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <header className={styles.head}>
          <h2 id="cases-heading" className={`section-title ${styles.heading}`}>
            <KeepTogether
              text={fillCounts(cases.inventory, cases.items)}
              title
            />
          </h2>
          <p className={styles.lede}>{cases.intro}</p>
        </header>
        <div className={styles.grid}>
          {orderCases(listedCases(cases.items)).map(renderCard)}
        </div>
      </div>
    </section>
  );

  function renderCard(item: CaseStudy) {
    const artifact = caseArtifacts[locale][item.id];
    const wide = WIDE_CASES.includes(item.id);
    const { used } = item.capabilities;
    const cardCover = CASE_CARD_COVERS[item.id];
    return (
      <article
        id={item.id}
        key={item.id}
        className={styles.card}
        data-case-card="card"
        data-wide={wide ? "" : undefined}
      >
        <a
          className={styles.link}
          href={casePath(locale, item.id)}
          aria-label={`${cases.readLabel}: ${item.title}`}
        >
          <div className={styles.visual} style={caseTransition(item.id)}>
            <CaseArtifact
              caseId={item.id}
              locale={locale}
              variant="cover"
              image={
                cardCover && { src: cardCover.src, alt: cardCover.alt[locale] }
              }
              sizes="(max-width: 767px) 30vw, (max-width: 1023px) 50vw, 33vw"
            />
          </div>
          <div className={styles.body}>
            <div className={styles.nameRow}>
              <strong className={styles.name}>{caseName(item)}</strong>
              <ArrowUpRightIcon size={18} weight="bold" aria-hidden="true" />
            </div>
            {artifact ? (
              <CaseHeadlineFigure
                headline={{
                  ...artifact.headline,
                  delta: undefined,
                  also: undefined,
                }}
                size="compact"
                className={styles.figure}
              />
            ) : null}
            <div className={styles.capabilities}>
              <span>
                <b>{cases.capabilityLabels.cardUsed}</b>
                {used.slice(0, 2).join(locale === "zh" ? "、" : ", ")}
              </span>
            </div>
          </div>
        </a>
      </article>
    );
  }
}
