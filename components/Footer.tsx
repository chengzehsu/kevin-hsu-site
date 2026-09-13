import type { SectionProps } from "@/content/types";

export function Footer({ content }: SectionProps) {
  return (
    <footer className="border-t border-line py-8 text-sm text-muted">
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <p>{content.footer.text}</p>
      </div>
    </footer>
  );
}
