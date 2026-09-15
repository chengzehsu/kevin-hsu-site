import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getContent } from "@/content";

export const alt = "Kevin Hsu | AI Product Manager: Product thinking. Working software.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

const latinFont = readFile(join(process.cwd(), "scripts/assets/manrope-og.ttf"));

export default async function OpenGraphImage() {
  const font = await latinFont;
  const { hero } = getContent("en");
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 76px", background: "#eef1f4", color: "#202b36", fontFamily: "Manrope", fontWeight: 600 }}>
      <div style={{ display: "flex", color: "#285cab", fontSize: 24 }}>{hero.eyebrow}</div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 1048, fontSize: 66, lineHeight: 1.2, letterSpacing: "-0.03em" }}>
        {hero.headline.split(/(?<=\.)\s+/).map((line) => <div key={line} style={{ display: "flex" }}>{line}</div>)}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", color: "#536274", fontSize: 22 }}>Ecofirst Taiwan</div>
        <div style={{ display: "flex", borderTop: "1px solid #cdd5de", paddingTop: 24 }}>
          {[{ value: "+50%", label: "Delivery efficiency" }, { value: "+20%", label: "Site operations efficiency" }].map((item, index) => (
            <div key={item.value} style={{ display: "flex", flexDirection: "column", gap: 8, width: "50%", paddingLeft: index ? 40 : 0, borderLeft: index ? "1px solid #cdd5de" : "none" }}>
              <div style={{ display: "flex", color: "#285cab", fontSize: 56, lineHeight: 1.1 }}>{item.value}</div>
              <div style={{ display: "flex", color: "#536274", fontSize: 22 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    { ...size, fonts: [{ name: "Manrope", data: font, weight: 600, style: "normal" }] },
  );
}
