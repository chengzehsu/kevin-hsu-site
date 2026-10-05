"""Draw the business-card bot case artifacts (zh / en), redrawn from the git history of Kevin's two repos.

Sources: the personal prototype repo (2025/7 to 2025/8: LINE and Telegram back and forth, settled on LINE),
the main repo (2025/8/17 Notion mapping to the company CRM fields; 2025/9/10 judgment fields left to the sales
rep; 2025/12/31 multi-tenant management; Free / Starter / Business / Enterprise plans; 2026/7/12 infra audit in
docs/INFRA_ARCHITECTURE_AUDIT.md found small real usage, then Redis, RQ and SocketIO removed and the quota check
fixed). No counts appear on the plates, only dates. No real contact data appears: the sample card is made up.

Usage: python3 scripts/namecard-artifact.py  ->  public/portfolio-artifacts/namecard-journey.{zh,en}.svg
                                                public/portfolio-artifacts/namecard-rightsize.{zh,en}.svg
"""
from html import escape
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "public" / "portfolio-artifacts"
FONT = "Arial, 'PingFang TC', 'Noto Sans TC', sans-serif"
NAVY, BLUE, LIGHT, MUTED = "#172234", "#2D61A6", "#DCE8F7", "#5A6980"

JOURNEY = {
    "zh": {
        "title": "AI 名片管理助手：從原型到依實際用量瘦身",
        "desc": "工作之餘做的名片工具：在 LINE 拍名片，Gemini 辨識後寫進公司的 Notion 聯絡人資料庫。2025/7 個人原型；2025/8 至 2025/9 對齊公司 CRM 欄位，判斷欄位留給業務自己填，AI 推測只寫進備註；2025/12 至 2026/2 嘗試多租戶 SaaS 與訂閱方案；2026/7 自己發起架構盤點，確認實際用量很小，只有公司業務與幾位朋友，於是移除 Redis、RQ、SocketIO。",
        "kicker": "工作之餘 / 公司的困擾",
        "head": "先做出來，再對齊業務，最後依實際用量瘦身",
        "head_size": 42,
        "sub": "在 LINE 拍名片，AI 辨識後直接寫進公司的 Notion 聯絡人資料庫。",
        "sub_size": 20,
        "steps": [
            ("2025/7", ["個人原型"], ["拍名片傳進 LINE，", "Gemini 辨識後寫進 Notion", "Telegram 與 LINE 來回，", "最後選定 LINE"]),
            ("2025/8 至 2025/9", ["對齊公司 CRM 欄位"], ["照公司資料庫的欄位對應", "決策影響力、負責業務、", "窗口的困擾或 KPI", "判斷欄位留給業務自己填，", "AI 推測只寫進備註"]),
            ("2025/12 至 2026/2", ["嘗試多租戶 SaaS，", "加上訂閱方案"], ["Free、Starter、", "Business、Enterprise", "每個方案各有額度，", "後台管理租戶與方案"]),
            ("2026/7", ["依實際用量瘦身"], ["自己發起架構盤點：", "實際用量很小，", "公司業務與幾位朋友", "移除 Redis、RQ、SocketIO"]),
        ],
        "band": ("關鍵判斷", "用量很小，就不該背著分散式架構"),
    },
    "en": {
        "title": "AI business-card assistant: from prototype to right-sized",
        "desc": "An after-hours tool: snap a business card in LINE, Gemini reads it, and the contact lands in the company's Notion database. Jul 2025 personal prototype; Aug to Sep 2025 fields matched to the company CRM, with judgment fields left to the sales rep and AI guesses kept in the notes; Dec 2025 to Feb 2026 a multi-tenant SaaS with subscription plans; Jul 2026 a self-initiated infrastructure audit found real usage was small, the company's sales team and a few friends, so Redis, RQ, and SocketIO were removed.",
        "kicker": "AFTER HOURS / A COMPANY PAIN",
        "head": "Ship it, fit it to sales, then cut it to real scale",
        "head_size": 34,
        "sub": "Snap a card in LINE; AI reads it straight into the company's Notion contacts.",
        "sub_size": 18,
        "steps": [
            ("Jul 2025", ["Personal prototype"], ["Snap a card in LINE,", "Gemini reads it into", "Notion. Tried Telegram,", "then settled on LINE"]),
            ("Aug to Sep 2025", ["Matched the", "company CRM fields"], ["Mapped to the company", "database's fields", "Judgment fields left", "to the sales rep;", "AI guesses go in notes"]),
            ("Dec 2025 to Feb 2026", ["Tried multi-tenant", "SaaS with plans"], ["Free, Starter,", "Business, Enterprise", "A quota for each plan,", "admin for tenants"]),
            ("Jul 2026", ["Cut to real scale"], ["Self-initiated audit:", "real usage was small,", "the sales team and", "a few friends. Removed", "Redis, RQ, SocketIO"]),
        ],
        "band": ("Key call", "Small real usage does not need a distributed stack"),
    },
}

RIGHTSIZE = {
    "zh": {
        "title": "名片管理助手的架構盤點：盤點前與盤點後",
        "desc": "2026/7 的架構盤點確認實際用量很小，只有公司業務與幾位朋友。盤點前為分散式多租戶準備的 Redis、RQ、SocketIO 全部移除；盤點後保留 LINE 到 Gemini 到 Notion 的流程、SQLite 單一資料庫、憑證加密與 Gemini 備用金鑰。內部工具與 SaaS 都做過，由實際用量決定留下輕量版。範例名片為虛構人物。",
        "kicker": "架構盤點 / 2026 年 7 月",
        "head": "先量出實際用量，再決定留下什麼",
        "head_size": 50,
        "sub": "盤點結論：實際用量很小，公司業務與幾位朋友。",
        "before": "盤點前",
        "before_sub": "為分散式多租戶準備的元件",
        "removed": [
            ("Redis", "每日限額與批次狀態改存 SQLite"),
            ("RQ 佇列與獨立 worker", "上傳收斂成一條背景執行緒"),
            ("SocketIO 即時推播", "進度改用輪詢，功能不變"),
        ],
        "after": "盤點後",
        "after_sub": "留下真正用得到的",
        "card": ["王小明", "範例科技", "業務經理"],
        "card_extra": "sales@example.com",
        "row_title": "Notion 聯絡人",
        "rows": [("姓名", "王小明"), ("公司", "範例科技"), ("職稱", "業務經理"), ("決策影響力", "由業務自填")],
        "kept": [
            "SQLite 單一資料庫：租戶、配額、補傳紀錄",
            "LINE 與 Notion 憑證維持加密",
            "Gemini 主備金鑰自動切換",
            "單一服務、單一 worker，對齊實際部署",
        ],
        "same_day": "商業判斷",
        "tests": "內部工具與 SaaS 都做過，用量決定留下輕量版",
        "tests_size": 30,
    },
    "en": {
        "title": "Business-card assistant infra audit: before and after",
        "desc": "The July 2026 audit found real usage was small: the company's sales team and a few friends. Redis, RQ, and SocketIO, built for a distributed multi-tenant service, were removed; the LINE to Gemini to Notion flow, one SQLite database, encrypted credentials, and the Gemini backup key stayed. Both the internal tool and the SaaS were built, and real usage picked the lean one. The sample card is a made-up person.",
        "kicker": "INFRA AUDIT / JULY 2026",
        "head": "Measure the real scale, then decide what stays",
        "head_size": 46,
        "sub": "Audit finding: real usage was small, the company's sales team and a few friends.",
        "before": "Before the audit",
        "before_sub": "Built for a distributed multi-tenant service",
        "removed": [
            ("Redis", "Quota and batch state moved to SQLite"),
            ("RQ queue and worker", "Uploads run on one background thread"),
            ("SocketIO live push", "Progress now polls; same feature"),
        ],
        "after": "After the audit",
        "after_sub": "Only what is used stays",
        "card": ["Alex Wang", "Sample Tech", "Sales Manager"],
        "card_extra": "sales@example.com",
        "row_title": "Notion contact",
        "rows": [("Name", "Alex Wang"), ("Company", "Sample Tech"), ("Title", "Sales Manager"), ("Influence", "Set by the rep")],
        "kept": [
            "One SQLite database: tenants, quotas, retries",
            "LINE and Notion credentials stay encrypted",
            "Gemini backup key switches over automatically",
            "One service, one worker, matching the real deploy",
        ],
        "same_day": "Business call",
        "tests": "Built both the internal tool and the SaaS; usage picked the lean one",
        "tests_size": 28,
    },
}


def text(x, y, s, size, fill, weight=400, anchor="start", spacing=None, extra=""):
    ls = f' letter-spacing="{spacing}"' if spacing else ""
    return (f'<text x="{x}" y="{y}" fill="{fill}" font-family="{FONT}" font-size="{size}" '
            f'font-weight="{weight}" text-anchor="{anchor}"{ls}{extra}>{escape(s, quote=False)}</text>')


def head(o, c, w, h):
    o += [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-labelledby="title desc">',
        f'<title id="title">{escape(c["title"], quote=False)}</title>',
        f'<desc id="desc">{escape(c["desc"], quote=False)}</desc>',
        '''<defs>
  <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#DCE4EF" stroke-width="1"/></pattern>
  <filter id="shadow" x="-15%" y="-15%" width="130%" height="140%"><feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#132033" flood-opacity=".10"/></filter>
</defs>''',
        f'<rect width="{w}" height="{h}" fill="#F5F7FB"/>',
        f'<rect width="{w}" height="{h}" fill="url(#grid)" opacity=".48"/>',
    ]


def journey(lang: str) -> str:
    c = JOURNEY[lang]
    o: list[str] = []
    head(o, c, 1200, 674)

    # The case cover crops 16:10 from 1200 x 674, losing about 60px per side: everything sits inside x 96-1104.
    o.append(text(96, 66, c["kicker"], 15, BLUE, 700, spacing=2.4))
    o.append(text(96, 122, c["head"], c["head_size"], NAVY, 700))
    o.append(text(96, 160, c["sub"], c["sub_size"], MUTED))

    # Four steps; the last one, the right-sizing call, is the dark card.
    top, h, gap = 200, 318, 16
    w = (1008 - 3 * gap) / 4
    o.append(f'<path d="M{96 + w / 2:.0f} {top + 34}H{96 + 3 * (w + gap) + w / 2:.0f}" stroke="{LIGHT}" stroke-width="2"/>')
    for i, (date, title, lines) in enumerate(c["steps"]):
        x = round(96 + i * (w + gap))
        last = i == 3
        fill = "#152236" if last else "#FFFFFF"
        o.append(f'<g filter="url(#shadow)"><rect x="{x}" y="{top}" width="{round(w)}" height="{h}" rx="20" fill="{fill}"/></g>')
        o.append(f'<circle cx="{x + 34}" cy="{top + 34}" r="16" fill="{BLUE if last else LIGHT}"/>')
        o.append(text(x + 34, top + 39, f"{i + 1:02d}", 13, "#FFFFFF" if last else BLUE, 700, anchor="middle"))
        o.append(text(x + 60, top + 39, date, 15, "#8FB8EF" if last else BLUE, 700))
        y = top + 88
        for t in title:
            o.append(text(x + 22, y, t, 20, "#FFFFFF" if last else NAVY, 700))
            y += 27
        y += 14
        for line in lines:
            o.append(text(x + 22, y, line, 16, "#C9D6EA" if last else MUTED))
            y += 27

    o.append('<rect x="96" y="540" width="1008" height="60" rx="14" fill="#E8EEF7"/>')
    o.append(text(124, 576, c["band"][0], 15, "#52627A", 700))
    o.append(text(1076, 578, c["band"][1], 21, BLUE, 700, anchor="end"))

    o.append(text(1104, 638, "Kevin Hsu", 13, "#7C899B", anchor="end"))
    o.append("</svg>")
    return "\n".join(o) + "\n"


def rightsize(lang: str) -> str:
    c = RIGHTSIZE[lang]
    o: list[str] = []
    head(o, c, 1600, 1000)

    o.append(text(120, 92, c["kicker"], 18, BLUE, 700, spacing=2.6))
    o.append(text(120, 160, c["head"], c["head_size"], NAVY, 700))
    o.append(text(120, 208, c["sub"], 23, MUTED))

    # Left: what the audit removed, struck through.
    lx, ty, lw, ph = 120, 252, 600, 500
    o.append(f'<g filter="url(#shadow)"><rect x="{lx}" y="{ty}" width="{lw}" height="{ph}" rx="28" fill="#152236"/></g>')
    o.append(text(lx + 40, ty + 62, c["before"], 28, "#FFFFFF", 700))
    o.append(text(lx + 40, ty + 98, c["before_sub"], 18, "#8FB8EF"))
    y = ty + 182
    for name, why in c["removed"]:
        size = 30
        width = sum(size if ord(ch) > 0x2E80 else size * 0.52 for ch in name)
        o.append(text(lx + 40, y, name, size, "#8DA0BC", 700))
        o.append(f'<path d="M{lx + 36} {y - 10}H{lx + 44 + width:.0f}" stroke="#8FB8EF" stroke-width="3"/>')
        o.append(text(lx + 40, y + 38, why, 19, "#E4ECF8"))
        y += 112

    o.append(f'<path d="M738 502h48m-14-13 14 13-14 13" fill="none" stroke="{BLUE}" stroke-width="3"/>')

    # Right: what stayed, led by the main flow with a made-up sample card.
    rx, rw = 804, 676
    o.append(f'<g filter="url(#shadow)"><rect x="{rx}" y="{ty}" width="{rw}" height="{ph}" rx="28" fill="#FFFFFF"/></g>')
    o.append(text(rx + 40, ty + 62, c["after"], 28, NAVY, 700))
    o.append(text(rx + 40, ty + 98, c["after_sub"], 18, BLUE))

    cx, cy, cw, ch = rx + 40, ty + 128, 250, 146
    o.append(f'<rect x="{cx}" y="{cy}" width="{cw}" height="{ch}" rx="10" fill="#FBFCFE" stroke="#C9D6EA" stroke-width="1.5" transform="rotate(-3 {cx + cw / 2} {cy + ch / 2})"/>')
    g = f' transform="rotate(-3 {cx + cw / 2} {cy + ch / 2})"'
    o.append(f'<g{g}>')
    o.append(f'<rect x="{cx + 20}" y="{cy + 22}" width="26" height="26" rx="6" fill="{BLUE}"/>')
    o.append(text(cx + 58, cy + 42, c["card"][1], 15, MUTED, 700))
    o.append(text(cx + 20, cy + 86, c["card"][0], 24, NAVY, 700))
    o.append(text(cx + 20, cy + 112, c["card"][2], 15, MUTED))
    o.append(text(cx + 20, cy + 132, c["card_extra"], 13, "#8A97AA"))
    o.append("</g>")
    o.append(f'<path d="M{cx + cw + 14} {cy + 74}h34m-11-10 11 10-11 10" fill="none" stroke="{BLUE}" stroke-width="2.5"/>')

    nx, nw = cx + cw + 62, 284
    o.append(f'<rect x="{nx}" y="{cy}" width="{nw}" height="{ch + 4}" rx="12" fill="#F3F6FB" stroke="{LIGHT}" stroke-width="1.5"/>')
    o.append(text(nx + 18, cy + 28, c["row_title"], 14, BLUE, 700))
    for i, (k, v) in enumerate(c["rows"]):
        yy = cy + 56 + i * 26
        last = i == len(c["rows"]) - 1
        o.append(text(nx + 18, yy, k, 15, MUTED))
        o.append(text(nx + 136, yy, v, 15, BLUE if last else NAVY, 700 if last else 400))

    y = ty + 330
    for item in c["kept"]:
        o.append(f'<circle cx="{rx + 52}" cy="{y - 7}" r="12" fill="{LIGHT}"/>')
        o.append(f'<path d="M{rx + 46} {y - 7}l4 4 8-8" fill="none" stroke="{BLUE}" stroke-width="2.4"/>')
        o.append(text(rx + 76, y, item, 20, NAVY))
        y += 40

    # Bottom: the outcome of the cut.
    o.append('<rect x="120" y="790" width="1360" height="104" rx="20" fill="#E8EEF7"/>')
    o.append(text(156, 852, c["same_day"], 18, "#52627A", 700))
    o.append(text(290, 854, c["tests"], c["tests_size"], BLUE, 700))

    o.append(text(1480, 950, "Kevin Hsu", 16, "#7C899B", anchor="end"))
    o.append("</svg>")
    return "\n".join(o) + "\n"


for lang in JOURNEY:
    (OUT / f"namecard-journey.{lang}.svg").write_text(journey(lang), encoding="utf-8")
    (OUT / f"namecard-rightsize.{lang}.svg").write_text(rightsize(lang), encoding="utf-8")
    print("wrote", lang)
