import { defineRouting } from "next-intl/routing";

export const locales = ["pt-BR", "pt-PT", "en", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt-BR";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: {
    mode: "as-needed",
    prefixes: {
      "pt-PT": "/pt",
    },
  },
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/cases": {
      "pt-BR": "/cases",
      "pt-PT": "/cases",
      en: "/our-work",
      es: "/nuestro-trabajo",
    },
    "/cases/[slug]": {
      "pt-BR": "/cases/[slug]",
      "pt-PT": "/cases/[slug]",
      en: "/our-work/[slug]",
      es: "/nuestro-trabajo/[slug]",
    },
    "/contact": {
      "pt-BR": "/vamos-conversar",
      "pt-PT": "/vamos-conversar",
      en: "/lets-talk",
      es: "/hablemos",
    },
    "/careers": {
      "pt-BR": "/faca-parte",
      "pt-PT": "/faca-parte",
      en: "/join-us",
      es: "/unete",
    },
    "/privacy": {
      "pt-BR": "/politica-de-privacidade",
      "pt-PT": "/politica-de-privacidade",
      en: "/privacy-policy",
      es: "/politica-de-privacidad",
    },
  },
});
