"""Draw the home-shelf case posters: portrait, text-free, one motif per case.

The full artifacts are landscape infographics; cropped to a 3:4 card they lose their headlines and their
words fight the card's own title. Posters carry only the shape of each case, in the top half, so the
outcome text over the bottom scrim reads alone. They have no words, so both locales share them.

Usage: python3 scripts/case-posters.py  ->  public/case-posters/{grocery,ecofirst,health-app,cdp}.svg
"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "public" / "case-posters"
W, H = 600, 800

PAPER, SKELETON, FAINT = "#F4F7FB", "#C9D6EA", "#E3EAF4"
ACCENT, ACCENT_SOFT, INK_CARD, INK_LINE = "#4C82D0", "#8FB8EF", "#16233A", "#2C3E5E"


def frame(motif: list[str]) -> str:
    return "\n".join([
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" aria-hidden="true">',
        "<defs>",
        '  <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1F3354"/><stop offset=".55" stop-color="#132036"/><stop offset="1" stop-color="#0E141E"/></linearGradient>',
        '  <radialGradient id="glow" cx=".78" cy=".12" r=".6"><stop offset="0" stop-color="#2D61A6" stop-opacity=".55"/><stop offset="1" stop-color="#2D61A6" stop-opacity="0"/></radialGradient>',
        '  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#8FB8EF" stroke-opacity=".07"/></pattern>',
        '  <filter id="lift" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#05080F" flood-opacity=".45"/></filter>',
        "</defs>",
        f'<rect width="{W}" height="{H}" fill="url(#bg)"/>',
        f'<rect width="{W}" height="{H}" fill="url(#grid)"/>',
        f'<rect width="{W}" height="{H}" fill="url(#glow)"/>',
        # Motifs are drawn in a 56-544 x 92-410 box, then scaled into the top third: the longest card copy
        # (en, four-line outcome) rises to about 37% of the card, so the motif must end above it.
        '<g transform="translate(300 40) scale(.72) translate(-300 -92)">',
        *motif,
        "</g>",
        "</svg>",
    ]) + "\n"


def lines(x, y, widths, gap=14, height=7, color=SKELETON):
    return [f'<rect x="{x}" y="{y + i * gap}" width="{w}" height="{height}" rx="{height / 2}" fill="{color}"/>' for i, w in enumerate(widths)]


def badge(cx, cy, filled):
    return f'<circle cx="{cx}" cy="{cy}" r="13" fill="{ACCENT if filled else FAINT}"/>'


def grocery():
    # Repeated questions (dark bubbles) become three findable modules (light cards).
    m = []
    for i, y in enumerate((112, 196, 280)):
        m.append(f'<g filter="url(#lift)"><rect x="64" y="{y}" width="200" height="64" rx="16" fill="{INK_CARD}" stroke="{INK_LINE}"/></g>')
        m.append(f'<path d="M92 {y + 64} l-8 14 l22 -14z" fill="{INK_CARD}"/>')
        m.append(f'<circle cx="94" cy="{y + 32}" r="12" fill="none" stroke="{ACCENT_SOFT}" stroke-width="2.5"/>')
        m.append(f'<circle cx="94" cy="{y + 38}" r="1.8" fill="{ACCENT_SOFT}"/>')
        m.append(f'<path d="M90 {y + 28} q4 -6 8 0 q0 4 -4 6" fill="none" stroke="{ACCENT_SOFT}" stroke-width="2.2" stroke-linecap="round"/>')
        m += lines(118, y + 22, (118 - i * 18, 84), color="#3B5179")
    m.append(f'<path d="M282 240h34m-11-10 11 10-11 10" fill="none" stroke="{ACCENT_SOFT}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>')
    for i, y in enumerate((118, 202, 286)):
        m.append(f'<g filter="url(#lift)"><rect x="334" y="{y}" width="202" height="68" rx="14" fill="{PAPER}"/></g>')
        m.append(badge(362, y + 34, i == 0))
        m += lines(386, y + 22, (110, 78), gap=16, color=SKELETON if i else "#9DB6D8")
    return frame(m)


def ecofirst():
    # One internal platform window: a site list on the left, a live trend on the right.
    m = [f'<g filter="url(#lift)"><rect x="56" y="92" width="488" height="318" rx="18" fill="{PAPER}"/></g>']
    m.append('<path d="M56 110a18 18 0 0 1 18-18h452a18 18 0 0 1 18 18v20H56z" fill="#E3EAF4"/>')
    m += [f'<circle cx="{78 + i * 16}" cy="111" r="4.5" fill="{c}"/>' for i, c in enumerate(("#F2A7A0", "#F3D08A", "#A9D8A6"))]
    m.append('<rect x="140" y="104" width="190" height="14" rx="7" fill="#F4F7FB"/>')
    m.append('<rect x="56" y="130" width="112" height="280" fill="#EDF2F8"/>')
    for i in range(6):
        y = 152 + i * 34
        m.append(f'<rect x="70" y="{y - 8}" width="84" height="22" rx="7" fill="{ACCENT if i == 1 else "transparent"}" opacity="{0.16 if i == 1 else 1}"/>')
        m += lines(80, y, (54 - (i % 3) * 10,), color="#8FA9CC" if i == 1 else SKELETON)
    m.append('<rect x="186" y="148" width="340" height="166" rx="12" fill="#FFFFFF" stroke="#E3EAF4"/>')
    m += [f'<line x1="204" y1="{y}" x2="508" y2="{y}" stroke="#EEF2F7"/>' for y in (184, 220, 256, 292)]
    pts = "204,282 236,270 262,276 290,252 318,258 344,232 372,238 400,210 428,216 456,188 482,194 508,170"
    m.append(f'<polygon points="{pts} 508,300 204,300" fill="{ACCENT}" opacity=".12"/>')
    m.append(f'<polyline points="{pts}" fill="none" stroke="{ACCENT}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>')
    m.append(f'<circle cx="508" cy="170" r="6" fill="{ACCENT}" stroke="#FFFFFF" stroke-width="2.5"/>')
    for i in range(2):
        y = 332 + i * 36
        m.append(f'<rect x="186" y="{y}" width="340" height="26" rx="8" fill="#FFFFFF" stroke="#E3EAF4"/>')
        m += lines(200, y + 10, (90,), color=SKELETON)
        m.append(f'<rect x="452" y="{y + 7}" width="60" height="12" rx="6" fill="{ACCENT_SOFT}" opacity=".7"/>')
    return frame(m)


def doc_icon(kind, x, y):
    c = ACCENT
    if kind == "wire":
        return [f'<rect x="{x}" y="{y}" width="30" height="24" rx="4" fill="none" stroke="{c}" stroke-width="2.5"/>',
                f'<path d="M{x} {y + 8}h30M{x + 11} {y + 8}v16" stroke="{c}" stroke-width="2.5"/>']
    if kind == "story":
        return [f'<circle cx="{x + 9}" cy="{y + 7}" r="6" fill="none" stroke="{c}" stroke-width="2.5"/>',
                f'<path d="M{x} {y + 24}q9 -11 18 0M{x + 22} {y + 6}h10M{x + 22} {y + 14}h8" fill="none" stroke="{c}" stroke-width="2.5" stroke-linecap="round"/>']
    if kind == "doc":
        return [f'<path d="M{x + 4} {y}h15l8 8v18h-23z" fill="none" stroke="{c}" stroke-width="2.5" stroke-linejoin="round"/>',
                f'<path d="M{x + 10} {y + 13}h11M{x + 10} {y + 19}h8" stroke="{c}" stroke-width="2.5" stroke-linecap="round"/>']
    if kind == "table":
        return [f'<rect x="{x}" y="{y}" width="30" height="24" rx="4" fill="none" stroke="{c}" stroke-width="2.5"/>',
                f'<path d="M{x} {y + 8}h30M{x} {y + 16}h30M{x + 12} {y}v24" stroke="{c}" stroke-width="2.2"/>']
    return [f'<circle cx="{x + 13}" cy="{y + 12}" r="12" fill="none" stroke="{c}" stroke-width="2.5"/>',
            f'<path d="M{x + 1} {y + 12}h24M{x + 13} {y}q-8 12 0 24q8 -12 0 -24" fill="none" stroke="{c}" stroke-width="2.2"/>']


def health():
    # Interviews become five buildable documents: three specs, then two mapping tables.
    m = []
    for i, kind in enumerate(("wire", "story", "doc")):
        x = 56 + i * 166
        m.append(f'<g filter="url(#lift)"><rect x="{x}" y="104" width="152" height="132" rx="16" fill="{PAPER}"/></g>')
        m.append(badge(x + 28, 132, i == 0))
        m += doc_icon(kind, x + 100, 120)
        m += lines(x + 18, 176, (104, 76, 90), gap=15)
    for i, kind in enumerate(("table", "globe")):
        x = 56 + i * 249
        m.append(f'<g filter="url(#lift)"><rect x="{x}" y="256" width="239" height="112" rx="16" fill="{PAPER}"/></g>')
        m.append(badge(x + 28, 284, False))
        m += doc_icon(kind, x + 188, 272)
        m += lines(x + 18, 322, (170, 120), gap=16)
    return frame(m)


def cdp():
    # Five channels converge into one customer view.
    m = []
    ys = (112, 170, 228, 286, 344)
    cx, cy = 430, 236
    for i, y in enumerate(ys):
        m.append(f'<path d="M248 {y + 18} C 320 {y + 18}, 320 {cy}, {cx - 92} {cy}" fill="none" stroke="{ACCENT_SOFT}" stroke-opacity=".55" stroke-width="2.5"/>')
    for i, y in enumerate(ys):
        m.append(f'<g filter="url(#lift)"><rect x="64" y="{y}" width="184" height="36" rx="12" fill="{PAPER if i != 4 else "#E3EAF4"}"/></g>')
        m.append(f'<circle cx="86" cy="{y + 18}" r="8" fill="{ACCENT if i == 0 else ACCENT_SOFT}"/>')
        m += lines(104, y + 15, (100 - (i % 3) * 18,), color=SKELETON)
    m.append(f'<circle cx="{cx}" cy="{cy}" r="104" fill="{ACCENT}" opacity=".12"/>')
    m.append(f'<g filter="url(#lift)"><circle cx="{cx}" cy="{cy}" r="86" fill="{PAPER}"/></g>')
    m.append(f'<circle cx="{cx}" cy="{cy}" r="62" fill="none" stroke="{FAINT}" stroke-width="14"/>')
    m.append(f'<circle cx="{cx}" cy="{cy}" r="62" fill="none" stroke="{ACCENT}" stroke-width="14" stroke-dasharray="292 390" transform="rotate(-90 {cx} {cy})" stroke-linecap="round"/>')
    m.append(f'<circle cx="{cx}" cy="{cy - 10}" r="13" fill="{ACCENT}"/>')
    m.append(f'<path d="M{cx - 22} {cy + 26}q22 -26 44 0" fill="none" stroke="{ACCENT}" stroke-width="7" stroke-linecap="round"/>')
    return frame(m)


OUT.mkdir(parents=True, exist_ok=True)
for name, draw in (("grocery", grocery), ("ecofirst", ecofirst), ("health-app", health), ("cdp", cdp)):
    (OUT / f"{name}.svg").write_text(draw(), encoding="utf-8")
    print("wrote", name)
