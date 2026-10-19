/**
 * Tracked link for one application: the same shape `pnpm utm` (scripts/share-link.mjs) prints, so a link
 * made in /admin/ and one made in the terminal are interchangeable.
 */
export const LINK_PAGES = {
  // Recruiters land on the résumé; a hiring manager gets the case closest to the role.
  resume: { path: "/resume/", label: "一頁履歷（給人資）" },
  "case-ecofirst": { path: "/cases/ecofirst/", label: "案例：AI 節能產品（給主管）", medium: "manager" },
  "case-grocery": { path: "/cases/grocery/", label: "案例：蔬果電商（給主管）", medium: "manager" },
  "case-health-app": { path: "/cases/health-app/", label: "案例：健康 App（給主管）", medium: "manager" },
  "case-cdp": { path: "/cases/cdp/", label: "案例：跨通路資料（給主管）", medium: "manager" },
  home: { path: "/", label: "首頁" },
  portfolio: { path: "/portfolio/", label: "作品集" },
} as const;
export type LinkPage = keyof typeof LINK_PAGES;

export function trackedUrl(origin: string, code: string, page: LinkPage, english: boolean): string {
  const path = `${english ? "/en" : ""}${LINK_PAGES[page].path}`.replace("//", "/");
  const url = new URL(path, origin);
  url.searchParams.set("s", code);
  // Same code keeps the tailored version; the medium tells the hiring manager apart from the recruiter.
  const entry = LINK_PAGES[page] as { medium?: string };
  if (entry.medium) url.searchParams.set("m", entry.medium);
  return url.toString();
}
