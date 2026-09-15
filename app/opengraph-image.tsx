import { ImageResponse } from "next/og";
import { OpenGraphCard } from "@/lib/opengraph";

export const alt = "許承澤 Kevin Hsu｜產品經理";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

// This special metadata route is rendered during `next build` and exported at
// /opengraph-image, so the static site has no image-generation runtime.
export default function OpenGraphImage() {
  return new ImageResponse(OpenGraphCard("zh"), { ...size });
}
