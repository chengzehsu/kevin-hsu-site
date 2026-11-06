import type { MetricItem, SectionProps } from "@/content/types";
import { casePath, type Locale } from "@/lib/locale";

/**
 * Results, one row per product: the product and Kevin's role first, so ownership is read before any
 * number; then what he changed (product value) and what the product is worth (business value). The
 * current role leads and is set largest. Recognition follows.
 */
export function Metrics({ content, locale }: SectionProps) {
  const { title, rows, productValueLabel, businessValueLabel } =
    content.metrics;

  return (
    <section
      id="metrics"
      className="metrics-section content-section"
      aria-labelledby="metrics-heading"
    >
      {/* Links sent when awards had their own section still land here, where the awards now sit. */}
      <span id="awards" aria-hidden="true" />
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <h2 id="metrics-heading" className="section-title impact-title">
          {title}
        </h2>
        <ul className="impact-list">
          {rows.map((row, i) => (
            <li
              key={row.product}
              className={i === 0 ? "impact-row impact-row-lead" : "impact-row"}
            >
              <div className="impact-head">
                <h3 className="impact-product">{row.product}</h3>
                <p className="impact-role">{row.role}</p>
                <p className="impact-note">{row.note}</p>
              </div>
              <ValueColumn
                label={productValueLabel}
                items={row.productValue}
                locale={locale}
                kind="product"
              />
              <ValueColumn
                label={businessValueLabel}
                items={row.businessValue}
                locale={locale}
                kind="business"
              />
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

/**
 * One column of a row. Its label is visible above the first row and on phones, and always read aloud.
 * On phones an earlier row keeps only its business value; what changed is one tap away on its case.
 */
function ValueColumn({
  label,
  items,
  locale,
  kind,
}: {
  label: string;
  items: MetricItem[];
  locale: Locale;
  kind: "product" | "business";
}) {
  return (
    <div className={`impact-col impact-col-${kind}`}>
      <p className="impact-group">{label}</p>
      <ul className="impact-rows">
        {items.map((metric) => {
          const body = (
            <>
              <FigureValue metric={metric} />
              <p className="impact-caption">{metric.label}</p>
            </>
          );
          return (
            <li key={metric.label}>
              {metric.caseId ? (
                <a
                  className="impact-link"
                  href={casePath(locale, metric.caseId)}
                >
                  {body}
                </a>
              ) : (
                body
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * A figure. One that shows a change renders both ends in the server HTML: the before value small and
 * struck through, the after value at full size. Where scroll-driven animation runs, scrolling the figure
 * into view plays the change (globals.css, "before to after"). Assistive technology reads the whole change once.
 */
function FigureValue({ metric }: { metric: MetricItem }) {
  if (!metric.from || !metric.to)
    return <p className="impact-value">{metric.value}</p>;
  return (
    <p className="impact-value impact-change">
      <span className="sr-only">{metric.value}</span>
      <span className="impact-ba" aria-hidden="true">
        <s className="impact-from">{metric.from}</s>
        <span className="impact-to">
          <span>{metric.to}</span>
        </span>
      </span>
    </p>
  );
}
