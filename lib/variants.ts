/**
 * Tailored links: a tracked link (`?s=<code>`) can carry a variant, a sparse overlay of the few fields a
 * recruiter reads first. Everything here is pure so the site, the admin and the tests share one rule set.
 * Facts (numbers, cases, roles) stay in content/*.ts; an overlay only re-words or re-orders emphasis.
 */
import { resolveTailoredCode, SHORT_CODE_PATTERN } from "./shortCode.ts";

/** Free-text fields, keyed the same way in the backend's `zh` / `en` JSON. */
export const TEXT_KEYS = [
  "hero.headline",
  "resume.headline",
  "resume.summary",
  "resume.keywords",
] as const;
export type TextKey = (typeof TEXT_KEYS)[number];

/** Featured skill card text, per card id: `skills.card.<id>.statement` / `.summary`. */
export const CARD_FIELDS = ["statement", "summary"] as const;
export type CardField = (typeof CARD_FIELDS)[number];

export interface BulletSpec {
  /** Indices into the main bullets, in the order to show them. */
  pick: number[];
  /** One extra line shown after the picked bullets. */
  extra?: string;
}

export interface Overlay {
  text: Partial<Record<TextKey, string>>;
  /** Card id → field → text. */
  cards: Record<string, Partial<Record<CardField, string>>>;
  /** Featured skill ids in display order. */
  skillsOrder?: string[];
  /** Experience id → bullets to show. */
  bullets: Record<string, BulletSpec>;
  /** Case ids in display order. */
  casesOrder?: string[];
}

export const EMPTY_OVERLAY: Overlay = Object.freeze({
  text: {},
  cards: {},
  bullets: {},
}) as Overlay;

const MAX_TEXT = 2000;
const MAX_EXTRA = 400;
const ID = /^[a-z0-9][a-z0-9-]{0,63}$/;

const isText = (value: unknown, max: number): value is string =>
  typeof value === "string" && value.trim().length > 0 && value.length <= max;
const idList = (value: unknown): string[] | undefined =>
  Array.isArray(value) &&
  value.every((id) => typeof id === "string" && ID.test(id))
    ? [...new Set(value as string[])]
    : undefined;

/**
 * Turns whatever the backend sent into an Overlay. Unknown keys, wrong types and malformed ids are dropped
 * one field at a time; this never throws, so one bad field cannot hide the rest of a variant.
 */
export function sanitizeOverlay(raw: unknown): Overlay {
  if (!raw || typeof raw !== "object" || Array.isArray(raw))
    return EMPTY_OVERLAY;
  const overlay: Overlay = { text: {}, cards: {}, bullets: {} };
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if ((TEXT_KEYS as readonly string[]).includes(key)) {
      if (isText(value, MAX_TEXT)) overlay.text[key as TextKey] = value.trim();
      continue;
    }
    if (key === "skills.order") {
      overlay.skillsOrder = idList(value);
      continue;
    }
    if (key === "cases.order") {
      overlay.casesOrder = idList(value);
      continue;
    }
    const card = key.match(/^skills\.card\.([a-z0-9-]+)\.(statement|summary)$/);
    if (card) {
      if (isText(value, MAX_TEXT))
        (overlay.cards[card[1]] ??= {})[card[2] as CardField] = value.trim();
      continue;
    }
    const bullets = key.match(/^experience\.([a-z0-9-]+)\.bullets$/);
    if (
      bullets &&
      value &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      const { pick, extra } = value as Record<string, unknown>;
      const indices = Array.isArray(pick)
        ? [
            ...new Set(
              pick.filter(
                (n): n is number => Number.isInteger(n) && n >= 0 && n < 50,
              ),
            ),
          ]
        : [];
      const spec: BulletSpec = { pick: indices };
      if (isText(extra, MAX_EXTRA)) spec.extra = extra.trim();
      if (spec.pick.length || spec.extra) overlay.bullets[bullets[1]] = spec;
    }
  }
  return overlay;
}

/** Ids in overlay order first (unknown ids skipped), then every remaining id in its main order. */
export function applyOrder(
  mainIds: readonly string[],
  order: readonly string[] | undefined,
): string[] {
  if (!order?.length) return [...mainIds];
  const known = new Set(mainIds);
  const first = order.filter((id) => known.has(id));
  const placed = new Set(first);
  return [...first, ...mainIds.filter((id) => !placed.has(id))];
}

/**
 * The bullets to show for one role: picked main bullets (out-of-range indices skipped) and the extra line.
 * With no spec, or a spec that would leave nothing, the main bullets stay as they are.
 */
export function applyBullets(
  main: readonly string[],
  spec: BulletSpec | undefined,
): string[] {
  if (!spec) return [...main];
  const picked = spec.pick.filter((i) => i < main.length).map((i) => main[i]);
  const shown = spec.extra ? [...picked, spec.extra] : picked;
  return shown.length ? shown : [...main];
}

/** Session storage key holding the code for the rest of the visit. */
export const SESSION_KEY = "tailored-code";
/** Attribute on <html> while a visitor's variant loads, and the longest the fields stay hidden. */
export const PENDING_ATTR = "data-variant";
export const WAIT_MS = 1200;

/**
 * A visitor's tailored code from `s`, then `utm_source`, then the code saved earlier this visit; null for
 * an invalid or channel code. The same function TailoredBoot ships as its head script.
 */
export function resolveCode(
  search: string,
  saved: string | null,
  channels: Readonly<Record<string, string>>,
): string | null {
  return resolveTailoredCode(search, saved, SHORT_CODE_PATTERN, channels);
}

/**
 * Numbers as the site writes them: +233%, −99%, 1,000 萬, NT$1 億, 300 → 1,000, 12 人.
 * The admin warns when an override uses one the main copy never does.
 */
export function numericTokens(text: string): string[] {
  const found =
    text.match(
      /(?:NT\$)?[+−-]?\d[\d,.]*\s?(?:%|萬|億|人|筆|年|倍|個|段|位|間|棟|天|週|小時|分鐘|x|M|K)?/g,
    ) ?? [];
  return [
    ...new Set(
      found
        .map((t) => t.replace(/\s+/g, " ").trim())
        .filter((t) => /\d/.test(t)),
    ),
  ];
}
