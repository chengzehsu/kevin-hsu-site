import type { SectionProps } from "@/content/types";
import { casePath } from "@/lib/locale";

/** Three results, each linking to the case that proves it, then the outside recognition behind them. */
export function Metrics({ content, locale }: SectionProps) {
  const { title, items } = content.metrics;

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
          {items.map((metric, i) => (
            <li
              key={metric.caseId}
              className={`impact-cell impact-cell-${i + 1}`}
            >
              <a className="impact-link" href={casePath(locale, metric.caseId)}>
                <p className="impact-value">{metric.value}</p>
                <p className="impact-caption">{metric.label}</p>
                <p className="impact-detail">{metric.detail}</p>
              </a>
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
