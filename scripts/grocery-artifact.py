"""Draw the grocery case artifact (zh / en), reconstructed from the 2025/1 PM deck, slides 16-19.

Slide 16 lists the questions clients, the build team, and colleagues kept asking; slide 17 asks how to make
information transparent; slides 18-19 show the answer: an information-flow map, a project overview, and
project detail pages. The original screenshots are too small to read, so this redraws the argument instead.

Usage: python3 scripts/grocery-artifact.py  ->  public/portfolio-artifacts/grocery-system.{zh,en}.svg
"""
from html import escape
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "public" / "portfolio-artifacts"
FONT = "Arial, 'PingFang TC', 'Noto Sans TC', sans-serif"
NAVY, BLUE, LIGHT, MUTED = "#172234", "#2D61A6", "#DCE8F7", "#5A6980"

COPY = {
    "zh": {
        "title": "蔬果電商的專案資訊系統",
        "desc": "客戶、工程與設計團隊、同事每週重複詢問進度、上版內容、時數與過往做法；把這些資訊整理成資訊流盤點、專案總覽與專案詳細資訊三個模組。專案期間揀貨日產能由 300 提升到 1,000 單／日 (+233%)。",
        "kicker": "PROJECT OPERATIONS / 蔬果電商",
        "head": "資訊透明，溝通成本才會下降",
        "sub": "客戶、團隊與同事每週重複問的問題，收進同一套專案系統。",
        "asked": "每週重複被問",
        "groups": [
            ("客戶", ["下次進度是什麼？", "這次上版有什麼？"]),
            ("工程／設計團隊", ["時數可以請款了嗎？", "下個 Sprint 先做什麼？"]),
            ("同事", ["上次這個功能怎麼做的？", "那個專案的權限能開給我嗎？"]),
        ],
        "system": "同一套專案系統",
        "modules": [
            ("資訊流盤點", "訂單到交付的資料怎麼流，一張圖看完"),
            ("專案總覽", "進度、上版內容、測試範圍，一頁對齊"),
            ("專案詳細資訊", "時數、權限、過往做法，隨時查得到"),
        ],
        "result": ("專案成果", "揀貨日產能 300 → 1,000 單／日 (+233%)"),
        "head_size": 44,
    },
    "en": {
        "title": "Project information system for the grocery program",
        "desc": "Clients, the engineering and design team, and colleagues asked the same questions about timeline, release scope, billable hours, and past decisions every week; the answers became three modules: an information-flow map, a project overview, and project detail pages. Picking capacity rose from 300 → 1,000 orders/day (+233%) during the program.",
        "kicker": "PROJECT OPERATIONS / GROCERY E-COMMERCE",
        "head": "Make the work visible, and the questions stop",
        "sub": "What clients, the team, and colleagues asked every week now lives in one project system.",
        "asked": "ASKED EVERY WEEK",
        "groups": [
            ("Client", ["What's next on the timeline?", "What's in this release?"]),
            ("Engineering & design", ["Can these hours be billed yet?", "What leads the next sprint?"]),
            ("Colleagues", ["How did we build that last time?", "Can I get access to that project?"]),
        ],
        "system": "ONE PROJECT SYSTEM",
        "modules": [
            ("Information-flow map", "How order-to-delivery data moves, on one map"),
            ("Project overview", "Timeline, release scope, and test plan on one page"),
            ("Project details", "Hours, access, and past decisions, findable any time"),
        ],
        "result": ("Program result", "Picking 300 → 1,000 orders/day (+233%)"),
        "head_size": 38,
    },
}


def text(x, y, s, size, fill, weight=400, anchor="start", spacing=None):
    ls = f' letter-spacing="{spacing}"' if spacing else ""
    return (f'<text x="{x}" y="{y}" fill="{fill}" font-family="{FONT}" font-size="{size}" '
            f'font-weight="{weight}" text-anchor="{anchor}"{ls}>{escape(s, quote=False)}</text>')


def render(lang: str) -> str:
    c = COPY[lang]
    o = [
        '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="674" viewBox="0 0 1200 674" role="img" aria-labelledby="title desc">',
        f'<title id="title">{c["title"]}</title>',
        f'<desc id="desc">{c["desc"]}</desc>',
        '''<defs>
  <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#DCE4EF" stroke-width="1"/></pattern>
  <filter id="shadow" x="-15%" y="-15%" width="130%" height="140%"><feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#132033" flood-opacity=".10"/></filter>
</defs>''',
        '<rect width="1200" height="674" fill="#F5F7FB"/>',
        '<rect width="1200" height="674" fill="url(#grid)" opacity=".48"/>',
    ]

    # The case cover crops 16:10 from 1200 x 674, losing about 60px per side: everything sits inside x 96-1104.
    o.append(text(96, 66, c["kicker"], 15, BLUE, 700, spacing=2.4))
    o.append(text(96, 122, c["head"], c["head_size"], NAVY, 700))
    o.append(text(96, 160, c["sub"], 20, MUTED))

    # Left: the questions that kept coming back.
    o.append('<g filter="url(#shadow)"><rect x="96" y="196" width="380" height="404" rx="26" fill="#152236"/></g>')
    o.append(text(128, 240, c["asked"], 14, "#8FB8EF", 700, spacing=2))
    y = 288
    for label, questions in c["groups"]:
        o.append(text(128, y, label, 15, "#8FB8EF", 700))
        for i, q in enumerate(questions):
            o.append(text(128, y + 30 + i * 28, q, 18, "#F7FAFF", 600 if i == 0 else 400))
        y += 112
    o.append(f'<path d="M490 398h28m-10-9 10 9-10 9" fill="none" stroke="{BLUE}" stroke-width="2.5"/>')

    # Right: where each answer now lives.
    x0 = 540
    o.append(text(x0, 222, c["system"], 15, BLUE, 700, spacing=2))
    for i, (name, line) in enumerate(c["modules"]):
        top = 244 + i * 104
        o.append(f'<g filter="url(#shadow)"><rect x="{x0}" y="{top}" width="564" height="88" rx="18" fill="#FFFFFF"/></g>')
        first = i == 0
        o.append(f'<circle cx="{x0 + 46}" cy="{top + 44}" r="22" fill="{BLUE if first else LIGHT}"/>')
        o.append(text(x0 + 46, top + 51, f"{i + 1:02d}", 17, "#FFFFFF" if first else BLUE, 700, anchor="middle"))
        o.append(text(x0 + 90, top + 38, name, 23, NAVY, 700))
        o.append(text(x0 + 90, top + 66, line, 17, MUTED))

    o.append(f'<rect x="{x0}" y="560" width="564" height="40" rx="12" fill="#E8EEF7"/>')
    o.append(text(x0 + 22, 586, c["result"][0], 14, "#52627A", 700))
    o.append(text(x0 + 542, 587, c["result"][1], 17, BLUE, 700, anchor="end"))

    o.append(text(1104, 638, "Kevin Hsu", 13, "#7C899B", anchor="end"))
    o.append("</svg>")
    return "\n".join(o) + "\n"


for lang in COPY:
    (OUT / f"grocery-system.{lang}.svg").write_text(render(lang), encoding="utf-8")
    print("wrote", lang)
