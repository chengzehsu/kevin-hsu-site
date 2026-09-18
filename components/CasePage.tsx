import type { CaseStudy, SectionProps } from "@/content/types";
import { casePath, localePath } from "@/lib/locale";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Contact } from "./Contact";
import { CaseDetails } from "./CaseDetails";
import { CaseShare } from "./CaseShare";
import styles from "./CaseStudies.module.css";

export function CasePage({ item, content, locale }: SectionProps & { item: CaseStudy }) {
  const back = localePath(locale, `${locale === "zh" ? "?lang=zh" : ""}#${item.id}`);
  return (
    <>
      <Nav content={content} locale={locale} caseId={item.id} />
      <main>
        <article className={styles.page}>
          <a href={back} className={styles.textLink}><span aria-hidden="true">←</span>{content.cases.backLabel}</a>
          <header className={styles.pageHeader}>
            <p className={styles.meta}>{item.org}<span aria-hidden="true"> · </span>{item.period}</p>
            <h1>{item.title}</h1>
            <p className={styles.impact}>{item.impact}</p>
            <p className={styles.ownership}><span>{content.cases.ownershipLabel}</span>{item.ownership}</p>
          </header>
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
