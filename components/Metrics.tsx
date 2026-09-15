import type { SectionProps } from "@/content/types";
import { CountUp } from "./motion/CountUp";
import { Reveal } from "./motion/Reveal";

export function Metrics({ content, locale }: SectionProps) {
  const { title, items } = content.metrics;

  return (
    <section id="metrics" className="metrics-section content-section">
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
      </div>
    </section>
  );
}
