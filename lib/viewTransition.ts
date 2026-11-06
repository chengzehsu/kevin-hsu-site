import type { CSSProperties } from "react";

/**
 * The name a case's picture carries across pages, so a card cover morphs into the case page hero.
 * One element per page may carry a given name; case ids are valid CSS identifiers.
 */
export function caseTransition(id: string): CSSProperties {
  return { viewTransitionName: `case-${id}` };
}
