import { contentLocaleKey } from "@/lib/i18n/content-locale";
import type { Locale } from "@/lib/i18n/routing";
import type { CaseContent } from "./cases-registry";
import { caseRegistry, getCaseBySlug } from "./cases-registry";

export async function getCaseContent(
  locale: Locale,
  slug: string,
): Promise<CaseContent | null> {
  const registryItem = getCaseBySlug(locale, slug);
  if (!registryItem) return null;

  const fileKey = contentLocaleKey(locale);

  try {
    const content = (await import(
      `@/content/cases/${registryItem.id}.${fileKey}.json`
    )) as { default: CaseContent };
    return { ...content.default, slug: registryItem.slugs[locale] };
  } catch {
    return null;
  }
}

export async function getAllCases(locale: Locale): Promise<CaseContent[]> {
  const fileKey = contentLocaleKey(locale);

  const cases = await Promise.all(
    caseRegistry.map(async (item) => {
      const content = (await import(
        `@/content/cases/${item.id}.${fileKey}.json`
      )) as { default: CaseContent };
      return { ...content.default, slug: item.slugs[locale] };
    }),
  );
  return cases;
}

export function getFeaturedCases(locale: Locale) {
  return caseRegistry.filter((item) => item.featured).map((item) => ({
    id: item.id,
    slug: item.slugs[locale],
    cover: item.cover,
    coverAlt: item.coverAlt[locale],
  }));
}
