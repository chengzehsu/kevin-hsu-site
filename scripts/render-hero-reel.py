"""Render the 35s hero reel offline: headless Chromium draws scripts/hero-reel-scene.js frame by frame.

Requests are answered by Playwright routing instead of a local server, so no port is needed.

  python3 scripts/render-hero-reel.py stills <out_dir> 0 5 9.5 ... [--lang en]   # PNG checks at given seconds
  python3 scripts/render-hero-reel.py frames <out_dir> [--lang en]  # 840 JPEG frames (24fps × 35s)

The launch film (scripts/launch-film.js) is the default scene; --scene picks another, e.g. the three.js study.
"""

import mimetypes
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
FPS, SECONDS = 24, 35
ORIGIN = "http://studio.local"


PAGE = """<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;background:#e8eef5;overflow:hidden}canvas{display:block}
</style><script type="importmap">{"imports":{"three":"/three/build/three.module.js","three/addons/":"/three/examples/jsm/"}}</script>
</head><body><script type="module" src="/scene.js"></script></body></html>"""


def serve(route):
    path = route.request.url.removeprefix(ORIGIN).split("?", 1)[0]
    if path == "/":
        return route.fulfill(body=PAGE, content_type="text/html")
    if path == "/scene.js":
        file = ROOT / SCENE
    else:
        # pnpm links node_modules/three into .pnpm, so check the requested path, not the resolved one.
        relative = Path(path.lstrip("/").split("?", 1)[0])
        file = ROOT / "node_modules" / relative
        if relative.parts[:1] != ("three",) or ".." in relative.parts or not file.is_file():
            print("404:", path)
            return route.fulfill(status=404)
    route.fulfill(body=file.read_bytes(), content_type=mimetypes.guess_type(file.name)[0] or "text/javascript")




def option(name, default):
    return sys.argv[sys.argv.index(name) + 1] if name in sys.argv else default


SCENE = option("--scene", "scripts/launch-film.js")


def main():
    mode, out = sys.argv[1], Path(sys.argv[2])
    lang = option("--lang", "zh")
    times = [float(v) for v in sys.argv[3:] if not v.startswith("--") and v not in (lang, SCENE)]
    out.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(args=["--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--use-angle=swiftshader"])
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.on("console", lambda m: print("console:", m.text) if m.type == "error" else None)
        page.on("pageerror", lambda e: print("pageerror:", e))
        page.route(f"{ORIGIN}/**", serve)
        page.goto(f"{ORIGIN}/?lang={lang}")
        page.wait_for_function("window.reel", timeout=60000)
        if mode == "stills":
            for t in times:
                page.evaluate(f"window.reel.draw({t})")
                page.screenshot(path=str(out / f"still-{t:05.2f}.png"))
                print("still", t)
        else:
            for i in range(FPS * SECONDS):
                frame = out / f"f{i:04d}.jpg"
                # Resume: frames are deterministic, so anything already on disk is final.
                if frame.exists() and frame.stat().st_size > 0:
                    continue
                for attempt in range(3):
                    try:
                        page.evaluate(f"window.reel.draw({i / FPS})")
                        page.screenshot(path=str(frame), type="jpeg", quality=92, timeout=120000)
                        break
                    except Exception as error:  # the blur-heavy frames occasionally stall the compositor
                        print(f"frame {i} attempt {attempt + 1} failed: {error}", flush=True)
                        page.reload()
                        page.wait_for_function("window.reel", timeout=60000)
                else:
                    raise SystemExit(f"frame {i} failed three times; rerun to resume")
                if i % 48 == 0:
                    print("frame", i, flush=True)
        browser.close()


if __name__ == "__main__":
    main()
