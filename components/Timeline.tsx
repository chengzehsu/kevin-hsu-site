import type { SectionProps } from "@/content/types";

export function Timeline({ content }: SectionProps) {
  const { title, items } = content.experience;

  return (
    <section id="experience" className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold md:text-3xl">{title}</h2>

        <ol className="mt-10 divide-y divide-line">
          {items.map((item, i) => (
            <li key={`${item.org}-${item.period}-${i}`} className="grid grid-cols-1 gap-3 py-8 md:grid-cols-12">
              <p className="text-sm text-muted tabular-nums md:col-span-3">{item.period}</p>

              <div className="md:col-span-9">
                <h3 className="flex flex-wrap items-baseline gap-x-3 text-base">
                  <span className="font-semibold">{item.role}</span>
                  <span className="font-normal text-muted">{item.org}</span>
                </h3>
                {item.summary ? <p className="mt-2 max-w-[65ch] text-muted">{item.summary}</p> : null}
                {item.bullets && item.bullets.length > 0 ? (
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted">
                    {item.bullets.map((bullet, j) => (
                      <li key={`${j}-${bullet}`}>{bullet}</li>
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
