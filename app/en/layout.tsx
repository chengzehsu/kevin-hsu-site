import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import "../globals.css";

// Reveal blocks are server-rendered hidden and shown by motion; without JS they must stay visible.
const NOSCRIPT_CSS = "[data-reveal],[data-hero-intro]{opacity:1!important;transform:none!important}";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <head>
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: NOSCRIPT_CSS }} />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
