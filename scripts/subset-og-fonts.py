"""Generate small static TTF fonts for the build-time Open Graph renderer.

python3 scripts/subset-og-fonts.py /path/to/font-sources
Sources: the Google Fonts Manrope.ttf and NotoSansTC.ttf used by subset-fonts.py.
Fonts retain the OFL metadata; the complete licence is in public/fonts/OFL.txt.
The generated fonts are build assets, not public downloads.
"""

import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parent.parent
SOURCE = Path(sys.argv[1])
OUTPUT = ROOT / "scripts" / "assets"
OUTPUT.mkdir(parents=True, exist_ok=True)
copy = "".join(
    path.read_text(encoding="utf-8")
    for directory in ("app", "content")
    for path in (ROOT / directory).rglob("*")
    if path.suffix in (".tsx", ".ts")
)

for source_name, output_name, chars in (
    ("Manrope.ttf", "manrope-og.ttf", set(range(0x20, 0x180)) | set(range(0x2000, 0x2070))),
    ("NotoSansTC.ttf", "noto-sans-tc-og.ttf", {ord(c) for c in copy if ord(c) >= 0x2E80}),
):
    font = TTFont(SOURCE / source_name)
    options = subset.Options()
    options.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14]
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=chars)
    subsetter.subset(font)
    instantiateVariableFont(font, {"wght": 600}, inplace=True)
    font.flavor = None
    path = OUTPUT / output_name
    font.save(path)
    print(f"{output_name}: {path.stat().st_size:,} bytes")
