import type { CaseStudy, SectionProps } from "@/content/types";
import { Highlight } from "./Highlight";
import { CaseEvidence } from "./CaseEvidence";
import { CaseNavigator } from "./CaseNavigator";
import { Reveal } from "./motion/Reveal";
import styles from "./CaseNavigator.module.css";

type ColumnKey = "situation" | "bottleneck" | "hypothesis" | "result";
const COLUMN_ORDER: ColumnKey[] = ["situation", "bottleneck", "hypothesis", "result"];

function caseMeta(item: CaseStudy): string {
  return [item.org, item.period].filter(Boolean).join(" · ");
}

export function CaseStudies({ content, locale }: SectionProps) {
  const { title, columns, items } = content.cases;
  const orderedItems = [...items].sort((a, b) => a.rank - b.rank);

  return (
    <section id="cases" className="cases-section content-section">
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">{title}</h2>

        <CaseNavigator title={title} items={orderedItems} />

        <div className="mt-10">
          {orderedItems.map((item, i) => {
            const meta = caseMeta(item);
            return (
              <Reveal key={item.id}>
                <article
                  id={item.id}
                  className={`case-study case-study-${i + 1} ${i === 0 ? styles.flagshipCase : ""}`}
                >
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                    <div className="case-heading self-start lg:sticky lg:top-28 lg:col-span-4">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      {meta ? <p className="mt-2 text-sm text-muted">{meta}</p> : null}
                      <p className="case-impact mt-6">
                        <Highlight>{item.impact}</Highlight>
                      </p>
                      <p className="case-ownership">
                        <span>{content.cases.ownershipLabel}</span>
                        {item.ownership}
                      </p>
                      <CaseEvidence caseId={item.id} locale={locale} />
                    </div>

                    <div className="case-evidence grid grid-cols-1 content-start gap-x-8 gap-y-7 sm:grid-cols-2 lg:col-span-8">
                      {COLUMN_ORDER.map((key) => (
                        <div key={key} className={key === "result" ? "case-result" : undefined}>
                          <h4 className="text-sm font-medium">{columns[key]}</h4>
                          <p className={`mt-1 ${key === "result" ? "text-fg" : "text-muted"}`}>
                            <Highlight>{item[key]}</Highlight>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
