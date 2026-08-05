import { getRequestConfig } from "next-intl/server";
import { contentLocaleKey } from "./content-locale";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  const messageKey = contentLocaleKey(locale as (typeof routing.locales)[number]);

  return {
    locale,
    messages: (await import(`../../messages/${messageKey}.json`)).default,
  };
});
