import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { getContent } from "@/content";
import { resumeContent } from "@/content/resume";
import {
  casePath,
  localePath,
  portfolioPath,
  SITE_ORIGIN,
  type Locale,
} from "@/lib/locale";
import { BrandMark } from "./BrandSignature";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { PrintButton } from "./PrintButton";
import styles from "./ResumePage.module.css";
import { TBullets, TText } from "./Tailored";

/**
 * A résumé an HR reader can scan top to bottom, in the site's own language: the results strip from home,
 * then a rail where the date leads. Every result links to the case page that holds the detail.
 * The same page prints to A4 with the same structure, so there is only one résumé to maintain.
 */
export function ResumePage({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const resume = resumeContent[locale];
  const props = { content, locale };
  const caseById = new Map(content.cases.items.map((item) => [item.id, item]));
  const email = content.contact.cta?.href;
  const linkedin = content.contact.links.find(
    (link) => link.label === "LinkedIn",
  );
  const website = `${SITE_ORIGIN}${localePath(locale)}`;
  const separator = locale === "zh" ? "：" : ": ";
  const separatorList = locale === "zh" ? "、" : ", ";

  const detailLink = (id: string, withTitle: boolean) => {
    const item = caseById.get(id);
    if (!item) return null;
    return (
      <a key={id} href={casePath(locale, id)} className={styles.detail}>
        {withTitle
          ? `${resume.detailLabel}${separator}${item.title}`
          : resume.detailLabel}
        <ArrowRightIcon size={14} aria-hidden="true" />
      </a>
    );
  };

  return (
    <>
      <Nav {...props} page="resume" />
      <main id="main-content" className={styles.page}>
        <article className={styles.sheet} aria-labelledby="resume-name">
          <header className={styles.header}>
            <div className={styles.identity}>
              <BrandMark className={styles.mark} />
              <p className={styles.kicker}>{resume.title}</p>
              <h1 id="resume-name">{resume.name}</h1>
              <p className={styles.headline} data-v="">
                <TText k="resume.headline" locale={locale}>{resume.headline}</TText>
              </p>
            </div>
            <ul className={styles.contacts}>
              {email ? (
                <li>
                  <a href={email}>{email.replace(/^mailto:/, "")}</a>
                </li>
              ) : null}
              {linkedin ? (
                <li>
                  <a
                    href={linkedin.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.screenOnly}>{linkedin.label}</span>
                    <span className={styles.printOnly}>
                      {linkedin.href.replace(/^https:\/\/www\./, "").replace(/\/$/, "")}
                    </span>
                  </a>
                </li>
              ) : null}
              <li>
                <a href={localePath(locale)}>
                  <span className={styles.screenOnly}>{resume.websiteLabel}</span>
                  <span className={styles.printOnly}>
                    {website.replace(/^https:\/\//, "").replace(/\/$/, "")}
                  </span>
                </a>
              </li>
            </ul>
            <div className={styles.actions}>
              <PrintButton
                label={resume.printLabel}
                hint={resume.printHint}
                className={styles.primary}
              />
              <a href={portfolioPath(locale)} className={styles.secondary}>
                {resume.portfolioLabel}
              </a>
            </div>
          </header>

          <section className={styles.section} aria-labelledby="resume-summary">
            <h2 id="resume-summary">{resume.sections.summary}</h2>
            <p className={styles.summary} data-v="">
              <TText k="resume.summary" locale={locale}>{resume.summary}</TText>
            </p>
            <ul className={styles.results}>
              {resume.summaryPoints.map((point) => (
                <li key={point.label}>
                  <p className={styles.figure}>{point.figure}</p>
                  <p className={styles.figureLabel}>{point.label}</p>
                  <p className={styles.figureNote}>{point.note}</p>
                </li>
              ))}
            </ul>
          </section>

          <section
            className={styles.section}
            aria-labelledby="resume-experience"
          >
            <h2 id="resume-experience">{resume.sections.experience}</h2>
            <ol className={styles.roles}>
              {content.experience.items.map((role) => {
                return (
                  <li key={role.id} className={styles.role}>
                    <p className={styles.period}>{role.period}</p>
                    <div className={styles.roleBody}>
                      <h3>
                        {role.role}
                        <span className={styles.org}>{role.org}</span>
                      </h3>
                      {role.summary ? <p className={styles.muted}>{role.summary}</p> : null}
                      <ul className={styles.bullets} data-v="">
                        <TBullets id={role.id} bullets={role.bullets} locale={locale} leadClassName={styles.lead} />
                      </ul>
                      {resume.roleCases[role.id] ? (
                        <p className={styles.roleLinks}>
                          {resume.roleCases[role.id].map((id) =>
                            detailLink(id, true),
                          )}
                        </p>
                      ) : null}
                      {role.gapAfter ? <p className={styles.gap}>{role.gapAfter}</p> : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          <section className={`${styles.section} ${styles.keepWhole}`} aria-labelledby="resume-skills">
            <h2 id="resume-skills">{resume.sections.skills}</h2>
            <div data-v="">
              <TText k="resume.keywords" locale={locale}>
                <dl className={styles.skills}>
                  {resume.skills.map((group) => (
                    <div key={group.label}>
                      <dt>{group.label}</dt>
                      <dd>{group.items.join(separatorList)}</dd>
                    </div>
                  ))}
                </dl>
              </TText>
            </div>
          </section>

          <section className={`${styles.section} ${styles.keepWhole}`} aria-labelledby="resume-education">
            <h2 id="resume-education">{resume.sections.education}</h2>
            <div className={styles.education}>
              <p className={styles.period}>{resume.education.period}</p>
              <p className={styles.school}>
                {resume.education.school}
                <span className={styles.org}>{resume.education.detail}</span>
              </p>
            </div>
          </section>

          <p className={styles.more}>
            {resume.moreText}
            <a href={portfolioPath(locale)} className={styles.detail}>
              {resume.portfolioLabel}
              <ArrowRightIcon size={14} aria-hidden="true" />
            </a>
          </p>
        </article>
      </main>
      <Footer {...props} />
    </>
  );
}
