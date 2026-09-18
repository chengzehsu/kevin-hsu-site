"""Build compact local WOFF2 fonts from the Google Fonts OFL sources.

Run after copy changes: python3 scripts/subset-fonts.py /path/to/font-sources
The source directory must contain NotoSansTC.ttf from:
https://github.com/google/fonts/tree/main/ofl/notosanstc
Geist is read from the installed npm package.
Requires fonttools[woff]. No font processing runs during the site build.
"""

import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont


ROOT = Path(__file__).resolve().parent.parent
SOURCE = Path(sys.argv[1])
OUTPUT = ROOT / "public" / "fonts"
OUTPUT.mkdir(parents=True, exist_ok=True)

copy = "".join(
    path.read_text(encoding="utf-8")
    for directory in ("app", "components", "content")
    for path in (ROOT / directory).rglob("*")
    if path.suffix in (".tsx", ".ts")
)


def write_subset(source_path, output_name, unicodes):
    font = TTFont(source_path)
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = ["kern", "liga", "calt", "locl", "pnum", "tnum"]
    options.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14]
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=unicodes)
    subsetter.subset(font)
    font.flavor = "woff2"
    destination = OUTPUT / output_name
    font.save(destination)
    print(f"{output_name}: {destination.stat().st_size:,} bytes; {len(unicodes):,} characters")


write_subset(
    ROOT / "node_modules/geist/dist/fonts/geist-sans/Geist-Variable.ttf",
    "geist-latin.woff2",
    set(range(0x20, 0x180)) | set(range(0x2000, 0x2070)),
)
write_subset(
    SOURCE / "NotoSansTC.ttf",
    "noto-sans-tc-portfolio.woff2",
    {ord(char) for char in copy if ord(char) >= 0x2E80},
)
