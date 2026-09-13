import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { SectionProps } from "@/content/types";
import { BottleneckFlow } from "./motion/BottleneckFlow";
import { HeroStatement } from "./motion/HeroStatement";
import { MagneticLink } from "./motion/MagneticLink";

const PRIMARY_CTA =
  "inline-flex items-center gap-2 whitespace-nowrap rounded-ui bg-accent px-5 py-3 font-medium text-accent-fg transition-transform hover:bg-accent/90 active:scale-[0.98]";
const SECONDARY_CTA =
  "inline-flex items-center gap-2 whitespace-nowrap rounded-ui border border-line px-5 py-3 transition-transform hover:bg-surface active:scale-[0.98]";

export function Hero({ content, locale }: SectionProps) {
  const { eyebrow, headline, subline, visualLabel, primaryCta, secondaryCta } = content.hero;

  return (
    <section id="hero" className="hero-section">
      <div className="hero-orbit" aria-hidden="true" />
      <div className="mx-auto grid w-full max-w-site grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
        <div className="lg:col-span-6">
          <HeroStatement eyebrow={eyebrow} headline={headline} subline={subline} chinese={locale === "zh"}>
            <MagneticLink href={primaryCta.href} className={PRIMARY_CTA}>
              {primaryCta.label}
              <ArrowRightIcon size={18} weight="regular" aria-hidden="true" />
            </MagneticLink>
            <a href={secondaryCta.href} className={SECONDARY_CTA}>
              {secondaryCta.label}
            </a>
          </HeroStatement>
        </div>

        <div className="hero-flow-shell lg:col-span-6">
          <p className="flow-label">{visualLabel}</p>
          <BottleneckFlow content={content.animation} locale={locale} className="relative z-10 w-full" />
        </div>
      </div>
    </section>
  );
}
