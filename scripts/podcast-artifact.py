"""Draw the Stock Gods Fight (股神打架) case artifacts (zh / en): one case plate and two stills.

Redrawn from the podcast-stock product UI with demo data; no real tickers, quotes, holdings, or returns.
Every ticker, show, quote, date, and timestamp below is a placeholder. The only real figures are the ones the
case states: the 2026-07-22 measurement of 90 claims (86% of strength scores between 0.6 and 0.9) and the
2026-08-02 long/short ledger design doc behind the bulls-vs-bears layout. The histogram is schematic: its bins
are drawn to match those two numbers, not copied from the measurement.

The product only lays out arguments. It deliberately gives no buy or sell calls and no price targets, so none
of these drawings show prices, returns, or recommendations.

  podcast-arena    1200 x 674   case plate: one ticker, every host's bull or bear case side by side
  podcast-trail    1600 x 1000  still: every claim has a source, so a changed view is on the record
  podcast-honesty  1600 x 1000  still: abstain rather than guess, plus the score-distribution finding

Usage: python3 scripts/podcast-artifact.py  ->  public/portfolio-artifacts/podcast-*.{zh,en}.svg
"""
from html import escape
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "public" / "portfolio-artifacts"
FONT = "Arial, 'PingFang TC', 'Noto Sans TC', sans-serif"
NAVY, BLUE, LIGHT, MUTED = "#172234", "#2D61A6", "#DCE8F7", "#5A6980"


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


def frame(w, h, c):
    return [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-labelledby="title desc">',
        f'<title id="title">{escape(c["title"], quote=False)}</title>',
        f'<desc id="desc">{escape(c["desc"], quote=False)}</desc>',
        '''<defs>
  <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#DCE4EF" stroke-width="1"/></pattern>
  <filter id="shadow" x="-.15" y="-.15" width="1.3" height="1.4"><feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#132033" flood-opacity=".10"/></filter>
</defs>''',
        f'<rect width="{w}" height="{h}" fill="#F5F7FB"/>',
        f'<rect width="{w}" height="{h}" fill="url(#grid)" opacity=".48"/>',
    ]


STANCE_STYLE = {  # fill, text colour
    "bull": (BLUE, "#FFFFFF"),
    "bear": (NAVY, "#FFFFFF"),
    "none": (LIGHT, BLUE),
}


# ---------------------------------------------------------------------------------------------------------
# 1) Case plate: the arena. One ticker, bulls and bears side by side, no majority vote, no buy or sell call.

ARENA = {
    "zh": {
        "title": "股神打架：買之前，先看各方多空",
        "desc": "股神打架把同一檔示範標的的 Podcast 看法並排：多方三個節目、空方一個節目，每一位都附上原話與出處（集數、時間點）。不做多數決 3:1，因為三家看多、一家看空，不是 3:1，而是有一個人看到了別人沒看到的風險。關鍵判斷：只攤開論點，不給買賣建議。圖中標的、節目與原話皆為示範資料。",
        "kicker": "工作之餘 / 自己的困擾",
        "head": "買之前，先看股神打架。",
        "head_size": 44,
        "sub": "股神打架：同一檔標的，每位主持人的多空看法與原話並排。",
        "sub_size": 20,
        "ticker": "範例標的 A",
        "vote": "多數決 3 : 1",
        "vote_no": "不採用",
        "bull_head": "多方｜3 個聲音",
        "bear_head": "空方｜1 個聲音",
        "bulls": [
            ("節目甲", "「這季訂單能見度比上季好」", "出自：第 12 集 · 18:42"),
            ("節目乙", "「新產品線的需求看起來穩定」", "出自：第 7 集 · 21:05"),
            ("節目丙", "「通路回報的反應不錯」", "出自：第 3 集 · 40:17"),
        ],
        "bear": ("節目丁", "「主要客戶的庫存其實還很高」", "出自：第 9 集 · 12:30"),
        "quote_size": 18,
        "callout": ["三家看多、一家看空，不是 3:1，", "而是有一個人看到了別人沒看到的風險。"],
        "callout_size": 21,
        "result": ("關鍵判斷", "只攤開論點，不給買賣建議"),
    },
    "en": {
        "title": "Stock Gods Fight: see every bull and bear case before you buy",
        "desc": "Stock Gods Fight puts every podcast host's view on one demo ticker side by side: three shows on the bull side, one on the bear side, each with a verbatim quote and its source (episode, timestamp). There is no 3 to 1 majority vote, because three bulls and one bear is not 3 to 1; one person saw a risk the others missed. Key call: lay out the arguments, never a buy or sell call. Tickers, shows, and quotes are demo data.",
        "kicker": "AFTER HOURS / A PERSONAL PAIN",
        "head": "Before you buy, watch the stock gods fight.",
        "head_size": 38,
        "sub": "Stock Gods Fight puts every host's bull or bear case for one ticker side by side.",
        "sub_size": 18,
        "ticker": "Sample ticker A",
        "vote": "Majority vote 3 : 1",
        "vote_no": "Not used",
        "bull_head": "BULLS | 3 VOICES",
        "bear_head": "BEARS | 1 VOICE",
        "bulls": [
            ("Show A", "“Order visibility beats last quarter”", "Ep. 12 · 18:42"),
            ("Show B", "“Demand for the new line looks steady”", "Ep. 7 · 21:05"),
            ("Show C", "“Channel feedback has been positive”", "Ep. 3 · 40:17"),
        ],
        "bear": ("Show D", "“The main customer still holds a lot of stock”", "Ep. 9 · 12:30"),
        "quote_size": 16,
        "callout": ["Three bulls and one bear is not 3 to 1.", "One person saw a risk the others missed."],
        "callout_size": 18,
        "result": ("Key call", "Lay out the arguments, never a buy or sell call"),
    },
}


def vote_pill(o, c, right, y, size):
    """The majority vote we chose not to use: a struck-through grey pill with a 'not used' label."""
    vw = round(width(c["vote"], size, 700)) + 32
    vx = right - vw
    h = size + 14
    o.append(text(vx - 14, y + h / 2 + size * 0.35, c["vote_no"], size - 2, "#7C899B", 700, anchor="end"))
    o.append(f'<rect x="{vx}" y="{y}" width="{vw}" height="{h}" rx="{h / 2}" fill="#EEF1F6"/>')
    o.append(text(vx + vw / 2, y + h / 2 + size * 0.35, c["vote"], size, "#9AA6B7", 700, anchor="middle"))
    o.append(f'<path d="M{vx + 10} {y + h / 2}H{vx + vw - 10}" stroke="#7C899B" stroke-width="2"/>')


def voice_card(o, x, y, w, h, show, quote, source, qsize, dark=False):
    bg, ink, name, chip_bg, chip_ink = (("#152236", "#F7FAFF", "#8FB8EF", "#24344D", "#BFD3F0") if dark
                                        else ("#FFFFFF", NAVY, BLUE, "#EEF2F8", MUTED))
    o.append(f'<g filter="url(#shadow)"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="16" fill="{bg}"/></g>')
    o.append(text(x + 20, y + 30, show, 15, name, 700))
    cw = round(width(source, 12)) + 22
    o.append(f'<rect x="{x + w - 16 - cw}" y="{y + 13}" width="{cw}" height="24" rx="12" fill="{chip_bg}"/>')
    o.append(text(x + w - 16 - cw / 2, y + 30, source, 12, chip_ink, anchor="middle"))
    o.append(text(x + 20, y + 62, quote, qsize, ink, 600, maxw=w - 40))


def render_arena(lang):
    c = ARENA[lang]
    o = frame(1200, 674, c)
    # The case cover crops 16:10 from 1200 x 674, losing about 60px per side: everything sits inside x 96-1104.
    o.append(text(96, 66, c["kicker"], 15, BLUE, 700, spacing=2.4, maxw=1008))
    o.append(text(96, 122, c["head"], c["head_size"], NAVY, 700, maxw=1008))
    o.append(text(96, 160, c["sub"], c["sub_size"], MUTED, maxw=1008))

    # Ticker bar with the rejected majority vote.
    o.append('<rect x="96" y="184" width="1008" height="50" rx="14" fill="#FFFFFF" stroke="#DCE4EF"/>')
    o.append(text(120, 216, c["ticker"], 20, NAVY, 700))
    vote_pill(o, c, 1080, 194, 15)

    colw, gap, h = 492, 24, 80
    bx, rx = 96, 96 + colw + gap
    o.append(f'<rect x="{bx}" y="250" width="{colw}" height="4" rx="2" fill="{BLUE}"/>')
    o.append(f'<rect x="{rx}" y="250" width="{colw}" height="4" rx="2" fill="{NAVY}"/>')
    o.append(text(bx, 276, c["bull_head"], 14, BLUE, 700, spacing=1.4))
    o.append(text(rx, 276, c["bear_head"], 14, NAVY, 700, spacing=1.4))
    for i, (show, q, s) in enumerate(c["bulls"]):
        voice_card(o, bx, 290 + i * (h + 10), colw, h, show, q, s, c["quote_size"])
    voice_card(o, rx, 290, colw, h, *c["bear"], c["quote_size"], dark=True)

    # Callout: why the lone bear gets a full column.
    cy, ch = 290 + h + 10, 2 * h + 10
    o.append(f'<rect x="{rx}" y="{cy}" width="{colw}" height="{ch}" rx="16" fill="{LIGHT}"/>')
    o.append(f'<rect x="{rx}" y="{cy}" width="6" height="{ch}" rx="3" fill="{BLUE}"/>')
    lh = c["callout_size"] + 12
    y0 = cy + ch / 2 - (len(c["callout"]) - 1) * lh / 2 + c["callout_size"] * 0.35
    for i, line in enumerate(c["callout"]):
        o.append(text(rx + 32, round(y0 + i * lh), line, c["callout_size"], NAVY, 700, maxw=colw - 56))

    o.append('<rect x="96" y="566" width="1008" height="40" rx="12" fill="#E8EEF7"/>')
    o.append(text(118, 592, c["result"][0], 14, "#52627A", 700))
    o.append(text(1082, 593, c["result"][1], 17, BLUE, 700, anchor="end", maxw=860))

    o.append(text(1104, 642, "Kevin Hsu", 13, "#7C899B", anchor="end"))
    o.append("</svg>")
    return "\n".join(o) + "\n"

# ---------------------------------------------------------------------------------------------------------
# Stills share a 1600 x 1000 header: content sits inside x 96-1504.

def still_header(o, c):
    o.append(text(96, 92, c["kicker"], 19, BLUE, 700, spacing=2.8, maxw=1408))
    o.append(text(96, 166, c["head"], c["head_size"], NAVY, 700, maxw=1408))
    o.append(text(96, 214, c["sub"], c["sub_size"], MUTED, maxw=1408))


def signature(o):
    o.append(text(1504, 948, "Kevin Hsu", 17, "#7C899B", anchor="end"))




# 2) Still: one host's view on one ticker changes over time, and every step keeps its quote and source.

TRAIL = {
    "zh": {
        "title": "每句話都有出處，看法變了也查得到",
        "desc": "以前一集只有一份摘要，回答不了誰的看法什麼時候變了。股神打架把每一句看法記成標的、立場、時間、原話與出處：同一個節目對示範標的 A 先看多、再沒選邊、後來看空，每一步都留著原話與集數、時間點。關鍵判斷：每筆觀點都要找得到原話。圖中標的、節目與原話皆為示範資料。",
        "kicker": "產品決策 / 觀點有出處",
        "head": "每句話都有出處，看法變了也查得到",
        "head_size": 54,
        "sub": "同一位主持人對同一檔標的的看法隨時間改變，每一步都留著原話。",
        "sub_size": 26,
        "before": "以前：一集一份摘要",
        "summary": "本集摘要",
        "bullets": ["主持人聊了本季產業景氣", "提到幾檔關注中的標的", "最後談到總體經濟"],
        "cant": "這份摘要回答不了",
        "questions": ["誰的看法什麼時候變了？", "講得準不準？"],
        "q_size": 26,
        "after": "股神打架：節目甲 × 範例標的 A",
        "rows": [
            ("bull", "看多", "2026-03-04", "「這季訂單能見度比上季好」", "出自：節目甲 · 第 12 集 · 18:42"),
            ("none", "沒選邊", "2026-04-15", "「先觀察下一季庫存再說」", "出自：節目甲 · 第 14 集 · 33:10"),
            ("bear", "看空", "2026-05-20", "「客戶拉貨的節奏在放慢」", "出自：節目甲 · 第 15 集 · 09:26"),
        ],
        "quote_size": 28,
        "result": ("關鍵判斷", "每筆觀點都要找得到原話"),
    },
    "en": {
        "title": "Every claim has a source, so a changed view is on the record",
        "desc": "Before, each episode got one summary, which could not say whose view changed or when. Stock Gods Fight records every claim with its ticker, stance, date, verbatim quote, and source: one show goes from bullish to no side to bearish on demo Sample ticker A, and each step keeps its quote, episode, and timestamp. Key call: every claim must trace to a verbatim quote. Tickers, shows, and quotes are demo data.",
        "kicker": "PRODUCT DECISION / CLAIMS WITH SOURCES",
        "head": "Every claim has a source, so a changed view is on the record",
        "head_size": 40,
        "sub": "When one host's view on a ticker shifts over time, each step keeps its verbatim quote.",
        "sub_size": 24,
        "before": "BEFORE: PER-EPISODE SUMMARY",
        "summary": "Episode summary",
        "bullets": ["Talked about the quarter", "Several names came up", "Closed on the macro view"],
        "cant": "WHAT IT CAN'T ANSWER",
        "questions": ["Who changed their view,", "and when? Were they right?"],
        "q_size": 22,
        "after": "STOCK GODS FIGHT: SHOW A × SAMPLE TICKER A",
        "rows": [
            ("bull", "Bullish", "2026-03-04", "“Order visibility looks better than last quarter”", "Source: Show A · Ep. 12 · 18:42"),
            ("none", "No side", "2026-04-15", "“Let's see next quarter's inventory first”", "Source: Show A · Ep. 14 · 33:10"),
            ("bear", "Bearish", "2026-05-20", "“Customers are slowing their pull-ins”", "Source: Show A · Ep. 15 · 09:26"),
        ],
        "quote_size": 25,
        "result": ("Key call", "Every claim must trace to a verbatim quote"),
    },
}


def render_trail(lang):
    c = TRAIL[lang]
    o = frame(1600, 1000, c)
    still_header(o, c)

    # Left: the old unit, deliberately dim.
    lx, lw, top, bottom = 96, 440, 262, 892
    inner = lw - 80
    o.append(f'<rect x="{lx}" y="{top}" width="{lw}" height="{bottom - top}" rx="26" fill="#EBEFF5" stroke="#D3DBE7"/>')
    o.append(text(lx + 36, top + 50, c["before"], 16, "#7C899B", 700, spacing=1.8, maxw=inner))
    o.append(f'<rect x="{lx + 28}" y="{top + 80}" width="{lw - 56}" height="230" rx="18" fill="#FFFFFF" opacity=".75"/>')
    o.append(text(lx + 56, top + 130, c["summary"], 26, "#7C899B", 700, maxw=inner))
    for i, line in enumerate(c["bullets"]):
        y = top + 186 + i * 40
        o.append(f'<circle cx="{lx + 62}" cy="{y - 7}" r="4" fill="#A9B4C4"/>')
        o.append(text(lx + 80, y, line, 20, "#8592A5", maxw=inner - 30))
    qy = top + 340
    o.append(f'<rect x="{lx + 28}" y="{qy}" width="{lw - 56}" height="{bottom - 28 - qy}" rx="18" fill="none" stroke="#B8C3D3" stroke-dasharray="7 7"/>')
    o.append(text(lx + 56, qy + 56, c["cant"], 16, "#7C899B", 700, spacing=1.6, maxw=inner - 20))
    for i, q in enumerate(c["questions"]):
        o.append(text(lx + 56, qy + 112 + i * 44, q, c["q_size"], NAVY, 700, maxw=inner - 20))
    o.append(f'<path d="M560 577h32m-12-11 12 11-12 11" fill="none" stroke="{BLUE}" stroke-width="3"/>')

    # Right: a timeline of one host's claims on one ticker.
    x0 = 616
    w = 1504 - x0
    o.append(text(x0, 288, c["after"], 18, BLUE, 700, spacing=1.8, maxw=w))
    line_x = x0 + 14
    cx0 = x0 + 44
    cw = 1504 - cx0
    h, step = 152, 172
    o.append(f'<path d="M{line_x} {316 + h / 2}V{316 + 2 * step + h / 2}" stroke="#C5D2E4" stroke-width="3"/>')
    for i, (kind, stance, date, quote, source) in enumerate(c["rows"]):
        ty = 316 + i * step
        fill, ink = STANCE_STYLE[kind]
        o.append(f'<circle cx="{line_x}" cy="{ty + h / 2}" r="10" fill="{fill}" stroke="#FFFFFF" stroke-width="3"/>')
        o.append(f'<g filter="url(#shadow)"><rect x="{cx0}" y="{ty}" width="{cw}" height="{h}" rx="20" fill="#FFFFFF"/></g>')
        o.append(f'<rect x="{cx0 + 28}" y="{ty + 24}" width="112" height="36" rx="18" fill="{fill}"/>')
        o.append(text(cx0 + 84, ty + 48, stance, 17, ink, 700, anchor="middle", maxw=100))
        o.append(text(cx0 + cw - 28, ty + 49, date, 18, "#7C899B", anchor="end"))
        o.append(text(cx0 + 28, ty + 100, quote, c["quote_size"], NAVY, 600, maxw=cw - 56))
        o.append(text(cx0 + 28, ty + 132, source, 17, MUTED, maxw=cw - 56))

    o.append(f'<rect x="{cx0}" y="836" width="{cw}" height="56" rx="14" fill="#E8EEF7"/>')
    o.append(text(cx0 + 28, 871, c["result"][0], 18, "#52627A", 700))
    o.append(text(1504 - 28, 872, c["result"][1], 22, BLUE, 700, anchor="end", maxw=cw - 180))

    signature(o)
    o.append("</svg>")
    return "\n".join(o) + "\n"


# 3) Still: abstain rather than guess, and the measurement that changed the unit of judgment.

# Schematic bin heights for 10 bins over 0..1, summing to 90 with 77 (86%) in 0.6-0.9. Shape only; not real counts.
BINS = [0, 1, 1, 2, 3, 5, 24, 30, 23, 1]

HONESTY = {
    "zh": {
        "title": "寧可棄權，也不硬判",
        "desc": "三條誠實規則：對不上原文就不計分（觀點要和逐字稿比對，對不上的不計分）；沒選邊就不算輸贏（中立討論只存成證據）；樣本不足顯示「資料不足」，不顯示 0%。另一張資料圖：量測 90 筆實際觀點，86% 的強度分數擠在 0.6 到 0.9，沒有鑑別力，因此判斷單位改成「一集 × 一檔」並附證據鏈（2026-07-22）。直方圖為示意。",
        "kicker": "產品決策 / 計分的誠實規則",
        "head": "寧可棄權，也不硬判",
        "head_size": 56,
        "sub": "先確保每一個分數都有根據，再談準不準。",
        "sub_size": 26,
        "title_size": 25,
        "cards": [
            (["對不上原文就不計分"], ["每筆觀點都拿逐字稿比對原話，", "對不上的不進帳、不計分。"], "逐字稿比對"),
            (["沒選邊就不算輸贏"], ["中立的討論只存成證據，", "不進入準確度計算。"], "僅作證據"),
            (["樣本不足顯示「資料不足」，", "不顯示 0%"], ["觀點太少時不給分數，", "避免把沒資料讀成看錯。"], "資料不足"),
        ],
        "body_size": 20,
        "panel": "量測 90 筆實際觀點（2026-07-22）",
        "axis": "強度分數",
        "big": "86%",
        "finding": ["的強度分數擠在 0.6 到 0.9，", "沒有鑑別力。"],
        "finding_size": 26,
        "change_label": "所以改了判斷單位",
        "change": ["判斷單位改成「一集 × 一檔」，", "並附上證據鏈。"],
        "change_size": 24,
    },
    "en": {
        "title": "Abstain rather than guess",
        "desc": "Three honesty rules: no match, no score (claims are checked against the transcript and unmatched claims are excluded); no side, no win or loss (neutral discussion is stored as evidence only); too few claims shows “Not enough data” instead of 0%. A data panel: measured on 90 real claims, 86% of strength scores sat between 0.6 and 0.9 and could not tell claims apart, so the unit of judgment became one episode × one ticker with an evidence chain (2026-07-22). The histogram is schematic.",
        "kicker": "PRODUCT DECISION / HONEST SCORING RULES",
        "head": "Abstain rather than guess",
        "head_size": 56,
        "sub": "Make every score defensible before asking whether it is accurate.",
        "sub_size": 24,
        "title_size": 22,
        "cards": [
            (["No match, no score"], ["Every claim is checked against", "the transcript. Unmatched", "claims are left out."], "Transcript check"),
            (["No side, no win or loss"], ["Neutral discussion is kept as", "evidence only, never scored", "for accuracy."], "Evidence only"),
            (["Too few claims shows", "“Not enough data,” not 0%"], ["No score until there are enough", "claims, so missing data never", "reads as a wrong call."], "Not enough data"),
        ],
        "body_size": 18,
        "panel": "MEASURED ON 90 REAL CLAIMS (2026-07-22)",
        "axis": "Strength score",
        "big": "86%",
        "finding": ["of strength scores sat between", "0.6 and 0.9: no way to tell", "claims apart."],
        "finding_size": 23,
        "change_label": "SO THE UNIT OF JUDGMENT CHANGED",
        "change": ["Judge one episode × one ticker,", "with an evidence chain attached."],
        "change_size": 22,
    },
}


def render_honesty(lang):
    c = HONESTY[lang]
    o = frame(1600, 1000, c)
    still_header(o, c)

    # Three rule cards.
    gap = 32
    cw = (1408 - 2 * gap) // 3
    top, ch = 254, 286
    for i, (titles, body, chip) in enumerate(c["cards"]):
        x = 96 + i * (cw + gap)
        o.append(f'<g filter="url(#shadow)"><rect x="{x}" y="{top}" width="{cw}" height="{ch}" rx="22" fill="#FFFFFF"/></g>')
        first = i == 0
        o.append(f'<circle cx="{x + 52}" cy="{top + 52}" r="22" fill="{BLUE if first else LIGHT}"/>')
        o.append(text(x + 52, top + 59, f"{i + 1:02d}", 17, "#FFFFFF" if first else BLUE, 700, anchor="middle"))
        y = top + 60
        for j, t in enumerate(titles):
            o.append(text(x + 90, top + 61 + j * 34, t, c["title_size"], NAVY, 700, maxw=cw - 112))
        y = top + 61 + (len(titles) - 1) * 34 + 44
        for j, line in enumerate(body):
            o.append(text(x + 32, y + j * 30, line, c["body_size"], MUTED, maxw=cw - 64))
        chw = round(width(chip, 16, 700)) + 32
        o.append(f'<rect x="{x + 32}" y="{top + ch - 58}" width="{chw}" height="32" rx="16" fill="{LIGHT}"/>')
        o.append(text(x + 32 + chw / 2, top + ch - 36, chip, 16, BLUE, 700, anchor="middle"))

    # Data panel: schematic histogram on the left, finding and decision on the right.
    py, ph = 572, 336
    o.append(f'<g filter="url(#shadow)"><rect x="96" y="{py}" width="1408" height="{ph}" rx="26" fill="#FFFFFF"/></g>')
    o.append(text(136, py + 50, c["panel"], 17, BLUE, 700, spacing=1.8, maxw=620))

    hx, hw, base = 136, 600, py + ph - 70
    hmax = 140
    bw = hw / len(BINS)
    peak = max(BINS)
    for i, v in enumerate(BINS):
        bh = max(2, round(v / peak * hmax))
        hot = 6 <= i <= 8
        o.append(f'<rect x="{hx + i * bw + 4:.1f}" y="{base - bh}" width="{bw - 8:.1f}" height="{bh}" rx="4" fill="{BLUE if hot else LIGHT}"/>')
    o.append(f'<path d="M{hx} {base}H{hx + hw}" stroke="#A9B4C4" stroke-width="2"/>')
    o.append(text(hx, base + 28, "0", 16, MUTED, anchor="middle"))
    o.append(text(hx + hw, base + 28, "1", 16, MUTED, anchor="middle"))
    o.append(text(hx + hw / 2, base + 28, c["axis"], 16, MUTED, anchor="middle"))
    # Bracket over the crowded band.
    b0, b1, by = hx + 6 * bw + 4, hx + 9 * bw - 4, base - hmax - 16
    o.append(f'<path d="M{b0:.1f} {by + 10}V{by}H{b1:.1f}V{by + 10}" fill="none" stroke="{NAVY}" stroke-width="2"/>')
    o.append(text((b0 + b1) / 2, by - 10, c["big"], 20, NAVY, 700, anchor="middle"))

    # Right side of the panel.
    tx = 800
    tw = 1504 - 40 - tx
    o.append(text(tx, py + 112, c["big"], 64, BLUE, 700))
    for j, line in enumerate(c["finding"]):
        o.append(text(tx + 150, py + 92 + j * 34 - (17 if len(c["finding"]) > 2 else 0), line, c["finding_size"], NAVY, 700, maxw=tw - 150))
    o.append(f'<path d="M{tx} {py + 170}H{1504 - 40}" stroke="#DCE4EF" stroke-width="2"/>')
    o.append(text(tx, py + 212, c["change_label"], 15, "#52627A", 700, spacing=1.6, maxw=tw))
    o.append(f'<rect x="{tx}" y="{py + 232}" width="{tw}" height="{len(c["change"]) * 34 + 28}" rx="16" fill="#E8EEF7"/>')
    o.append(text(tx + 24, py + 272, "→", c["change_size"], BLUE, 700))
    for j, line in enumerate(c["change"]):
        o.append(text(tx + 60, py + 272 + j * 34, line, c["change_size"], BLUE, 700, maxw=tw - 84))

    signature(o)
    o.append("</svg>")
    return "\n".join(o) + "\n"




for name, fn, copy in (("podcast-arena", render_arena, ARENA),
                       ("podcast-trail", render_trail, TRAIL),
                       ("podcast-honesty", render_honesty, HONESTY)):
    for lang in copy:
        (OUT / f"{name}.{lang}.svg").write_text(fn(lang), encoding="utf-8")
        print("wrote", name, lang)
