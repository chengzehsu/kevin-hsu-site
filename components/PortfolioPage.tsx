import { Fragment } from "react";
import { type Locale } from "@/lib/locale";
import { getContent } from "@/content";
import { Nav } from "./Nav";
import { CaseStudies } from "./CaseStudies";
import { LinkedInPosts } from "./LinkedInPosts";
import { PortfolioWall } from "./PortfolioWall";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { HashScroll } from "./HashScroll";
import styles from "./PortfolioPage.module.css";

const portfolioCopy = {
  zh: {
    positioning: "Senior Product Manager｜平台重構與內部系統",
    // Phrases never break internally, so 痛點 cannot split across lines.
    title: ["每個案例，", "從痛點", "到上線成果。"],
    intro: "我負責找出問題、決定先做什麼，並驗證做出來有沒有效。",
  },
  en: {
    positioning:
      "Senior Product Manager · Platform rebuilds and internal systems",
    title: ["Every case,", "from bottleneck", "to shipped result."],
    intro: "I own problem definition, priorities, and outcome validation.",
  },
} as const;

/** The page that holds the evidence: every case as a card, then the AI work that has no case of its own. */
export function PortfolioPage({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const copy = portfolioCopy[locale];
  const props = { content, locale };

  return (
    <>
      <Nav {...props} page="portfolio" />
      <main id="main-content" className={styles.portfolio}>
        <section className={styles.hero} aria-labelledby="portfolio-title">
          <PortfolioWall locale={locale} />
          <div className={`${styles.heroGrid} px-4 sm:px-6 lg:px-8`}>
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
            </div>
          </div>
        </section>
        <CaseStudies {...props} />
        <LinkedInPosts {...props} />
        <Contact {...props} />
      </main>
      <Footer {...props} />
      <HashScroll />
    </>
  );
}
