import { getContent } from "@/content";
import { skillsContent } from "@/content/skills";
import { SITE_ORIGIN, type Locale } from "./locale";

const HOME_PATH: Record<Locale, string> = { zh: "/", en: "/en/" };

/**
 * schema.org Person for recruiter and search-engine lookups. Every value comes from
 * the rendered copy (name, current role, contact, LinkedIn, skill library), so the
 * structured data can never claim something the page does not show.
 */
export function personJsonLd(locale: Locale): string {
  const content = getContent(locale);
  const current = content.experience.items[0];
  const email = content.contact.cta?.href.startsWith("mailto:")
    ? content.contact.cta.href.slice("mailto:".length)
    : undefined;

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kevin Hsu",
    alternateName: "許承澤",
    jobTitle: current.role,
    description: content.meta.description,
    url: `${SITE_ORIGIN}${HOME_PATH[locale]}`,
    ...(email ? { email } : {}),
    sameAs: content.contact.links.map((link) => link.href),
    worksFor: { "@type": "Organization", name: current.org },
    knowsAbout: skillsContent[locale].groups.flatMap((group) =>
      group.items.map((item) => item.name),
    ),
  };

  return JSON.stringify(data).replace(/</g, "\\u003c");
}
