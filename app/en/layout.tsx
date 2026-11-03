import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { SITE_ORIGIN } from "@/lib/locale";
import { THEME_SCRIPT, THEME_VIEWPORT } from "@/lib/theme";
import { personJsonLd } from "@/lib/personJsonLd";
import { Analytics } from "@/components/Analytics";
import { TailoredBoot, TailoredStart } from "@/components/TailoredBoot";
import "../globals.css";

export const metadata: Metadata = { metadataBase: new URL(SITE_ORIGIN) };

export const viewport: Viewport = THEME_VIEWPORT;

// Reveal blocks are server-rendered hidden and shown by motion; without JS they must stay visible.
const NOSCRIPT_CSS = "[data-reveal],[data-hero-intro]{opacity:1!important;transform:none!important}[data-disclosure]::details-content{transition:none!important}";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/geist-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personJsonLd("en") }} />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: NOSCRIPT_CSS }} />
        </noscript>
        <Analytics />
        <TailoredBoot />
      </head>
      <body id="top">
        {children}
        <TailoredStart />
      </body>
    </html>
  );
}
