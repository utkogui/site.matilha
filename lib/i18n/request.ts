import { getRequestConfig } from "next-intl/server";
import { contentLocaleKey } from "./content-locale";
import { routing } from "./routing";
import ptBr from "../../messages/pt-br.json";
import ptPt from "../../messages/pt-pt.json";
import en from "../../messages/en.json";
import es from "../../messages/es.json";

const catalogs = {
  "pt-br": ptBr,
  "pt-pt": ptPt,
  en,
  es,
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  const messageKey = contentLocaleKey(locale as (typeof routing.locales)[number]);
  const catalog = catalogs[messageKey as keyof typeof catalogs];

  return {
    locale,
    // Spread keeps next-intl catalogs hot-reloadable when JSON keys change.
    messages: { ...catalog },
  };
});
