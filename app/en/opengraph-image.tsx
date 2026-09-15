import { ImageResponse } from "next/og";
import { OpenGraphCard } from "@/lib/opengraph";

export const alt = "Kevin Hsu | Product Manager";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

// Locale-specific static image keeps the language of the social preview aligned
// with the page a visitor shares.
export default function OpenGraphImage() {
  return new ImageResponse(OpenGraphCard("en"), { ...size });
}
