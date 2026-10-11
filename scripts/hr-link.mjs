#!/usr/bin/env node
// Builds a tracked link for one recipient, e.g. one HR contact at one company.
//   node scripts/hr-link.mjs <company> [--page home|resume|portfolio] [--en] [--via email|linkedin|104|cakeresume|line]
// In Umami, filter by utm_source to see whether that company opened it and which pages they read.
// Use a short company code (e.g. "acme"), never a person's name: the recipient can read the URL.
const args = process.argv.slice(2);
const company = args.find((arg) => !arg.startsWith("--") && !isValue(arg));
if (!company) {
  console.error("Usage: node scripts/hr-link.mjs <company> [--page home|resume|portfolio] [--en] [--via email|linkedin|104]");
  process.exit(1);
}
const option = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};
function isValue(arg) {
  const index = args.indexOf(arg);
  return index > 0 && ["--page", "--via"].includes(args[index - 1]);
}

const origin = (process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://chengzeresume.zeabur.app").replace(/\/+$/, "");
const prefix = args.includes("--en") ? "/en" : "";
const paths = { home: "/", resume: "/resume/", portfolio: "/portfolio/" };
const page = option("page", "resume");
if (!(page in paths)) {
  console.error(`Unknown --page "${page}"; use one of: ${Object.keys(paths).join(", ")}`);
  process.exit(1);
}

const slug = company.trim().toLowerCase().replace(/\s+/g, "-");
const url = new URL(`${prefix}${paths[page]}`.replace("//", "/"), origin);
url.searchParams.set("utm_source", slug);
url.searchParams.set("utm_medium", option("via", "email"));
url.searchParams.set("utm_campaign", "job-application");
console.log(url.toString());
