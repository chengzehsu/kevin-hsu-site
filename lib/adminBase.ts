import { getContent } from "@/content";
import { resumeContent } from "@/content/resume";
import { skillsContent } from "@/content/skills";
import { LOCALES, type Locale } from "./locale";
import { numericTokens, type TextKey } from "./variants";

/** The main copy behind every field a variant can change, as the admin shows it beside each override. */
export interface LocaleBase {
  text: Record<TextKey, string>;
  skills: Array<{ id: string; name: string; statement: string; summary: string }>;
  experience: Array<{ id: string; org: string; role: string; bullets: string[] }>;
  /** Work cases in their main order; side projects are not re-ordered. */
  cases: Array<{ id: string; title: string }>;
}

export interface AdminBase {
  zh: LocaleBase;
  en: LocaleBase;
  /** Every number the site writes, both locales: an override using another one gets a warning. */
  numbers: string[];
}

function localeBase(locale: Locale): LocaleBase {
  const content = getContent(locale);
  const resume = resumeContent[locale];
  return {
    text: {
      "hero.headline": content.hero.headline,
      "resume.headline": resume.headline,
      "resume.summary": resume.summary,
      "resume.keywords": resume.keywords,
    },
    skills: skillsContent[locale].featured.map(({ id, name, statement, summary }) => ({ id, name, statement, summary })),
    experience: content.experience.items.map(({ id, org, role, bullets }) => ({ id, org, role, bullets })),
    cases: content.cases.items
      .filter((item) => item.kind !== "side")
      .sort((a, b) => a.rank - b.rank)
      .map(({ id, title }) => ({ id, title })),
  };
}

export function adminBase(): AdminBase {
  const text = LOCALES.map((locale) =>
    JSON.stringify([getContent(locale), resumeContent[locale], skillsContent[locale]]),
  ).join("\n");
  return { zh: localeBase("zh"), en: localeBase("en"), numbers: numericTokens(text).sort() };
}
