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

/** How many work cases, by rank, the home page and /portfolio/ both feature. */
export const FEATURED_COUNT = 4;

/** Fills {work}, {side}, {total}, and {featured} in a label, so counts always come from the data. */
export function fillCounts(template: string, items: CaseStudy[]): string {
  const side = items.filter((item) => item.kind === "side").length;
  return template
    .replace("{work}", String(items.length - side))
    .replace("{side}", String(side))
    .replace("{total}", String(items.length))
    .replace("{featured}", String(FEATURED_COUNT));
}

/** The short case name: the part of the title before the colon, e.g. "AI 節能產品：…" / "AI energy product: …". */
export function caseName(item: Pick<CaseStudy, "title">): string {
  return item.title.split(/[：:]/)[0];
}

/** Cases that take two grid cells, so ten cases fill a 3 by 4 grid with no empty cell. */
export const WIDE_CASES = ["internal-backend", "resume-site"];
