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
