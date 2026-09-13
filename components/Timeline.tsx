import type { SectionProps } from "@/content/types";
import { Highlight } from "./Highlight";

export function Timeline({ content }: SectionProps) {
  const { title, items } = content.experience;

  return (
    <section id="experience" className="timeline-section py-20 md:py-32">
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">{title}</h2>

        <ol className="timeline-list mt-10">
          {items.map((item, i) => (
            <li key={`${item.org}-${item.period}-${i}`} className="timeline-item grid grid-cols-1 gap-4 py-9 md:grid-cols-12 md:gap-0">
              <p className="timeline-period text-sm text-muted tabular-nums md:col-span-3">{item.period}</p>

              <div className="timeline-content md:col-span-9">
                <h3 className="flex flex-wrap items-baseline gap-x-3 text-lg">
                  <span className="font-semibold">{item.role}</span>
                  <span className="font-normal text-muted">{item.org}</span>
                </h3>
                {item.summary ? (
                  <p className="mt-2 max-w-[65ch] text-muted">
                    <Highlight>{item.summary}</Highlight>
                  </p>
                ) : null}
                {item.bullets && item.bullets.length > 0 ? (
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted">
                    {item.bullets.map((bullet, j) => (
                      <li key={`${j}-${bullet}`}>
                        <Highlight>{bullet}</Highlight>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
