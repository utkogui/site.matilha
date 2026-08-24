export type OpenShot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const base = "/images/cases/open-startups";

export const openLogos = {
  wordmarkDark: {
    src: `${base}/logo/wordmark-dark.webp`,
    alt: "Open Startups",
    width: 480,
    height: 270,
  },
  wordmarkOnDark: {
    src: `${base}/logo/wordmark-on-dark.webp`,
    alt: "Open Startups",
    width: 1064,
    height: 653,
  },
  symbol: {
    src: `${base}/logo/symbol.webp`,
    alt: "Símbolo Open Startups",
    width: 800,
    height: 800,
  },
  symbolOnDark: {
    src: `${base}/logo/symbol-on-dark.webp`,
    alt: "Símbolo Open Startups",
    width: 705,
    height: 653,
  },
  graph: `${base}/logo/cover-graph.svg`,
} as const satisfies Record<string, OpenShot | string>;

export const openConceptIcons = {
  heraldry: `${base}/concept/heraldry.svg`,
  connection: `${base}/concept/connection.svg`,
  innovation: `${base}/concept/innovation.svg`,
} as const;

export type OpenSwatch = {
  name: string;
  hex: string;
  featured?: boolean;
};

export const openPalettePrimary: OpenSwatch[] = [
  { name: "Variação -2", hex: "#005995" },
  { name: "Variação -1", hex: "#0076C7" },
  { name: "Sober Blue", hex: "#0094F9", featured: true },
  { name: "Variação +1", hex: "#4DB4FB" },
  { name: "Variação +2", hex: "#80CAFC" },
];

export const openPaletteSecondary: OpenSwatch[] = [
  { name: "Variação -2", hex: "#388089" },
  { name: "Variação -1", hex: "#4BAAB7" },
  { name: "Energy Blue", hex: "#5ED5E5", featured: true },
  { name: "Variação +1", hex: "#8EE2ED" },
  { name: "Variação +2", hex: "#AFEAF2" },
];

export const openPaletteSupport: OpenSwatch[] = [
  { name: "Solid black", hex: "#252830", featured: true },
  { name: "Variação +1", hex: "#3B3E45" },
  { name: "Variação +2", hex: "#66696E" },
  { name: "Regular white", hex: "#FFFFFF", featured: true },
];

export const openAudience = {
  startups: {
    src: `${base}/audience/startups.webp`,
    alt: "Startups",
    width: 1200,
    height: 800,
  },
  corporations: {
    src: `${base}/audience/corporations.webp`,
    alt: "Corporações",
    width: 1200,
    height: 800,
  },
  professionals: {
    src: `${base}/audience/professionals.webp`,
    alt: "Profissionais",
    width: 1200,
    height: 800,
  },
  investors: {
    src: `${base}/audience/investors.webp`,
    alt: "Investidores",
    width: 1200,
    height: 800,
  },
  researchers: {
    src: `${base}/audience/researchers.webp`,
    alt: "Pesquisadores",
    width: 1200,
    height: 800,
  },
} as const satisfies Record<string, OpenShot>;

export const openArchetypes = {
  sage: {
    src: `${base}/archetypes/sage.webp`,
    alt: "Albert Einstein",
    width: 1200,
    height: 1600,
  },
  sovereign: {
    src: `${base}/archetypes/sovereign.webp`,
    alt: "Rei Arthur",
    width: 1200,
    height: 1229,
  },
} as const satisfies Record<string, OpenShot>;

export const openApps = {
  billboard: {
    src: `${base}/apps/billboard.webp`,
    alt: "Sinalização Oiweek",
    width: 1600,
    height: 900,
  },
  poster: {
    src: `${base}/apps/poster.webp`,
    alt: "Poster Open Startups",
    width: 1600,
    height: 900,
  },
  card: {
    src: `${base}/apps/card.webp`,
    alt: "Card Open Startups",
    width: 1600,
    height: 900,
  },
  tee: {
    src: `${base}/apps/tee.webp`,
    alt: "Camiseta Open Startups",
    width: 1600,
    height: 900,
  },
} as const satisfies Record<string, OpenShot>;
