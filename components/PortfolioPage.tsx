import { localePath, type Locale } from "@/lib/locale";
import { getContent } from "@/content";
import { Nav } from "./Nav";
import { CaseStudies } from "./CaseStudies";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { HashScroll } from "./HashScroll";
import styles from "./PortfolioPage.module.css";

const portfolioCopy = {
  zh: {
    eyebrow: "Product Manager 作品集",
    edition: "SELECTED WORK / 2020—NOW",
    caseCount: "04 CASE STUDIES",
    jumpLabel: "往下看案例",
    positioning: "Senior Product Manager｜AI、資料產品與複雜營運系統",
    experienceLabel: "查看完整經歷",
    contactLabel: "聯絡我",
    title: "看懂現場問題，把產品做出來。",
    intro: "涵蓋 B2C 重構、資料產品與 AI 工具；負責問題定義、優先排序與成果驗證。",
    facts: [
      ["5+ 年", "產品相關經驗"],
      ["NT$12M+", "管理專案組合"],
      ["10+", "跨產業專案"],
      ["10+2", "帶領工程與初階 PM"],
    ],
    modelTitle: "我負責的不只是一張 Roadmap",
    model: [
      ["看清限制", "盤點使用者與營運流程，定位交付瓶頸。"],
      ["做出決策", "依商業、使用者與技術限制排優先序。"],
      ["帶動交付", "用同一份需求與決策紀錄推進跨部門交付。"],
      ["量出成果", "以產能、採用、資料規模與作業時間驗證成果。"],
    ],
  },
  en: {
    eyebrow: "Product Manager portfolio",
    edition: "SELECTED WORK / 2020—NOW",
    caseCount: "04 CASE STUDIES",
    jumpLabel: "Explore the work",
    positioning: "Senior Product Manager · AI, data, and operational products",
    experienceLabel: "View full experience",
    contactLabel: "Contact me",
    title: "Turn operating constraints into products that ship.",
    intro: "B2C re-platforming, data products, and AI tools—owning problem definition, priorities, and outcome validation.",
    facts: [
      ["5+ yrs", "product experience"],
      ["NT$12M+", "project portfolio managed"],
      ["10+", "cross-industry projects"],
      ["10+2", "engineers and junior PMs led"],
    ],
    modelTitle: "My remit goes beyond a roadmap",
    model: [
      ["Find the constraint", "Map user and operating flows to locate the delivery bottleneck."],
      ["Make the decision", "Prioritise against business, user, and technical constraints."],
      ["Move delivery", "Use shared requirements and decision records across functions."],
      ["Measure change", "Validate outcomes through capacity, adoption, data scale, and operating time."],
    ],
  },
} as const;

/** A recruiter-facing index for the work, intentionally separate from the resume narrative. */
export function PortfolioPage({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const copy = portfolioCopy[locale];
  const props = { content, locale };
  const experienceHref = `${localePath(locale)}#experience`;

  return (
    <>
      <Nav {...props} page="portfolio" />
      <main id="main-content" className={styles.portfolio}>
        <section className={styles.hero} aria-labelledby="portfolio-title">
          <div className={styles.heroGrid}>
            <div className={styles.copy}>
              <div className={styles.heroMeta}>
                <p className={styles.eyebrow}>{copy.eyebrow}</p>
                <p>{copy.edition}</p>
              </div>
              <p className={styles.positioning}>{copy.positioning}</p>
              <h1 id="portfolio-title">{copy.title}</h1>
              <p className={styles.intro}>{copy.intro}</p>
              <dl className={styles.facts}>
                {copy.facts.map(([value, label]) => (
                  <div key={label}>
                    <dt>{value}</dt>
                    <dd>{label}</dd>
                  </div>
                ))}
              </dl>
              <div className={styles.heroActions}>
                <a className={styles.primaryAction} href={content.contact.cta?.href ?? "#contact"}>{copy.contactLabel}</a>
                <a className={styles.secondaryAction} href={experienceHref}>{copy.experienceLabel}</a>
                <a className={styles.jump} href="#cases"><span>{copy.jumpLabel}</span><span aria-hidden="true">↓</span></a>
              </div>
            </div>
            <aside className={styles.model} aria-label={copy.modelTitle}>
              <p className={styles.caseCount}>{copy.caseCount}</p>
              <h2>{copy.modelTitle}</h2>
              <ol>
                {copy.model.map(([title, text], index) => (
                  <li key={title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div><strong>{title}</strong><p>{text}</p></div>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </section>
        <CaseStudies {...props} />
        <Contact {...props} />
      </main>
      <Footer {...props} />
      <HashScroll />
    </>
  );
}
