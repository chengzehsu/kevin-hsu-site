import type { NextConfig } from "next";

// A Cloudflare production build without these silently ships Zeabur canonicals, no analytics, and no
// tailored links, so fail it instead. Preview branches may leave them unset.
if (process.env.CF_PAGES_BRANCH === "main") {
  const missing = [
    "NEXT_PUBLIC_SITE_ORIGIN",
    "NEXT_PUBLIC_BACKEND_ORIGIN",
  ].filter((name) => !process.env[name]?.trim());
  if (missing.length)
    throw new Error(
      `Set ${missing.join(" and ")} in the Cloudflare Pages production variables.`,
    );
}

const nextConfig: NextConfig = {
  output: "export",
  outputFileTracingRoot: process.cwd(),
  trailingSlash: true,
  images: { unoptimized: true },
  transpilePackages: ["three"],
  turbopack: { root: process.cwd() },
  // Two root layouts ((zh) and en) leave no shared layout for not-found.tsx.
  experimental: { globalNotFound: true },
};

export default nextConfig;
