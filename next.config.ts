import type { NextConfig } from "next";

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
