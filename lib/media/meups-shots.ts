export type MeupsShot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const base = "/images/cases/meu-playstation/showcase";

export const meupsHero: MeupsShot = {
  src: `${base}/hero-quem-somos.webp`,
  alt: "Meu PlayStation — quem somos",
  width: 1600,
  height: 4254,
};

export const meupsHeroAccent: MeupsShot = {
  src: `${base}/hero-icon.webp`,
  alt: "Meu PlayStation — detalhes de interface",
  width: 1600,
  height: 3174,
};

/** Tall mobile screens for phone-mask scrub runway */
export const meupsPhoneRunway: MeupsShot[] = [
  {
    src: `${base}/mobile-noticias.webp`,
    alt: "Meu PlayStation — categorias notícias",
    width: 360,
    height: 3396,
  },
  {
    src: `${base}/mobile-busca.webp`,
    alt: "Meu PlayStation — busca",
    width: 720,
    height: 6020,
  },
  {
    src: `${base}/mobile-autores.webp`,
    alt: "Meu PlayStation — autores",
    width: 720,
    height: 4788,
  },
];

/** Desktop long screens for sticky scrub chapters */
export const meupsDesktopChapters: { shot: MeupsShot; labelKey: "site" | "article" }[] = [
  {
    labelKey: "site",
    shot: {
      src: `${base}/desktop-home-sticky.webp`,
      alt: "Meu PlayStation — home desktop",
      width: 1440,
      height: 12543,
    },
  },
  {
    labelKey: "article",
    shot: {
      src: `${base}/desktop-interna.webp`,
      alt: "Meu PlayStation — interna de notícia",
      width: 1440,
      height: 11415,
    },
  },
];

/** Mosaic of UI details (dark / light pairs when available) */
export const meupsDetailGrid: MeupsShot[] = [
  {
    src: `${base}/mobile-ofertas.webp`,
    alt: "Meu PlayStation — ofertas",
    width: 360,
    height: 4667,
  },
  {
    src: `${base}/mobile-tag.webp`,
    alt: "Meu PlayStation — tag",
    width: 720,
    height: 5154,
  },
  {
    src: `${base}/mobile-noticias-light.webp`,
    alt: "Meu PlayStation — notícias light",
    width: 360,
    height: 3396,
  },
  {
    src: `${base}/mobile-parcerias.webp`,
    alt: "Meu PlayStation — parcerias",
    width: 720,
    height: 11356,
  },
  {
    src: `${base}/mobile-quem-somos.webp`,
    alt: "Meu PlayStation — quem somos mobile",
    width: 720,
    height: 5863,
  },
  {
    src: `${base}/mobile-tag-seguindo.webp`,
    alt: "Meu PlayStation — seguindo",
    width: 720,
    height: 5242,
  },
  {
    src: `${base}/mobile-reviews-light.webp`,
    alt: "Meu PlayStation — reviews light",
    width: 360,
    height: 3287,
  },
  {
    src: `${base}/mobile-busca-light.webp`,
    alt: "Meu PlayStation — busca light",
    width: 720,
    height: 6020,
  },
];
