import type { SectionProps } from "@/content/types";

export function Footer({ content }: SectionProps) {
  return (
    <footer className="border-t border-line py-8 text-sm text-muted">
      <div className="mx-auto flex w-full max-w-site flex-wrap items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <p>{content.footer.text}</p>
        <p className="font-display text-base text-fg">Kevin Hsu</p>
      </div>
    </footer>
  );
}
