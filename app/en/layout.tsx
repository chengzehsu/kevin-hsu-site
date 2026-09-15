import type { ReactNode } from "react";
import type { Metadata } from "next";
import { SITE_ORIGIN } from "@/lib/locale";
import "../globals.css";

export const metadata: Metadata = { metadataBase: new URL(SITE_ORIGIN) };

// Reveal blocks are server-rendered hidden and shown by motion; without JS they must stay visible.
const NOSCRIPT_CSS = "[data-reveal],[data-hero-intro]{opacity:1!important;transform:none!important}";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: NOSCRIPT_CSS }} />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
