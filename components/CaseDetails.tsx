import type { CaseStudy, SectionProps } from "@/content/types";
import type { Locale } from "@/lib/locale";
import { caseArtifacts } from "@/content/caseArtifacts";
import { caseEvidence } from "@/content/caseEvidence";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Highlight } from "./Highlight";
import { CaseEvidence } from "./CaseEvidence";
import { CaseFilm } from "./CaseFilm";
import styles from "./CasePage.module.css";

export const CASE_CHAPTERS: Record<
  Locale,
  {
    problem: string;
    decision: string;
    built: string;
    result: string;
  }
> = {
  zh: {
    problem: "問題",
    decision: "決策",
    built: "做出來的東西",
    result: "成果",
  },
  en: {
    problem: "Problem",
    decision: "Decision",
    built: "What was built",
    result: "Result",
  },
};

function ChapterHead({ number, title }: { number: string; title: string }) {
  return (
    <h2 className={styles.chapterHead}>
      <span className={styles.chapterNumber}>{number}</span>
      <span>{title}</span>
    </h2>
  );
}

/** The case story in four chapters. Every block is server rendered; motion is CSS only. */
export function CaseDetails({
  item,
  content,
  locale,
}: SectionProps & { item: CaseStudy }) {
  const { columns } = content.cases;
  const chapters = CASE_CHAPTERS[locale];
  const artifact = caseArtifacts[locale][item.id];
  const stills = artifact?.stills ?? [];
  const features = content.awards.items.filter(
    (award) => award.kind === "feature" && award.caseId === item.id,
  );

  return (
    <div className={styles.story}>
      {/* 01 Problem: the situation reads as one statement; the constraint is called out beside it. */}
      <div className={`${styles.chapter} ${styles.problem}`}>
        <ChapterHead number="01" title={chapters.problem} />
        <div className={styles.chapterBody}>
          <div id="situation" className={`${styles.block} scroll-rise`}>
            <h3 className={styles.label}>{columns.situation}</h3>
            <p className={styles.statement}>
              <Highlight>{item.situation}</Highlight>
            </p>
          </div>
          <div id="bottleneck" className={`${styles.bottleneck} scroll-rise`}>
            <h3 className={styles.label}>{columns.bottleneck}</h3>
            <p>
              <Highlight>{item.bottleneck}</Highlight>
            </p>
          </div>
        </div>
      </div>

      {/* 02 Decision: one idea, set large. */}
      <div className={`${styles.chapter} ${styles.decisionChapter}`}>
        <ChapterHead number="02" title={chapters.decision} />
        <div className={styles.chapterBody}>
          <div id="decision" className={`${styles.block} scroll-rise`}>
            <h3 className={styles.label}>{columns.decision}</h3>
            <p className={styles.quote}>
              <Highlight>{item.decision}</Highlight>
            </p>
          </div>
          <div id="hypothesis" className={`${styles.execution} scroll-rise`}>
            <h3 className={styles.label}>{columns.hypothesis}</h3>
            <p>
              <Highlight>{item.hypothesis}</Highlight>
            </p>
          </div>
        </div>
      </div>

      {/* 03 What was built: the work products, then the frames that show them. */}
      <div className={`${styles.chapter} ${styles.built}`}>
        <ChapterHead number="03" title={chapters.built} />
        <div className={styles.chapterBody}>
          <div id="artifacts" className={`${styles.block} scroll-rise`}>
            <h3 className={styles.label}>{content.cases.artifactsLabel}</h3>
            <ol className={styles.deliverables}>
              {item.artifacts.map((entry, index) => (
                <li key={entry}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{entry}</strong>
                </li>
              ))}
            </ol>
          </div>
          {item.id === "grocery" ? (
            <div className="scroll-rise">
              <CaseFilm locale={locale} label={content.cases.filmLabel} />
            </div>
          ) : null}
          {stills.length ? (
            <ul className={styles.stills} data-count={stills.length}>
              {stills.map((still) => (
                <li key={still.src} className="scroll-rise">
                  <figure>
                    <img
                      src={still.src}
                      alt={still.alt}
                      width={still.width}
                      height={still.height}
                      loading="lazy"
                      decoding="async"
                    />
                    <figcaption>{still.caption}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          ) : null}
          {item.source ? (
            <a
              className={styles.feature}
              href={item.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{item.title}</span>
              <strong>{content.cases.sourceLabel}</strong>
              <ArrowUpRightIcon size={18} weight="bold" aria-hidden="true" />
            </a>
          ) : null}
          {features.map((award) => (
            <a
              key={award.id}
              className={styles.feature}
              href={award.link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{award.title}</span>
              <strong>{award.link.label}</strong>
              <ArrowUpRightIcon size={18} weight="bold" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      {/* 04 Result: the claim, the chart that proves it, and how it was measured. */}
      <div className={`${styles.chapter} ${styles.resultChapter}`}>
        <ChapterHead number="04" title={chapters.result} />
        <div className={styles.chapterBody}>
          <div id="result" className={`${styles.block} scroll-rise`}>
            <h3 className={styles.label}>{columns.result}</h3>
            <p className={styles.statement}>
              <Highlight>{item.result}</Highlight>
            </p>
          </div>
          {caseEvidence[locale][item.id] ? (
            <div id="evidence" className={`${styles.evidence} scroll-rise`}>
              <CaseEvidence caseId={item.id} locale={locale} />
            </div>
          ) : null}
          <div id="measurement" className={styles.measurement}>
            <h3 className={styles.label}>{content.cases.measurementLabel}</h3>
            <p>{item.measurement}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
