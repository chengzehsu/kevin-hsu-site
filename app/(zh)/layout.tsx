import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import "../globals.css";

// First-visit language redirect (spec: bilingual-site-routing). Runs on / only.
// Keeps location.search (campaign parameters) and stays put when the switch
// arrived with ?lang=zh because localStorage was unavailable.
const REDIRECT_SCRIPT =
  '(function(){try{if(/[?&]lang=zh(?:&|$)/.test(location.search))return;var h=location.hash||"";var p=localStorage.getItem("locale");var l=(navigator.language||"").toLowerCase();if(p==="en"||(!p&&l.indexOf("zh")!==0)){location.replace("/en/"+location.search+h)}}catch(e){}})();';

// Reveal blocks are server-rendered hidden and shown by motion; without JS they must stay visible.
const NOSCRIPT_CSS = "[data-reveal],[data-hero-intro]{opacity:1!important;transform:none!important}";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant-TW" className={GeistSans.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: REDIRECT_SCRIPT }} />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: NOSCRIPT_CSS }} />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
