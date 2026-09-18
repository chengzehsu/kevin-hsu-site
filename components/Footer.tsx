import type { SectionProps } from "@/content/types";

export function Footer({ content }: SectionProps) {
  return (
    <footer className="border-t border-line py-8 text-sm text-muted">
      <div className="mx-auto flex w-full max-w-site flex-wrap items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <p>{content.footer.text}</p>
        <a href="#top" className="inline-flex min-h-11 items-center gap-2 text-fg">
          {content.footer.backToTop}<span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
