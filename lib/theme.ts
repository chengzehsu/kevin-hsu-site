import type { Viewport } from "next";

// Single source for the browser-bar colour. Must equal --bg in app/globals.css (a test checks it).
export const THEME_COLORS = { light: "#f5f7fa", dark: "#171e28" } as const;

export const THEME_VIEWPORT: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark },
  ],
};

// Pre-paint inline script shared by every root layout.
// 1. Resolve the saved choice (or the system setting) into data-theme before first paint.
// 2. Keep every theme-color meta equal to the current theme. The browser picks one of the two
//    media metas by the SYSTEM setting, so a manual choice only works if both carry the same colour.
//    A MutationObserver re-applies on data-theme changes (manual switch, system change) and when
//    the metas are added or rewritten (parsing, client-side route changes).
export const THEME_SCRIPT =
  '(function(){var C=' +
  JSON.stringify(THEME_COLORS) +
  ';var r=document.documentElement;try{var t=localStorage.getItem("portfolio-theme");var d=t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);r.dataset.theme=d?"dark":"light"}catch(e){}' +
  'function s(){var k=r.dataset.theme;if(!k)return;var c=k==="dark"?C.dark:C.light;var m=document.querySelectorAll(\'meta[name="theme-color"]\');for(var i=0;i<m.length;i++){if(m[i].getAttribute("content")!==c)m[i].setAttribute("content",c)}}' +
  's();var o=new MutationObserver(s);o.observe(r,{attributes:true,attributeFilter:["data-theme"]});o.observe(document.head,{childList:true,subtree:true,attributes:true,attributeFilter:["content"]})})();';
