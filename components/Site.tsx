import type { Locale } from "@/lib/locale";
import { getContent } from "@/content";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Metrics } from "./Metrics";
import { ProofStack } from "./ProofStack";
import { AiHighlights } from "./AiHighlights";
import { Timeline } from "./Timeline";
import { SkillsRadar } from "./SkillsRadar";
import { skillsContent } from "@/content/skills";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { HashScroll } from "./HashScroll";

/** The home page's one job is a quick decision: who, what results, which cases, how he thinks, and how to reach him. */
export function Site({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const props = { content, locale };
  return (
    <>
      <Nav {...props} />
      <main id="main-content" className="home-main">
        <Hero {...props} />
        <Metrics {...props} />
        <ProofStack {...props} />
        <AiHighlights {...props} />
        <Timeline {...props} />
        <SkillsRadar content={skillsContent[locale]} locale={locale} compact />
        <Contact {...props} />
      </main>
      <Footer {...props} />
      <HashScroll />
    </>
  );
}
