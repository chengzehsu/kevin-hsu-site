import type { ReactNode } from "react";
import type { Metadata } from "next";
import { SITE_ORIGIN } from "@/lib/locale";
import "../globals.css";

export const metadata: Metadata = { metadataBase: new URL(SITE_ORIGIN) };

// First-visit language redirect. The web platform does not expose a dependable
// operating-system locale, so use the device/browser preferred-language list.
// A saved explicit choice always wins. Keeps location.search and stays put when
// the switch arrived with ?lang=zh because localStorage was unavailable.
const REDIRECT_SCRIPT =
  '(function(){try{if(/[?&]lang=zh(?:&|$)/.test(location.search))return;var h=location.hash||"";var p=localStorage.getItem("locale");var ls=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||""];var l=(ls[0]||"").toLowerCase();if(p==="en"||(!p&&l.indexOf("zh")!==0)){location.replace("/en/"+location.search+h)}}catch(e){}})();';

// Reveal blocks are server-rendered hidden and shown by motion; without JS they must stay visible.
const NOSCRIPT_CSS = "[data-reveal],[data-hero-intro]{opacity:1!important;transform:none!important}";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant-TW">
      <head>
        <link rel="preload" href="/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/noto-sans-tc-portfolio.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: REDIRECT_SCRIPT }} />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: NOSCRIPT_CSS }} />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
