export type CharneyShot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const base = "/images/cases/charney-companies";

export const charneyPhotos = {
  hero: {
    src: `${base}/photos/hero.webp`,
    alt: "Fachada Charney",
    width: 1800,
    height: 1200,
  },
  greenhouse: {
    src: `${base}/photos/greenhouse.webp`,
    alt: "GreenHouse, empreendimento Charney",
    width: 1400,
    height: 1867,
  },
  dime: {
    src: `${base}/photos/dime.webp`,
    alt: "The Dime, empreendimento Charney",
    width: 1800,
    height: 1200,
  },
  dimeSkyline: {
    src: `${base}/photos/dime-skyline.webp`,
    alt: "The Dime, vista para o skyline",
    width: 2000,
    height: 1334,
  },
  overlay: {
    src: `${base}/photos/overlay.webp`,
    alt: "",
    width: 268,
    height: 384,
  },
  mark: {
    src: `${base}/photos/mark.png`,
    alt: "",
    width: 403,
    height: 152,
  },
} as const satisfies Record<string, CharneyShot>;

export const charneyScreens = {
  heroSite: {
    src: `${base}/screens/hero-site.webp`,
    alt: "Homepage Charney no desktop",
    width: 1167,
    height: 730,
  },
  home: {
    src: `${base}/screens/home.webp`,
    alt: "Homepage Charney, scroll completo",
    width: 1200,
    height: 3853,
  },
  development: {
    src: `${base}/screens/development.webp`,
    alt: "Página Development Charney",
    width: 900,
    height: 4557,
  },
  management: {
    src: `${base}/screens/management.webp`,
    alt: "Página Management Charney",
    width: 900,
    height: 4431,
  },
  brokerage: {
    src: `${base}/screens/brokerage.webp`,
    alt: "Página Brokerage Charney",
    width: 800,
    height: 6125,
  },
} as const satisfies Record<string, CharneyShot>;

export const charneyMobile = {
  home: {
    src: `${base}/mobile/home.webp`,
    alt: "Homepage Charney no mobile",
    width: 335,
    height: 981,
  },
  menu: {
    src: `${base}/mobile/menu.webp`,
    alt: "Menu Charney no mobile",
    width: 582,
    height: 975,
  },
  nav: {
    src: `${base}/mobile/nav.webp`,
    alt: "Menu Charney no mobile",
    width: 720,
    height: 1600,
  },
  blogMenu: {
    src: `${base}/mobile/blog-menu.webp`,
    alt: "Leadership Charney no mobile",
    width: 720,
    height: 2222,
  },
  blog: {
    src: `${base}/mobile/blog.webp`,
    alt: "Artigo Charney no mobile",
    width: 720,
    height: 1882,
  },
} as const satisfies Record<string, CharneyShot>;

export const charneyMark = `${base}/photos/mark.png`;
export const charneyMatilhaMark = `${base}/matilha.svg`;
