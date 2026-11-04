import type { SectionProps } from "@/content/types";
import { casePath } from "@/lib/locale";

/** Results grouped by the value they show, each linking to its proof where a case exists, then the outside recognition. */
export function Metrics({ content, locale }: SectionProps) {
  const { title, groups } = content.metrics;

  return (
    <section
      id="metrics"
      className="metrics-section content-section"
      aria-labelledby="metrics-heading"
    >
      {/* Links sent when awards had their own section still land here, where the awards now sit. */}
      <span id="awards" aria-hidden="true" />
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <h2 id="metrics-heading" className="sr-only">
          {title}
        </h2>

        <ul className="impact-grid">
          {groups.map((group, i) => (
            <li
              key={group.label}
              className={`impact-cell impact-cell-${i + 1}`}
            >
              <p className="impact-group">{group.label}</p>
              <ul className="impact-rows">
                {group.items.map((metric) => {
                  const body = (
                    <>
                      <p className="impact-value">{metric.value}</p>
                      <p className="impact-caption">{metric.label}</p>
                    </>
                  );
                  return (
                    <li key={metric.label}>
                      {metric.caseId ? (
                        <a className="impact-link" href={casePath(locale, metric.caseId)}>
                          {body}
                        </a>
                      ) : (
                        body
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>

        <ul className="impact-awards">
          {content.awards.items.map((award) => (
            <li key={award.id}>
              {award.kind === "feature" ? (
                <a
                  href={award.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {award.title}
                </a>
              ) : (
                `${award.year} ${award.title}${locale === "zh" ? "" : " "}${award.distinction}`
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
