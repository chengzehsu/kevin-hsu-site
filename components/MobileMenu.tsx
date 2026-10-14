"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ListIcon } from "@phosphor-icons/react";

/**
 * Phone-width menu. A plain <details>, so it opens without JavaScript; with it, a link tap, Escape or a tap
 * outside closes the panel, and an in-page link does not leave it covering the section it jumped to.
 */
export function MobileMenu({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const menu = ref.current;
    if (!menu) return;
    const close = () => menu.removeAttribute("open");
    const onClick = (event: MouseEvent) => {
      if (!menu.open) return;
      const target = event.target as Node;
      if (
        !menu.contains(target) ||
        (target instanceof Element && target.closest("a"))
      )
        close();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu.open) {
        close();
        menu.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <details ref={ref} className="mobile-menu md:hidden">
      <summary
        aria-label={label}
        className="inline-grid size-11 cursor-pointer list-none place-items-center rounded-ui border border-line text-muted transition-colors hover:bg-surface hover:text-fg"
      >
        <ListIcon size={20} aria-hidden="true" />
      </summary>
      <div className="mobile-menu-panel">{children}</div>
    </details>
  );
}
