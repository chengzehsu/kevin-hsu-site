import { Fragment } from "react";
import { localePath, type Locale } from "@/lib/locale";
import { getContent } from "@/content";
import { Nav } from "./Nav";
import { CaseStudies } from "./CaseStudies";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { HashScroll } from "./HashScroll";
import { PortfolioWall } from "./PortfolioWall";
import styles from "./PortfolioPage.module.css";

const portfolioCopy = {
  zh: {
    positioning: "Product Manager｜AI、資料產品與複雜營運系統",
    experienceLabel: "查看完整經歷",
    contactLabel: "聯絡我",
    // Phrases never break internally, so 瓶頸 cannot split across lines.
    title: ["每個案例，", "從瓶頸", "到上線成果。"],
    intro:
      "4 個工作案例＋2 個個人專案；我負責問題定義、優先排序與成果驗證。",
    facts: [
      ["5+ 年", "產品相關經驗"],
      ["NT$1,200 萬+", "管理專案組合"],
      ["8 段", "跨產業經歷"],
      ["12 人", "帶領團隊（工程 10、PM 2）"],
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
    positioning: "Product Manager · AI, data, and operational products",
    experienceLabel: "View full experience",
    contactLabel: "Contact me",
    title: ["Every case,", "from bottleneck", "to shipped result."],
    intro:
      "4 work cases + 2 side projects. I own problem definition, priorities, and outcome validation.",
    facts: [
      ["5+ yrs", "product experience"],
      ["NT$12M+", "project portfolio managed"],
      ["8", "roles across industries"],
      ["12", "people led (10 engineers, 2 PMs)"],
    ],
    modelTitle: "My scope goes beyond a roadmap",
    model: [
      [
        "Find the constraint",
        "Map user and operating flows to locate the delivery bottleneck.",
      ],
      [
        "Make the decision",
        "Prioritize against business, user, and technical constraints.",
      ],
      [
        "Drive delivery",
        "Use shared requirements and decision records across functions.",
      ],
      [
        "Measure change",
        "Validate outcomes through capacity, adoption, data scale, and operating time.",
      ],
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
          <PortfolioWall />
          <div className={styles.heroGrid}>
            <div className={styles.copy}>
              <p className={styles.positioning}>{copy.positioning}</p>
              <h1 id="portfolio-title">
                {copy.title.map((phrase, index) => (
                  <Fragment key={phrase}>
                    {index > 0 && locale === "en" ? " " : null}
                    <span className={styles.phrase}>{phrase}</span>
                  </Fragment>
                ))}
              </h1>
              <p className={styles.intro}>{copy.intro}</p>
              <div className={styles.heroActions}>
                <a
                  className={styles.primaryAction}
                  href={content.contact.cta?.href ?? "#contact"}
                >
                  {copy.contactLabel}
                </a>
                <a className={styles.secondaryAction} href={experienceHref}>
                  {copy.experienceLabel}
                </a>
              </div>
            </div>
          </div>
          <dl className={styles.facts}>
            {copy.facts.map(([value, label]) => (
              <div key={label}>
                <dt>{value}</dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>
        </section>
        {/* The remit band: the same four moves every case page walks through, stated once up front. */}
        <section
          className={styles.model}
          aria-labelledby="portfolio-model-title"
        >
          <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
            <h2 id="portfolio-model-title" className="scroll-rise">
              {copy.modelTitle}
            </h2>
            <ol>
              {copy.model.map(([title, text], index) => (
                <li key={title} className="scroll-rise">
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
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
