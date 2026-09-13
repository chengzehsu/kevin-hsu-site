import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { SectionProps } from "@/content/types";
import { BottleneckFlow } from "./motion/BottleneckFlow";

const PRIMARY_CTA =
  "inline-flex items-center gap-2 whitespace-nowrap rounded-ui bg-accent px-5 py-3 font-medium text-accent-fg transition-transform hover:bg-accent/90 active:scale-[0.98]";
const SECONDARY_CTA =
  "inline-flex items-center gap-2 whitespace-nowrap rounded-ui border border-line px-5 py-3 transition-transform hover:bg-surface active:scale-[0.98]";

export function Hero({ content, locale }: SectionProps) {
  const { headline, subline, primaryCta, secondaryCta } = content.hero;

  return (
    <section id="hero" className="flex min-h-[calc(100dvh-4rem)] items-center py-12 md:py-16">
      <div className="mx-auto grid w-full max-w-site grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <div className="lg:col-span-5">
          <h1 className="text-3xl leading-tight font-semibold md:text-4xl lg:text-5xl">{headline}</h1>
          <p className="mt-5 max-w-[36ch] text-base text-muted md:text-lg">{subline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={primaryCta.href} className={PRIMARY_CTA}>
              {primaryCta.label}
              <ArrowRightIcon size={18} weight="regular" aria-hidden="true" />
            </a>
            <a href={secondaryCta.href} className={SECONDARY_CTA}>
              {secondaryCta.label}
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <BottleneckFlow content={content.animation} locale={locale} className="w-full" />
        </div>
      </div>
    </section>
  );
}
