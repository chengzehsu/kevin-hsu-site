import type { CaseStudy } from "@/content/types";

/**
 * The single case order used everywhere a case shows its number: work cases by rank, then the
 * after-hours projects by rank. /portfolio/ numbering and a case page's "0X / 0N" must agree.
 */
export function orderCases(items: CaseStudy[]): CaseStudy[] {
  const byRank = [...items].sort((a, b) => a.rank - b.rank);
  return [
    ...byRank.filter((item) => item.kind !== "side"),
    ...byRank.filter((item) => item.kind === "side"),
  ];
}

/** Cases kept off the portfolio list and case-to-case navigation; their pages and old links stay live. */
export const UNLISTED_CASES = ["life-hub", "resume-site"];

/** The cases a visitor browses, leaving out the unlisted ones. */
export function listedCases(items: CaseStudy[]): CaseStudy[] {
  return items.filter((item) => !UNLISTED_CASES.includes(item.id));
}

/** How many work cases, by rank, the home page and /portfolio/ both feature. */
export const FEATURED_COUNT = 4;

/** The cases on the home shelf: recent work first in weight, so a 2020 project does not take a slot. */
export const HOME_CASES = ["internal-backend", "grocery", "health-app", "sales-faq"];

/** Fills {work}, {side}, {total}, and {featured} in a label, so counts always come from the data. */
export function fillCounts(template: string, all: CaseStudy[]): string {
  const items = listedCases(all);
  const side = items.filter((item) => item.kind === "side").length;
  return template
    .replace("{work}", String(items.length - side))
    .replace("{side}", String(side))
    .replace("{total}", String(items.length))
    .replace("{featured}", String(FEATURED_COUNT));
}

/** The short case name: the part of the title before the colon, e.g. "內部後台：…" / "Internal platform: …". */
export function caseName(item: Pick<CaseStudy, "title">): string {
  return item.title.split(/[：:]/)[0];
}

/** Cases that take two grid cells, so seven cases fill a 3 by 3 grid with no empty cell. */
export const WIDE_CASES = ["internal-backend", "sales-faq"];
