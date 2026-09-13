import type { SectionProps } from "@/content/types";
import { CountUp } from "./motion/CountUp";
import { Reveal } from "./motion/Reveal";

export function Metrics({ content, locale }: SectionProps) {
  const { title, items, awards } = content.metrics;

  return (
    <section id="metrics" className="metrics-section py-20 md:py-32">
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">{title}</h2>

        <ul className="impact-grid mt-10">
          {items.map((metric, i) => (
            <li key={`${metric.label}-${i}`} className={`impact-cell impact-cell-${i + 1}`}>
              <Reveal delay={i * 0.06}>
                <CountUp
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  locale={locale}
                  className={`block text-3xl leading-tight font-semibold tabular-nums md:text-4xl ${
                    i === 0 ? "text-accent" : "text-fg"
                  }`}
                />
                <p className="mt-2 text-sm font-medium">{metric.label}</p>
                {metric.detail ? <p className="mt-1 text-sm text-muted">{metric.detail}</p> : null}
              </Reveal>
            </li>
          ))}
        </ul>

        {awards.length > 0 ? (
          <p className="mt-12 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-6 text-sm text-muted">
            {awards.map((award) => (
              <span key={award}>{award}</span>
            ))}
          </p>
        ) : null}
      </div>
    </section>
  );
}
