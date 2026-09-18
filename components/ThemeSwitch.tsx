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
    return () => media.removeEventListener("change", sync);
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";
  const label = locale === "zh"
    ? `切換為${next === "dark" ? "深色" : "淺色"}模式`
    : `Switch to ${next} mode`;

  function toggle() {
    applyTheme(next);
    setTheme(next);
    try { window.localStorage.setItem(STORAGE_KEY, next); } catch {}
  }

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={toggle}
      className="inline-grid size-11 shrink-0 place-items-center rounded-ui border border-line text-muted transition-colors hover:bg-surface hover:text-fg"
    >
      {theme === "dark" ? <SunIcon size={18} aria-hidden="true" /> : <MoonIcon size={18} aria-hidden="true" />}
    </button>
  );
}
