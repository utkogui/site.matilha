import type { ServiceItem } from "@/lib/content/home";
import type { Locale } from "@/lib/i18n/routing";

export type ServiceKey = ServiceItem["key"];

export type ServicePageItem = {
  key: ServiceKey;
  slugs: Record<Locale, string>;
  hero: string;
  heroPosition?: string;
  accent: string;
  relatedCases: string[];
};

export const servicePages: ServicePageItem[] = [
  {
    key: "uxui",
    slugs: { "pt-BR": "ui-ux-design", "pt-PT": "ui-ux-design", en: "ui-ux-design", es: "diseno-ui-ux" },
    hero: "/images/services/hero/uxui.webp",
    heroPosition: "45% 40%",
    accent: "var(--service-uxui)",
    relatedCases: ["beauty-color", "neodent", "charney-companies"],
  },
  {
    key: "serviceDesign",
    slugs: {
      "pt-BR": "design-de-servico",
      "pt-PT": "design-de-servico",
      en: "service-design",
      es: "diseno-de-servicios",
    },
    hero: "/images/services/hero/service-design.webp",
    heroPosition: "30% 60%",
    accent: "var(--service-service-design)",
    relatedCases: ["meu-playstation", "mon-museu-oscar-niemeyer", "pubg"],
  },
  {
    key: "daas",
    slugs: {
      "pt-BR": "alocacao-daas",
      "pt-PT": "alocacao-daas",
      en: "design-as-a-service",
      es: "asignacion-daas",
    },
    hero: "/images/services/hero/daas.webp",
    heroPosition: "55% 60%",
    accent: "var(--service-daas)",
    relatedCases: [],
  },
  {
    key: "branding",
    slugs: {
      "pt-BR": "branding-e-naming",
      "pt-PT": "branding-e-naming",
      en: "branding-and-naming",
      es: "branding-y-naming",
    },
    hero: "/images/services/hero/branding.webp",
    heroPosition: "50% 35%",
    accent: "var(--service-branding)",
    relatedCases: ["sestini", "open-startups", "cormora"],
  },
  {
    key: "development",
    slugs: {
      "pt-BR": "desenvolvimento-e-tecnologia",
      "pt-PT": "desenvolvimento-e-tecnologia",
      en: "development-and-technology",
      es: "desarrollo-y-tecnologia",
    },
    hero: "/images/services/hero/development.webp",
    heroPosition: "50% 45%",
    accent: "var(--service-development)",
    relatedCases: ["neodent", "charney-companies", "pubg"],
  },
  {
    key: "mvp",
    slugs: {
      "pt-BR": "validacao-de-modelo-de-negocio",
      "pt-PT": "validacao-de-modelo-de-negocio",
      en: "business-model-validation",
      es: "validacion-de-modelo-de-negocio",
    },
    hero: "/images/services/hero/mvp.webp",
    heroPosition: "55% 55%",
    accent: "var(--service-mvp)",
    relatedCases: [],
  },
];

export function getServicePageByKey(key: ServiceKey) {
  return servicePages.find((item) => item.key === key);
}

export function getServicePageBySlug(locale: Locale, slug: string) {
  return servicePages.find((item) => item.slugs[locale] === slug);
}

const serviceLabelKeys: Record<string, ServiceKey> = {
  "ui | ux design": "uxui",
  "ui/ux design": "uxui",
  pesquisa: "uxui",
  research: "uxui",
  investigación: "uxui",
  "teste de usabilidade": "uxui",
  "usability testing": "uxui",
  "test de usabilidad": "uxui",
  "design de serviço": "serviceDesign",
  "service design": "serviceDesign",
  "diseño de servicio": "serviceDesign",
  "alocação (daas)": "daas",
  daas: "daas",
  branding: "branding",
  naming: "branding",
  "branding & naming": "branding",
  "branding e naming": "branding",
  "desenvolvimento e tech": "development",
  "development & tech": "development",
  "desarrollo y tech": "development",
  ecommerce: "development",
  "validação de modelo de negócio": "mvp",
  "business model validation": "mvp",
};

export function serviceKeyFromLabel(label: string): ServiceKey | undefined {
  return serviceLabelKeys[label.trim().toLowerCase()];
}
