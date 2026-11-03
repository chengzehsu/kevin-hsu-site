"""Cut narrower webp copies of the large screenshots so small screens do not download the full frame.

The plan lives in lib/responsive-images.json (source path, its real width, the widths to cut), which
lib/responsive-image.ts also reads to write each <img srcset>. Output is public/responsive/<name>-<width>.webp.

Re-runnable: the same input gives the same bytes, every file in the plan is rewritten in place, and files in
public/responsive/ that the plan no longer names are deleted, so nothing piles up. Widths are never larger than
the source. Needs the `cwebp` binary (brew install webp); it reads webp and jpeg and scales without Pillow.

Usage: python3 scripts/responsive-images.py
"""
import json
import struct
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
OUT = PUBLIC / "responsive"
PLAN = ROOT / "lib" / "responsive-images.json"
QUALITY = "80"


def webp_width(path: Path) -> int:
    """Pixel width from a webp header (VP8, VP8L or VP8X), so the plan is checked against the real file."""
    head = path.read_bytes()[:40]
    kind = head[12:16]
    if kind == b"VP8X":
        return 1 + int.from_bytes(head[24:27], "little")
    if kind == b"VP8L":
        return 1 + (struct.unpack("<I", head[21:25])[0] & 0x3FFF)
    if kind == b"VP8 ":
        return struct.unpack("<H", head[26:28])[0] & 0x3FFF
    raise ValueError(f"{path}: not a webp")


def main() -> int:
    plan = json.loads(PLAN.read_text())
    OUT.mkdir(exist_ok=True)
    wanted: set[str] = set()
    total = 0
    for src, entry in plan.items():
        source = PUBLIC / src.lstrip("/")
        actual = webp_width(source)
        if actual != entry["width"]:
            sys.exit(f"{src}: plan says {entry['width']}px, file is {actual}px")
        for width in entry["variants"]:
            if width >= actual:
                sys.exit(f"{src}: {width}px would not be narrower than the {actual}px source")
            target = OUT / f"{source.stem}-{width}.webp"
            wanted.add(target.name)
            subprocess.run(
                ["cwebp", "-quiet", "-q", QUALITY, "-m", "6", "-resize", str(width), "0", str(source), "-o", str(target)],
                check=True,
            )
            total += target.stat().st_size
            print(f"{target.relative_to(PUBLIC)}  {target.stat().st_size // 1024} KB")
    for stale in OUT.glob("*.webp"):
        if stale.name not in wanted:
            stale.unlink()
            print(f"removed {stale.name}")
    print(f"total {total // 1024} KB in {len(wanted)} files")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
