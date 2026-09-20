import type { CaseStudy, SectionProps } from "@/content/types";
import { casePath, portfolioPath } from "@/lib/locale";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Contact } from "./Contact";
import { CaseDetails } from "./CaseDetails";
import { CaseShare } from "./CaseShare";
import styles from "./CaseStudies.module.css";

export function CasePage({ item, content, locale }: SectionProps & { item: CaseStudy }) {
  const back = `${portfolioPath(locale)}#${item.id}`;
  return (
    <>
      <Nav content={content} locale={locale} caseId={item.id} />
      <main id="main-content">
        <article className={styles.page}>
          <a href={back} className={styles.textLink}><span aria-hidden="true">←</span>{content.cases.backLabel}</a>
          <header className={styles.pageHeader}>
            <span className={styles.pageIndex} aria-hidden="true">{String(item.rank).padStart(2, "0")}</span>
            <p className={styles.meta}>{item.org}<span aria-hidden="true"> · </span>{item.period}</p>
            <h1>{item.title}</h1>
            <p className={styles.impact}>{item.impact}</p>
            <p className={styles.ownership}><span>{content.cases.ownershipLabel}</span>{item.ownership}</p>
            <dl className={styles.pageFacts}>
              <div><dt>{content.cases.roleLabel}</dt><dd>{item.role}</dd></div>
              <div><dt>{content.cases.scopeLabel}</dt><dd>{item.scope}</dd></div>
              <div><dt>{content.cases.collaborationLabel}</dt><dd>{item.collaboration}</dd></div>
            </dl>
          </header>
          <nav className={styles.caseToc} aria-label={content.cases.title}>
            <a href="#situation">{content.cases.columns.situation}</a>
            <a href="#decision">{content.cases.columns.decision}</a>
            <a href="#result">{content.cases.columns.result}</a>
            <a href="#measurement">{content.cases.measurementLabel}</a>
          </nav>
          <CaseDetails item={item} content={content} locale={locale} headingLevel={2} />
          <div className={styles.pageFooter}>
            <a href={back} className={styles.textLink}><span aria-hidden="true">←</span>{content.cases.backLabel}</a>
            <CaseShare href={casePath(locale, item.id)} labels={content.cases} />
          </div>
        </article>
        <Contact content={content} locale={locale} />
      </main>
      <Footer content={content} locale={locale} />
    </>
  );
}
