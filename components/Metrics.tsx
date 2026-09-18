import type { SectionProps } from "@/content/types";

export function Metrics({ content, locale }: SectionProps) {
  const { title } = content.metrics;
  const items = content.metrics.items.filter((metric) => metric.featured);

  return (
    <section id="metrics" className="metrics-section content-section">
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <h2 className="sr-only">{title}</h2>

        <ul className="impact-grid">
          {items.map((metric, i) => (
            <li key={`${metric.label}-${i}`} className={`impact-cell impact-cell-${i + 1}`}>
                <p className="impact-value">
                  {metric.prefix}{metric.value.toLocaleString(locale === "zh" ? "zh-TW" : "en-US")}<span className="metric-unit">{metric.suffix}</span>
                </p>
                <p className="impact-caption">{metric.label}</p>
                {metric.detail ? <p className="impact-detail">{metric.detail}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
