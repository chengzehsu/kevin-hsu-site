import type { SectionProps } from "@/content/types";
import { localePath } from "@/lib/locale";
import { LocaleSwitch } from "./LocaleSwitch";
import { ThemeSwitch } from "./ThemeSwitch";
import { ScrollProgress } from "./motion/ScrollProgress";

export function Nav({ content, locale, caseId, page }: SectionProps & { caseId?: string; page?: "portfolio" }) {
  const { brand, links, switchLabel, switchAria } = content.nav;
  const home = localePath(locale, caseId && locale === "zh" ? "?lang=zh" : "");
  const portfolioLink = links.find((link) => link.href.includes("/portfolio/"));
  const portfolioActive = page === "portfolio" || Boolean(caseId);

  return (
    <header className="site-nav sticky top-0 z-40 h-[4.5rem]">
      <a className="skip-link" href="#main-content">{content.nav.skipLabel}</a>
      <ScrollProgress />
      <div className="mx-auto flex h-full w-full max-w-site items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href={home} className="font-display text-xl leading-none whitespace-nowrap text-fg">
          {brand}
        </a>

        <div className="flex items-center gap-3 sm:gap-6">
          {portfolioLink ? (
            <a
              href={portfolioLink.href}
              aria-current={portfolioActive ? "page" : undefined}
              className="mobile-portfolio-link text-sm whitespace-nowrap text-muted sm:hidden"
            >
              {portfolioLink.label}
            </a>
          ) : null}
          {links.length > 0 ? (
            <nav className="hidden sm:block">
              <ul className="flex items-center gap-4 sm:gap-6">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={(caseId || page === "portfolio") && link.href.startsWith("#") && link.href !== "#contact" ? `${home}${link.href}` : link.href}
                      aria-current={portfolioActive && link.href.includes("/portfolio/") ? "page" : undefined}
                      className="text-sm whitespace-nowrap text-muted transition-colors hover:text-fg"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
          <ThemeSwitch locale={locale} />
          <LocaleSwitch locale={locale} label={switchLabel} ariaLabel={switchAria} caseId={caseId} page={page} />
        </div>
      </div>
    </header>
  );
}
