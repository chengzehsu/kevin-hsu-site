import { Fragment } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { getContent } from "@/content";
import { resumeContent } from "@/content/resume";
import { skillsContent } from "@/content/skills";
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
import { TBullets, TOrder, TText } from "./Tailored";

/**
 * A plain, one-column résumé an HR reader can scan top to bottom; every result links to the case page
 * that holds the detail. The same page prints to a clean A4 PDF, so there is only one résumé to maintain.
 */
export function ResumePage({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const resume = resumeContent[locale];
  const props = { content, locale };
  const caseById = new Map(content.cases.items.map((item) => [item.id, item]));
  const work = content.cases.items
    .filter((item) => !item.kind)
    .sort((a, b) => a.rank - b.rank);
  const side = content.cases.items
    .filter((item) => item.kind === "side")
    .sort((a, b) => a.rank - b.rank);
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

          <dl className={styles.facts}>
            {resume.facts.map(([value, label]) => (
              <div key={label}>
                <dt>{value}</dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>

          <section className={styles.section} aria-labelledby="resume-summary">
            <h2 id="resume-summary">{resume.sections.summary}</h2>
            <div>
              <p className={styles.summary} data-v="">
                <TText k="resume.summary" locale={locale}>{resume.summary}</TText>
              </p>
              <p className={styles.keywords} data-v="">
                <TText k="resume.keywords" locale={locale}>{resume.keywords}</TText>
              </p>
            </div>
          </section>

          <section
            className={styles.section}
            aria-labelledby="resume-highlights"
          >
            <h2 id="resume-highlights">{resume.sections.highlights}</h2>
            <ul className={styles.highlights} data-v="">
              <TOrder list="cases" ids={work.map((item) => item.id)} locale={locale}>
              {work.map((item) => (
                <li key={item.id}>
                  <strong className={styles.figure}>
                    {resume.figures[item.id]}
                  </strong>
                  <div>
                    <p className={styles.highlightTitle}>{item.title}</p>
                    <p className={styles.muted}>
                      {item.impact}
                      <span aria-hidden="true">
                        {locale === "zh" ? "｜" : " | "}
                      </span>
                      {item.org}
                    </p>
                  </div>
                  {detailLink(item.id, false)}
                </li>
              ))}
              </TOrder>
            </ul>
          </section>

          <section
            className={styles.section}
            aria-labelledby="resume-experience"
          >
            <h2 id="resume-experience">{resume.sections.experience}</h2>
            <ol className={styles.roles}>
              {content.experience.items.map((role) => (
                <Fragment key={role.id}>
                  <li className={styles.role}>
                    <p className={styles.period}>{role.period}</p>
                    <div>
                      <h3>
                        {role.role}
                        <span className={styles.org}>{role.org}</span>
                      </h3>
                      <p className={styles.muted}>{role.summary ?? role.focus}</p>
                      {role.bullets.length > 0 ? (
                        <ul className={styles.bullets} data-v="">
                          <TBullets id={role.id} bullets={role.bullets} locale={locale} />
                        </ul>
                      ) : null}
                      {resume.roleCases[role.id] ? (
                        <p className={styles.roleLinks}>
                          {resume.roleCases[role.id].map((id) =>
                            detailLink(id, true),
                          )}
                        </p>
                      ) : null}
                    </div>
                  </li>
                  {role.gapAfter ? (
                    <li className={styles.gap}>{role.gapAfter}</li>
                  ) : null}
                </Fragment>
              ))}
            </ol>
          </section>

          <section className={styles.section} aria-labelledby="resume-side">
            <h2 id="resume-side">{resume.sections.side}</h2>
            <ul className={styles.list}>
              {side.map((item) => (
                <li key={item.id}>
                  <div>
                    <p className={styles.highlightTitle}>{item.title}</p>
                    <p className={styles.muted}>{item.impact}</p>
                  </div>
                  {detailLink(item.id, false)}
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section} aria-labelledby="resume-skills">
            <h2 id="resume-skills">{resume.sections.skills}</h2>
            <dl className={styles.skills}>
              {skillsContent[locale].groups.map((group) => (
                <div key={group.kind}>
                  <dt>{group.title}</dt>
                  <dd>
                    {group.items
                      .map((skill) => skill.name)
                      .join(locale === "zh" ? "、" : ", ")}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className={styles.section} aria-labelledby="resume-awards">
            <h2 id="resume-awards">{resume.sections.awards}</h2>
            <ul className={styles.list}>
              {content.awards.items.map((award) => (
                <li key={award.id}>
                  <div>
                    <p className={styles.highlightTitle}>
                      {award.title}
                      <span className={styles.org}>{award.distinction}</span>
                    </p>
                    <p className={styles.muted}>
                      {award.kind === "award"
                        ? award.year
                        : caseById.get(award.caseId)?.period}
                    </p>
                  </div>
                  <a
                    href={
                      award.link.href.startsWith("#")
                        ? `${localePath(locale)}${award.link.href}`
                        : award.link.href
                    }
                    className={styles.detail}
                    {...(award.link.href.startsWith("#")
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {award.link.label}
                    <ArrowRightIcon size={14} aria-hidden="true" />
                  </a>
                </li>
              ))}
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
