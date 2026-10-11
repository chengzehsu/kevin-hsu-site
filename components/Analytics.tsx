import {
  ANALYTICS_DOMAIN,
  CHANNEL_MEDIUM,
  DEFAULT_MEDIUM,
  SHORT_CODE_PATTERN,
  SHORT_PARAM,
  UMAMI_SCRIPT,
  UMAMI_WEBSITE_ID,
} from "@/lib/analytics";

/**
 * Turns a short share link (`/?s=threads`) into UTM parameters, then loads Umami on the production host only.
 * The rewrite runs before the tracker exists, so Umami reads the UTM form on its first page view and never sees
 * a URL change it would count as a second visit. Link-preview crawlers do not run scripts, so previews are not visits.
 * The static export cannot know its host at build time, so localhost and preview URLs never download the tracker;
 * data-domains stays as a second guard. Renders nothing until a website ID is set in lib/analytics.ts.
 */
export function Analytics() {
  if (!UMAMI_WEBSITE_ID) return null;
  const rewrite = `try{var q=new URLSearchParams(location.search),k=(q.get(${JSON.stringify(SHORT_PARAM)})||"").toLowerCase();if(new RegExp(${JSON.stringify(SHORT_CODE_PATTERN)}).test(k)&&!q.has("utm_source")){var M=${JSON.stringify(CHANNEL_MEDIUM)},m=(q.get("m")||"").toLowerCase()||M[k.split("-")[0]]||${JSON.stringify(DEFAULT_MEDIUM)},c=q.get("c");q.delete(${JSON.stringify(SHORT_PARAM)});q.delete("m");q.delete("c");q.set("utm_source",k);q.set("utm_medium",m);if(c)q.set("utm_campaign",c);history.replaceState(history.state,"",location.pathname+"?"+q.toString()+location.hash)}}catch(e){}`;
  const loader = `(function(){${rewrite}if(location.hostname!==${JSON.stringify(ANALYTICS_DOMAIN)})return;var s=document.createElement("script");s.defer=true;s.src=${JSON.stringify(UMAMI_SCRIPT)};s.dataset.websiteId=${JSON.stringify(UMAMI_WEBSITE_ID)};s.dataset.domains=${JSON.stringify(ANALYTICS_DOMAIN)};document.head.appendChild(s)})();`;
  return <script dangerouslySetInnerHTML={{ __html: loader }} />;
}
