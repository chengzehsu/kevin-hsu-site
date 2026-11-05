import { listedCases, orderCases } from "@/lib/cases";
import type { CaseStudy, SectionProps } from "@/content/types";
import { caseArtifacts } from "@/content/caseArtifacts";
import { casePath, portfolioPath } from "@/lib/locale";
import { srcSetFor } from "@/lib/responsive-image";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Contact } from "./Contact";
import { CaseArticle } from "./CaseArticle";
import { CaseArtifact } from "./CaseArtifact";
import { CaseBackdrop } from "./CaseBackdrop";
import { CaseBack } from "./CaseBack";
import { CaseDetails } from "./CaseDetails";
import { CaseHeadlineFigure } from "./CaseHeadlineFigure";
import { CaseShare } from "./CaseShare";
import { HashScroll } from "./HashScroll";
import { KeepTogether } from "./KeepTogether";
import styles from "./CasePage.module.css";

const COPY = {
  zh: { next: "下一個案例", read: "繼續看", scenarios: "三個功能，對應三種情境" },
  en: { next: "Next case study", read: "Read next", scenarios: "Three functions, three situations" },
} as const;

/**
 * The first screen answers value and capability; the rest follows without a click, so nobody misses it:
 * problem, decision, result, what was built, then the full story if any.
 */
export function CasePage({
  item,
  content,
  locale,
}: SectionProps & { item: CaseStudy }) {
  const cases = content.cases;
  const copy = COPY[locale];
  const listed = orderCases(listedCases(cases.items));
  // An unlisted case still leads into the list, starting from its first case.
  const ordered = listed.some((entry) => entry.id === item.id) ? listed : [item, ...listed];
  const position = ordered.findIndex((entry) => entry.id === item.id);
  const next = ordered[(position + 1) % ordered.length];
  const artifact = caseArtifacts[locale][item.id];
  const nextArtifact = caseArtifacts[locale][next.id];
  const back = `${portfolioPath(locale)}#${item.id}`;
  // Role, scope, and team sit beside the headline: a hiring manager's first question.
  // A case with scenarios already fills the first screen, so these open its process section instead.
  const facts = (
    <dl className={styles.facts}>
      <div>
        <dt>{cases.roleLabel}</dt>
        <dd>{item.role}</dd>
      </div>
      <div>
        <dt>{cases.scopeLabel}</dt>
        <dd>
          <KeepTogether text={item.scope} />
        </dd>
      </div>
      <div>
        <dt>{cases.collaborationLabel}</dt>
        <dd>{item.collaboration}</dd>
      </div>
    </dl>
  );

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
              <CaseBack
                href={back}
                label={cases.backLabel}
                locale={locale}
                className={styles.back}
              />
              <div className={styles.heroGrid}>
                <div className={styles.heroCopy}>
                  <p className={styles.eyebrow}>
                    <span>
                      {item.org}
                      <span aria-hidden="true"> · </span>
                      {item.period}
                    </span>
                  </p>
                  <h1
                    className={styles.title}
                    data-long={
                      item.title.length > (locale === "zh" ? 24 : 70)
                        ? ""
                        : undefined
                    }
                  >
                    <KeepTogether text={item.title} title />
                  </h1>
                  {artifact ? (
                    <CaseHeadlineFigure
                      headline={artifact.headline}
                      size="hero"
                      className={styles.heroFigure}
                    />
                  ) : (
                    <p className={styles.impact}>{item.impact}</p>
                  )}
                  <p className={styles.measureNote}>
                    {item.measurementSummary}
                  </p>
                  <p className={styles.ownership}>
                    <span>{cases.decisionLabel}</span>
                    {item.decisionSummary}
                  </p>
                </div>
                <div className={styles.heroVisual}>
                  <CaseArtifact
                    caseId={item.id}
                    locale={locale}
                    variant="cover"
                    eager
                    sizes="(max-width: 1023px) 92vw, 46vw"
                  />
                </div>
              </div>
              {item.scenarios?.length ? (
                <div id="scenarios" className={styles.scenarios}>
                  <h2>{copy.scenarios}</h2>
                  <ul>
                    {item.scenarios.map((scenario) => (
                      <li key={scenario.name}>
                        <strong>{scenario.name}</strong>
                        <p>{scenario.stuck}</p>
                        <p data-now>{scenario.now}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div className={styles.capabilities}>
                <div>
                  <h2>{cases.capabilityLabels.used}</h2>
                  <ul>
                    {item.capabilities.used.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {item.scenarios?.length ? null : facts}
            </div>
          </header>

          <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
            <div className={styles.process} data-case-process>
              {item.scenarios?.length ? facts : null}
              <CaseDetails item={item} content={content} locale={locale} />
              {item.article ? (
                <CaseArticle article={item.article} locale={locale} />
              ) : null}
              <p className={styles.processOwnership}>
                <span>{cases.ownershipLabel}</span>
                {item.ownership}
              </p>
            </div>

            <a
              className={`${styles.next} scroll-rise`}
              href={casePath(locale, next.id)}
            >
              <span className={styles.nextCopy}>
                <span className={styles.nextLabel}>{copy.next}</span>
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
                    srcSet={srcSetFor(nextArtifact.src)}
                    sizes="(max-width: 1023px) 92vw, 560px"
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
              <CaseBack
                href={back}
                label={cases.backLabel}
                locale={locale}
                className={styles.textLink}
              />
              <CaseShare href={casePath(locale, item.id)} labels={cases} />
            </div>
          </div>
        </article>
        <Contact content={content} locale={locale} />
      </main>
      <Footer content={content} locale={locale} />
      <HashScroll />
    </>
  );
}
