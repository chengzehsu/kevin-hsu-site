import type { ReactNode } from "react";
import type { Metadata } from "next";
import { SITE_ORIGIN } from "@/lib/locale";
import "../globals.css";

export const metadata: Metadata = { metadataBase: new URL(SITE_ORIGIN) };

// Reveal blocks are server-rendered hidden and shown by motion; without JS they must stay visible.
const NOSCRIPT_CSS = "[data-reveal],[data-hero-intro]{opacity:1!important;transform:none!important}[data-disclosure]::details-content{transition:none!important}";
const THEME_SCRIPT =
  '(function(){try{var t=localStorage.getItem("portfolio-theme");var d=t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.dataset.theme=d?"dark":"light"}catch(e){}})();';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/geist-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: NOSCRIPT_CSS }} />
        </noscript>
      </head>
      <body id="top">{children}</body>
    </html>
  );
}
