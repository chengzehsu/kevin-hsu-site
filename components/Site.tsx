import type { Locale } from "@/lib/locale";
import { getContent } from "@/content";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Metrics } from "./Metrics";
import { Method } from "./Method";
import { CaseStudies } from "./CaseStudies";
import { Timeline } from "./Timeline";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { HashScroll } from "./HashScroll";

export function Site({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const props = { content, locale };
  return (
    <>
      <Nav {...props} />
      <main>
        <Hero {...props} />
        <Metrics {...props} />
        <Method {...props} />
        <CaseStudies {...props} />
        <Timeline {...props} />
        <Contact {...props} />
      </main>
      <Footer {...props} />
      <HashScroll />
    </>
  );
}
