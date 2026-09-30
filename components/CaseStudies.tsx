import type { SectionProps } from "@/content/types";
import { caseArtifacts } from "@/content/caseArtifacts";
import { casePath } from "@/lib/locale";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { CaseArtifact } from "./CaseArtifact";
import { CaseHeadlineFigure } from "./CaseHeadlineFigure";
import { KeepTogether } from "./KeepTogether";
import styles from "./CaseStudies.module.css";

// Four compositions so the list reads as a sequence of launches, not one card repeated.
const LAYOUTS = ["feature", "split", "reverse", "panorama"] as const;

const COPY = {
  zh: { kicker: "作品集", decision: "我的關鍵判斷", index: "案例索引" },
  en: {
    kicker: "Portfolio",
    decision: "Key product judgment",
    index: "Case index",
  },
} as const;

export function CaseStudies({ content, locale }: SectionProps) {
  const cases = content.cases;
  const items = [...cases.items].sort((a, b) => a.rank - b.rank);
  const copy = COPY[locale];
  const total = String(items.length).padStart(2, "0");

  return (
    <section
      id="cases"
      className={`${styles.section} content-section`}
      aria-labelledby="cases-heading"
    >
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <header className={`${styles.head} scroll-rise`}>
          <p className={styles.kicker}>
            {copy.kicker}
            <span aria-hidden="true"> / </span>
            {total}
          </p>
          <h2 id="cases-heading" className={`section-title ${styles.heading}`}>
            {cases.title}
          </h2>
          <p className={styles.lede}>{cases.intro}</p>
        </header>

        <nav className={styles.index} aria-label={copy.index}>
          <ol>
            {items.map((item, index) => {
              const headline = caseArtifacts[locale][item.id]?.headline;
              return (
                <li key={item.id}>
                  <a href={`#${item.id}`}>
                    <span className={styles.indexNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.indexTitle}>{item.title}</span>
                    {headline ? (
                      <span className={styles.indexFigure}>
                        <strong className={styles.indexValue}>{headline.value}</strong>
                        {headline.unit || headline.delta ? (
                          <span className={styles.indexUnit}>
                            {[headline.unit, headline.delta].filter(Boolean).join(" ")}
                          </span>
                        ) : null}
                      </span>
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className={styles.list}>
          {items.map((item, index) => {
            const artifact = caseArtifacts[locale][item.id];
            const path = casePath(locale, item.id);
            const stills = artifact?.stills ?? [];
            const number = String(index + 1).padStart(2, "0");
            return (
              <article
                id={item.id}
                key={item.id}
                className={`${styles.row} scroll-rise`}
                data-case-card="ledger"
                data-layout={LAYOUTS[index % LAYOUTS.length]}
              >
                {/* The poster repeats the case link for pointer users; keyboard users get the labelled link below. */}
                <a
                  className={styles.visual}
                  href={path}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <span className={styles.ghostNumber}>{number}</span>
                  <CaseArtifact
                    caseId={item.id}
                    locale={locale}
                    variant="cover"
                    sizes="(max-width: 767px) 92vw, (max-width: 1023px) 88vw, 62vw"
                  />
                  {stills.length ? (
                    <span className={styles.stills}>
                      {stills.slice(0, 2).map((still) => (
                        <img
                          key={still.src}
                          src={still.src}
                          alt=""
                          width={still.width}
                          height={still.height}
                          loading="lazy"
                          decoding="async"
                        />
                      ))}
                    </span>
                  ) : null}
                </a>

                <div className={styles.body}>
                  <p className={styles.meta}>
                    <span className={styles.number}>{number}</span>
                    <span>
                      {item.org}
                      <span aria-hidden="true"> · </span>
                      {item.period}
                    </span>
                  </p>
                  <h3 className={styles.title}>
                    <KeepTogether text={item.title} title />
                  </h3>
                  {artifact ? (
                    <CaseHeadlineFigure
                      headline={artifact.headline}
                      className={styles.figure}
                    />
                  ) : (
                    <p className={styles.impact}>{item.impact}</p>
                  )}
                  <p className={styles.decision}>
                    <span>{copy.decision}</span>
                    {item.decisionSummary}
                  </p>
                  <p className={styles.proof}>
                    <span>{cases.measurementLabel}</span>
                    {item.measurementSummary}
                  </p>
                  <p className={styles.role}>
                    {item.role}
                    <span aria-hidden="true"> · </span>
                    {item.scope}
                  </p>
                  <a
                    className={styles.cta}
                    href={path}
                    aria-label={`${cases.readLabel}: ${item.title}`}
                  >
                    {cases.readLabel}
                    <ArrowUpRightIcon
                      size={18}
                      weight="bold"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
