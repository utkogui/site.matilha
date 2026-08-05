import type { Locale } from "@/lib/i18n/routing";

export type UiLanguageKey = "pt" | "en" | "es";

export const uiLanguages = [
  { key: "pt" as const, label: "Português", locales: ["pt-BR", "pt-PT"] as const },
  { key: "en" as const, label: "English", locales: ["en"] as const },
  { key: "es" as const, label: "Español", locales: ["es"] as const },
];

export function getUiLanguageKey(locale: Locale): UiLanguageKey {
  if (locale === "en") return "en";
  if (locale === "es") return "es";
  return "pt";
}

export function isPortugueseLocale(locale: Locale): boolean {
  return locale === "pt-BR" || locale === "pt-PT";
}

export function headerLocaleLabel(key: UiLanguageKey): string {
  if (key === "pt") return "PT";
  if (key === "en") return "EN";
  return "ES";
}
