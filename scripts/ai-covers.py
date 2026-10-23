"""Draw the covers for 「用 AI 解決問題」 items that have no public screen: landscape, text-free, one motif each.

Same palette and frame as the case posters, so the AI section reads as part of the same site. Covers carry
only the shape of each item; the card title and figure sit below the image, never over it. Life-automation
covers show the kind of chore, never a number, so nothing about money can leak through them.

Usage: python3 scripts/ai-covers.py  ->  public/ai-covers/<name>.svg
"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "public" / "ai-covers"
W, H = 800, 500

PAPER, SKELETON, FAINT = "#F4F7FB", "#C9D6EA", "#E3EAF4"
ACCENT, ACCENT_SOFT, INK_CARD, INK_LINE = "#4C82D0", "#8FB8EF", "#16233A", "#2C3E5E"


def frame(motif: list[str]) -> str:
    return "\n".join([
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" aria-hidden="true">',
        "<defs>",
        '  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1F3354"/><stop offset=".6" stop-color="#132036"/><stop offset="1" stop-color="#0E141E"/></linearGradient>',
        '  <radialGradient id="glow" cx=".8" cy=".1" r=".7"><stop offset="0" stop-color="#2D61A6" stop-opacity=".5"/><stop offset="1" stop-color="#2D61A6" stop-opacity="0"/></radialGradient>',
        '  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#8FB8EF" stroke-opacity=".07"/></pattern>',
        '  <filter id="lift" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#05080F" flood-opacity=".45"/></filter>',
        "</defs>",
        f'<rect width="{W}" height="{H}" fill="url(#bg)"/>',
        f'<rect width="{W}" height="{H}" fill="url(#grid)"/>',
        f'<rect width="{W}" height="{H}" fill="url(#glow)"/>',
        *motif,
        "</svg>",
    ]) + "\n"


def lines(x, y, widths, gap=16, height=8, color=SKELETON):
    return [f'<rect x="{x}" y="{y + i * gap}" width="{w}" height="{height}" rx="{height / 2}" fill="{color}"/>' for i, w in enumerate(widths)]


def card(x, y, w, h, fill=PAPER, r=16):
    return f'<g filter="url(#lift)"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}"/></g>'


def check(cx, cy, r=14, filled=True):
    ring = f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{ACCENT if filled else FAINT}"/>'
    tick = f'<path d="M{cx - r * .4} {cy}l{r * .3} {r * .3} {r * .5} -{r * .55}" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'
    return ring + (tick if filled else "")


def arrow(x, y, length=46):
    return f'<path d="M{x} {y}h{length}m-12 -11 12 11-12 11" fill="none" stroke="{ACCENT_SOFT}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>'


def ask(cx, cy):
    # A person's question: a dark bubble with a question mark, the human half of every item.
    return "".join([
        f'<g filter="url(#lift)"><rect x="{cx - 34}" y="{cy - 26}" width="68" height="52" rx="16" fill="{INK_CARD}" stroke="{INK_LINE}"/></g>',
        f'<path d="M{cx - 14} {cy + 26}l-8 14 20 -14z" fill="{INK_CARD}"/>',
        f'<path d="M{cx - 8} {cy - 7}q8 -13 16 0q0 8 -8 11v5" fill="none" stroke="{ACCENT_SOFT}" stroke-width="3.5" stroke-linecap="round"/>',
        f'<circle cx="{cx}" cy="{cy + 17}" r="2.6" fill="{ACCENT_SOFT}"/>',
    ])


def prototype():
    # Three stacked clickable screens and a pointer: talk over screens, not documents.
    m = []
    for i, (x, y) in enumerate(((150, 120), (260, 92), (370, 64))):
        m.append(card(x, y, 300, 220, PAPER if i == 2 else "#DCE6F3"))
        m.append(f'<rect x="{x}" y="{y}" width="300" height="30" rx="16" fill="{FAINT}"/>')
        m += [f'<circle cx="{x + 22 + k * 14}" cy="{y + 15}" r="4" fill="{c}"/>' for k, c in enumerate(("#F2A7A0", "#F3D08A", "#A9D8A6"))]
        if i == 2:
            m.append(f'<rect x="{x + 20}" y="{y + 50}" width="80" height="150" rx="10" fill="#EDF2F8"/>')
            m += lines(x + 120, y + 56, (150, 110, 130), gap=20)
            m.append(f'<rect x="{x + 120}" y="{y + 132}" width="96" height="36" rx="18" fill="{ACCENT}"/>')
    m.append(f'<path d="M560 214l0 54 13 -12 11 25 10 -5 -11 -24 18 -1z" fill="#FFFFFF" stroke="{INK_CARD}" stroke-width="3" stroke-linejoin="round"/>')
    return frame(m)


def naming():
    # Messy vendor names line up as standard names; the one the machine is unsure of goes to a person.
    m = []
    for i, (w, tilt) in enumerate(((150, -4), (110, 3), (170, -2), (130, 5), (96, -3))):
        y = 92 + i * 66
        m.append(f'<g transform="rotate({tilt} {80 + w / 2} {y + 18})">{card(80, y, w, 36, INK_CARD, 12)}</g>')
        m += lines(96, y + 14, (w - 34,), color="#3B5179")
    m.append(arrow(300, 250))
    for i in range(5):
        y = 92 + i * 66
        m.append(card(380, y, 230, 40, PAPER, 12))
        m += lines(400, y + 16, (120,), color="#9DB6D8" if i != 3 else SKELETON)
        m.append(check(584, y + 20, 11, i != 3))
    m.append(ask(690, 300))
    return frame(m)


def faq():
    # Many questions pass two gates; only the approved answer reaches sales.
    m = []
    for i, y in enumerate((96, 176, 256, 336)):
        m.append(card(70, y, 170, 52, INK_CARD, 14))
        m += lines(88, y + 15, (120 - i * 12, 80), gap=14, color="#3B5179")
    for k, x in enumerate((300, 410)):
        m.append(f'<rect x="{x}" y="110" width="14" height="280" rx="7" fill="{ACCENT_SOFT}" opacity=".35"/>')
        m.append(f'<rect x="{x - 8}" y="{230 - k * 30}" width="30" height="60" rx="10" fill="{ACCENT}"/>')
        m.append(f'<circle cx="{x + 7}" cy="{260 - k * 30}" r="7" fill="#FFFFFF"/>')
    m.append(arrow(250, 250, 36))
    m.append(arrow(330, 250, 60))
    m.append(arrow(440, 250, 60))
    m.append(card(520, 170, 210, 160, PAPER))
    m.append(check(556, 206, 16))
    m += lines(586, 198, (110,), color="#9DB6D8")
    m += lines(546, 240, (160, 130, 150, 90), gap=18)
    return frame(m)


def weekly():
    # A weekly report proposes options; one is chosen, and an empty week is marked, not filled in.
    m = [card(110, 70, 300, 360)]
    m += lines(140, 104, (150,), height=12, color="#9DB6D8")
    m += lines(140, 140, (240, 210, 230, 180), gap=18)
    for i in range(3):
        y = 240 + i * 52
        m.append(f'<rect x="140" y="{y}" width="240" height="38" rx="12" fill="{"#DCE8F7" if i == 1 else "#FFFFFF"}" stroke="{ACCENT if i == 1 else FAINT}" stroke-width="2"/>')
        m.append(check(162, y + 19, 10, i == 1))
        m += lines(184, y + 15, (130 - i * 18,), color="#9DB6D8" if i == 1 else SKELETON)
    for i in range(5):
        x = 470 + (i % 3) * 82
        y = 120 + (i // 3) * 130
        m.append(card(x, y, 66, 100, PAPER if i != 3 else "transparent", 12))
        if i == 3:
            m.append(f'<rect x="{x}" y="{y}" width="66" height="100" rx="12" fill="none" stroke="{ACCENT_SOFT}" stroke-width="2.5" stroke-dasharray="7 7"/>')
        else:
            m += lines(x + 12, y + 18, (42, 30, 38), gap=14)
    return frame(m)


def checks():
    # Each past incident becomes a test row; a shield sits over the list.
    m = [card(150, 70, 380, 360)]
    for i in range(6):
        y = 104 + i * 52
        m.append(check(186, y + 10, 12, i < 5))
        m += lines(214, y + 6, (220 - (i % 3) * 40,), color="#9DB6D8" if i < 5 else SKELETON)
    m.append('<g filter="url(#lift)"><path d="M610 130l90 34v80c0 70 -46 112 -90 132c-44 -20 -90 -62 -90 -132v-80z" fill="#DCE8F7"/></g>')
    m.append(f'<path d="M610 160l62 24v60c0 50 -32 80 -62 96c-30 -16 -62 -46 -62 -96v-60z" fill="{ACCENT}"/>')
    m.append('<path d="M584 250l18 18 36 -40" fill="none" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>')
    return frame(m)


def life():
    # Mail turns into sorted receipts and a reminder on the calendar. No figures anywhere.
    m = [card(80, 120, 170, 120, PAPER, 14)]
    m.append(f'<path d="M80 136l85 58 85 -58" fill="none" stroke="{SKELETON}" stroke-width="4" stroke-linejoin="round"/>')
    m.append(arrow(270, 180))
    for i in range(3):
        x = 350 + i * 34
        m.append(f'<g transform="rotate({(i - 1) * 6} {x + 60} 250)">{card(x, 110 + i * 16, 120, 180, PAPER if i == 2 else "#DCE6F3", 12)}</g>')
    m += lines(434, 170, (70, 52, 64, 40), gap=20)
    m.append(card(560, 90, 170, 190, PAPER))
    m.append(f'<rect x="560" y="90" width="170" height="40" rx="16" fill="{ACCENT}"/>')
    for r in range(3):
        for c in range(4):
            m.append(f'<rect x="{578 + c * 36}" y="{146 + r * 40}" width="26" height="26" rx="7" fill="{ACCENT if (r, c) == (1, 2) else FAINT}"/>')
    m.append(f'<g filter="url(#lift)"><circle cx="720" cy="300" r="38" fill="{INK_CARD}" stroke="{INK_LINE}"/></g>')
    m.append(f'<path d="M704 312h32l-5 -7v-12a11 11 0 0 0 -22 0v12z" fill="none" stroke="{ACCENT_SOFT}" stroke-width="3.5" stroke-linejoin="round"/>')
    m.append(f'<path d="M714 318a6 6 0 0 0 12 0" fill="none" stroke="{ACCENT_SOFT}" stroke-width="3.5" stroke-linecap="round"/>')
    return frame(m)


def knowledge():
    # A long waveform becomes a small graph of linked notes.
    m = []
    bars = (30, 70, 46, 110, 82, 140, 64, 120, 92, 56, 128, 74, 40, 96, 60, 30)
    for i, h in enumerate(bars):
        m.append(f'<rect x="{70 + i * 16}" y="{250 - h / 2}" width="9" height="{h}" rx="4.5" fill="{ACCENT_SOFT}" opacity=".75"/>')
    m.append(arrow(340, 250))
    nodes = ((520, 150), (650, 120), (700, 250), (600, 330), (480, 290), (580, 230))
    for a, b in ((0, 5), (1, 5), (2, 5), (3, 5), (4, 5), (0, 1), (2, 3), (3, 4)):
        (x1, y1), (x2, y2) = nodes[a], nodes[b]
        m.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{ACCENT_SOFT}" stroke-opacity=".5" stroke-width="2.5"/>')
    for i, (x, y) in enumerate(nodes):
        m.append(card(x - 42, y - 22, 84, 44, PAPER if i != 5 else ACCENT, 12))
        m += lines(x - 26, y - 4, (52,), color="#FFFFFF" if i == 5 else SKELETON)
    return frame(m)


def digest():
    # Several videos collapse into one short summary that arrives on the phone.
    m = []
    for i in range(4):
        x, y = 70 + (i % 2) * 130, 110 + (i // 2) * 150
        m.append(card(x, y, 116, 120, INK_CARD, 14))
        m.append(f'<path d="M{x + 48} {y + 44}v32l26 -16z" fill="{ACCENT_SOFT}"/>')
    m.append(arrow(330, 250))
    m.append(card(410, 150, 170, 200))
    m += lines(430, 176, (120,), height=10, color="#9DB6D8")
    m += lines(430, 206, (130, 110, 124, 90, 116), gap=20)
    m.append(card(620, 90, 130, 260, INK_CARD, 24))
    m.append(f'<rect x="634" y="116" width="102" height="210" rx="14" fill="#1F3354"/>')
    m.append(card(644, 150, 82, 56, PAPER, 12))
    m.append(f'<circle cx="662" cy="168" r="8" fill="{ACCENT}"/>')
    m += lines(676, 164, (40, 30), gap=14, height=6)
    return frame(m)


def tools():
    # Two runs compared side by side, and the setting moved because of what the data showed.
    m = [card(90, 80, 360, 340)]
    for i, (a, b) in enumerate(((150, 140), (190, 184), (120, 126))):
        y = 120 + i * 90
        m += lines(116, y, (90,), color="#9DB6D8")
        m.append(f'<rect x="116" y="{y + 22}" width="{a}" height="16" rx="8" fill="{ACCENT}"/>')
        m.append(f'<rect x="116" y="{y + 44}" width="{b}" height="16" rx="8" fill="{ACCENT_SOFT}"/>')
    m.append(card(500, 140, 230, 220))
    m.append(f'<rect x="530" y="240" width="170" height="10" rx="5" fill="{FAINT}"/>')
    m.append(f'<rect x="530" y="240" width="64" height="10" rx="5" fill="{SKELETON}"/>')
    m.append(f'<circle cx="594" cy="245" r="13" fill="#FFFFFF" stroke="{SKELETON}" stroke-width="3" stroke-dasharray="4 4"/>')
    m.append(f'<circle cx="656" cy="245" r="15" fill="{ACCENT}" stroke="#FFFFFF" stroke-width="3"/>')
    m.append(f'<path d="M606 214h38m-10 -9 10 9-10 9" fill="none" stroke="{ACCENT}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>')
    m += lines(530, 290, (150, 110), gap=20)
    return frame(m)


# Article figures for the three AI cases: same frame, still text-free; captions live in content.

def naming_core():
    # Two pipelines (collection, analysis) call one shared naming core; a person signs off the dictionary.
    m = [card(300, 170, 200, 160, ACCENT, 20)]
    m += lines(330, 205, (140, 110, 126), gap=22, color="#DCE8F7")
    for y in (110, 330):
        m.append(card(70, y, 170, 70, PAPER, 14))
        m += lines(92, y + 22, (110, 80), gap=16)
        m.append(f'<path d="M244 {y + 35} C 272 {y + 35}, 272 250, 296 250" fill="none" stroke="{ACCENT_SOFT}" stroke-width="3"/>')
    m.append(card(560, 160, 170, 180, PAPER, 14))
    for r in range(4):
        m.append(f'<rect x="580" y="{184 + r * 36}" width="130" height="22" rx="6" fill="{FAINT if r % 2 else SKELETON}"/>')
    m.append(f'<path d="M504 250h50" stroke="{ACCENT_SOFT}" stroke-width="3" stroke-dasharray="6 6"/>')
    m.append(ask(690, 110))
    return frame(m)


def naming_gate():
    # A rule change waits behind its test questions; it ships only with zero confident-but-wrong answers.
    m = []
    for i in range(6):
        x, y = 70 + (i % 3) * 92, 120 + (i // 3) * 130
        m.append(card(x, y, 78, 100, PAPER, 12))
        m += lines(x + 12, y + 18, (52, 40, 46), gap=14)
        m.append(check(x + 39, y + 78, 10, True))
    m.append(f'<rect x="380" y="90" width="18" height="320" rx="9" fill="{ACCENT_SOFT}" opacity=".35"/>')
    m.append(f'<rect x="372" y="210" width="34" height="80" rx="12" fill="{ACCENT}"/>')
    m.append(arrow(420, 250, 70))
    m.append(card(520, 150, 220, 200))
    m.append(check(560, 190, 16))
    m += lines(590, 182, (120,), color="#9DB6D8")
    m += lines(546, 232, (170, 140, 160, 110), gap=20)
    return frame(m)


def faq_entry():
    # A rep asks in plain words; the answer comes back with its source, or with who to ask instead.
    m = [card(80, 90, 260, 70, INK_CARD, 18)]
    m += lines(104, 114, (180, 120), gap=16, color="#3B5179")
    m.append(card(200, 200, 320, 150))
    m += lines(226, 226, (240, 260, 200), gap=20)
    m.append(f'<rect x="226" y="300" width="96" height="28" rx="14" fill="#DCE8F7"/>')
    m.append(f'<path d="M242 314h12m-6 -6v12" stroke="{ACCENT}" stroke-width="3" stroke-linecap="round"/>')
    m += lines(262, 310, (46,), color="#9DB6D8")
    m.append(arrow(540, 270, 50))
    m.append(ask(660, 270))
    return frame(m)


def faq_backlog():
    # Most notes are still waiting; most drafted answers wait at the human gate, not at AI.
    m = []
    for i in range(14):
        m.append(f'<rect x="{80 + i * 6}" y="{120 + i * 4}" width="150" height="190" rx="10" fill="{"#DCE6F3" if i < 13 else PAPER}" opacity="{0.35 + i * .04}"/>')
    m.append(arrow(330, 250))
    m.append(f'<rect x="420" y="130" width="300" height="34" rx="10" fill="{ACCENT}"/>')
    for i in range(6):
        m.append(card(420 + (i % 3) * 102, 190 + (i // 3) * 92, 90, 76, PAPER if i else "#DCE8F7", 12))
        m += lines(434 + (i % 3) * 102, 208 + (i // 3) * 92, (56, 40), gap=14)
    return frame(m)


def life_roles():
    # Nine roles on a ring; only the ones a real event connects light up together.
    import math
    cx, cy, r = 400, 250, 170
    pts = [(cx + r * math.cos(math.pi * 2 * i / 9 - math.pi / 2), cy + r * math.sin(math.pi * 2 * i / 9 - math.pi / 2)) for i in range(9)]
    for a, b in ((0, 3), (3, 6), (0, 6)):
        m_line = f'<line x1="{pts[a][0]:.0f}" y1="{pts[a][1]:.0f}" x2="{pts[b][0]:.0f}" y2="{pts[b][1]:.0f}" stroke="{ACCENT}" stroke-width="4"/>'
        pts_line = m_line
    m = [f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{ACCENT_SOFT}" stroke-opacity=".25" stroke-width="2"/>']
    m += [f'<line x1="{pts[a][0]:.0f}" y1="{pts[a][1]:.0f}" x2="{pts[b][0]:.0f}" y2="{pts[b][1]:.0f}" stroke="{ACCENT}" stroke-width="4"/>' for a, b in ((0, 3), (3, 6), (0, 6))]
    for i, (x, y) in enumerate(pts):
        lit = i in (0, 3, 6)
        m.append(f'<g filter="url(#lift)"><circle cx="{x:.0f}" cy="{y:.0f}" r="30" fill="{ACCENT if lit else INK_CARD}" stroke="{INK_LINE}"/></g>')
        m += lines(x - 14, y - 4, (28,), height=8, color="#FFFFFF" if lit else "#3B5179")
    return frame(m)


def life_pipeline():
    # Mail, then parsed documents, then one local database, then a dashboard.
    m = [card(60, 190, 130, 100, PAPER, 14), f'<path d="M60 204l65 44 65 -44" fill="none" stroke="{SKELETON}" stroke-width="4"/>']
    m.append(arrow(200, 240, 40))
    m.append(card(260, 170, 110, 140, PAPER, 12))
    m += lines(276, 194, (78, 60, 70, 50), gap=20)
    m.append(arrow(380, 240, 40))
    m.append(f'<g filter="url(#lift)"><ellipse cx="490" cy="186" rx="50" ry="16" fill="{ACCENT_SOFT}"/><path d="M440 186v108a50 16 0 0 0 100 0v-108" fill="{ACCENT}"/><ellipse cx="490" cy="186" rx="50" ry="16" fill="#B9D2F2"/></g>')
    m.append(arrow(550, 240, 40))
    m.append(card(610, 150, 140, 180, PAPER, 14))
    m.append(f'<rect x="626" y="170" width="108" height="56" rx="8" fill="#DCE8F7"/>')
    m += lines(626, 244, (100, 80, 92), gap=20)
    return frame(m)


def life_catchup():
    # The scheduled run is blocked by the system; the next session catches up instead.
    m = [f'<g filter="url(#lift)"><circle cx="220" cy="230" r="100" fill="{PAPER}"/></g>']
    m.append(f'<path d="M220 160v70l48 30" fill="none" stroke="{SKELETON}" stroke-width="10" stroke-linecap="round"/>')
    m.append(f'<g filter="url(#lift)"><circle cx="295" cy="160" r="30" fill="#F2A7A0"/></g>')
    m.append('<path d="M283 148l24 24m0 -24l-24 24" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>')
    m.append(arrow(360, 240, 60))
    m.append(card(460, 120, 280, 230, INK_CARD, 16))
    m.append(f'<rect x="460" y="120" width="280" height="34" rx="16" fill="{INK_LINE}"/>')
    m += lines(484, 180, (180, 140, 200, 120), gap=26, color="#3B5179")
    m.append(check(700, 310, 16))
    return frame(m)


OUT.mkdir(parents=True, exist_ok=True)
for name, draw in (
    ("prototype", prototype), ("naming", naming), ("faq", faq), ("weekly", weekly), ("checks", checks),
    ("life", life), ("knowledge", knowledge), ("digest", digest), ("tools", tools),
    ("naming-core", naming_core), ("naming-gate", naming_gate), ("faq-entry", faq_entry), ("faq-backlog", faq_backlog),
    ("life-roles", life_roles), ("life-pipeline", life_pipeline), ("life-catchup", life_catchup),
):
    (OUT / f"{name}.svg").write_text(draw(), encoding="utf-8")
    print("wrote", name)
