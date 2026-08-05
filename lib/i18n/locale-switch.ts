import { getCaseBySlug } from "@/lib/content/cases-registry";
import type { Locale } from "@/lib/i18n/routing";
import { defaultLocale, routing } from "@/lib/i18n/routing";
import type { UiLanguageKey } from "@/lib/i18n/ui-languages";

export type AppPathname = "/" | "/cases" | "/cases/[slug]" | "/contact" | "/careers" | "/privacy";

export const PT_VARIANT_COOKIE = "PT_VARIANT";

export const servicesAnchorId: Record<Locale, string> = {
  "pt-BR": "o-que-fazemos",
  "pt-PT": "o-que-fazemos",
  en: "what-we-do",
  es: "what-we-do",
};

export const servicesAnchor: Record<Locale, string> = {
  "pt-BR": `#${servicesAnchorId["pt-BR"]}`,
  "pt-PT": `#${servicesAnchorId["pt-PT"]}`,
  en: `#${servicesAnchorId.en}`,
  es: `#${servicesAnchorId.es}`,
};

export function getServicesAnchorHref(locale: Locale) {
  return `/#${servicesAnchorId[locale]}` as const;
}

export function setLocaleCookie(locale: Locale) {
  document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000;samesite=lax`;
  if (locale === "pt-BR" || locale === "pt-PT") {
    document.cookie = `${PT_VARIANT_COOKIE}=${locale};path=/;max-age=31536000;samesite=lax`;
  }
}

export function getStoredPortugueseLocale(): Locale {
  if (typeof document === "undefined") return defaultLocale;

  const match = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${PT_VARIANT_COOKIE}=`));

  const value = match?.split("=")[1];
  if (value === "pt-PT" || value === "pt-BR") return value;
  return defaultLocale;
}

export function resolveLocaleForUiLanguage(
  uiKey: UiLanguageKey,
  currentLocale: Locale,
): Locale {
  if (uiKey === "en") return "en";
  if (uiKey === "es") return "es";
  if (currentLocale === "pt-BR" || currentLocale === "pt-PT") return currentLocale;
  return getStoredPortugueseLocale();
}

type SwitchLocaleArgs = {
  currentLocale: Locale;
  nextLocale: Locale;
  pathname: string;
  slug?: string;
};

export function buildLocaleSwitchTarget({
  currentLocale,
  nextLocale,
  pathname,
  slug,
}: SwitchLocaleArgs):
  | { pathname: AppPathname; params?: { slug: string }; locale: Locale }
  | { pathname: "/"; locale: Locale } {
  if (pathname === "/cases/[slug]" && slug) {
    const currentCase = getCaseBySlug(currentLocale, slug);
    if (currentCase) {
      return {
        pathname: "/cases/[slug]",
        params: { slug: currentCase.slugs[nextLocale] },
        locale: nextLocale,
      };
    }
  }

  if (
    pathname === "/" ||
    pathname === "/cases" ||
    pathname === "/contact" ||
    pathname === "/careers" ||
    pathname === "/privacy"
  ) {
    return { pathname, locale: nextLocale };
  }

  return { pathname: "/", locale: nextLocale };
}
