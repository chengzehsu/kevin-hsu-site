import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  EnvelopeSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { SectionProps } from "@/content/types";
import { MagneticLink } from "./motion/MagneticLink";
import styles from "./Contact.module.css";

/** The closing frame: the tagline, one contact intent, and the three facts a hiring reader keeps. */
export function Contact({ content }: SectionProps) {
  const { kicker, title, text, cta, links } = content.contact;
  const { profile } = content.hero;
  const showCta = Boolean(cta && cta.label);
  const hasActions = showCta || links.length > 0;
  const email =
    showCta && cta?.href.startsWith("mailto:")
      ? cta.href.slice("mailto:".length)
      : null;

  return (
    <section
      id="contact"
      className="contact-section content-section"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <div className={`${styles.panel} scroll-rise`}>
          <div className={styles.copy}>
            {kicker ? <p className={styles.kicker}>{kicker}</p> : null}
            <h2 id="contact-heading" className={styles.title}>
              {title}
            </h2>
            <p className={styles.text}>{text}</p>

            {hasActions ? (
              <div className={styles.actions}>
                {showCta && cta ? (
                  <MagneticLink href={cta.href} className={styles.primary}>
                    {cta.label}
                    {cta.href.startsWith("#") ? (
                      <ArrowRightIcon
                        size={20}
                        weight="bold"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowUpRightIcon
                        size={20}
                        weight="bold"
                        aria-hidden="true"
                      />
                    )}
                  </MagneticLink>
                ) : null}

                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.secondary}
                  >
                    {link.label}
                    <ArrowUpRightIcon
                      size={18}
                      weight="regular"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            ) : null}

            {email ? (
              <a className={styles.email} href={cta?.href}>
                <EnvelopeSimpleIcon size={18} aria-hidden="true" />
                {email}
              </a>
            ) : null}
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
      </div>
    </section>
  );
}
