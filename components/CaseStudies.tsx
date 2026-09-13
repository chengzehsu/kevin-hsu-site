import type { CaseStudy, SectionProps } from "@/content/types";
import { Reveal } from "./motion/Reveal";

type ColumnKey = "situation" | "bottleneck" | "hypothesis" | "result";
const COLUMN_ORDER: ColumnKey[] = ["situation", "bottleneck", "hypothesis", "result"];

function caseMeta(item: CaseStudy): string {
  return [item.org, item.period].filter(Boolean).join(" · ");
}

export function CaseStudies({ content }: SectionProps) {
  const { title, columns, items } = content.cases;

  return (
    <section id="cases" className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold md:text-3xl">{title}</h2>

        <div className="mt-10">
          {items.map((item, i) => {
            const meta = caseMeta(item);
            return (
              <Reveal key={item.id}>
                <article id={item.id} className={i === 0 ? undefined : "mt-10 border-t border-line pt-10"}>
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="self-start lg:sticky lg:top-24 lg:col-span-4">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      {meta ? <p className="mt-2 text-sm text-muted">{meta}</p> : null}
                    </div>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-8">
                      {COLUMN_ORDER.map((key) => (
                        <div key={key}>
                          <h4 className="text-sm font-medium">{columns[key]}</h4>
                          <p className={`mt-1 ${key === "result" ? "text-fg" : "text-muted"}`}>{item[key]}</p>
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
