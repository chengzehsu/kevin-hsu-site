import type { CaseStudy, SectionProps } from "@/content/types";
import type { Locale } from "@/lib/locale";
import { caseArtifacts } from "@/content/caseArtifacts";
import { caseEvidence } from "@/content/caseEvidence";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { aiStoryForCase } from "@/lib/aiPractice";
import { casePath } from "@/lib/locale";
import { srcSetFor } from "@/lib/responsive-image";
import { Disclosure } from "./Disclosure";
import { Highlight } from "./Highlight";
import { CaseEvidence } from "./CaseEvidence";
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
    decision: "決定",
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

const LOG_LABELS = {
  zh: { expand: "看決定紀錄", collapse: "收合" },
  en: { expand: "See the decision log", collapse: "Collapse" },
} as const;

const RELATED_LABEL = { zh: "這個產品的其他案例", en: "Related case studies for this product" } as const;

function ChapterHead({ title }: { title: string }) {
  return <h2 className={styles.chapterHead}>{title}</h2>;
}

/** Problem, decision, result, and what was built, the same order on every case. Every block is server rendered; motion is CSS only. */
export function CaseDetails({
  item,
  content,
  locale,
}: SectionProps & { item: CaseStudy }) {
  const { columns } = content.cases;
  const chapters = CASE_CHAPTERS[locale];
  const artifact = caseArtifacts[locale][item.id];
  const stills = artifact?.stills ?? [];
  const aiStory = aiStoryForCase(content.aiPractice, item.id);
  const { labels: aiLabels } = content.aiPractice;
  const related = (item.relatedCases ?? []).flatMap((id) =>
    content.cases.items.filter((entry) => entry.id === id),
  );
  const features = content.awards.items.filter(
    (award) => award.kind === "feature" && award.caseId === item.id,
  );

  return (
    <div className={styles.story}>
          {/* Problem: the situation reads as one statement; the constraint is called out beside it. */}
          <div className={`${styles.chapter} ${styles.problem}`}>
            <ChapterHead title={chapters.problem} />
            <div className={styles.chapterBody}>
              <div id="situation" className={`${styles.block} scroll-rise`}>
                <h3 className={styles.label}>{columns.situation}</h3>
                <p className={styles.statement}>
                  <Highlight>{item.situation}</Highlight>
                </p>
              </div>
              <div
                id="bottleneck"
                className={`${styles.bottleneck} scroll-rise`}
              >
                <h3 className={styles.label}>{columns.bottleneck}</h3>
                <p>
                  <Highlight>{item.bottleneck}</Highlight>
                </p>
              </div>
            </div>
          </div>

          {/* Decision: one idea, set large. */}
          <div className={`${styles.chapter} ${styles.decisionChapter}`}>
            <ChapterHead title={chapters.decision} />
            <div className={styles.chapterBody}>
              <div id="decision" className={`${styles.block} scroll-rise`}>
                <h3 className={styles.label}>{columns.decision}</h3>
                <p className={styles.quote}>
                  <Highlight>{item.decision}</Highlight>
                </p>
              </div>
              <div
                id="hypothesis"
                className={`${styles.execution} scroll-rise`}
              >
                <h3 className={styles.label}>{columns.hypothesis}</h3>
                <p>
                  <Highlight>{item.hypothesis}</Highlight>
                </p>
              </div>
              {aiStory ? (
                <div id="ai-split" className={`${styles.execution} scroll-rise`} data-ai-split>
                  <h3 className={styles.label}>{aiLabels.ai}</h3>
                  <p>{aiStory.ai}</p>
                  <h3 className={styles.label}>{aiLabels.human}</h3>
                  <p>{aiStory.human}</p>
                </div>
              ) : null}
              {item.decisionLog?.length ? (
                <div id="decision-log" className={styles.block}>
                <Disclosure
                  kind="log"
                  expandLabel={LOG_LABELS[locale].expand}
                  collapseLabel={LOG_LABELS[locale].collapse}
                  summary={<h3 className={styles.label}>{content.cases.decisionLog.title}</h3>}
                >
                  <ol className={styles.decisionLog}>
                    {item.decisionLog.map((entry, index) => (
                      <li key={entry.call} className="scroll-rise">
                        <span className={styles.decisionIndex}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <dl>
                          <dt className="sr-only">
                            {content.cases.decisionLog.call}
                          </dt>
                          <dd className={styles.decisionCall}>{entry.call}</dd>
                          <dt>{content.cases.decisionLog.signal}</dt>
                          <dd>
                            <Highlight>{entry.signal}</Highlight>
                          </dd>
                          <dt>{content.cases.decisionLog.outcome}</dt>
                          <dd>
                            <Highlight>{entry.outcome}</Highlight>
                          </dd>
                        </dl>
                      </li>
                    ))}
                  </ol>
                </Disclosure>
              </div>
              ) : null}
            </div>
          </div>
      {/* Result: the claim, the chart that proves it, and how it was measured. */}
      <div className={`${styles.chapter} ${styles.resultChapter}`}>
        <ChapterHead title={chapters.result} />
        <div className={styles.chapterBody}>
          <div id="result" className={`${styles.block} scroll-rise`}>
            <ul className={styles.resultList}>
              {item.result.map((point) => (
                <li key={point}>
                  <Highlight>{point}</Highlight>
                </li>
              ))}
            </ul>
          </div>
          {related.length ? (
            <div className={styles.block}>
              <h3 className={styles.label}>{RELATED_LABEL[locale]}</h3>
              {related.map((entry) => (
                <a key={entry.id} className={styles.feature} href={casePath(locale, entry.id)}>
                  <span>{entry.org}</span>
                  <strong>{entry.title}</strong>
                  <ArrowUpRightIcon size={18} weight="bold" aria-hidden="true" />
                </a>
              ))}
            </div>
          ) : null}
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

      {/* What was built: the work products, then the frames that show them. */}
      <div className={`${styles.chapter} ${styles.built}`}>
        <ChapterHead title={chapters.built} />
        <div className={styles.chapterBody}>
          {item.dataMap?.length ? (
            <div id="artifacts" className={`${styles.block} scroll-rise`}>
              <h3 className={styles.label}>{content.cases.dataMap.title}</h3>
              <ol className={styles.dataMap}>
                {item.dataMap.map((row, index) => (
                  <li key={row.insight} className="scroll-rise">
                    <span className={styles.dataIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <dl>
                      <dt>{content.cases.dataMap.sources}</dt>
                      <dd className={styles.dataSources}>{row.sources}</dd>
                      <dt>{content.cases.dataMap.insight}</dt>
                      <dd className={styles.dataInsight}>{row.insight}</dd>
                    </dl>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
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
          )}
          {item.alsoDid ? (
            <div className={styles.block}>
              <h3 className={styles.label}>{item.alsoDid.title}</h3>
              <ul className={styles.alsoDid}>
                {item.alsoDid.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {stills.length ? (
            <ul className={styles.stills} data-count={stills.length}>
              {stills.map((still) => (
                <li key={still.src} className="scroll-rise">
                  <figure>
                    <img
                      src={still.src}
                      srcSet={srcSetFor(still.src)}
                      sizes={stills.length === 1 ? "(max-width: 767px) 92vw, 448px" : "(max-width: 1023px) 70vw, (max-width: 1215px) 30vw, 360px"}
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
    </div>
  );
}
