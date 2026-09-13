import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { SectionProps } from "@/content/types";
import { MagneticLink } from "./motion/MagneticLink";

const PRIMARY_CTA =
  "inline-flex items-center gap-2 whitespace-nowrap rounded-ui bg-accent px-5 py-3 font-medium text-accent-fg transition-transform hover:bg-accent/90 active:scale-[0.98]";
const TEXT_LINK =
  "inline-flex items-center gap-1.5 underline decoration-line underline-offset-4 transition-colors hover:decoration-accent";

export function Contact({ content }: SectionProps) {
  const { title, text, cta, links } = content.contact;
  const showCta = Boolean(cta && cta.label);
  const hasActions = showCta || links.length > 0;

  return (
    <section id="contact" className="contact-section py-20 md:py-32">
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <div className="contact-panel">
          <h2 className="section-title">{title}</h2>
          <p className="mt-4 max-w-[50ch] text-muted">{text}</p>

          {hasActions ? (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {showCta && cta ? (
                <MagneticLink href={cta.href} className={PRIMARY_CTA}>
                  {cta.label}
                  {cta.href.startsWith("#") ? (
                    <ArrowRightIcon size={18} weight="regular" aria-hidden="true" />
                  ) : (
                    <ArrowUpRightIcon size={18} weight="regular" aria-hidden="true" />
                  )}
                </MagneticLink>
              ) : null}

              {links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className={TEXT_LINK}>
                  {link.label}
                  <ArrowUpRightIcon size={18} weight="regular" aria-hidden="true" />
                </a>
              ))}
            </div>
          ) : null}
          {showCta && cta?.href.startsWith("mailto:") ? (
            <a className="email-address" href={cta.href}>
              {cta.href.slice("mailto:".length)}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
