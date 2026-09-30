import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 | Kevin Hsu",
  description: "找不到這個頁面。The page you are looking for does not exist.",
  robots: { index: false },
};

// This page bypasses both root layouts, so it applies the saved theme itself.
const THEME_SCRIPT =
  '(function(){try{var t=localStorage.getItem("portfolio-theme");var d=t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.dataset.theme=d?"dark":"light"}catch(e){}})();';

const ACTION =
  "inline-flex min-h-11 items-center rounded-ui px-5 py-3 font-medium transition-transform active:scale-[0.98]";

export default function GlobalNotFound() {
  return (
    <html lang="zh-Hant-TW" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <main className="flex min-h-[100dvh] flex-col justify-center py-16">
          {/* globals.css pins main to 100% width, so the site container lives one level down. */}
          <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-medium text-muted">404</p>
            <h1 className="section-title mt-3">找不到這個頁面</h1>
            <p className="mt-4 max-w-[50ch] text-muted" lang="en">
              This page does not exist.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/"
                className={`${ACTION} bg-accent text-accent-fg hover:bg-accent/90`}
              >
                回到首頁
              </a>
              <a
                href="/en/"
                lang="en"
                className={`${ACTION} border border-line hover:bg-surface`}
              >
                English home
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
