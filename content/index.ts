import type { Locale } from "@/lib/locale";
import type { SiteContent } from "./types";
import { zh } from "./zh";
import { en } from "./en";

export type { SiteContent } from "./types";

const CONTENT: Record<Locale, SiteContent> = { zh, en };

export function getContent(locale: Locale): SiteContent {
  return CONTENT[locale];
}
