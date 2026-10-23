"""Crop and frame the internal back office screenshots for the case article.

The raw captures (1568 px wide, customer sites already replaced by 「案場 NN」 in the browser) stay
outside the repo. Each figure is cropped to the region that carries its section's decision, then set
in a plain window frame with a soft shadow. No words are added, so both locales share the images.

Usage: python3 scripts/internal-backend-figures.py <dir with the raw captures>
    -> public/portfolio-artifacts/internal-backend-{overview,site-health,rule-editor,timeseries,plate}.webp
"""
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

OUT = Path(__file__).resolve().parent.parent / "public" / "portfolio-artifacts"

# name -> (raw file, crop box in raw pixels: left, top, right, bottom, fade the right edge?)
# Raw files are native-resolution region captures taken at 150% page zoom, so text stays sharp.
FIGURES = {
    "overview": ("overview.png", (0, 0, 1568, 572), False),
    "site-health": ("site-health.png", (0, 0, 1568, 435), True),
    "rule-editor": ("rule-editor.png", (0, 0, 1400, 855), False),
    "timeseries": ("timeseries.png", (0, 0, 1456, 822), False),
}

BAR, RADIUS, PAD = 34, 14, 40
FRAME, BAR_FILL, EDGE = (252, 252, 253), (236, 240, 245), (215, 223, 232)
DOTS = [(255, 95, 87), (254, 188, 46), (40, 200, 64)]


def fade_right(shot: Image.Image, width: int = 160) -> Image.Image:
    """A crop that cuts through a row fades into the page colour instead of ending on a hard edge."""
    w, h = shot.size
    out = shot.copy()
    page = Image.new("RGB", (width, h), FRAME)
    ramp = Image.linear_gradient("L").rotate(90).resize((width, h))
    out.paste(Image.composite(page, shot.crop((w - width, 0, w, h)), ramp), (w - width, 0))
    return out


def framed(shot: Image.Image) -> Image.Image:
    w, h = shot.size
    win_w, win_h = w, h + BAR
    canvas = Image.new("RGBA", (win_w + PAD * 2, win_h + PAD * 2), (0, 0, 0, 0))

    shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle(
        (PAD, PAD + 10, PAD + win_w, PAD + win_h + 10), RADIUS, fill=(32, 42, 54, 70)
    )
    canvas = Image.alpha_composite(canvas, shadow.filter(ImageFilter.GaussianBlur(16)))

    window = Image.new("RGBA", (win_w, win_h), FRAME + (255,))
    draw = ImageDraw.Draw(window)
    draw.rectangle((0, 0, win_w, BAR), fill=BAR_FILL)
    for i, color in enumerate(DOTS):
        cx = 20 + i * 18
        draw.ellipse((cx - 5, BAR / 2 - 5, cx + 5, BAR / 2 + 5), fill=color)
    window.paste(shot.convert("RGBA"), (0, BAR))
    draw.line((0, BAR, win_w, BAR), fill=EDGE)

    mask = Image.new("L", window.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, win_w - 1, win_h - 1), RADIUS, fill=255)
    canvas.paste(window, (PAD, PAD), mask)
    ImageDraw.Draw(canvas).rounded_rectangle(
        (PAD, PAD, PAD + win_w - 1, PAD + win_h - 1), RADIUS, outline=EDGE
    )
    return canvas


def main(raw_dir: Path) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        for name, (raw, box, fade) in FIGURES.items():
            shot = Image.open(raw_dir / raw).convert("RGB").crop(box)
            if fade:
                shot = fade_right(shot)
            png = Path(tmp) / f"{name}.png"
            framed(shot).save(png)
            target = OUT / f"internal-backend-{name}.webp"
            subprocess.run(["cwebp", "-quiet", "-q", "92", "-alpha_q", "90", str(png), "-o", str(target)], check=True)
            print(target.relative_to(OUT.parent.parent), Image.open(png).size)
        framed_shots = {name: Image.open(Path(tmp) / f"{name}.png") for name in ("overview", "site-health")}
        png = Path(tmp) / "plate.png"
        plate(framed_shots["overview"], framed_shots["site-health"]).convert("RGB").save(png)
        target = OUT / "internal-backend-plate.webp"
        subprocess.run(["cwebp", "-quiet", "-q", "92", str(png), "-o", str(target)], check=True)
        print(target.relative_to(OUT.parent.parent), (1200, 674))


def plate(overview: Image.Image, health: Image.Image) -> Image.Image:
    """The 16:9 case plate: two screens overlapped so a wide 3:1 capture never floats in empty space."""
    W, H = 1200, 674
    canvas = Image.new("RGBA", (W, H), (233, 238, 245, 255))
    back = overview.resize((1010, round(overview.height * 1010 / overview.width)), Image.LANCZOS)
    front = health.resize((820, round(health.height * 820 / health.width)), Image.LANCZOS)
    canvas.alpha_composite(back, (6, 4))
    canvas.alpha_composite(front, (W - front.width - 6, H - front.height - 4))
    return canvas


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(Path(sys.argv[1]))
