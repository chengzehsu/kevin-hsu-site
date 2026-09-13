import type { SectionProps } from "@/content/types";
import { ArrowDownIcon, SparkleIcon } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./motion/Reveal";

export function Method({ content }: SectionProps) {
  const { title, steps, capabilitiesTitle, capabilities } = content.method;

  return (
    <section id="method" className="method-section py-20 md:py-32">
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">{title}</h2>

        <ol className="method-grid mt-10">
          {steps.map((step, i) => (
            <li key={`${step.verb}-${i}`} className="method-step">
              <Reveal delay={i * 0.07}>
                <div className="method-icon">
                  <SparkleIcon size={18} weight="fill" aria-hidden="true" />
                </div>
                <h3>{step.verb}</h3>
                <p>{step.text}</p>
                {i < steps.length - 1 ? (
                  <ArrowDownIcon className="method-arrow" size={18} aria-hidden="true" />
                ) : null}
              </Reveal>
            </li>
          ))}
        </ol>

        <h3 className="capabilities-title">{capabilitiesTitle}</h3>
        <ul className="capabilities-grid">
          {capabilities.map((capability, i) => (
            <li key={`${capability.name}-${i}`} className="capability-item">
              <h4 className="font-medium">{capability.name}</h4>
              <p className="mt-2 text-sm text-muted">{capability.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
