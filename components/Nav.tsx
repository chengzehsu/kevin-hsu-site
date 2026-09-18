import type { SectionProps } from "@/content/types";
import { localePath } from "@/lib/locale";
import { LocaleSwitch } from "./LocaleSwitch";
import { ThemeSwitch } from "./ThemeSwitch";
import { ScrollProgress } from "./motion/ScrollProgress";

export function Nav({ content, locale, caseId }: SectionProps & { caseId?: string }) {
  const { brand, links, switchLabel, switchAria } = content.nav;
  const home = localePath(locale, caseId && locale === "zh" ? "?lang=zh" : "");

  return (
    <header className="site-nav sticky top-0 z-40 h-[4.5rem]">
      <ScrollProgress />
      <div className="mx-auto flex h-full w-full max-w-site items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href={home} className="font-display text-xl leading-none whitespace-nowrap text-fg">
          {brand}
        </a>

        <div className="flex items-center gap-4 sm:gap-6">
          {links.length > 0 ? (
            <nav className="hidden sm:block">
              <ul className="flex items-center gap-4 sm:gap-6">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={caseId && link.href !== "#contact" ? `${home}${link.href}` : link.href}
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
          <LocaleSwitch locale={locale} label={switchLabel} ariaLabel={switchAria} caseId={caseId} />
        </div>
      </div>
    </header>
  );
}
