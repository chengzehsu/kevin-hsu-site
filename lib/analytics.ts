import { SITE_ORIGIN } from "./locale";
import channels from "./share-channels.json";

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

/**
 * Short share links: `/?s=threads` instead of a full UTM string. The code must look like a slug;
 * its first segment (before "-") picks the medium, so `threads-launch` and `threads` both read as social.
 * Optional `m=` overrides the medium and `c=` sets a campaign.
 */
export const SHORT_PARAM = "s";
export const SHORT_CODE_PATTERN = "^[a-z0-9][a-z0-9_-]{0,39}$";
export const DEFAULT_MEDIUM = "direct";

/** Channel code → utm_medium, flattened from share-channels.json. */
export const CHANNEL_MEDIUM: Record<string, string> = Object.fromEntries(
  (["social", "job-board", "message"] as const).flatMap((medium) =>
    channels[medium].map((code) => [code, medium]),
  ),
);
