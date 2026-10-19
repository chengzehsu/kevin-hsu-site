import { CHANNEL_MEDIUM } from "@/lib/analytics";
import { BACKEND_ORIGIN } from "@/lib/locale";
import { resolveTailoredCode, SHORT_CODE_PATTERN } from "@/lib/shortCode";
import { PENDING_ATTR, SESSION_KEY, WAIT_MS } from "@/lib/variants";
import { TailoredStart } from "./TailoredStart";

/**
 * Head script for tailored links: resolves the visitor's code (?s=, then utm_source, then this visit's
 * saved code; resolveTailoredCode in lib/shortCode.ts, inlined), saves it for later pages, and hides the
 * overridable fields ([data-v]) until the overlay or the main copy is ready, at most WAIT_MS. Channel
 * codes (threads, line-pm, …) never carry a variant, so those visitors are not held. Renders nothing
 * when no backend is configured.
 */
export function TailoredBoot() {
  if (!BACKEND_ORIGIN) return null;
  // Fetch starts here, before hydration, so slow networks spend the whole WAIT_MS on the request itself.
  // The store awaits this promise; once the timer has shown the fields, a late answer is dropped.
  // The resolver is resolveTailoredCode's own source, so the tested function is the one that ships.
  const script = `(function(){try{var s=null;try{s=sessionStorage.getItem(${JSON.stringify(SESSION_KEY)})}catch(e){}var c=(${resolveTailoredCode.toString()})(location.search,s,${JSON.stringify(SHORT_CODE_PATTERN)},${JSON.stringify(CHANNEL_MEDIUM)});if(!c)return;try{sessionStorage.setItem(${JSON.stringify(SESSION_KEY)},c)}catch(e){}var h=document.documentElement;h.setAttribute(${JSON.stringify(PENDING_ATTR)},"pending");window.__tailoredCode=c;window.__tailoredOverlay=fetch(${JSON.stringify(BACKEND_ORIGIN + "/api/variant/")}+encodeURIComponent(c),{credentials:"omit"}).then(function(x){return x.ok?x.json():null}).catch(function(){return null});setTimeout(function(){h.removeAttribute(${JSON.stringify(PENDING_ATTR)})},${WAIT_MS})}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

export { TailoredStart };
