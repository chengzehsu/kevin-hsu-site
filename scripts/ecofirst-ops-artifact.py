"""Draw the Ecofirst operating-system still (zh / en): the Notion databases that link sales to the software team.

Redrawn from the structure of the company Notion workspace; every client, person, site, and amount is left out.
The only figures are the database row counts the case states (company Notion, 2026-10): 1,639 sales updates,
1,829 RD tasks, and 59 delivery projects linked to software projects.

  Sales lane:  Stakeholders (business cards) -> Clients -> Project master <- Sales updates (8 stages)
  Gate:        presales effort tiers S / M / L / XL; the delivery clock starts at T=0
  RD lane:     Software projects -> Requirement pool (RDD -> scheduling -> build -> RD test -> sign-off)

Usage: python3 scripts/ecofirst-ops-artifact.py  ->  public/portfolio-artifacts/ecofirst-ops.{zh,en}.svg
"""
from html import escape
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "public" / "portfolio-artifacts"
FONT = "Arial, 'PingFang TC', 'Noto Sans TC', sans-serif"
NAVY, BLUE, LIGHT, MUTED = "#172234", "#2D61A6", "#DCE8F7", "#5A6980"

COPY = {
    "zh": {
        "title": "Ecofirst 營運系統：把業務到 RD 接成一條資料鏈",
        "desc": "在 Ecofirst 用 Notion 搭的營運系統。業務線：利害關係人（名片）連到客戶，再連到專案總表；業務推進分 8 階段（BD、拜訪、場勘、方案、報價、議價、擬約、簽約），每筆都連到專案總表。通過售前閘門（工期分級 S／M／L／XL；交期從 T=0 起算：資料交齊＋需求文件簽核）後進入 RD 線：軟體部專案連到需求池（RDD → 排程 → 開發 → RD 測試 → PM／業務驗收），並用 PM 期待日對比 RD 預計日自動判斷插單。資料庫筆數：業務推進 1,639 筆、RD 任務 1,829 筆、59 個交付專案連到軟體部專案（公司 Notion，2026-10），不含客戶與金額。",
        "kicker": "營運系統 / 業務到 RD",
        "head": "把業務到 RD 接成一條資料鏈",
        "head_size": 56,
        "sub": "從拿到一張名片到需求驗收上線，每一步都是一張互相連結的資料庫。",
        "sub_size": 26,
        "sales_lane": "業務線",
        "rd_lane": "RD 線",
        "sales": [
            ("利害關係人（名片）", ["每張名片一筆，", "連到所屬客戶"]),
            ("客戶", ["客戶與案場資料，", "集中在一處維護"]),
            ("專案總表", ["每個案子只有一個", "事實來源"]),
        ],
        "pipeline": ("業務推進", "8 個階段，每筆連到專案總表",
                     ["BD", "拜訪", "場勘", "方案", "報價", "議價", "擬約", "簽約"]),
        "gate": [("售前閘門", "工期分級 S／M／L／XL"),
                 ("交期從 T=0 起算", "資料交齊＋需求文件簽核")],
        "rd_project": ("軟體部專案", ["從專案總表接過來的", "交付案"]),
        "pool": ("需求池", "每個需求從 RDD 走到驗收",
                 ["RDD", "排程", "開發", "RD 測試", "PM／業務驗收"]),
        "callout": "PM 期待日 vs RD 預計日 → 自動判斷插單",
        "stats": [("1,639", ["筆業務推進"]), ("1,829", ["筆 RD 任務"]), ("59", ["個交付專案", "連到軟體部專案"])],
        "stat_size": 20,
        "note": "資料庫筆數取自公司 Notion（2026-10），不含客戶與金額",
    },
    "en": {
        "title": "Ecofirst operating system: sales to RD on one data chain",
        "desc": "The Notion operating system built at Ecofirst. Sales lane: stakeholders (business cards) link to clients, then to the project master; sales updates move through 8 stages (BD, visit, site survey, proposal, quote, negotiation, draft contract, signed) and each one links to the project master. After the presales gate (effort tiers S / M / L / XL; the delivery clock starts at T=0 once data is complete and the requirements doc is signed), work enters the RD lane: software projects link to a requirement pool (RDD → scheduling → development → RD testing → PM / sales sign-off), where the PM's target date is compared with RD's estimate to flag rush insertions automatically. Database counts: 1,639 sales updates, 1,829 RD tasks, and 59 delivery projects linked to software projects (company Notion, Oct 2026); no client names or amounts.",
        "kicker": "OPERATING SYSTEM / SALES TO RD",
        "head": "Sales to RD on one data chain",
        "head_size": 56,
        "sub": "From the first business card to a signed-off requirement, every step is a linked database.",
        "sub_size": 24,
        "sales_lane": "SALES LANE",
        "rd_lane": "RD LANE",
        "sales": [
            ("Stakeholders", ["One row per business", "card, linked to its client"]),
            ("Clients", ["Client and site details,", "kept in one place"]),
            ("Project master", ["One source of truth", "for every project"]),
        ],
        "pipeline": ("Sales updates", "8 stages, each linked to it",
                     ["BD", "Visit", "Site survey", "Proposal", "Quote", "Negotiation", "Draft contract", "Signed"]),
        "gate": [("PRESALES GATE", "Effort tiers S / M / L / XL"),
                 ("DELIVERY CLOCK STARTS AT T=0", "Data complete + requirements doc signed")],
        "rd_project": ("Software projects", ["Delivery projects handed", "over from Project master"]),
        "pool": ("Requirement pool", "Every requirement runs from RDD to sign-off",
                 ["RDD", "Scheduling", "Development", "RD testing", "PM / sales sign-off"]),
        "callout": "PM target date vs RD estimate → rush insertions flagged automatically",
        "stats": [("1,639", ["sales updates"]), ("1,829", ["RD tasks"]), ("59", ["delivery projects linked", "to software projects"])],
        "stat_size": 18,
        "note": "Counts from the company Notion (Oct 2026); no client names or amounts",
    },
}


def width(s, size, weight=400):
    """Rough rendered width: CJK and full-width glyphs ~1em, Latin ~0.55em (a bit more when bold)."""
    latin = 0.58 if weight >= 600 else 0.55
    return sum(size * (1.0 if ord(ch) >= 0x2E80 else latin) for ch in s)


def text(x, y, s, size, fill, weight=400, anchor="start", spacing=None, maxw=None):
    w = width(s, size, weight) + (spacing or 0) * len(s)
    if maxw is not None and w > maxw:
        raise SystemExit(f"text overflows {maxw}px at {size}px: {s!r} ({w:.0f}px)")
    ls = f' letter-spacing="{spacing}"' if spacing else ""
    return (f'<text x="{x}" y="{y}" fill="{fill}" font-family="{FONT}" font-size="{size}" '
            f'font-weight="{weight}" text-anchor="{anchor}"{ls}>{escape(s, quote=False)}</text>')


def card(o, x, y, w, h, number, name, first=False):
    o.append(f'<g filter="url(#shadow)"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="20" fill="#FFFFFF"/></g>')
    o.append(f'<circle cx="{x + 40}" cy="{y + 42}" r="18" fill="{BLUE if first else LIGHT}"/>')
    o.append(text(x + 40, y + 48, f"{number:02d}", 15, "#FFFFFF" if first else BLUE, 700, anchor="middle"))
    o.append(text(x + 70, y + 50, name, 22, NAVY, 700, maxw=w - 86))


def chips(o, x, y, maxw, labels, size, h=28, gap=8, arrows=False):
    """Lay chips left to right, wrapping when a row is full; returns the y below the last row."""
    cx, cy = x, y
    for i, label in enumerate(labels):
        cw = round(width(label, size, 700)) + 20
        step = 30 if arrows else 0
        if cx > x and cx + cw > x + maxw:
            if arrows:
                raise SystemExit(f"pipeline chips overflow {maxw}px")
            cx, cy = x, cy + h + gap
        o.append(f'<rect x="{cx}" y="{cy}" width="{cw}" height="{h}" rx="{h / 2}" fill="{LIGHT}"/>')
        o.append(text(cx + cw / 2, cy + h / 2 + size * 0.36, label, size, BLUE, 700, anchor="middle"))
        cx += cw + (step if arrows else gap)
        if arrows and i < len(labels) - 1:
            ax = cx - step + 7
            o.append(f'<path d="M{ax} {cy + h / 2}h14m-5-5 5 5-5 5" fill="none" stroke="{MUTED}" stroke-width="2"/>')
    return cy + h


def arrow_h(o, x1, x2, y):
    """Horizontal arrow from x1 to x2 (either direction)."""
    d = 1 if x2 > x1 else -1
    o.append(f'<path d="M{x1} {y}H{x2}m{-10 * d}-8 {10 * d} 8-{10 * d} 8" fill="none" stroke="{BLUE}" stroke-width="2.5"/>')


def arrow_v(o, x, y1, y2):
    o.append(f'<path d="M{x} {y1}V{y2}m-8-10 8 10 8-10" fill="none" stroke="{BLUE}" stroke-width="2.5"/>')


def render(lang: str) -> str:
    c = COPY[lang]
    o = [
        '<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000" role="img" aria-labelledby="title desc">',
        f'<title id="title">{escape(c["title"], quote=False)}</title>',
        f'<desc id="desc">{escape(c["desc"], quote=False)}</desc>',
        '''<defs>
  <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#DCE4EF" stroke-width="1"/></pattern>
  <filter id="shadow" x="-.15" y="-.15" width="1.3" height="1.4"><feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#132033" flood-opacity=".10"/></filter>
</defs>''',
        '<rect width="1600" height="1000" fill="#F5F7FB"/>',
        '<rect width="1600" height="1000" fill="url(#grid)" opacity=".48"/>',
    ]
    o.append(text(96, 92, c["kicker"], 19, BLUE, 700, spacing=2.8, maxw=1408))
    o.append(text(96, 166, c["head"], c["head_size"], NAVY, 700, maxw=1408))
    o.append(text(96, 214, c["sub"], c["sub_size"], MUTED, maxw=1408))

    gap, cw = 48, (1408 - 3 * 48) // 4
    col = [96 + i * (cw + gap) for i in range(4)]
    inner = cw - 56

    # Sales lane: three cards in a chain, and the sales-update log pointing back at the project master.
    sy, sh = 278, 200
    o.append(text(96, sy - 14, c["sales_lane"], 15, BLUE, 700, spacing=2))
    for i, (name, lines) in enumerate(c["sales"]):
        card(o, col[i], sy, cw, sh, i + 1, name, first=i == 0)
        for j, line in enumerate(lines):
            o.append(text(col[i] + 28, sy + 100 + j * 28, line, 18, MUTED, maxw=inner))
    for i in range(2):
        arrow_h(o, col[i] + cw + 8, col[i + 1] - 8, sy + sh / 2)
    arrow_h(o, col[3] - 8, col[2] + cw + 8, sy + sh / 2)
    name, sub, stages = c["pipeline"]
    card(o, col[3], sy, cw, sh, 4, name)
    o.append(text(col[3] + 28, sy + 88, sub, 14, BLUE, 700, maxw=inner))
    bottom = chips(o, col[3] + 24, sy + 100, cw - 48, stages, 12, h=25, gap=6)
    if bottom > sy + sh - 12:
        raise SystemExit(f"stage chips overflow the card ({bottom} > {sy + sh - 12})")

    # Gate between the lanes.
    gy, gh = 506, 84
    arrow_v(o, col[2] + cw / 2, sy + sh + 4, gy - 4)
    o.append(f'<g filter="url(#shadow)"><rect x="96" y="{gy}" width="1408" height="{gh}" rx="20" fill="#152236"/></g>')
    half = 1408 / 2
    for i, (label, value) in enumerate(c["gate"]):
        x = 96 + 40 + i * half
        o.append(text(x, gy + 34, label, 14, "#8FB8EF", 700, spacing=1.6, maxw=half - 80))
        o.append(text(x, gy + 64, value, 21, "#F7FAFF", 700, maxw=half - 80))
    o.append(f'<path d="M{96 + half} {gy + 18}V{gy + gh - 18}" stroke="#2F4362" stroke-width="2"/>')

    # RD lane: software projects feed the requirement pool.
    ry, rh = 628, 176
    arrow_v(o, col[0] + cw / 2, gy + gh + 4, ry - 4)
    o.append(text(col[1], ry - 14, c["rd_lane"], 15, BLUE, 700, spacing=2))
    name, lines = c["rd_project"]
    card(o, col[0], ry, cw, rh, 5, name)
    for j, line in enumerate(lines):
        o.append(text(col[0] + 28, ry + 100 + j * 28, line, 18, MUTED, maxw=inner))
    arrow_h(o, col[0] + cw + 8, col[1] - 8, ry + rh / 2)
    px, pw = col[1], 1504 - col[1]
    name, sub, steps = c["pool"]
    card(o, px, ry, pw, rh, 6, name)
    o.append(text(px + pw - 28, ry + 50, sub, 15, MUTED, anchor="end", maxw=pw - 120 - width(name, 23, 700)))
    chips(o, px + 28, ry + 76, pw - 56, steps, 16, h=32, arrows=True)
    o.append(f'<rect x="{px + 28}" y="{ry + 122}" width="{pw - 56}" height="38" rx="12" fill="#E8EEF7"/>')
    o.append(f'<rect x="{px + 28}" y="{ry + 122}" width="6" height="38" rx="3" fill="{BLUE}"/>')
    o.append(text(px + 50, ry + 147, c["callout"], 17, NAVY, 700, maxw=pw - 90))

    # Counts panel.
    ty, th = 832, 84
    tw = (1408 - 2 * 24) // 3
    for i, (num, lines) in enumerate(c["stats"]):
        x = 96 + i * (tw + 24)
        o.append(f'<rect x="{x}" y="{ty}" width="{tw}" height="{th}" rx="18" fill="#FFFFFF" stroke="#DCE4EF"/>')
        o.append(text(x + 28, ty + 58, num, 40, BLUE, 700))
        lx = x + 28 + width(num, 40, 700) + 16
        lh = c["stat_size"] + 6
        y0 = ty + th / 2 - (len(lines) - 1) * lh / 2 + c["stat_size"] * 0.36
        for j, line in enumerate(lines):
            o.append(text(round(lx), round(y0 + j * lh), line, c["stat_size"], NAVY, 700, maxw=x + tw - 20 - lx))

    o.append(text(96, 952, c["note"], 17, MUTED))
    o.append(text(1504, 952, "Kevin Hsu", 17, "#7C899B", anchor="end"))
    o.append("</svg>")
    return "\n".join(o) + "\n"


for lang in COPY:
    (OUT / f"ecofirst-ops.{lang}.svg").write_text(render(lang), encoding="utf-8")
    print("wrote", lang)
