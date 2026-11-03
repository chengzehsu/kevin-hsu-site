"""Draw the before-and-after handoff diagram for the internal back office case.

Run after changing the labels: python3 scripts/internal-backend-flow.py
Writes one SVG per locale, because the labels are part of the diagram. Pass --preview DIR
to also draw PNGs with Pillow when no browser is available to check the layout.
"""

import sys
from html import escape
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "public" / "portfolio-artifacts"
W, H = 1480, 760
BG = "#132036"
LINE = "#5F7391"
INK = "#F2F5FA"
MUTED = "#AEBBCE"
PM_FILL = "#2D61A6"
ENGINEER_FILL = "#22324C"
FONT = "'Noto Sans TC','PingFang TC','Microsoft JhengHei',sans-serif"

NODE_W, NODE_H = 220, 76
X = [180, 430, 680, 930, 1180]
LANE_PM, LANE_ENGINEER = 122, 258
AFTER_X = [180, 513, 847, 1180]
AFTER_Y = 500

COPY = {
    "zh": {
        "file": "internal-backend-flow.svg",
        "before": "以前",
        "before_count": "每輪交接 4 次",
        "after": "現在",
        "after_count": "每輪交接 0 次",
        "pm": "PM",
        "engineer": "工程師",
        "before_steps": ["請工程師給現有版本", "下載後交給 PM", "修改後交回", "上傳，通知 PM", "檢查數值"],
        "before_loop": "有錯就再來一輪",
        "after_steps": ["下載清單", "修改", "上傳", "直接看資料回傳"],
        "after_loop": "有錯自己再改一輪",
        "freed": "不必排工程師的時間，工程師回到產品開發",
    },
    "en": {
        "file": "internal-backend-flow-en.svg",
        "before": "Before",
        "before_count": "4 handoffs per round",
        "after": "Now",
        "after_count": "0 handoffs per round",
        "pm": "PM",
        "engineer": "Engineer",
        "before_steps": ["Ask for current file", "Download, send to PM", "Edit and hand back", "Upload, notify PM", "Check values"],
        "before_loop": "Wrong? Go around again",
        "after_steps": ["Download list", "Edit", "Upload", "Check live data"],
        "after_loop": "Wrong? The PM edits again",
        "freed": "No engineer's schedule to wait on; engineers return to product work",
    },
}


def shapes(copy):
    """The diagram as plain primitives, so the SVG and the preview cannot drift apart."""
    items = [("rect", 0, 0, W, H, 0, BG, None, False)]

    def text(x, y, value, size, fill=INK, anchor="middle", bold=False):
        items.append(("text", x, y, value, size, fill, anchor, bold))

    def line(points, dashed=False, arrow=True):
        items.append(("line", points, dashed, arrow))

    def node(x, y, label, fill):
        items.append(("rect", x, y, NODE_W, NODE_H, 12, fill, None, False))
        text(x + NODE_W / 2, y + NODE_H / 2, label, 22)

    def loop(left, right, top, y, label):
        line([(right, top), (right, y), (left, y), (left, top)], dashed=True)
        width = len(label) * (24 if ord(label[0]) > 255 else 11) + 28
        items.append(("rect", (left + right) / 2 - width / 2, y - 16, width, 32, 0, BG, None, False))
        text((left + right) / 2, y, label, 20, MUTED)

    text(48, 58, copy["before"], 32, anchor="start", bold=True)
    text(W - 48, 58, copy["before_count"], 28, anchor="end", bold=True)
    text(48, LANE_PM + NODE_H / 2, copy["pm"], 22, MUTED, "start")
    text(48, LANE_ENGINEER + NODE_H / 2, copy["engineer"], 22, MUTED, "start")
    loop(X[0] + NODE_W / 2, X[4] + NODE_W / 2, LANE_PM, LANE_PM - 18, copy["before_loop"])
    for index, label in enumerate(copy["before_steps"]):
        y = LANE_ENGINEER if index % 2 else LANE_PM
        node(X[index], y, label, ENGINEER_FILL if index % 2 else PM_FILL)
    for index in range(4):
        going_down = index % 2 == 0
        start_y = LANE_PM + NODE_H if going_down else LANE_ENGINEER
        end_y = LANE_ENGINEER if going_down else LANE_PM + NODE_H
        start = (X[index] + NODE_W - 40, start_y)
        end = (X[index + 1] + 40, end_y)
        line([start, end])
        middle = ((start[0] + end[0]) / 2, (start[1] + end[1]) / 2)
        items.append(("circle", middle[0], middle[1], 17, INK))
        text(middle[0], middle[1], str(index + 1), 19, BG, bold=True)

    items.append(("line", [(48, 384), (W - 48, 384)], False, False))

    text(48, 438, copy["after"], 32, anchor="start", bold=True)
    text(W - 48, 438, copy["after_count"], 28, anchor="end", bold=True)
    text(48, AFTER_Y + NODE_H / 2, copy["pm"], 22, MUTED, "start")
    text(48, 660, copy["engineer"], 22, MUTED, "start")
    loop(AFTER_X[0] + NODE_W / 2, AFTER_X[3] + NODE_W / 2, AFTER_Y, AFTER_Y - 18, copy["after_loop"])
    for index, label in enumerate(copy["after_steps"]):
        node(AFTER_X[index], AFTER_Y, label, PM_FILL)
        if index < 3:
            line([(AFTER_X[index] + NODE_W, AFTER_Y + NODE_H / 2), (AFTER_X[index + 1], AFTER_Y + NODE_H / 2)])
    items.append(("rect", X[0], 622, X[4] + NODE_W - X[0], NODE_H, 12, None, LINE, True))
    text((X[0] + X[4] + NODE_W) / 2, 660, copy["freed"], 20, MUTED)
    return items


def arrow_head(points):
    (x1, y1), (x2, y2) = points[-2], points[-1]
    length = max(((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5, 1)
    ux, uy = (x2 - x1) / length, (y2 - y1) / length
    return [(x2, y2), (x2 - 11 * ux - 6 * uy, y2 - 11 * uy + 6 * ux), (x2 - 11 * ux + 6 * uy, y2 - 11 * uy - 6 * ux)]


def to_svg(items, title):
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-label="{escape(title)}">',
    ]
    for item in items:
        kind = item[0]
        if kind == "rect":
            _, x, y, w, h, radius, fill, stroke, dashed = item
            style = f'fill="{fill or "none"}"'
            if stroke:
                style += f' stroke="{stroke}" stroke-width="1.5"'
            if dashed:
                style += ' stroke-dasharray="7 7"'
            parts.append(f'<rect x="{x:g}" y="{y:g}" width="{w:g}" height="{h:g}" rx="{radius}" {style}/>')
        elif kind == "circle":
            _, x, y, radius, fill = item
            parts.append(f'<circle cx="{x:g}" cy="{y:g}" r="{radius}" fill="{fill}"/>')
        elif kind == "line":
            _, points, dashed, arrow = item
            path = " ".join(f"{x:g},{y:g}" for x, y in points)
            dash = ' stroke-dasharray="7 7"' if dashed else ""
            parts.append(f'<polyline points="{path}" fill="none" stroke="{LINE}" stroke-width="2"{dash}/>')
            if arrow:
                head = " ".join(f"{x:g},{y:g}" for x, y in arrow_head(points))
                parts.append(f'<polygon points="{head}" fill="{LINE}"/>')
        elif kind == "text":
            _, x, y, value, size, fill, anchor, bold = item
            weight = ' font-weight="700"' if bold else ""
            parts.append(
                f'<text x="{x:g}" y="{y:g}" font-family="{FONT}" font-size="{size}" fill="{fill}" '
                f'text-anchor="{anchor}" dominant-baseline="central"{weight}>{escape(value)}</text>'
            )
    parts.append("</svg>")
    return "\n".join(parts) + "\n"


def to_png(items, path):
    from PIL import Image, ImageDraw, ImageFont

    canvas = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(canvas)
    for item in items:
        kind = item[0]
        if kind == "rect":
            _, x, y, w, h, radius, fill, stroke, _ = item
            draw.rounded_rectangle((x, y, x + w, y + h), radius, fill=fill, outline=stroke)
        elif kind == "circle":
            _, x, y, radius, fill = item
            draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=fill)
        elif kind == "line":
            _, points, _, arrow = item
            draw.line(points, fill=LINE, width=2)
            if arrow:
                draw.polygon(arrow_head(points), fill=LINE)
        elif kind == "text":
            _, x, y, value, size, fill, anchor, _ = item
            font = ImageFont.truetype("/System/Library/Fonts/Hiragino Sans GB.ttc", size)
            draw.text((x, y), value, font=font, fill=fill, anchor={"start": "lm", "middle": "mm", "end": "rm"}[anchor])
    canvas.save(path)


def main():
    preview = Path(sys.argv[sys.argv.index("--preview") + 1]) if "--preview" in sys.argv else None
    for locale, copy in COPY.items():
        items = shapes(copy)
        (OUT / copy["file"]).write_text(to_svg(items, f'{copy["before_count"]} / {copy["after_count"]}'), encoding="utf-8")
        if preview:
            to_png(items, preview / f"flow-{locale}.png")


if __name__ == "__main__":
    main()
