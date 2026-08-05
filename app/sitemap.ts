import type { MetadataRoute } from "next";
import { getPathname } from "@/lib/i18n/navigation";
import { caseRegistry } from "@/lib/content/cases-registry";
import { getSiteUrl } from "@/lib/seo/metadata";

const pages = ["/", "/cases", "/contact", "/careers", "/privacy"] as const;
const locales = ["pt-BR", "pt-PT", "en", "es"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${base}${getPathname({ locale, href: page })}`,
        lastModified: new Date(),
        changeFrequency: page === "/" ? "weekly" : "monthly",
        priority: page === "/" ? 1 : 0.8,
      });
    }

    for (const item of caseRegistry) {
      entries.push({
        url: `${base}${getPathname({
          locale,
          href: { pathname: "/cases/[slug]", params: { slug: item.slugs[locale] } },
        })}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
