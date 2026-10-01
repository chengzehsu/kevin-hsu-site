"""Draw the health-app case artifact (zh / en), reconstructed from the 2025/1 PM deck, slides 21-23.

Slide 21: interview the key roles to recover the real situations; slide 22: turn those situations into a
wireframe, user stories, and a PRD; slide 23: a parameter map and a translation map. The situations on the
left come from the case copy (IoT scale, event sign-up, languages, legacy data). The original slides are
low-resolution screenshots, so this redraws the argument instead.

Usage: python3 scripts/health-artifact.py  ->  public/portfolio-artifacts/health-spec.{zh,en}.svg
"""
from html import escape
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "public" / "portfolio-artifacts"
FONT = "Arial, 'PingFang TC', 'Noto Sans TC', sans-serif"
NAVY, BLUE, LIGHT, MUTED = "#172234", "#2D61A6", "#DCE8F7", "#5A6980"

COPY = {
    "zh": {
        "title": "健康 App 的情境規格化",
        "desc": "訪談重要角色，還原 IoT 體重計、活動報名、多國語系與舊資料遷移的真實情境，再整理成 Wireframe、User Story、PRD、參數對照表與翻譯對照表。新平台上線一年後，DAU 由 12,000 增至 20,000 (+66%)。",
        "kicker": "PRODUCT SPEC / 健康 App",
        "head": "先還原真實情境，再寫成規格",
        "sub": "訪談重要角色，把跨裝置情境轉成工程能直接開工的文件。",
        "asked": "訪談還原的情境",
        "groups": [
            ("IoT 體重計", ["量測資料要接進新平台", "裝置與 App 的欄位對不上"]),
            ("活動報名", ["報名流程要搬進新 App", "每種裝置的操作要一致"]),
            ("多國語系與舊資料", ["舊欄位要遷移到新結構", "每種語系的文案要對齊"]),
        ],
        "spec": "真實情境規格化",
        "docs": [
            ("Wireframe", "畫面與跨裝置流程"),
            ("User Story", "每個角色要完成的事"),
            ("PRD", "功能範圍與驗收"),
        ],
        "align": "開發前先對齊",
        "maps": [
            ("參數對照表", "新舊欄位、IoT 資料逐欄對照"),
            ("翻譯對照表", "多國語系文案上線前對齊"),
        ],
        "result": ("專案成果", "上線 1 年 DAU 12,000 → 20,000 (+66%)"),
        "head_size": 44,
    },
    "en": {
        "title": "Turning health-app situations into specs",
        "desc": "Interviews with the key roles recovered the real situations around the IoT scale, event sign-up, languages, and legacy-data migration; they became a wireframe, user stories, a PRD, a parameter map, and a translation map. One year after the new platform launched, DAU rose from 12,000 to 20,000 (+66%).",
        "kicker": "PRODUCT SPEC / HEALTH APP",
        "head": "Recover the real situation, then write the spec",
        "sub": "Interview the key roles, then turn cross-device situations into documents engineers can build from.",
        "asked": "WHAT THE INTERVIEWS SURFACED",
        "groups": [
            ("IoT scale", ["Readings must reach the new app", "Device and app fields disagree"]),
            ("Event sign-up", ["The flow moves into the new app", "Same steps on every device"]),
            ("Languages & legacy data", ["Old fields move to a new model", "Copy must match in every locale"]),
        ],
        "spec": "SITUATIONS INTO SPECS",
        "docs": [
            ("Wireframe", "Screens and flows"),
            ("User Story", "Each role's jobs"),
            ("PRD", "Scope and acceptance"),
        ],
        "align": "ALIGNED BEFORE BUILD",
        "maps": [
            ("Parameter map", "Old, new, and IoT fields mapped"),
            ("Translation map", "Copy aligned for every locale"),
        ],
        "result": ("Program result", "DAU 12,000 → 20,000 in a year (+66%)"),
        "head_size": 36,
    },
}


def text(x, y, s, size, fill, weight=400, anchor="start", spacing=None):
    ls = f' letter-spacing="{spacing}"' if spacing else ""
    return (f'<text x="{x}" y="{y}" fill="{fill}" font-family="{FONT}" font-size="{size}" '
            f'font-weight="{weight}" text-anchor="{anchor}"{ls}>{escape(s, quote=False)}</text>')


def card(o, x, y, w, h, number, name, line, first=False):
    o.append(f'<g filter="url(#shadow)"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="16" fill="#FFFFFF"/></g>')
    o.append(f'<circle cx="{x + 30}" cy="{y + 30}" r="15" fill="{BLUE if first else LIGHT}"/>')
    o.append(text(x + 30, y + 35, f"{number:02d}", 13, "#FFFFFF" if first else BLUE, 700, anchor="middle"))
    o.append(text(x + 54, y + 36, name, 19, NAVY, 700))
    o.append(text(x + 18, y + h - 20, line, 14, MUTED))


def render(lang: str) -> str:
    c = COPY[lang]
    o = [
        '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="674" viewBox="0 0 1200 674" role="img" aria-labelledby="title desc">',
        f'<title id="title">{escape(c["title"], quote=False)}</title>',
        f'<desc id="desc">{escape(c["desc"], quote=False)}</desc>',
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
    o.append(text(96, 160, c["sub"], 20 if lang == "zh" else 18, MUTED))

    # Left: what the interviews recovered.
    o.append('<g filter="url(#shadow)"><rect x="96" y="196" width="380" height="404" rx="26" fill="#152236"/></g>')
    o.append(text(128, 240, c["asked"], 14, "#8FB8EF", 700, spacing=2))
    y = 288
    for label, lines in c["groups"]:
        o.append(text(128, y, label, 15, "#8FB8EF", 700))
        for i, line in enumerate(lines):
            o.append(text(128, y + 30 + i * 28, line, 18, "#F7FAFF", 600 if i == 0 else 400))
        y += 112
    o.append(f'<path d="M490 398h28m-10-9 10 9-10 9" fill="none" stroke="{BLUE}" stroke-width="2.5"/>')

    # Right: the documents engineers built from.
    x0, width, gap = 540, 564, 12
    o.append(text(x0, 222, c["spec"], 15, BLUE, 700, spacing=2))
    w3 = (width - 2 * gap) / 3
    for i, (name, line) in enumerate(c["docs"]):
        card(o, round(x0 + i * (w3 + gap)), 238, round(w3), 112, i + 1, name, line, first=i == 0)
    o.append(text(x0, 386, c["align"], 15, BLUE, 700, spacing=2))
    w2 = (width - gap) / 2
    for i, (name, line) in enumerate(c["maps"]):
        card(o, round(x0 + i * (w2 + gap)), 402, round(w2), 112, i + 4, name, line)

    o.append(f'<rect x="{x0}" y="560" width="{width}" height="40" rx="12" fill="#E8EEF7"/>')
    o.append(text(x0 + 22, 586, c["result"][0], 14, "#52627A", 700))
    o.append(text(x0 + width - 22, 587, c["result"][1], 17, BLUE, 700, anchor="end"))

    o.append(text(1104, 638, "Kevin Hsu", 13, "#7C899B", anchor="end"))
    o.append("</svg>")
    return "\n".join(o) + "\n"


for lang in COPY:
    (OUT / f"health-spec.{lang}.svg").write_text(render(lang), encoding="utf-8")
    print("wrote", lang)
