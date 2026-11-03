import plan from "./responsive-images.json";

type Plan = Record<string, { width: number; variants: number[] }>;
const PLAN: Plan = plan;

/** Where scripts/responsive-images.py writes the narrower copy of `src`. */
export function variantPath(src: string, width: number): string {
  const name = src.slice(src.lastIndexOf("/") + 1, src.lastIndexOf("."));
  return `/responsive/${name}-${width}.webp`;
}

/**
 * The srcset for a raster that has narrower copies (see lib/responsive-images.json), or undefined.
 * The original closes the list at its own width, so nothing is ever upscaled. The export runs with
 * `images.unoptimized`, so next/image writes no srcset and plain <img> tags use this instead.
 */
export function srcSetFor(src: string): string | undefined {
  const entry = PLAN[src];
  if (!entry) return undefined;
  return [
    ...entry.variants.map((width) => `${variantPath(src, width)} ${width}w`),
    `${src} ${entry.width}w`,
  ].join(", ");
}
