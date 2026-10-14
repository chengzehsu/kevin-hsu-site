#!/usr/bin/env node
// Short tracked link for one channel or one recipient, PicSee-style but on the site's own domain.
//   pnpm utm threads                         → https://chengzeresume.zeabur.app/?s=threads
//   pnpm utm acme --note "Acme 招募 PM 職缺"  → https://chengzeresume.zeabur.app/resume/?s=acme
//   pnpm utm acme --en --page portfolio       → English portfolio page
//   pnpm utm acme --page ecofirst --m manager → a case page for the hiring manager (same code keeps the
//                                               tailored version; the medium tells the two readers apart)
//   pnpm utm threads-launch --c launch-post   → adds a campaign
//   pnpm utm --list                           → every link made so far
// The site rewrites ?s= into utm_source / utm_medium before Umami loads (components/Analytics.tsx), so the
// dashboard sees ordinary UTM parameters. Channel codes are in lib/share-channels.json; anything else is a
// person or company and reads as "direct". The recipient can read the URL: use a company code, never a name,
// and keep who-is-who in the local log, which is gitignored.
import { readFileSync, existsSync, appendFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const LOG = new URL("../.share-links.local.csv", import.meta.url);
const channels = JSON.parse(readFileSync(new URL("../lib/share-channels.json", import.meta.url), "utf8"));
const MEDIUM = Object.fromEntries(
  ["social", "job-board", "message"].flatMap((medium) => channels[medium].map((code) => [code, medium])),
);
const PATTERN = /^[a-z0-9][a-z0-9_-]{0,39}$/;
// Recruiters get the résumé (the default for people); hiring managers get the case closest to the role.
const CASES = ["ecofirst", "grocery", "health-app", "cdp", "namecard", "podcast-stock"];
const PAGES = {
  home: "/",
  resume: "/resume/",
  portfolio: "/portfolio/",
  ...Object.fromEntries(CASES.map((id) => [id, `/cases/${id}/`])),
};
const VALUED = ["--page", "--note", "--c", "--m"];

const args = process.argv.slice(2);
const option = (name) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] : undefined;
};
const readLog = () =>
  existsSync(LOG)
    ? readFileSync(LOG, "utf8").trim().split("\n").slice(1).filter(Boolean).map((line) => line.split("\t"))
    : [];

if (args.includes("--list")) {
  const rows = readLog();
  if (!rows.length) console.log("還沒有產生過連結。");
  for (const [date, code, medium, url, note] of rows) console.log(`${date}  ${code.padEnd(18)} ${medium.padEnd(9)} ${note || ""}\n            ${url}`);
  process.exit(0);
}

const raw = args.find((arg, i) => !arg.startsWith("--") && !VALUED.includes(args[i - 1]));
const code = (raw ?? "").trim().toLowerCase().replace(/\s+/g, "-");
if (!PATTERN.test(code)) {
  console.error(`用法：pnpm utm <代碼> [--page home|resume|portfolio|${CASES.join("|")}] [--en] [--note 備註] [--c 活動名] [--m medium]`);
  console.error("給人資用預設的履歷頁；給主管用 --page 加案例代號並加 --m manager，同一個代碼保留客製版本，Umami 也分得開兩人。");
  console.error("代碼只能用英文小寫、數字、- 或 _，最長 40 字，例如 threads、acme、acme-pm。");
  process.exit(1);
}

const medium = (option("m") || MEDIUM[code.split("-")[0]] || "direct").toLowerCase();
// People and companies land on the résumé; public posts land on the home page with the film.
const page = option("page") ?? (medium === "social" ? "home" : "resume");
if (!(page in PAGES)) {
  console.error(`未知的 --page "${page}"，可用：${Object.keys(PAGES).join("、")}`);
  process.exit(1);
}

const origin = (process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://chengzeresume.zeabur.app").replace(/\/+$/, "");
const url = new URL(`${args.includes("--en") ? "/en" : ""}${PAGES[page]}`.replace("//", "/"), origin);
url.searchParams.set("s", code);
if (option("m")) url.searchParams.set("m", medium);
if (option("c")) url.searchParams.set("c", option("c"));
const link = url.toString();
const note = (option("note") ?? "").replace(/[\t\n]/g, " ");

// One code per recipient: reusing it would merge two people's visits into one row in Umami. A recruiter
// (direct) and a hiring manager (manager) at the same company share the code on purpose.
const previous = readLog().filter((row) => row[1] === code && row[2] === medium);
if (previous.length && medium === "direct") {
  console.warn(`⚠️ 代碼「${code}」用過了（${previous.map((row) => `${row[0]} ${row[4] || "無備註"}`).join("；")}）。`);
  console.warn(`   如果是給不同的人，請換一個，例如 ${code}-2，否則兩人的瀏覽會算在一起。`);
}

if (!existsSync(LOG)) appendFileSync(LOG, "date\tcode\tmedium\turl\tnote\n");
appendFileSync(LOG, `${new Date().toISOString().slice(0, 10)}\t${code}\t${medium}\t${link}\t${note}\n`);

let copied = false;
try {
  execFileSync("pbcopy", { input: link, stdio: ["pipe", "ignore", "ignore"] });
  copied = true;
} catch {}

console.log(link);
console.log(`${copied ? "已複製到剪貼簿。" : ""}Umami 會記成 utm_source=${code}、utm_medium=${medium}。`);
