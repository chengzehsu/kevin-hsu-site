"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import type { Locale } from "@/lib/locale";

type Theme = "light" | "dark";
const STORAGE_KEY = "portfolio-theme";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

export function ThemeSwitch({ locale }: { locale: Locale }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      let saved: string | null = null;
      try { saved = window.localStorage.getItem(STORAGE_KEY); } catch {}
      const next: Theme = saved === "dark" || (saved !== "light" && media.matches) ? "dark" : "light";
      applyTheme(next);
      setTheme(next);
    };
    sync();
    media.addEventListener("change", sync);
    // The nav renders one switch on desktop and one in the mobile menu; keep both labels in step.
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      media.removeEventListener("change", sync);
      observer.disconnect();
    };
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";
  const label = locale === "zh"
    ? `切換為${next === "dark" ? "深色" : "淺色"}模式`
    : `Switch to ${next} mode`;

  function toggle() {
    const target: Theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(target);
    setTheme(target);
    try { window.localStorage.setItem(STORAGE_KEY, target); } catch {}
  }

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={toggle}
      className="inline-grid size-11 shrink-0 place-items-center rounded-ui border border-line text-muted transition-colors hover:bg-surface hover:text-fg"
    >
      {/* Both glyphs render; CSS picks one from the pre-paint data-theme, so the icon never flips on hydration. */}
      <SunIcon className="theme-icon-sun" size={18} aria-hidden="true" />
      <MoonIcon className="theme-icon-moon" size={18} aria-hidden="true" />
    </button>
  );
}
