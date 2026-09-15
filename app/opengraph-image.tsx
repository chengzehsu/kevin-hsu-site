import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getContent } from "@/content";

export const alt = "許承澤 Kevin Hsu｜AI 產品經理：拆解問題，把產品做出來。";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

// Read compact local TTFs at build time. Every glyph is supplied locally, so
// Satori never needs to fetch Chinese fallback fonts from Google Fonts.
const fontFiles = Promise.all([
  readFile(join(process.cwd(), "scripts/assets/manrope-og.ttf")),
  readFile(join(process.cwd(), "scripts/assets/noto-sans-tc-og.ttf")),
]);

export default async function OpenGraphImage() {
  const [latin, chinese] = await fontFiles;
  const { hero } = getContent("zh");
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 76px", background: "#eef1f4", color: "#202b36", fontFamily: "Manrope, Noto Sans TC", fontWeight: 600 }}>
      <div style={{ display: "flex", color: "#285cab", fontSize: 24 }}>{hero.eyebrow}</div>
      <div style={{ display: "flex", maxWidth: 1048, fontSize: 66, lineHeight: 1.3 }}>{hero.headline}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", color: "#536274", fontSize: 22 }}>台灣愛淨 Ecofirst</div>
        <div style={{ display: "flex", borderTop: "1px solid #cdd5de", paddingTop: 24 }}>
          {[{ value: "+50%", label: "交付效率" }, { value: "+20%", label: "案場營運效率" }].map((item, index) => (
            <div key={item.value} style={{ display: "flex", flexDirection: "column", gap: 8, width: "50%", paddingLeft: index ? 40 : 0, borderLeft: index ? "1px solid #cdd5de" : "none" }}>
              <div style={{ display: "flex", color: "#285cab", fontSize: 56, lineHeight: 1.1 }}>{item.value}</div>
              <div style={{ display: "flex", color: "#536274", fontSize: 22 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    { ...size, fonts: [
      { name: "Manrope", data: latin, weight: 600, style: "normal" },
      { name: "Noto Sans TC", data: chinese, weight: 600, style: "normal" },
    ] },
  );
}
