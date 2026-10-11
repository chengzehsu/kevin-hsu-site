import {
  ANALYTICS_DOMAIN,
  UMAMI_SCRIPT,
  UMAMI_WEBSITE_ID,
} from "@/lib/analytics";

/**
 * Page views plus UTM parameters go to Umami; renders nothing until a website ID is set in lib/analytics.ts.
 * The static export cannot know its host at build time, so a tiny inline check adds the tracker only on the
 * production host: localhost and preview URLs never even download it. data-domains stays as a second guard.
 */
export function Analytics() {
  if (!UMAMI_WEBSITE_ID) return null;
  const loader = `(function(){if(location.hostname!==${JSON.stringify(ANALYTICS_DOMAIN)})return;var s=document.createElement("script");s.defer=true;s.src=${JSON.stringify(UMAMI_SCRIPT)};s.dataset.websiteId=${JSON.stringify(UMAMI_WEBSITE_ID)};s.dataset.domains=${JSON.stringify(ANALYTICS_DOMAIN)};document.head.appendChild(s)})();`;
  return <script dangerouslySetInnerHTML={{ __html: loader }} />;
}
