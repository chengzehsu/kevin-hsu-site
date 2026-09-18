import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { SectionProps } from "@/content/types";
import { HeroStatement } from "./motion/HeroStatement";
import { MagneticLink } from "./motion/MagneticLink";
import styles from "./Hero.module.css";

const PRIMARY_CTA =
  "inline-flex items-center gap-2 whitespace-nowrap rounded-ui bg-accent px-5 py-3 font-medium text-accent-fg transition-transform hover:bg-accent/90 active:scale-[0.98]";
const SECONDARY_CTA =
  "inline-flex items-center gap-2 whitespace-nowrap rounded-ui border border-line px-5 py-3 transition-transform hover:bg-surface active:scale-[0.98]";

export function Hero({ content, locale }: SectionProps) {
  const { eyebrow, headline, subline, profile, primaryCta, secondaryCta } = content.hero;

  return (
    <section id="hero" className="hero-section">
      <div className={styles.composition}>
        <div className={styles.copy}>
          <HeroStatement
            eyebrow={eyebrow}
            headline={headline}
            subline={subline}
            chinese={locale === "zh"}
            actions={
              <>
                <MagneticLink href={primaryCta.href} className={PRIMARY_CTA}>
                  {primaryCta.label}
                  <ArrowRightIcon size={18} weight="regular" aria-hidden="true" />
                </MagneticLink>
                <a href={secondaryCta.href} className={SECONDARY_CTA}>
                  {secondaryCta.label}
                </a>
              </>
            }
          />
        </div>

        <dl className={styles.profile}>
          {profile.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
