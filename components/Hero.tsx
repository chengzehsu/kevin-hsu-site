import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { SectionProps } from "@/content/types";
import { casePath } from "@/lib/locale";
import { HeroStatement } from "./motion/HeroStatement";
import { HeroFilm } from "./motion/HeroFilm";
import { MagneticLink } from "./motion/MagneticLink";
import styles from "./Hero.module.css";

const PRIMARY_CTA =
  "inline-flex items-center gap-2 whitespace-nowrap rounded-ui bg-accent px-5 py-3 font-medium text-accent-fg transition-transform hover:bg-accent/90 active:scale-[0.98]";
const SECONDARY_CTA =
  "inline-flex items-center gap-2 whitespace-nowrap rounded-ui border border-line px-5 py-3 transition-transform hover:bg-surface active:scale-[0.98]";

export function Hero({ content, locale }: SectionProps) {
  const { eyebrow, kicker, headline, traits, primaryCta, secondaryCta, film } = content.hero;

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.composition}>
        <div className={styles.copy}>
          <HeroStatement
            eyebrow={eyebrow}
            kicker={kicker}
            headline={headline}
            traits={traits}
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

        <figure className={styles.media}>
          <HeroFilm
            pauseLabel={film.pauseLabel}
            playLabel={film.playLabel}
            locale={locale}
            summary={film.summary}
            link={
              <a href={casePath(locale, film.caseId)} className={`${styles.caption} action-link`}>
                {film.caption}
                <ArrowRightIcon size={16} aria-hidden="true" />
              </a>
            }
          />
        </figure>
      </div>
    </section>
  );
}
