/**
 * Client-side state for tailored links. The server render and the first client render always use the
 * main copy (getServerSnapshot), so hydration matches; the overlay arrives afterwards and the wrappers in
 * components/Tailored.tsx re-render from it. The head script in components/TailoredBoot.tsx has already
 * hidden overridable fields for visitors who carry a code; finish() shows them again, overlay or not.
 */
import { useSyncExternalStore } from "react";
import type { Locale } from "./locale";
import { BACKEND_ORIGIN } from "./locale";
import { EMPTY_OVERLAY, PENDING_ATTR, WAIT_MS, sanitizeOverlay, type Overlay } from "./variants";

/** PocketBase JS SDK's default localStorage key for the signed-in admin. */
export const AUTH_STORAGE_KEY = "pocketbase_auth";
const FULL_FONT_CSS =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap";

type Snapshot = Readonly<Record<Locale, Overlay>>;
const MAIN: Snapshot = Object.freeze({ zh: EMPTY_OVERLAY, en: EMPTY_OVERLAY });

let snapshot: Snapshot = MAIN;
let started = false;
const listeners = new Set<() => void>();

function publish(next: Snapshot) {
  snapshot = next;
  for (const listener of listeners) listener();
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** The overlay for a locale; the main copy (empty overlay) until a variant has loaded. */
export function useOverlay(locale: Locale): Overlay {
  return useSyncExternalStore(
    subscribe,
    () => snapshot[locale],
    () => MAIN[locale],
  );
}

function finish() {
  document.documentElement.removeAttribute(PENDING_ATTR);
}

/** Loads the full Noto Sans TC as a fallback face; the browser fetches only the slices it needs. */
export function loadFullFont() {
  if (document.querySelector(`link[data-full-font]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = FULL_FONT_CSS;
  link.dataset.fullFont = "";
  document.head.appendChild(link);
}

function isEmpty(overlay: Overlay) {
  return (
    !Object.keys(overlay.text).length &&
    !Object.keys(overlay.cards).length &&
    !Object.keys(overlay.bullets).length &&
    !overlay.skillsOrder &&
    !overlay.casesOrder
  );
}

function ownerToken(): string | null {
  try {
    const saved = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) ?? "null");
    return saved?.record?.collectionName === "owners" &&
      typeof saved.token === "string"
      ? saved.token
      : null;
  } catch {
    return null;
  }
}

async function fetchJson(
  url: string,
  init: RequestInit = {},
): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), WAIT_MS);
  try {
    const res = await fetch(url, {
      ...init,
      signal: controller.signal,
      credentials: "omit",
    });
    return res.ok ? await res.json() : null;
  } finally {
    clearTimeout(timer);
  }
}

declare global {
  interface Window {
    __tailoredCode?: string;
    /** Started by the head script (components/TailoredBoot.tsx) as soon as the code is known. */
    __tailoredOverlay?: Promise<unknown>;
  }
}

const isPending = () => document.documentElement.getAttribute(PENDING_ATTR) === "pending";

function apply(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const raw = body as Record<string, unknown>;
  const next: Snapshot = { zh: sanitizeOverlay(raw.zh), en: sanitizeOverlay(raw.en) };
  if (isEmpty(next.zh) && isEmpty(next.en)) return false;
  loadFullFont();
  publish(next);
  return true;
}

/**
 * Runs once per page load. A visitor with a code gets the overlay the head script already requested,
 * but only while the fields are still hidden: after WAIT_MS the main copy is showing, and swapping it
 * then would be the visible change this feature promises never to make.
 * `?preview=<variantId>` applies a variant only for the signed-in owner, so the admin can check a draft.
 */
export async function startVariants() {
  if (started) return;
  started = true;
  if (!BACKEND_ORIGIN) return finish();

  const preview = new URLSearchParams(location.search).get("preview");
  const token = preview && /^[a-z0-9]{1,32}$/.test(preview) ? ownerToken() : null;

  try {
    if (token) {
      apply(
        await fetchJson(`${BACKEND_ORIGIN}/api/collections/variants/records/${preview}`, {
          headers: { Authorization: token },
        }),
      );
    } else if (window.__tailoredOverlay) {
      const body = await window.__tailoredOverlay;
      if (isPending()) apply(body);
    }
  } catch (error) {
    console.warn("tailored link: showing the main copy", error);
  } finally {
    // One frame later, so the re-render with the overlay is committed before the fields show again.
    requestAnimationFrame(finish);
  }
}
