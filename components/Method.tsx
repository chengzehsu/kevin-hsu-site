import type { SectionProps } from "@/content/types";

export function Method({ content }: SectionProps) {
  const { title, steps, capabilitiesTitle, capabilities } = content.method;

  return (
    <section id="method" className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold md:text-3xl">{title}</h2>

        <ol className="mt-10 divide-y divide-line">
          {steps.map((step, i) => (
            <li key={`${step.verb}-${i}`} className="grid grid-cols-1 gap-3 py-6 md:grid-cols-12">
              <h3 className="text-xl font-semibold md:col-span-3 md:text-2xl">{step.verb}</h3>
              <p className="max-w-[65ch] text-muted md:col-span-9">{step.text}</p>
            </li>
          ))}
        </ol>

        <h3 className="mt-16 text-lg font-semibold">{capabilitiesTitle}</h3>
        <ul className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
          {capabilities.map((capability, i) => (
            <li key={`${capability.name}-${i}`}>
              <h4 className="font-medium">{capability.name}</h4>
              <p className="mt-2 text-sm text-muted">{capability.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
