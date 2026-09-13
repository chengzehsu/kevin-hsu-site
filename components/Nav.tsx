import type { SectionProps } from "@/content/types";
import { localePath } from "@/lib/locale";
import { LocaleSwitch } from "./LocaleSwitch";

export function Nav({ content, locale }: SectionProps) {
  const { brand, links, switchLabel, switchAria } = content.nav;

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-line bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-full w-full max-w-site items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href={localePath(locale)} className="font-medium whitespace-nowrap text-fg">
          {brand}
        </a>

        <div className="flex items-center gap-4 sm:gap-6">
          {links.length > 0 ? (
            <nav>
              <ul className="flex items-center gap-4 sm:gap-6">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm whitespace-nowrap text-muted transition-colors hover:text-fg"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
          <LocaleSwitch locale={locale} label={switchLabel} ariaLabel={switchAria} />
        </div>
      </div>
    </header>
  );
}
