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
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { PrintButton } from "./PrintButton";
import styles from "./ResumePage.module.css";
import { TBullets, TText } from "./Tailored";

/**
 * A plain, one-column résumé an HR reader can scan top to bottom; every result links to the case page
 * that holds the detail. The same page prints to a clean A4 PDF, so there is only one résumé to maintain.
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
            <div>
              <p className={styles.kicker}>{resume.title}</p>
              <h1 id="resume-name">{resume.name}</h1>
              <p className={styles.headline} data-v="">
                <TText k="resume.headline" locale={locale}>{resume.headline}</TText>
              </p>
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
                      {linkedin.label}
                      <span className={styles.printOnly}>
                        {separator}
                        {linkedin.href.replace(/^https:\/\/www\./, "").replace(/\/$/, "")}
                      </span>
                    </a>
                  </li>
                ) : null}
                <li>
                  <a href={localePath(locale)}>
                    {resume.websiteLabel}
                    <span className={styles.printOnly}>
                      {separator}
                      {website.replace(/^https:\/\//, "")}
                    </span>
                  </a>
                </li>
              </ul>
            </div>
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
            <div>
              <p className={styles.summary} data-v="">
                <TText k="resume.summary" locale={locale}>{resume.summary}</TText>
              </p>
            </div>
          </section>

          <section
            className={styles.section}
            aria-labelledby="resume-experience"
          >
            <h2 id="resume-experience">{resume.sections.experience}</h2>
            <ol className={styles.roles}>
              {content.experience.items.map((role) => {
                const short = resume.roles[role.id];
                const summary = short?.summary ?? role.summary ?? role.focus;
                return (
                  <li key={role.id} className={styles.role}>
                    <p className={styles.period}>{role.period}</p>
                    <div>
                      <h3>
                        {short?.role ?? role.role}
                        <span className={styles.org}>{role.org}</span>
                      </h3>
                      {summary ? <p className={styles.muted}>{summary}</p> : null}
                      <ul className={styles.bullets} data-v="">
                        <TBullets id={role.id} bullets={short?.bullets ?? role.bullets} locale={locale} />
                      </ul>
                      {resume.roleCases[role.id] ? (
                        <p className={styles.roleLinks}>
                          {resume.roleCases[role.id].map((id) =>
                            detailLink(id, true),
                          )}
                        </p>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          <section className={styles.section} aria-labelledby="resume-skills">
            <h2 id="resume-skills">{resume.sections.skills}</h2>
            <p className={styles.summary} data-v="">
              <TText k="resume.keywords" locale={locale}>{resume.skills}</TText>
            </p>
          </section>

          <section className={styles.section} aria-labelledby="resume-education">
            <h2 id="resume-education">{resume.sections.education}</h2>
            <ul className={styles.list}>
              <li>
                <div>
                  <p className={styles.highlightTitle}>
                    {resume.education.school}
                    <span className={styles.org}>{resume.education.detail}</span>
                  </p>
                  <p className={styles.muted}>{resume.education.period}</p>
                </div>
              </li>
            </ul>
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
