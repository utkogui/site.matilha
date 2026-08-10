import type { ServiceItem } from "@/lib/content/home";
import type { Locale } from "@/lib/i18n/routing";

export const serviceBlurbs: Record<Locale, Record<ServiceItem["key"], string>> = {
  "pt-BR": {
    uxui: "Interfaces claras que convertem.",
    serviceDesign: "Jornadas desenhadas ponta a ponta.",
    daas: "Design embutido no seu time.",
    branding: "Nome, marca e presença.",
    development: "Do protótipo ao produto no ar.",
    mvp: "Valide a ideia antes de escalar.",
  },
  "pt-PT": {
    uxui: "Interfaces claras que convertem.",
    serviceDesign: "Jornadas desenhadas ponta a ponta.",
    daas: "Design embutido na sua equipa.",
    branding: "Nome, marca e presença.",
    development: "Do protótipo ao produto no ar.",
    mvp: "Valide a ideia antes de escalar.",
  },
  en: {
    uxui: "Clear interfaces that convert.",
    serviceDesign: "Journeys designed end to end.",
    daas: "Design embedded in your team.",
    branding: "Name, brand, presence.",
    development: "Prototype to live product.",
    mvp: "Prove the idea before scaling.",
  },
  es: {
    uxui: "Interfaces claras que convierten.",
    serviceDesign: "Viajes de punta a punta.",
    daas: "Diseño dentro de tu equipo.",
    branding: "Nombre, marca y presencia.",
    development: "Del prototipo al producto vivo.",
    mvp: "Valida la idea antes de escalar.",
  },
};

export function getServiceBlurb(locale: Locale, key: ServiceItem["key"]): string {
  return serviceBlurbs[locale][key];
}
