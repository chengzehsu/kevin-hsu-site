import { SITE_ORIGIN } from "./locale";

/**
 * Umami Cloud (cookieless, no consent banner). Paste the website ID from the Umami dashboard
 * (Settings → Websites → Edit); while it is empty the site ships no tracking at all.
 * Not a secret: it is visible in every page's HTML once set.
 */
export const UMAMI_WEBSITE_ID = "43329ffa-00ef-4c70-afef-7150de6ed1ae";

export const UMAMI_SCRIPT = "https://cloud.umami.is/script.js";

/** Only the production host is counted, so local previews and Zeabur build checks never show up as visits. */
export const ANALYTICS_DOMAIN = new URL(SITE_ORIGIN).hostname;

/** Custom event names, as they appear under Events in Umami. */
export const EVENTS = {
  printResume: "resume-print",
  filmFullscreen: "film-fullscreen",
} as const;
