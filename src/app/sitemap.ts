import type { MetadataRoute } from "next";
import { modules } from "@/data/curriculum";
import { LOCALES, altLanguages } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

const BASE = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/programa", "/resurse", "/despre", ...modules.map((m) => `/programa/${m.slug}`)];

  // câte o intrare pe limbă, fiecare cu hreflang spre cealaltă limbă
  return paths.flatMap((path) =>
    LOCALES.map((lang) => ({
      url: `${BASE}/${lang}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path.startsWith("/programa/") ? 0.6 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(altLanguages(path)).map(([k, v]) => [k, `${BASE}${v}`])
        ),
      },
    }))
  );
}
