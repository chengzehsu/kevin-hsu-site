"""Draw the LinkedIn "AI product workflow" tile cover (zh / en) in the site's artifact style.

Usage: python3 scripts/ai-workflow-cover.py  ->  public/linkedin-posts/ai-product-workflow.{zh,en}.svg
"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "public" / "linkedin-posts"
FONT = "Arial, 'PingFang TC', 'Noto Sans TC', sans-serif"

NAVY, BLUE, LIGHT, MUTED, LINE = "#172234", "#2D61A6", "#DCE8F7", "#5A6980", "#DCE4EF"

COPY = {
    "zh": {
        "title": "用 Claude 自動化產品管理流程",
        "desc": "從會議追蹤、提案初稿、需求釐清、規格撰寫、mock data 驗證到開發協作，每一段交接都由 Claude 自動化；會議追蹤由 Claude Cowork 每天 17:00 依排程執行。產品交付效率提升 50%。",
        "kicker": "PRODUCT WORKFLOW × CLAUDE",
        "card": "每天的產品管理流程",
        "card_meta": "Daily 17:00",
        "rows": [
            ("會議追蹤", "讀當天紀錄，排出 P0／P1／P2 待辦", "Notion AI"),
            ("提案初稿", "從待辦長出初稿，隔天花 5 分鐘確認", "Cowork 排程"),
            ("需求釐清", "把會議結論整理成問題與假設", "Claude"),
            ("規格撰寫", "產出規格與驗收條件", "Claude"),
            ("mock data 驗證", "先用假資料跑過流程，再交給工程", "Claude"),
            ("開發協作", "規格、資料與原型一起交棒", "Claude"),
        ],
        "result": ["產品交付效率", "+50%"],
    },
    "en": {
        "title": "Automating product management with Claude",
        "desc": "From meeting follow-up, proposal drafts, discovery, and specs to mock-data validation and engineering hand-off, every step is automated with Claude; meeting follow-up runs on a Claude Cowork schedule at 5 pm daily. Product delivery efficiency rose 50%.",
        "kicker": "PRODUCT WORKFLOW × CLAUDE",
        "card": "The daily product workflow",
        "card_meta": "Daily 5 pm",
        "rows": [
            ("Meeting follow-up", "Reads the day's notes, ranks P0/P1/P2", "Notion AI"),
            ("Proposal draft", "Drafted at 5 pm, 5-minute review next day", "Cowork"),
            ("Discovery", "Turns decisions into questions and bets", "Claude"),
            ("Spec", "Writes the spec and acceptance criteria", "Claude"),
            ("Mock-data check", "Runs the flow on fake data before build", "Claude"),
            ("Hand-off", "Spec, data, and prototype ship together", "Claude"),
        ],
        "result": ["Product delivery efficiency", "+50%"],
    },
}


def text(x, y, s, size, fill, weight=400, anchor="start", spacing=None):
    ls = f' letter-spacing="{spacing}"' if spacing else ""
    return (f'<text x="{x}" y="{y}" fill="{fill}" font-family="{FONT}" font-size="{size}" '
            f'font-weight="{weight}" text-anchor="{anchor}"{ls}>{s}</text>')


def render(lang: str) -> str:
    c = COPY[lang]
    o = [
        '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750" role="img" aria-labelledby="title desc">',
        f'<title id="title">{c["title"]}</title><desc id="desc">{c["desc"]}</desc>',
        '''<defs>
  <filter id="shadow" x="-15%" y="-15%" width="130%" height="140%"><feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#132033" flood-opacity=".13"/></filter>
</defs>''',
    ]

    # Transparent canvas: the card floats on the tile's own surface in both themes.
    # Right: the workflow, one rail, six automated hand-offs.
    x0, y0, w, h = 330, 52, 750, 638
    o.append(f'<g filter="url(#shadow)"><rect x="{x0}" y="{y0}" width="{w}" height="{h}" rx="26" fill="#FFFFFF"/></g>')
    o.append(text(x0 + 40, y0 + 44, c["kicker"], 13, BLUE, 700, spacing=2))
    o.append(text(x0 + 40, y0 + 82, c["card"], 26, NAVY, 700))
    o.append(f'<rect x="{x0 + w - 160}" y="{y0 + 58}" width="120" height="30" rx="15" fill="{LIGHT}"/>')
    o.append(text(x0 + w - 100, y0 + 79, c["card_meta"], 13.5, BLUE, 700, anchor="middle"))

    top, step = y0 + 140, 68
    rail_x = x0 + 64
    o.append(f'<line x1="{rail_x}" y1="{top + 4}" x2="{rail_x}" y2="{top + step * 5 + 4}" stroke="{LIGHT}" stroke-width="3"/>')
    for i, (stage, job, tool) in enumerate(c["rows"]):
        y = top + i * step
        first = i == 0
        o.append(f'<circle cx="{rail_x}" cy="{y + 4}" r="19" fill="{BLUE if first else "#FFFFFF"}" stroke="{BLUE}" stroke-width="2"/>')
        o.append(text(rail_x, y + 10, f"{i + 1:02d}", 14, "#FFFFFF" if first else BLUE, 700, anchor="middle"))
        o.append(text(rail_x + 40, y + 2, stage, 19, NAVY, 700))
        o.append(text(rail_x + 40, y + 27, job, 14.5, MUTED))
        tw = len(tool) * 8.4 + 26
        tx = x0 + w - 40 - tw
        o.append(f'<rect x="{tx:.0f}" y="{y - 13}" width="{tw:.0f}" height="28" rx="8" fill="#EEF4FC"/>')
        o.append(text(f"{tx + tw / 2:.0f}", y + 6, tool, 13, BLUE, 700, anchor="middle"))

    ry = y0 + h - 88
    o.append(f'<rect x="{x0 + 36}" y="{ry}" width="{w - 72}" height="62" rx="16" fill="{BLUE}"/>')
    o.append(text(x0 + 62, ry + 39, c["result"][0], 18, "#F7FAFF", 600))
    o.append(text(x0 + w - 62, ry + 42, c["result"][1], 28, "#FFFFFF", 700, anchor="end"))

    o.append(text(1080, 718, "Kevin Hsu / Product Manager", 13, "#7C899B", anchor="end"))
    o.append("</svg>")
    return "\n".join(o) + "\n"


for lang in COPY:
    (OUT / f"ai-product-workflow.{lang}.svg").write_text(render(lang), encoding="utf-8")
    print("wrote", lang)
