import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import "../globals.css";

// First-visit language redirect (spec: bilingual-site-routing). Runs on / only.
const REDIRECT_SCRIPT =
  '(function(){try{var h=location.hash||"";var p=localStorage.getItem("locale");var l=(navigator.language||"").toLowerCase();if(p==="en"||(!p&&l.indexOf("zh")!==0)){location.replace("/en/"+h)}}catch(e){}})();';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant-TW" className={GeistSans.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: REDIRECT_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
