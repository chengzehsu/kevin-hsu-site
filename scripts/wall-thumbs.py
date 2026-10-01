"""Cut small tiles for the decorative walls and the launch-film stills fanned over case cards.

Wall tiles show at most ~15rem (240 CSS px), stills at most 16rem. The sources are up to 1600x1000, and a
browser decodes an image at its own size, not its displayed size: one film frame costs ~6.4 MB of memory
for a 240px tile. 512x320 covers 2x screens and decodes at ~0.65 MB.

Crops are 8:5 anchored to the top, matching the walls' `object-position: top`. Film frames are already
8:5, so they only shrink and stay safe anywhere a still is shown.

Usage: python3 scripts/wall-thumbs.py  ->  public/thumbs/<name>.webp
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / "public"
OUT = ROOT / "thumbs"
W, H = 512, 320

SOURCES = [
    *(f"portfolio-wall/film-{n}.webp" for n in range(1, 9)),
    "portfolio-artifacts/ecofirst-hvac-platform.webp",
    "linkedin-posts/post-1.jpg",
    "linkedin-posts/post-2.jpg",
]


def cover_top(image: Image.Image) -> Image.Image:
    scale = max(W / image.width, H / image.height)
    resized = image.resize((round(image.width * scale), round(image.height * scale)), Image.LANCZOS)
    left = (resized.width - W) // 2
    return resized.crop((left, 0, left + W, H))


def main() -> None:
    OUT.mkdir(exist_ok=True)
    for source in SOURCES:
        target = OUT / f"{Path(source).stem}.webp"
        with Image.open(ROOT / source) as image:
            cover_top(image.convert("RGB")).save(target, "WEBP", quality=80, method=6)
        print(f"{target.relative_to(ROOT)}  {target.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
