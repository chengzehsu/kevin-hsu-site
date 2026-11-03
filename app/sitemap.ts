import type { MetadataRoute } from "next";
import { getContent } from "@/content";
import {
  casePath,
  localePath,
  portfolioPath,
  resumePath,
  SITE_ORIGIN,
  type Locale,
} from "@/lib/locale";

export const dynamic = "force-static";

/** Every public page, once per language, each naming its other-language twin. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths: Array<(locale: Locale) => string> = [
    localePath,
    portfolioPath,
    resumePath,
    ...getContent("zh").cases.items.map(
      ({ id }) =>
        (locale: Locale) =>
          casePath(locale, id),
    ),
  ];
  const absolute = (path: string) => `${SITE_ORIGIN}${path}`;

  return paths.flatMap((path) =>
    (["zh", "en"] as const).map((locale) => ({
      url: absolute(path(locale)),
      alternates: {
        languages: {
          "zh-Hant": absolute(path("zh")),
          en: absolute(path("en")),
        },
      },
    })),
  );
}
