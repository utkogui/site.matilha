import type { Locale } from "@/lib/i18n/routing";

export interface CaseStoryDeliverable {
  title: string;
  body: string;
}

export interface CaseStoryPair {
  title: string;
  body: string;
  voice?: string;
  quote?: string;
  figure?: string;
  traits?: string;
}

export interface CaseStoryChapter {
  title: string;
  body: string;
  points?: string[];
  pairs?: CaseStoryPair[];
}

export interface CaseStory {
  approachLead?: string;
  approach?: string;
  deliverables?: CaseStoryDeliverable[];
  quote?: string;
  quoteAuthor?: string;
  chapters?: {
    app?: CaseStoryChapter;
    site?: CaseStoryChapter;
    article?: CaseStoryChapter;
    details?: CaseStoryChapter;
    identity?: CaseStoryChapter;
    palette?: CaseStoryChapter;
    type?: CaseStoryChapter;
    inspiration?: CaseStoryChapter;
    graphics?: CaseStoryChapter;
    elements?: CaseStoryChapter;
    applications?: CaseStoryChapter;
    system?: CaseStoryChapter;
    about?: CaseStoryChapter;
    process?: CaseStoryChapter;
    audiences?: CaseStoryChapter;
    language?: CaseStoryChapter;
    archetypes?: CaseStoryChapter;
    concept?: CaseStoryChapter;
    tagline?: CaseStoryChapter;
    is?: CaseStoryChapter;
    isNot?: CaseStoryChapter;
    spelling?: CaseStoryChapter;
  };
  team?: string[];
}

export type CaseCategory = "styleguide";

export interface CaseContent {
  id: string;
  slug: string;
  title: string;
  client: string;
  summary: string;
  challenge: string;
  solution: string;
  services: string[];
  category?: CaseCategory;
  cover: string;
  coverAlt: string;
  gallery: { src: string; alt: string }[];
  relatedCases: string[];
  story?: CaseStory;
  seo: {
    title: string;
    description: string;
  };
}

export interface CaseRegistryItem {
  id: string;
  slugs: Record<Locale, string>;
  cover: string;
  coverAlt: Record<Locale, string>;
  featured: boolean;
  category?: CaseCategory;
}

function ptSlugs(slug: string) {
  return { "pt-BR": slug, "pt-PT": slug } as const;
}

function ptCoverAlt(label: string) {
  return { "pt-BR": label, "pt-PT": label } as const;
}

export const caseRegistry: CaseRegistryItem[] = [
  {
    id: "syx",
    slugs: { ...ptSlugs("syx"), en: "syx", es: "syx" },
    cover: "/images/cases/syx/cover.webp",
    coverAlt: {
      ...ptCoverAlt("Case SYX | Matilha Estúdio"),
      en: "SYX case | Matilha Estúdio",
      es: "Case SYX | Matilha Estúdio",
    },
    featured: true,
    category: "styleguide",
  },
  {
    id: "conecte-ai",
    slugs: { ...ptSlugs("conecte-ai"), en: "conecte-ai", es: "conecte-ai" },
    cover: "/images/cases/conecte-ai/cover.webp",
    coverAlt: {
      ...ptCoverAlt("Case Conecte AI | Matilha Estúdio"),
      en: "Conecte AI case | Matilha Estúdio",
      es: "Case Conecte AI | Matilha Estúdio",
    },
    featured: true,
  },
  {
    id: "cormora",
    slugs: { ...ptSlugs("cormora"), en: "cormora", es: "cormora" },
    cover: "/images/cases/cormora/cover.webp",
    coverAlt: {
      ...ptCoverAlt("Case Cormora | Matilha Estúdio"),
      en: "Cormora case | Matilha Estúdio",
      es: "Case Cormora | Matilha Estúdio",
    },
    featured: true,
  },
  {
    id: "charney-companies",
    slugs: { ...ptSlugs("charney-companies"), en: "charney-companies", es: "charney-companies" },
    cover: "/images/cases/charney-companies/cover.webp",
    coverAlt: {
      ...ptCoverAlt("Case Charney Companies | Matilha Estúdio"),
      en: "Charney Companies case | Matilha Estúdio",
      es: "Case Charney Companies | Matilha Estúdio",
    },
    featured: true,
  },
  {
    id: "pubg",
    slugs: { ...ptSlugs("pubg"), en: "pubg", es: "pubg" },
    cover: "/images/cases/pubg/cover.webp",
    coverAlt: {
      ...ptCoverAlt("Case PUBG | Matilha Estúdio"),
      en: "PUBG case | Matilha Estúdio",
      es: "Case PUBG | Matilha Estúdio",
    },
    featured: true,
  },
  {
    id: "open-startups",
    slugs: { ...ptSlugs("open-startups"), en: "open-startups", es: "open-startups" },
    cover: "/images/cases/open-startups/cover-sober.webp",
    coverAlt: {
      ...ptCoverAlt("Case Open Startups | Matilha Estúdio"),
      en: "Open Startups case | Matilha Estúdio",
      es: "Case Open Startups | Matilha Estúdio",
    },
    featured: true,
  },
  {
    id: "sestini",
    slugs: { ...ptSlugs("sestini"), en: "sestini", es: "sestini" },
    cover: "/images/cases/sestini/cover.webp",
    coverAlt: {
      ...ptCoverAlt("Case Sestini | Matilha Estúdio"),
      en: "Sestini case | Matilha Estúdio",
      es: "Case Sestini | Matilha Estúdio",
    },
    featured: true,
  },
  {
    id: "mon-museu-oscar-niemeyer",
    slugs: {
      "pt-BR": "mon-museu-oscar-niemeyer",
      "pt-PT": "mon-museu-oscar-niemeyer",
      en: "mon-oscar-niemeyer-museum",
      es: "museo-oscar-niemeyer",
    },
    cover: "/images/cases/mon-museu/cover.webp",
    coverAlt: {
      ...ptCoverAlt("Case MON | Matilha Estúdio"),
      en: "MON case | Matilha Estúdio",
      es: "Case MON | Matilha Estúdio",
    },
    featured: false,
  },
  {
    id: "meu-playstation",
    slugs: { ...ptSlugs("meu-playstation"), en: "my-playstation", es: "mi-playstation" },
    cover: "/images/cases/meu-playstation/cover.webp",
    coverAlt: {
      ...ptCoverAlt("Case Meu PlayStation | Matilha Estúdio"),
      en: "My PlayStation case | Matilha Estúdio",
      es: "Case Mi PlayStation | Matilha Estúdio",
    },
    featured: false,
  },
  {
    id: "neodent",
    slugs: { ...ptSlugs("neodent"), en: "neodent", es: "neodent" },
    cover: "/images/cases/neodent/cover.webp",
    coverAlt: {
      ...ptCoverAlt("Case Neodent | Matilha Estúdio"),
      en: "Neodent case | Matilha Estúdio",
      es: "Case Neodent | Matilha Estúdio",
    },
    featured: true,
  },
  {
    id: "harpia-consultoria",
    slugs: { ...ptSlugs("harpia-consultoria"), en: "harpia-consultoria", es: "harpia-consultoria" },
    cover: "/images/cases/harpia/cover.webp",
    coverAlt: {
      ...ptCoverAlt("Case Harpia Consultoria | Matilha Estúdio"),
      en: "Harpia Consultoria case | Matilha Estúdio",
      es: "Case Harpia Consultoria | Matilha Estúdio",
    },
    featured: false,
  },
];

export function getCaseBySlug(locale: Locale, slug: string) {
  return caseRegistry.find((item) => item.slugs[locale] === slug);
}

export function getCaseSlug(id: string, locale: Locale) {
  return caseRegistry.find((item) => item.id === id)?.slugs[locale];
}
