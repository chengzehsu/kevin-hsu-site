// Offline source for the 35s launch-style hero film. Never shipped to visitors.
// Each career stage ships as a "version" that adds a capability to the radar; the close is the one habit a hiring
// director gets on day one (fuzzy problem → running prototype → shipped result). Frame 35 returns to frame 0 (blank + cursor).
const lang =
  new URLSearchParams(location.search).get("lang") === "en" ? "en" : "zh";

const COPY = {
  zh: {
    open: ["產品卡住的地方，通常不在需求清單上。", "而在沒人定義過的流程，和使用者沒說出口的痛點裡。"],
    stackTitle: "能力雷達",
    versions: [
      {
        year: "2019",
        org: "眾碩投資 · 產品助理",
        title: "先驗證，再動手。",
        metric: "陪 2 家早期公司走到市場驗證",
        chips: [["市場驗證", 0]],
      },
      {
        year: "2020",
        org: "歐可達數據 · Product Manager",
        title: "讓資料說話。",
        metric: "5 個通路 · 1,000 萬筆客戶資料",
        chips: [["資料產品化", 3]],
      },
      {
        year: "2021",
        org: "Fable 寓意科技 · Senior Project Manager",
        title: "在壓力下規模化。",
        metric: "300 → 1,000 單／日 (+233%)",
        extra: "健康 App DAU +66% · 2022 PMI 卓越獎",
        chips: [["流程盤點", 2], ["帶 10 人團隊交付", 4]],
      },
      {
        year: "2023",
        org: "獨立顧問",
        title: "從商業策略拆到 Roadmap。",
        metric: "協助約 100 棟房源的 SaaS 產品化",
        chips: [["策略到 Roadmap", 0]],
      },
      {
        year: "2024",
        org: "知識衛星 · Senior Product Manager",
        title: "三種使用者，一份優先序。",
        metric: "3 週驗證香港市場",
        chips: [["三種角色訪談", 1]],
      },
      {
        year: "2025",
        org: "台灣愛淨 Ecofirst · Product Manager",
        title: "把 AI 放進真實工作。",
        metric: "交付效率 +50% · 案場營運 +20%",
        chips: [["案場流程", 2], ["用 AI 做工具", 5]],
      },
    ],
    visual: {
      channels: ["LINE", "Facebook", "官網", "電商", "POS"],
      tree: ["商業策略", "產品策略", "Roadmap"],
      personas: ["人資", "主管", "員工"],
      unit: "單／日",
    },
    recap: "六段經歷，練成同一個習慣。",
    axes: ["產品策略", "使用者研究", "流程與營運", "資料與系統", "團隊交付", "AI 交付"],
    stepsTitle: "給我一個模糊的問題，我還你一個能跑的版本。",
    steps: [
      { step: "01 · 現場", head: "找出卡住的那一步", body: "訪談使用者，拆開流程", proof: "3 週驗證香港市場" },
      { step: "02 · 原型", head: "開發前，先讓它能跑", body: "用 AI 和假資料先驗證", proof: "2 個月 218 次提交" },
      { step: "03 · 交付", head: "上線，再看數字", body: "和工程、營運一起交付", proof: "交付效率 +50%" },
    ],
    name: "許承澤 Kevin Hsu",
    role: "Product Manager · AI · B2C 平台 · 跨團隊交付",
    tagline: "先讓它能跑，再讓它上線。",
  },
  en: {
    open: [
      "Products rarely get stuck on the requirements list.",
      "They get stuck in undefined workflows, and in pains users never say out loud.",
    ],
    stackTitle: "Skills radar",
    versions: [
      {
        year: "2019",
        org: "Zhongshuo Investment · Product Assistant",
        title: "Validate first, then build.",
        metric: "2 early-stage ventures taken to market tests",
        chips: [["Market validation", 0]],
      },
      {
        year: "2020",
        org: "Oakda Data · Product Manager",
        title: "Make data speak.",
        metric: "5 channels · 10M customer records",
        chips: [["Data products", 3]],
      },
      {
        year: "2021",
        org: "Fable · Senior Project Manager",
        title: "Scale under pressure.",
        metric: "300 → 1,000 orders/day (+233%)",
        extra: "Health app DAU +66% · 2022 PMI Excellence Award",
        chips: [["Workflow mapping", 2], ["Shipping with 10 engineers", 4]],
      },
      {
        year: "2023",
        org: "Independent consultant",
        title: "From business strategy to roadmap.",
        metric: "Productizing a SaaS for ~100 buildings",
        chips: [["Strategy to roadmap", 0]],
      },
      {
        year: "2024",
        org: "SAT. Knowledge · Senior Product Manager",
        title: "Three users, one priority list.",
        metric: "Hong Kong market validated in 3 weeks",
        chips: [["Interviewing 3 roles", 1]],
      },
      {
        year: "2025",
        org: "Ecofirst · Product Manager",
        title: "Put AI into real work.",
        metric: "Delivery +50% · Site operations +20%",
        chips: [["Field workflows", 2], ["AI-built tools", 5]],
      },
    ],
    visual: {
      channels: ["LINE", "Facebook", "Website", "E-commerce", "POS"],
      tree: ["Business", "Product", "Roadmap"],
      personas: ["HR", "Manager", "Employee"],
      unit: "orders/day",
    },
    recap: "Six chapters. One habit.",
    axes: ["Strategy", "Research", "Operations", "Data & systems", "Team delivery", "AI delivery"],
    stepsTitle: "Hand me a fuzzy problem. Get back something that runs.",
    steps: [
      { step: "01 · Field", head: "Find the step that's really stuck", body: "Interview users, take the workflow apart", proof: "Hong Kong market validated in 3 weeks" },
      { step: "02 · Prototype", head: "Make it run before the build", body: "Validate with AI and mock data", proof: "218 commits in 2 months" },
      { step: "03 · Ship", head: "Launch, then read the numbers", body: "Ship with engineering and ops", proof: "Delivery +50%" },
    ],
    name: "Kevin Hsu",
    role: "Product Manager · AI · B2C platforms · Cross-team delivery",
    tagline: "Make it run. Then ship it.",
  },
}[lang];

// Dark stage with one moving key light: contrast is what makes it read as film rather than slides.
const C = {
  bg: "#070b14",
  ink: "#eef3fa",
  muted: "#8fa1b8",
  faint: "#2a3850",
  line: "rgba(255,255,255,.12)",
  cobalt: "#4a86e0",
  cyan: "#4fd0f0",
  teal: "#3ec9a7",
  amber: "#f0a647",
  card: "rgba(20,30,48,.72)",
  soft: "rgba(255,255,255,.07)",
  soft2: "rgba(255,255,255,.16)",
};
const GLASS = {
  background: "rgba(20,30,48,.72)",
  border: "1px solid rgba(255,255,255,.10)",
  boxShadow: "0 50px 120px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.16)",
  backdropFilter: "blur(18px)",
  overflow: "hidden",
};
const FONT =
  lang === "zh"
    ? '"PingFang TC", "Noto Sans TC", -apple-system, sans-serif'
    : '-apple-system, "SF Pro Display", "Helvetica Neue", sans-serif';

const clamp = (v) => Math.min(1, Math.max(0, v));
const ease = (v) => {
  const t = clamp(v);
  return 1 - Math.pow(1 - t, 3);
};
const smooth = (v) => {
  const t = clamp(v);
  return t * t * (3 - 2 * t);
};
const span = (t, a, b) => ease((t - a) / (b - a));
const lerp = (a, b, p) => a + (b - a) * p;

function h(tag, style = {}, parent = stage, text) {
  const node = document.createElement(tag);
  Object.assign(node.style, style);
  if (text !== undefined) node.textContent = text;
  parent.append(node);
  return node;
}
function svg(markup, style, parent) {
  const box = h("div", style, parent);
  box.innerHTML = markup;
  return box;
}
function show(node, opacity, x = 0, y = 0, scale = 1, blur = 0) {
  node.style.opacity = opacity;
  node.style.visibility = opacity > 0.001 ? "visible" : "hidden";
  node.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  node.style.filter = blur > 0.05 ? `blur(${blur}px)` : "none";
}

document.body.style.margin = "0";
const stage = h(
  "div",
  {
    position: "relative",
    width: "1600px",
    height: "1000px",
    overflow: "hidden",
    background: C.bg,
    fontFamily: FONT,
    color: C.ink,
    transform: "scale(.9)",
    transformOrigin: "0 0",
    WebkitFontSmoothing: "antialiased",
  },
  document.body,
);
const abs = (s) => ({ position: "absolute", ...s });

// Light: slow diagonal beams plus a key light that follows whatever the film is talking about.
const beams = h(
  "div",
  abs({
    inset: "-20%",
    background:
      "linear-gradient(115deg, transparent 36%, rgba(120,170,255,.10) 43%, transparent 50%), linear-gradient(115deg, transparent 57%, rgba(120,170,255,.06) 61%, transparent 67%)",
  }),
);
const glow = h(
  "div",
  abs({
    left: "0",
    top: "0",
    width: "1300px",
    height: "900px",
    marginLeft: "-650px",
    marginTop: "-450px",
    borderRadius: "50%",
    background:
      "radial-gradient(closest-side, rgba(90,150,255,.34), rgba(40,90,190,.14) 55%, rgba(7,11,20,0))",
    mixBlendMode: "screen",
  }),
);

// ── Cold open ────────────────────────────────────────────────────────────────
const openBox = h(
  "div",
  abs({ left: "110px", right: "110px", top: lang === "zh" ? "400px" : "330px", textAlign: "center" }),
);
const open1 = h(
  "div",
  {
    fontSize: lang === "zh" ? "72px" : "64px",
    fontWeight: "600",
    letterSpacing: "-.02em",
    whiteSpace: "pre-wrap",
  },
  openBox,
);
const open2 = h(
  "div",
  {
    fontSize: lang === "zh" ? "54px" : "48px",
    fontWeight: "600",
    letterSpacing: "-.02em",
    color: C.cobalt,
    marginTop: "14px",
  },
  openBox,
  COPY.open[1],
);
const cursor = h("span", {
  display: "inline-block",
  width: "4px",
  height: "64px",
  background: C.cobalt,
  verticalAlign: "-10px",
  marginLeft: "6px",
  borderRadius: "2px",
});

// ── Version cards, capability stack, timeline ───────────────────────────────
const WINDOWS = [
  [4, 6.5],
  [6.5, 9],
  [9, 13.6],
  [13.6, 16],
  [16, 18.4],
  [18.4, 22],
];
const cardStyle = abs({
  left: "80px",
  top: "150px",
  width: "960px",
  height: "640px",
  borderRadius: "32px",
  ...GLASS,
  padding: "44px 52px",
  boxSizing: "border-box",
});
const vis = COPY.visual;
const VISUALS = [
  // 2019: a wireframe sketched block by block, then sent out to market test dots.
  () => `<svg width="848" height="280" viewBox="0 0 756 250"><rect x="40" y="10" width="130" height="230" rx="22" fill="none" stroke="${C.ink}" stroke-width="4"/>
    ${[0, 1, 2].map((i) => `<rect data-k="block" data-i="${i}" x="60" y="${40 + i * 62}" width="90" height="46" rx="8" fill="${i === 0 ? C.cobalt : C.faint}"/>`).join("")}
    <path data-k="draw" d="M200 125 C 300 125, 330 60, 430 60 M200 125 C 300 125, 330 190, 430 190 M200 125 L 430 125" fill="none" stroke="${C.cobalt}" stroke-width="3" stroke-dasharray="600" stroke-dashoffset="600"/>
    ${[60, 125, 190].map((y, i) => `<circle data-k="pop" data-i="${i}" cx="450" cy="${y}" r="16" fill="${C.cyan}"/>`).join("")}</svg>`,
  // 2020: five channels converge into one customer.
  () => `<svg width="848" height="280" viewBox="0 0 756 250">${vis.channels
    .map(
      (
        c,
        i,
      ) => `<g data-k="pop" data-i="${i}"><rect x="10" y="${6 + i * 48}" width="150" height="36" rx="18" fill="${C.soft}"/><text x="85" y="${30 + i * 48}" text-anchor="middle" font-size="24" font-weight="600" fill="${C.ink}" font-family='${FONT}'>${c}</text></g>
      <path data-k="draw" d="M165 ${24 + i * 48} C 300 ${24 + i * 48}, 330 125, 460 125" fill="none" stroke="${C.cobalt}" stroke-width="3" stroke-dasharray="400" stroke-dashoffset="400"/>`,
    )
    .join("")}
    <circle cx="500" cy="125" r="44" fill="${C.cobalt}"/><circle cx="500" cy="110" r="14" fill="#fff"/><path d="M474 150 a26 22 0 0 1 52 0 z" fill="#fff"/></svg>`,
  // 2021: throughput line from 300 to 1,000.
  () => `<svg width="848" height="280" viewBox="0 0 756 250"><line x1="30" y1="220" x2="720" y2="220" stroke="${C.line}" stroke-width="3"/>
    <path data-k="draw" d="M30 190 L 180 186 L 300 178 L 390 150 L 470 100 L 560 62 L 700 40" fill="none" stroke="${C.cobalt}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="900" stroke-dashoffset="900"/>
    <text data-k="count" x="30" y="52" text-anchor="start" font-size="50" font-weight="700" fill="${C.ink}" font-family='${FONT}'>300</text>
    <text x="700" y="248" text-anchor="end" font-size="24" fill="${C.muted}" font-family='${FONT}'>${vis.unit}</text></svg>`,
  // 2023: strategy cascades into a roadmap.
  () => `<svg width="848" height="280" viewBox="0 0 756 250">${vis.tree.map((label, i) => `<g data-k="pop" data-i="${i}"><rect x="${20 + i * 250}" y="95" width="200" height="64" rx="16" fill="${i === 2 ? C.cobalt : C.soft}"/><text x="${120 + i * 250}" y="135" text-anchor="middle" font-size="28" font-weight="600" fill="${i === 2 ? "#fff" : C.ink}" font-family='${FONT}'>${label}</text></g>`).join("")}
    ${[0, 1].map((i) => `<path data-k="draw" d="M${222 + i * 250} 127 L ${268 + i * 250} 127" stroke="${C.cobalt}" stroke-width="4" stroke-dasharray="60" stroke-dashoffset="60" fill="none"/>`).join("")}</svg>`,
  // 2024: three roles, one prioritised list.
  () => `<svg width="848" height="280" viewBox="0 0 756 250">${vis.personas
    .map(
      (
        label,
        i,
      ) => `<g data-k="pop" data-i="${i}"><circle cx="80" cy="${40 + i * 85}" r="30" fill="${[C.cobalt, C.cyan, C.muted][i]}"/><text x="130" y="${47 + i * 85}" font-size="26" font-weight="600" fill="${C.ink}" font-family='${FONT}'>${label}</text></g>
      <path data-k="draw" d="M${lang === "zh" ? 200 : 240} ${40 + i * 85} C 320 ${40 + i * 85}, 340 125, 440 125" fill="none" stroke="${C.cobalt}" stroke-width="3" stroke-dasharray="400" stroke-dashoffset="400"/>`,
    )
    .join("")}
    <rect x="450" y="45" width="260" height="160" rx="18" fill="${C.soft}"/>${[0, 1, 2].map((i) => `<g data-k="pop" data-i="${i + 3}"><circle cx="482" cy="${85 + i * 40}" r="11" fill="${C.cobalt}"/><rect x="505" y="${78 + i * 40}" width="${170 - i * 30}" height="14" rx="7" fill="${C.faint}"/></g>`).join("")}</svg>`,
  // 2025: an AI spark assembles a tool, each widget faster than the last.
  () => `<svg width="848" height="280" viewBox="0 0 756 250"><g data-k="spark"><path d="M90 60 L102 108 L150 120 L102 132 L90 180 L78 132 L30 120 L78 108 Z" fill="${C.cyan}"/></g>
    <rect x="220" y="10" width="520" height="232" rx="18" fill="${C.soft}"/><circle cx="244" cy="32" r="6" fill="${C.faint}"/><circle cx="264" cy="32" r="6" fill="${C.faint}"/><circle cx="284" cy="32" r="6" fill="${C.faint}"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<rect data-k="pop" data-i="${i}" x="${240 + (i % 3) * 164}" y="${56 + Math.floor(i / 3) * 92}" width="150" height="80" rx="12" fill="${i === 0 ? C.cobalt : C.soft2}"/>`).join("")}</svg>`,
];

const cards = COPY.versions.map((v, i) => {
  const card = h("div", cardStyle);
  const sweep = h("div", abs({ inset: "0", background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,.13) 50%, transparent 60%)", pointerEvents: "none" }), card);
  const top = h(
    "div",
    { display: "flex", alignItems: "center", gap: "10px 16px", flexWrap: "wrap" },
    card,
  );
  h(
    "span",
    {
      fontSize: "26px",
      fontWeight: "700",
      color: "#fff",
      background: C.cobalt,
      borderRadius: "999px",
      padding: "6px 14px",
      letterSpacing: ".02em",
    },
    top,
    `v${v.year}`,
  );
  h(
    "span",
    { fontSize: "28px", fontWeight: "500", color: C.muted },
    top,
    v.org,
  );
  const title = h(
    "div",
    {
      marginTop: "26px",
      fontSize: "64px",
      fontWeight: "700",
      letterSpacing: "-.025em",
      lineHeight: "1.12",
    },
    card,
    v.title,
  );
  const visual = svg(
    VISUALS[i](),
    { marginTop: "26px", height: "280px" },
    card,
  );
  const metric = h(
    "div",
    {
      marginTop: "24px",
      fontSize: "42px",
      fontWeight: "700",
      color: C.cobalt,
      fontVariantNumeric: "tabular-nums",
    },
    card,
    v.metric,
  );
  const extra = v.extra
    ? h(
        "div",
        {
          marginTop: "8px",
          fontSize: "28px",
          fontWeight: "500",
          color: C.muted,
        },
        card,
        v.extra,
      )
    : null;
  return { card, sweep, title, visual, metric, extra, window: WINDOWS[i] };
});

const stackTitle = h(
  "div",
  abs({
    left: "1090px",
    top: "96px",
    fontSize: "26px",
    fontWeight: "600",
    color: C.muted,
    letterSpacing: ".02em",
  }),
  stage,
  COPY.stackTitle,
);
// Skills radar on the six core skills the site lists. Each capability is dragged to its axis tip and the
// polygon grows toward that chapter's shape. Values are relative self-assessment, so no numbers are shown.
const HUES = [C.cyan, C.cobalt, C.teal];
const RADAR = { x: 1320, y: 490, r: 165 };
const RADAR_MEET = { x: 800, y: 510, scale: 1.45 };
const BASE = [0.12, 0.12, 0.12, 0.12, 0.12, 0.08];
// Shape after each capability lands, in chip order: strategy, research, operations, data, team, AI.
const STATES = [
  [0.38, 0.3, 0.16, 0.16, 0.16, 0.08],
  [0.42, 0.36, 0.22, 0.6, 0.32, 0.08],
  [0.5, 0.52, 0.74, 0.62, 0.36, 0.08],
  [0.56, 0.6, 0.76, 0.66, 0.86, 0.1],
  [0.82, 0.64, 0.8, 0.66, 0.88, 0.14],
  [0.86, 0.86, 0.82, 0.74, 0.9, 0.2],
  [0.88, 0.88, 0.94, 0.76, 0.9, 0.42],
  [0.92, 0.9, 0.95, 0.82, 0.93, 0.9],
];
const angle = (k) => -Math.PI / 2 + (k * Math.PI * 2) / 6;
const tip = (k, v = 1) => ({ x: RADAR.x + Math.cos(angle(k)) * RADAR.r * v, y: RADAR.y + Math.sin(angle(k)) * RADAR.r * v });
const radarBox = h("div", abs({ left: `${RADAR.x - 250}px`, top: `${RADAR.y - 250}px`, width: "500px", height: "500px" }));
const local = (k, v) => `${250 + Math.cos(angle(k)) * RADAR.r * v},${250 + Math.sin(angle(k)) * RADAR.r * v}`;
svg(
  `<svg width="500" height="500" viewBox="0 0 500 500">
    ${[0.25, 0.5, 0.75, 1].map((v) => `<polygon points="${[0, 1, 2, 3, 4, 5].map((k) => local(k, v)).join(" ")}" fill="none" stroke="${C.line}" stroke-width="1.5"/>`).join("")}
    ${[0, 1, 2, 3, 4, 5].map((k) => `<line x1="250" y1="250" x2="${local(k, 1).split(",")[0]}" y2="${local(k, 1).split(",")[1]}" stroke="${C.line}" stroke-width="1.5"/>`).join("")}
    <polygon data-k="poly" points="" fill="${C.cobalt}" fill-opacity=".28" stroke="${C.cyan}" stroke-width="3" stroke-linejoin="round"/>
    ${[0, 1, 2, 3, 4, 5].map((k) => `<circle data-k="vertex" data-i="${k}" r="6" fill="${C.cyan}"/>`).join("")}
  </svg>`,
  abs({ inset: "0" }),
  radarBox,
);
const radarGlow = h("div", abs({ left: "100px", top: "100px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(closest-side, rgba(120,190,255,.45), transparent)", mixBlendMode: "screen" }), radarBox);
const axisLabels = COPY.axes.map((label, k) => {
  const x = 250 + Math.cos(angle(k)) * (RADAR.r + 44), y = 250 + Math.sin(angle(k)) * (RADAR.r + 30);
  return h("div", abs({ left: `${x - 90}px`, top: `${y - 16}px`, width: "180px", textAlign: "center", fontSize: lang === "zh" ? "24px" : "20px", fontWeight: "600", color: C.muted, whiteSpace: "nowrap" }), radarBox, label);
});
const chipTimes = [5.1, 7.6, 12.5, 13.1, 14.8, 17.2, 19.7, 20.4];
const chipList = COPY.versions.flatMap((v) => v.chips);
const chips = chipList.map(([label, axis], i) => {
  const chip = h(
    "div",
    abs({ left: "0", top: "0", height: "60px", display: "flex", alignItems: "center", gap: "10px", padding: "0 20px 0 14px", borderRadius: "999px", ...GLASS, fontSize: lang === "zh" ? "28px" : "24px", fontWeight: "600", whiteSpace: "nowrap", zIndex: "4" }),
  );
  h("span", { width: "14px", height: "14px", borderRadius: "50%", background: C.cyan, boxShadow: `0 0 16px ${C.cyan}` }, chip);
  h("span", {}, chip, label);
  return { chip, axis, at: chipTimes[i] };
});

const years = COPY.versions.map((v) => v.year);
const rail = h(
  "div",
  abs({
    left: "120px",
    top: "872px",
    width: "1360px",
    height: "2px",
    background: C.line,
  }),
);
const railFill = h(
  "div",
  { height: "2px", background: C.cobalt, width: "0", transformOrigin: "0 0" },
  rail,
);
const ticks = years.map((year, i) => {
  const x = 120 + (1360 / (years.length - 1)) * i;
  const dot = h(
    "div",
    abs({
      left: `${x - 7}px`,
      top: "866px",
      width: "14px",
      height: "14px",
      borderRadius: "50%",
      background: C.faint,
    }),
  );
  const label = h(
    "div",
    abs({
      left: `${x - 50}px`,
      width: "100px",
      top: "890px",
      textAlign: "center",
      fontSize: "26px",
      fontWeight: "600",
      color: C.muted,
      fontVariantNumeric: "tabular-nums",
    }),
    stage,
    year,
  );
  return { dot, label };
});

// ── Recap, habit, sign-off ─────────────────────────────────────────────────
const recap = h(
  "div",
  abs({
    left: "0",
    right: "0",
    top: "60px",
    textAlign: "center",
    fontSize: "60px",
    fontWeight: "700",
    letterSpacing: "-.02em",
  }),
  stage,
  COPY.recap,
);
const stepsTitle = h(
  "div",
  abs({ left: "0", right: "0", top: "170px", textAlign: "center", fontSize: lang === "zh" ? "60px" : "54px", fontWeight: "700", letterSpacing: "-.02em" }),
  stage,
  COPY.stepsTitle,
);
// One habit, three steps left to right: each tile lights up in turn, as if the problem is handed down the line.
const STEP_HUES = [C.amber, C.cyan, C.teal];
const steps = COPY.steps.map(({ step, head, body, proof }, i) => {
  const tile = h(
    "div",
    abs({ left: `${60 + i * 500}px`, top: "320px", width: "480px", height: "400px", borderRadius: "28px", padding: "40px 36px", boxSizing: "border-box", ...GLASS }),
  );
  const lamp = h("div", abs({ left: "-160px", top: "-200px", width: "560px", height: "520px", borderRadius: "50%", background: `radial-gradient(closest-side, ${STEP_HUES[i]}66, transparent)` }), tile);
  const top = h("div", { position: "relative", display: "flex", alignItems: "center", gap: "14px" }, tile);
  const dot = h("div", { width: "22px", height: "22px", borderRadius: "50%", background: C.faint }, top);
  const stepText = h("div", { fontSize: "28px", fontWeight: "600", color: C.muted, letterSpacing: ".02em" }, top, step);
  const headText = h("div", { position: "relative", marginTop: "34px", fontSize: lang === "zh" ? "46px" : "40px", fontWeight: "700", letterSpacing: "-.02em", lineHeight: "1.2" }, tile, head);
  const rule = h("div", { position: "relative", marginTop: "30px", height: "2px", background: C.line }, tile);
  const bodyText = h("div", { position: "relative", marginTop: "26px", fontSize: lang === "zh" ? "32px" : "29px", fontWeight: "500", lineHeight: "1.4", color: C.muted }, tile, body);
  const proofText = h("div", { position: "relative", marginTop: "22px", fontSize: lang === "zh" ? "32px" : "29px", fontWeight: "700", lineHeight: "1.35", color: STEP_HUES[i] }, tile, proof);
  const sweep = h("div", abs({ inset: "0", background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,.12) 50%, transparent 60%)" }), tile);
  return { tile, lamp, dot, stepText, headText, rule, bodyText, proofText, sweep };
});
// Hand-off chevrons sit on the 20px gutter between tiles.
const handoffs = [0, 1].map((i) =>
  svg(
    `<svg width="56" height="56" viewBox="0 0 56 56"><circle cx="28" cy="28" r="26" fill="${C.bg}" stroke="${C.soft2}" stroke-width="2"/><path d="M23 18 L33 28 L23 38" fill="none" stroke="${C.ink}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    abs({ left: `${522 + i * 500}px`, top: "492px", width: "56px", height: "56px", zIndex: "3" }),
  ),
);
const reveal = h(
  "div",
  abs({ left: "0", right: "0", top: "340px", textAlign: "center" }),
);
const name = h(
  "div",
  {
    fontSize: lang === "zh" ? "112px" : "132px",
    fontWeight: "700",
    letterSpacing: "-.04em",
    lineHeight: "1.05",
    background: `linear-gradient(90deg, #ffffff, #a9cbff 55%, ${C.cyan})`,
    WebkitBackgroundClip: "text",
    color: "transparent",
    paddingBottom: "10px",
  },
  reveal,
  COPY.name,
);
const role = h("div", { marginTop: "18px", fontSize: "34px", fontWeight: "500", color: C.muted }, reveal, COPY.role);
const tagline = h("div", { marginTop: "40px", fontSize: lang === "zh" ? "52px" : "48px", fontWeight: "700", letterSpacing: "-.02em", color: C.ink }, reveal, COPY.tagline);

// Notion-style demo cursor: it drags each new capability from the card into the stack.
const pointer = svg(
  `<svg width="34" height="40" viewBox="0 0 34 40"><path d="M3 2 L3 32 L11 25 L17 38 L23 35 L17 22 L28 22 Z" fill="${C.ink}" stroke="${C.bg}" stroke-width="2.5" stroke-linejoin="round"/></svg>`,
  abs({ left: "0", top: "0", zIndex: "6", transformOrigin: "3px 2px" }),
);
const PICK = { x: 560, y: 740 };

// Lens finish on top of everything: vignette plus a fixed grain (static, so it costs almost nothing to encode).
h("div", abs({ inset: "0", zIndex: "7", background: "radial-gradient(ellipse at 50% 45%, transparent 50%, rgba(0,0,0,.62) 100%)" }));
const grain = h("canvas", abs({ inset: "0", width: "1600px", height: "1000px", zIndex: "8", opacity: ".07", mixBlendMode: "overlay" }));
grain.width = 800;
grain.height = 500;
if (grain.getContext) {
  const g = grain.getContext("2d"), img = g.createImageData(800, 500);
  let seed = 7;
  for (let k = 0; k < img.data.length; k += 4) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const v = seed >>> 24;
    img.data[k] = img.data[k + 1] = img.data[k + 2] = v;
    img.data[k + 3] = 255;
  }
  g.putImageData(img, 0, 0);
}

function drawVisual(card, u) {
  // u: seconds since the card entered.
  card.visual.querySelectorAll('[data-k="block"]').forEach((n) => {
    n.style.opacity = span(
      u,
      0.3 + n.dataset.i * 0.25,
      0.6 + n.dataset.i * 0.25,
    );
  });
  card.visual.querySelectorAll('[data-k="pop"]').forEach((n) => {
    const p = span(u, 0.35 + n.dataset.i * 0.12, 0.7 + n.dataset.i * 0.12);
    n.style.opacity = p;
    n.style.transformBox = "fill-box";
    n.style.transformOrigin = "center";
    n.style.transform = `scale(${0.6 + 0.4 * p})`;
  });
  card.visual.querySelectorAll('[data-k="draw"]').forEach((n) => {
    n.setAttribute(
      "stroke-dashoffset",
      n.getAttribute("stroke-dasharray") * (1 - span(u, 0.45, 1.6)),
    );
  });
  const count = card.visual.querySelector('[data-k="count"]');
  if (count)
    count.textContent = Math.round(
      lerp(300, 1000, smooth((u - 0.45) / 1.4)),
    ).toLocaleString("en-US");
  const spark = card.visual.querySelector('[data-k="spark"]');
  if (spark) {
    spark.style.transformBox = "fill-box";
    spark.style.transformOrigin = "center";
    spark.style.transform = `rotate(${u * 40}deg) scale(${1 + 0.08 * Math.sin(u * 6)})`;
  }
}

function draw(t) {
  // Cold open (0 to 4s) and the closing return to a blank cursor (34.5 to 35s) share one state, so the loop is seamless.
  const typed = Math.floor(clamp((t - 0.3) / 1.3) * COPY.open[0].length);
  open1.textContent = COPY.open[0].slice(0, typed);
  open1.append(cursor);
  cursor.style.opacity =
    t < 1.9 || t > 34.4 ? (Math.floor(t * 2.2) % 2 ? 0.15 : 1) : 0;
  const lift = span(t, 2.1, 2.7);
  show(
    open1,
    t > 34.4 ? 1 : 1 - 0.55 * lift - span(t, 3.5, 4.0),
    0,
    -30 * lift,
  );
  show(open2, lift * (1 - span(t, 3.6, 4.0)), 0, 24 * (1 - lift));
  show(
    openBox,
    t > 34.4 ? 1 : 1 - span(t, 3.7, 4.1),
    0,
    0,
    1 - 0.04 * span(t, 3.7, 4.1),
    6 * span(t, 3.7, 4.1),
  );
  if (t > 34.4) ((open1.textContent = ""), open1.append(cursor));

  cards.forEach((card, i) => {
    const [a, b] = card.window,
      enter = span(t, a - 0.1, a + 0.55),
      exit = span(t, b - 0.35, b + 0.15);
    show(
      card.card,
      enter * (1 - exit),
      160 * (1 - enter) - 120 * exit,
      0,
      1 - 0.06 * exit,
      10 * (1 - enter) + 8 * exit,
    );
    card.card.style.transform += ` perspective(1600px) rotateY(${-10 * (1 - enter) + 6 * exit}deg)`;
    show(
      card.title,
      span(t, a + 0.1, a + 0.6),
      0,
      18 * (1 - span(t, a + 0.1, a + 0.6)),
    );
    show(
      card.metric,
      span(t, a + 0.9, a + 1.3),
      0,
      12 * (1 - span(t, a + 0.9, a + 1.3)),
    );
    if (card.extra) show(card.extra, span(t, a + 1.6, a + 2.0));
    card.sweep.style.transform = `translateX(${lerp(-110, 110, smooth((t - a - 0.2) / 1.1))}%)`;
    drawVisual(card, t - a);
  });

  // 4 to 22s: each capability is dragged to its axis and the polygon grows; 22 to 25s: the radar takes the stage.
  const meet = span(t, 22.0, 23.2), ringsOut = span(t, 24.6, 25.0);
  show(stackTitle, span(t, 4.3, 4.8) * (1 - span(t, 21.8, 22.2)));
  let shape = BASE.slice();
  const pulses = [0, 0, 0, 0, 0, 0];
  chips.forEach(({ chip, axis, at }, i) => {
    const drag = smooth((t - (at - 0.6)) / 0.6), absorbed = span(t, at, at + 0.5);
    shape = shape.map((v, k) => lerp(v, STATES[i][k], absorbed));
    pulses[axis] = Math.max(pulses[axis], Math.sin(Math.PI * clamp((t - at) / 0.5)));
    const end = tip(axis);
    show(chip, span(t, at - 0.6, at - 0.45) * (1 - span(t, at, at + 0.3)), lerp(PICK.x, end.x, drag) - 24, lerp(PICK.y, end.y, drag) - 30, t < at ? 1.02 : 1 - 0.7 * span(t, at, at + 0.3));
  });
  const poly = radarBox.querySelector('[data-k="poly"]');
  if (poly) poly.setAttribute("points", shape.map((v, k) => local(k, v)).join(" "));
  radarBox.querySelectorAll('[data-k="vertex"]').forEach((dot) => {
    const k = Number(dot.dataset.i), [x, y] = local(k, shape[k]).split(",");
    dot.setAttribute("cx", x);
    dot.setAttribute("cy", y);
    dot.setAttribute("r", String(6 + 6 * pulses[k]));
  });
  axisLabels.forEach((label, k) => { label.style.color = pulses[k] > 0.05 ? C.ink : C.muted; });
  show(radarBox, span(t, 4.3, 4.9) * (1 - ringsOut), (RADAR_MEET.x - RADAR.x) * meet, (RADAR_MEET.y - RADAR.y) * meet, lerp(1, RADAR_MEET.scale, meet));
  show(radarGlow, Math.max(...pulses) * 0.6 + span(t, 22.8, 23.6) * (0.8 + 0.2 * Math.sin(t * 3)), 0, 0, 1 + 0.3 * meet);

  const railShow = span(t, 3.8, 4.4) * (1 - span(t, 22.2, 22.8));
  const reached = WINDOWS.reduce((n, [a], i) => (t >= a ? i : n), 0);
  const moving = WINDOWS[reached]
    ? span(t, WINDOWS[reached][0] - 0.1, WINDOWS[reached][0] + 0.5)
    : 1;
  railFill.style.width = `${(1360 / (years.length - 1)) * Math.max(0, reached - 1 + moving)}px`;
  show(rail, railShow);
  ticks.forEach(({ dot, label }, i) => {
    const on = t >= WINDOWS[i][0];
    dot.style.background = on ? C.cobalt : C.faint;
    label.style.color = i === reached && t >= 4 ? C.ink : C.muted;
    show(dot, railShow, 0, 0, i === reached && t >= 4 ? 1.35 : 1);
    show(label, railShow);
  });

  show(recap, span(t, 22.4, 23.0) * (1 - ringsOut), 0, 20 * (1 - span(t, 22.4, 23.0)));

  // 25 to 31.6s: the habit. Tiles enter dim, then light up one after another, each hand-off chevron firing first.
  const stepsOut = span(t, 31.2, 31.6);
  show(stepsTitle, span(t, 25.0, 25.5) * (1 - stepsOut), 0, 16 * (1 - span(t, 25.0, 25.5)));
  const LIT = [26.2, 27.6, 29.0];
  steps.forEach((p, i) => {
    const inT = span(t, 25.3 + i * 0.25, 25.9 + i * 0.25), lit = span(t, LIT[i], LIT[i] + 0.45);
    const hue = STEP_HUES[i];
    show(p.tile, inT * (1 - stepsOut), 0, 50 * (1 - inT), 0.96 + 0.04 * inT, 8 * (1 - inT));
    p.lamp.style.opacity = String(lit);
    p.tile.style.borderColor = lit > 0.5 ? `${hue}77` : "rgba(255,255,255,.10)";
    p.dot.style.background = lit > 0.5 ? hue : C.faint;
    p.dot.style.boxShadow = lit > 0.5 ? `0 0 30px ${hue}` : "none";
    p.stepText.style.color = lit > 0.5 ? hue : C.muted;
    show(p.headText, 0.35 + 0.65 * lit, 0, 10 * (1 - lit));
    show(p.rule, lit);
    show(p.bodyText, span(t, LIT[i] + 0.2, LIT[i] + 0.6));
    show(p.proofText, span(t, LIT[i] + 0.5, LIT[i] + 0.9), 0, 12 * (1 - span(t, LIT[i] + 0.5, LIT[i] + 0.9)));
    p.sweep.style.transform = `translateX(${lerp(-110, 110, smooth((t - LIT[i]) / 1.0))}%)`;
  });
  handoffs.forEach((node, i) => {
    const fire = span(t, LIT[i + 1] - 0.35, LIT[i + 1]);
    show(node, span(t, 25.8, 26.2) * (1 - stepsOut), 8 * fire, 0, 1 + 0.18 * Math.sin(Math.PI * fire));
  });

  // 31.6 to 34.4s: sign-off, not a reveal.
  const close = span(t, 31.7, 32.3), out = span(t, 34.0, 34.4);
  show(reveal, close * (1 - out), 0, 24 * (1 - close), 1, 8 * (1 - close));
  show(role, span(t, 32.0, 32.5));
  show(tagline, span(t, 32.4, 32.9), 0, 12 * (1 - span(t, 32.4, 32.9)));

  // Key light: follows the focus of each beat and breathes slightly.
  const toCards = span(t, 3.6, 4.6), toCentre = span(t, 22.0, 23.0), toSteps = span(t, 24.6, 25.4), toClose = span(t, 31.2, 32.0);
  const focus = [
    lerp(lerp(800, 560, toCards), 800, toCentre),
    lerp(lerp(470, 520, toSteps), 470, toClose),
  ];
  const power = 0.8 + 0.1 * toCards + 0.1 * toSteps + 0.1 * toClose;
  glow.style.left = `${focus[0]}px`;
  glow.style.top = `${focus[1]}px`;
  glow.style.transition = "none";
  glow.style.opacity = String(power * (0.85 + 0.15 * Math.sin(t * 1.3)));
  glow.style.transform = `scale(${1 + 0.05 * Math.sin(t * 0.7)})`;
  beams.style.transform = `translateX(${Math.sin(t * 0.21) * 80}px)`;

  // Cursor path: card → ring for each capability, click on the pick and on the drop.
  const live = chipTimes.findIndex((at) => t < at + 0.35);
  const at = chipTimes[Math.max(0, live)];
  const target = tip(chips[Math.max(0, live)].axis);
  const reach = smooth((t - (at - 0.6)) / 0.6);
  const prev = live > 0 ? tip(chips[live - 1].axis) : PICK;
  const back2 = smooth((t - (at - 1.2)) / 0.5);
  const px = t < at - 0.6 ? lerp(prev.x, PICK.x, back2) : lerp(PICK.x, target.x, reach);
  const py = t < at - 0.6 ? lerp(prev.y, PICK.y, back2) : lerp(PICK.y, target.y, reach);
  const click = t > at - 0.72 && t < at - 0.6 ? 0.86 : t > at && t < at + 0.12 ? 0.86 : 1;
  show(pointer, span(t, 4.2, 4.6) * (1 - span(t, 20.9, 21.3)) * (live >= 0 ? 1 : 0), px, py, click);

}

draw(0);
window.reel = { draw };
