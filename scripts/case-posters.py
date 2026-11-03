"""Draw the case posters (home shelf, portrait) and card covers (portfolio grid, landscape): text-free, one motif per case.

The full artifacts are landscape infographics; cropped to a card they lose their headlines and their words
fight the card's own title. Posters and covers carry only the shape of each case, so the outcome text reads
alone. They have no words, so both locales share them. The covers use the same frame as scripts/ai-covers.py,
so every card in the portfolio grid sits on the same navy. The detailed infographics stay on the case pages.

The internal back office is the one real screen: its cover keeps the two anonymised windows and only changes
what they sit on. They are inlined because an SVG loaded through <img> cannot fetch other files. Needs `cwebp`.

Usage: python3 scripts/case-posters.py
    ->  public/case-posters/{grocery,health-app,cdp}.svg
    ->  public/case-covers/{grocery,health-app,cdp,namecard,internal-backend,resume-site}.svg
"""
import base64
import subprocess
import tempfile
from pathlib import Path

PUBLIC = Path(__file__).resolve().parent.parent / "public"
OUT = PUBLIC / "case-posters"
COVERS = PUBLIC / "case-covers"
W, H = 600, 800
COVER_W, COVER_H = 800, 500

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


def cover(motif: list[str], center_y: float = 251) -> str:
    """The landscape card cover: the ai-covers frame, with the 56-544 motif box above the corner label."""
    return cover_frame([
        f'<g transform="translate({COVER_W / 2:g} 215) scale(1.12) translate(-300 {-center_y:g})">',
        *motif,
        "</g>",
    ])


def cover_frame(body: list[str]) -> str:
    return "\n".join([
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{COVER_W}" height="{COVER_H}" viewBox="0 0 {COVER_W} {COVER_H}" aria-hidden="true">',
        "<defs>",
        '  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1F3354"/><stop offset=".6" stop-color="#132036"/><stop offset="1" stop-color="#0E141E"/></linearGradient>',
        '  <radialGradient id="glow" cx=".8" cy=".1" r=".7"><stop offset="0" stop-color="#2D61A6" stop-opacity=".5"/><stop offset="1" stop-color="#2D61A6" stop-opacity="0"/></radialGradient>',
        '  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#8FB8EF" stroke-opacity=".07"/></pattern>',
        '  <filter id="lift" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#05080F" flood-opacity=".45"/></filter>',
        "</defs>",
        f'<rect width="{COVER_W}" height="{COVER_H}" fill="url(#bg)"/>',
        f'<rect width="{COVER_W}" height="{COVER_H}" fill="url(#grid)"/>',
        f'<rect width="{COVER_W}" height="{COVER_H}" fill="url(#glow)"/>',
        *body,
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
    return m


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
    return m


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
    return m


def namecard():
    # A photographed business card becomes a filled contact: the last field stays open for the rep to judge.
    m = [
        f'<g filter="url(#lift)"><rect x="76" y="96" width="172" height="310" rx="28" fill="{INK_CARD}" stroke="{INK_LINE}"/></g>',
        f'<rect x="138" y="112" width="48" height="6" rx="3" fill="{INK_LINE}"/>',
    ]
    # The viewfinder, with the card caught inside it.
    for path in ("M96 170v-20h20", "M228 170v-20h-20", "M96 266v20h20", "M228 266v20h-20"):
        m.append(f'<path d="{path}" fill="none" stroke="{ACCENT_SOFT}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>')
    m.append('<g transform="rotate(-4 162 218)">')
    m.append(f'<rect x="104" y="178" width="116" height="80" rx="8" fill="{PAPER}"/>')
    m.append(f'<circle cx="126" cy="202" r="11" fill="{ACCENT}"/>')
    m += lines(146, 196, (60, 42), gap=13, height=6)
    m += lines(116, 232, (92,), height=6, color=FAINT)
    m.append("</g>")
    m.append(f'<circle cx="162" cy="350" r="22" fill="none" stroke="{ACCENT_SOFT}" stroke-width="3"/>')
    m.append(f'<circle cx="162" cy="350" r="15" fill="{ACCENT}"/>')
    m.append(f'<path d="M266 251h40m-12 -11 12 11-12 11" fill="none" stroke="{ACCENT_SOFT}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>')
    m.append(f'<g filter="url(#lift)"><rect x="324" y="112" width="212" height="278" rx="16" fill="{PAPER}"/></g>')
    for i, y in enumerate((150, 212, 274, 336)):
        filled = i < 3
        m.append(badge(354, y, filled))
        if filled:
            m.append(f'<path d="M348 {y}l4 4 7 -8" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>')
        m += lines(380, y - 11, (128 - i * 12, 88), gap=15, color="#9DB6D8" if filled else SKELETON)
    return m


def inlined(name: str, width: int, tmp: Path) -> str:
    """A framed screenshot, cut down to what a card can show, as a data URI. Keeps the frame's transparent edge."""
    target = tmp / f"{name}.webp"
    source = PUBLIC / "portfolio-artifacts" / f"internal-backend-{name}.webp"
    subprocess.run(["cwebp", "-quiet", "-q", "82", "-alpha_q", "90", "-resize", str(width), "0", str(source), "-o", str(target)], check=True)
    return "data:image/webp;base64," + base64.b64encode(target.read_bytes()).decode()


def internal_backend() -> str:
    # The wide card crops from the left, so both windows start there and bleed off to the right.
    with tempfile.TemporaryDirectory() as tmp:
        back = inlined("overview", 1100, Path(tmp))
        front = inlined("site-health", 960, Path(tmp))
    return cover_frame([
        f'<image x="24" y="26" width="700" height="{700 * 686 / 1648:.1f}" href="{back}"/>',
        f'<image x="84" y="262" width="580" height="{580 * 549 / 1648:.1f}" href="{front}"/>',
    ])


def resume_site() -> str:
    # A resume page in a browser window: name, work history, skills radar. The wide card crops from the
    # left, so all three sit there and the window bleeds off to the right.
    cx, cy, r = 392, 298, 62
    ring = lambda scale: " ".join(
        f"{cx + r * scale * sin:.1f},{cy - r * scale * cos:.1f}"
        for cos, sin in ((1, 0), (.309, .951), (-.809, .588), (-.809, -.588), (.309, -.951))
    )
    reach = ((1, 0, .86), (.309, .951, .62), (-.809, .588, .78), (-.809, -.588, .54), (.309, -.951, .9))
    shape = " ".join(f"{cx + r * k * sin:.1f},{cy - r * k * cos:.1f}" for cos, sin, k in reach)
    m = [
        f'<g filter="url(#lift)"><rect x="60" y="56" width="640" height="372" rx="18" fill="{PAPER}"/></g>',
        f'<path d="M60 74a18 18 0 0 1 18 -18h604a18 18 0 0 1 18 18v14H60z" fill="{FAINT}"/>',
        *[f'<circle cx="{84 + i * 16}" cy="72" r="4.5" fill="{c}"/>' for i, c in enumerate(("#F2A7A0", "#F3D08A", "#A9D8A6"))],
        # Name and role.
        f'<circle cx="118" cy="140" r="26" fill="{ACCENT}"/>',
        f'<rect x="160" y="122" width="190" height="16" rx="8" fill="{INK_CARD}"/>',
        f'<rect x="160" y="148" width="134" height="9" rx="4.5" fill="#9DB6D8"/>',
        f'<path d="M92 190H660" stroke="{SKELETON}" stroke-width="2"/>',
        # Work history.
        f'<path d="M104 222V382" stroke="{SKELETON}" stroke-width="3"/>',
    ]
    for i, y in enumerate((222, 292, 362)):
        m.append(f'<circle cx="104" cy="{y}" r="8" fill="{ACCENT if i == 0 else ACCENT_SOFT}"/>')
        m.append(f'<rect x="128" y="{y - 8}" width="{150 - i * 16}" height="10" rx="5" fill="#6F86A8"/>')
        m += lines(128, y + 10, (172 - i * 10, 128), gap=14, height=7)
    m += [
        # Skills.
        *[f'<polygon points="{ring(k)}" fill="none" stroke="{SKELETON}" stroke-width="2"/>' for k in (1, .66, .33)],
        f'<polygon points="{shape}" fill="{ACCENT}" fill-opacity=".22" stroke="{ACCENT}" stroke-width="3" stroke-linejoin="round"/>',
        *lines(500, 232, (150, 118, 136, 96), gap=24, height=10),
    ]
    return cover_frame(m)


OUT.mkdir(parents=True, exist_ok=True)
COVERS.mkdir(parents=True, exist_ok=True)
for name, draw, center_y in (("grocery", grocery, 235), ("health-app", health, 236), ("cdp", cdp, 246)):
    motif = draw()
    (OUT / f"{name}.svg").write_text(frame(motif), encoding="utf-8")
    (COVERS / f"{name}.svg").write_text(cover(motif, center_y), encoding="utf-8")
    print("wrote", name)
(COVERS / "namecard.svg").write_text(cover(namecard()), encoding="utf-8")
(COVERS / "internal-backend.svg").write_text(internal_backend(), encoding="utf-8")
(COVERS / "resume-site.svg").write_text(resume_site(), encoding="utf-8")
print("wrote namecard, internal-backend, resume-site")
