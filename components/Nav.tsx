import type { SectionProps } from "@/content/types";
import { localePath } from "@/lib/locale";
import { BrandSignature } from "./BrandSignature";
import { LocaleSwitch } from "./LocaleSwitch";
import { MobileMenu } from "./MobileMenu";
import { ThemeSwitch } from "./ThemeSwitch";
import { ScrollProgress } from "./motion/ScrollProgress";

const CONTACT_BUTTON =
  "nav-contact inline-flex min-h-11 items-center whitespace-nowrap rounded-ui bg-accent px-3 text-sm sm:px-4 font-medium text-accent-fg transition-transform hover:bg-accent/90 active:scale-[0.98]";

/**
 * Home sections in page order, then the separate pages (résumé, portfolio) after a divider, then the one
 * action that matters: contact. Phones keep the résumé and the
 * contact button in the bar; everything else, theme and language included, sits in the menu.
 */
export function Nav({
  content,
  locale,
  caseId,
  page,
}: SectionProps & { caseId?: string; page?: "portfolio" | "resume" }) {
  const { brand, links, contact, menuLabel, switchLabel, switchAria } =
    content.nav;
  const home = localePath(locale, caseId && locale === "zh" ? "?lang=zh" : "");
  const onHome = !caseId && !page;
  // Section links point at the home page from other pages; case and portfolio pages have their own contact block.
  const href = (target: string) =>
    target.startsWith("#") &&
    !onHome &&
    (target !== "#contact" || page === "resume")
      ? `${home}${target}`
      : target;
  const current = (target: string) =>
    (target.includes("/portfolio/") &&
      (page === "portfolio" || Boolean(caseId))) ||
    (target.includes("/resume/") && page === "resume")
      ? ("page" as const)
      : undefined;
  const resume = links.find((link) => link.href.includes("/resume/"));
  const items = links.map((link) => ({
    ...link,
    href: href(link.href),
    current: current(link.href),
  }));

  return (
    <header className="site-nav sticky top-0 z-40 h-[4.5rem]">
      <a className="skip-link" href="#main-content">
        {content.nav.skipLabel}
      </a>
      <ScrollProgress />
      <div className="mx-auto flex h-full w-full max-w-site items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href={home} className="site-brand text-fg">
          <BrandSignature label={brand} />
        </a>

        <div className="flex items-center gap-2 sm:gap-3 lg:gap-5">
          <nav
            className="hidden md:block"
            aria-label={locale === "zh" ? "主要導覽" : "Main"}
          >
            <ul className="flex items-center gap-4 lg:gap-6">
              {items.map((link) => (
                <li
                  key={link.href}
                  className={
                    link.depth && !items[items.indexOf(link) - 1]?.depth
                      ? "nav-depth-start"
                      : undefined
                  }
                >
                  <a
                    href={link.href}
                    aria-current={link.current}
                    className="text-sm whitespace-nowrap text-muted transition-colors hover:text-fg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {resume ? (
            <a
              href={href(resume.href)}
              aria-current={current(resume.href)}
              className="text-sm whitespace-nowrap text-muted md:hidden"
            >
              {resume.label}
            </a>
          ) : null}
          <a href={href(contact.href)} className={CONTACT_BUTTON}>
            {contact.label}
          </a>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeSwitch locale={locale} />
            <LocaleSwitch
              locale={locale}
              label={switchLabel}
              ariaLabel={switchAria}
              caseId={caseId}
              page={page}
            />
          </div>

          <MobileMenu label={menuLabel}>
            <ul className="mobile-menu-links">
              {items.map((link) => (
                <li
                  key={link.href}
                  className={
                    link.depth && !items[items.indexOf(link) - 1]?.depth
                      ? "nav-depth-start"
                      : undefined
                  }
                >
                  <a href={link.href} aria-current={link.current}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mobile-menu-switches">
              <ThemeSwitch locale={locale} />
              <LocaleSwitch
                locale={locale}
                label={switchLabel}
                ariaLabel={switchAria}
                caseId={caseId}
                page={page}
              />
            </div>
          </MobileMenu>
        </div>
      </div>
    </header>
  );
}
