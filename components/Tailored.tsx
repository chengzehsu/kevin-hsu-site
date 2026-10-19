"use client";

import { Children, type ReactNode } from "react";
import type { Locale } from "@/lib/locale";
import { useOverlay } from "@/lib/variantStore";
import {
  applyBullets,
  applyOrder,
  type CardField,
  type TextKey,
} from "@/lib/variants";
import { Highlight } from "./Highlight";

/**
 * Wrappers for the fields a tailored link may change. Each renders the main copy it was given until the
 * visitor's variant arrives (see lib/variantStore.ts), so the static HTML and hydration never differ.
 * The element around each one carries `data-v`, which the pending style hides while the variant loads.
 */

/** A free-text field: the variant's wording, or the main copy passed as children. */
export function TText({
  k,
  locale,
  children,
}: {
  k: TextKey;
  locale: Locale;
  children: ReactNode;
}) {
  const text = useOverlay(locale).text[k];
  return text ?? children;
}

/** A featured skill card's statement or summary. */
export function TCard({
  id,
  field,
  locale,
  children,
}: {
  id: string;
  field: CardField;
  locale: Locale;
  children: ReactNode;
}) {
  const text = useOverlay(locale).cards[id]?.[field];
  return text ?? children;
}

/**
 * Re-orders server-rendered children. `ids` names each child in the order given; the variant's order
 * goes first and anything it leaves out follows in the main order.
 */
export function TOrder({
  list,
  ids,
  locale,
  children,
}: {
  list: "skills" | "cases";
  ids: string[];
  locale: Locale;
  children: ReactNode;
}) {
  const overlay = useOverlay(locale);
  const order = list === "skills" ? overlay.skillsOrder : overlay.casesOrder;
  if (!order) return children;
  const items = Children.toArray(children);
  const byId = new Map(ids.map((id, index) => [id, items[index]]));
  return applyOrder(ids, order).map((id) => byId.get(id));
}

/** One role's bullets: the variant's pick and extra line, or the main bullets. */
export function TBullets({
  id,
  bullets,
  locale,
  highlight = false,
}: {
  id: string;
  bullets: string[];
  locale: Locale;
  highlight?: boolean;
}) {
  const shown = applyBullets(bullets, useOverlay(locale).bullets[id]);
  return shown.map((bullet) => (
    <li key={bullet}>{highlight ? <Highlight>{bullet}</Highlight> : bullet}</li>
  ));
}
