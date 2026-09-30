import type { CaseStudy, SectionProps } from "@/content/types";
import { caseArtifacts } from "@/content/caseArtifacts";
import { casePath, portfolioPath } from "@/lib/locale";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Contact } from "./Contact";
import { CaseArtifact } from "./CaseArtifact";
import { CaseBackdrop } from "./CaseBackdrop";
import { CaseDetails, CASE_CHAPTERS } from "./CaseDetails";
import { CaseHeadlineFigure } from "./CaseHeadlineFigure";
import { CaseNavigator } from "./CaseNavigator";
import { CaseShare } from "./CaseShare";
import { KeepTogether } from "./KeepTogether";
import styles from "./CasePage.module.css";

const COPY = {
  zh: { caseLabel: "案例", next: "下一個案例", read: "繼續看" },
  en: { caseLabel: "Case", next: "Next case", read: "Read next" },
} as const;

/** A case told as a launch: outcome first, then problem, decision, what was built, and how it was measured. */
export function CasePage({
  item,
  content,
  locale,
}: SectionProps & { item: CaseStudy }) {
  const cases = content.cases;
  const copy = COPY[locale];
  const ordered = [...cases.items].sort((a, b) => a.rank - b.rank);
  const position = ordered.findIndex((entry) => entry.id === item.id);
  const next = ordered[(position + 1) % ordered.length];
  const artifact = caseArtifacts[locale][item.id];
  const nextArtifact = caseArtifacts[locale][next.id];
  const back = `${portfolioPath(locale)}#${item.id}`;
  const pad = (value: number) => String(value).padStart(2, "0");
  const chapters = CASE_CHAPTERS[locale];

  return (
    <>
      <Nav content={content} locale={locale} caseId={item.id} />
      <main id="main-content" className={styles.main}>
        <article>
          <header className={styles.hero}>
            <CaseBackdrop
              lead={[
                artifact?.src,
                ...(artifact?.stills ?? []).map((still) => still.src),
              ]}
            />
            <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
              <a href={back} className={styles.back}>
                <ArrowLeftIcon size={16} weight="bold" aria-hidden="true" />
                {cases.backLabel}
              </a>
              <div className={styles.heroGrid}>
                <div className={styles.heroCopy}>
                  <p className={styles.eyebrow}>
                    <span>
                      {copy.caseLabel} {pad(position + 1)} /{" "}
                      {pad(ordered.length)}
                    </span>
                    <span>
                      {item.org}
                      <span aria-hidden="true"> · </span>
                      {item.period}
                    </span>
                  </p>
                  <h1 className={styles.title}>
                    <KeepTogether text={item.title} title />
                  </h1>
                  <p className={styles.ownership}>
                    <span>{cases.ownershipLabel}</span>
                    {item.ownership}
                  </p>
                </div>
                {artifact ? (
                  <CaseHeadlineFigure
                    headline={artifact.headline}
                    size="hero"
                    className={styles.heroFigure}
                  />
                ) : (
                  <p className={styles.impact}>{item.impact}</p>
                )}
              </div>
            </div>
          </header>

          <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
            <div className={styles.plate}>
              <CaseArtifact
                caseId={item.id}
                locale={locale}
                eager
                sizes="(max-width: 767px) 92vw, (max-width: 1200px) 90vw, 74rem"
              />
            </div>

            <dl className={`${styles.facts} scroll-rise`}>
              <div>
                <dt>{cases.roleLabel}</dt>
                <dd>{item.role}</dd>
              </div>
              <div>
                <dt>{cases.scopeLabel}</dt>
                <dd>{item.scope}</dd>
              </div>
              <div>
                <dt>{cases.collaborationLabel}</dt>
                <dd>{item.collaboration}</dd>
              </div>
            </dl>

            <CaseNavigator
              label={item.title}
              links={[
                { href: "#situation", label: chapters.problem },
                { href: "#decision", label: chapters.decision },
                { href: "#artifacts", label: chapters.built },
                { href: "#result", label: chapters.result },
                { href: "#measurement", label: cases.measurementLabel },
              ]}
            />

            <CaseDetails item={item} content={content} locale={locale} />

            <a
              className={`${styles.next} scroll-rise`}
              href={casePath(locale, next.id)}
            >
              <span className={styles.nextCopy}>
                <span className={styles.nextLabel}>
                  {copy.next}
                  <span aria-hidden="true"> · </span>
                  {pad(ordered.indexOf(next) + 1)} / {pad(ordered.length)}
                </span>
                <strong className={styles.nextTitle}>
                  <KeepTogether text={next.title} title />
                </strong>
                <span className={styles.nextImpact}>
                  <KeepTogether text={next.impact} />
                </span>
                <span className={styles.nextAction}>
                  {copy.read}
                  <ArrowRightIcon size={18} weight="bold" aria-hidden="true" />
                </span>
              </span>
              {nextArtifact ? (
                <span className={styles.nextVisual} aria-hidden="true">
                  <img
                    src={nextArtifact.src}
                    alt=""
                    width={1200}
                    height={674}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
              ) : null}
            </a>

            <div className={styles.pageFooter}>
              <a href={back} className={styles.textLink}>
                <ArrowLeftIcon size={16} weight="bold" aria-hidden="true" />
                {cases.backLabel}
              </a>
              <CaseShare href={casePath(locale, item.id)} labels={cases} />
            </div>
          </div>
        </article>
        <Contact content={content} locale={locale} />
      </main>
      <Footer content={content} locale={locale} />
    </>
  );
}
