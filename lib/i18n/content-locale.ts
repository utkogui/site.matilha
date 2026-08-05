import type { Locale } from "@/lib/i18n/routing";

export function contentLocaleKey(locale: Locale): string {
  if (locale === "pt-BR") return "pt-br";
  if (locale === "pt-PT") return "pt-pt";
  return locale;
}
