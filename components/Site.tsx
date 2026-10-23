import type { Locale } from "@/lib/locale";
import { getContent } from "@/content";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { ProofStack } from "./ProofStack";
import { Awards } from "./Awards";
import { LinkedInPosts } from "./LinkedInPosts";
import { Timeline } from "./Timeline";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { HashScroll } from "./HashScroll";
import { SkillsRadar } from "./SkillsRadar";
import { skillsContent } from "@/content/skills";

export function Site({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const props = { content, locale };
  return (
    <>
      <Nav {...props} />
      <main id="main-content">
        <Hero {...props} />
        {/* Reading order: outcomes, then real problems solved with AI, then where and how long, then skills. */}
        <ProofStack {...props} />
        <LinkedInPosts {...props} />
        <Timeline {...props} />
        <SkillsRadar content={skillsContent[locale]} locale={locale} />
        <Awards {...props} />
        <Contact {...props} />
      </main>
      <Footer {...props} />
      <HashScroll />
    </>
  );
}
