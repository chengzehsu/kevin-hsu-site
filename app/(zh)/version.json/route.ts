import { execFileSync } from "node:child_process";

export const dynamic = "force-static";

/** The commit this build came from; the admin stamps it on each application as the site version sent. */
function commit(): string {
  const fromHost = (
    process.env.CF_PAGES_COMMIT_SHA || process.env.ZEABUR_GIT_COMMIT_SHA
  )?.trim();
  if (fromHost) return fromHost.slice(0, 7);
  try {
    return execFileSync("git", ["rev-parse", "--short", "HEAD"], {
      encoding: "utf8",
    }).trim();
  } catch {
    return "unknown";
  }
}

export function GET() {
  return Response.json({ commit: commit(), builtAt: new Date().toISOString() });
}
