export type NeodentShot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const base = "/images/cases/neodent";

export const neodentPhotos = {
  hero: {
    src: `${base}/photos/hero.webp`,
    alt: "Landing page Neodent, hero com implante",
    width: 1440,
    height: 1031,
  },
  about: {
    src: `${base}/photos/about.webp`,
    alt: "Pessoas sorrindo, resultado do trabalho Neodent",
    width: 1600,
    height: 1066,
  },
} as const satisfies Record<string, NeodentShot>;

export const neodentScreens = {
  landing: {
    src: `${base}/screens/landing.webp`,
    alt: "Landing page Neodent no desktop",
    width: 939,
    height: 4096,
  },
  landingTwo: {
    src: `${base}/screens/landing-2.webp`,
    alt: "Seção de soluções da landing Neodent",
    width: 1400,
    height: 2469,
  },
  landingThree: {
    src: `${base}/screens/landing-3.webp`,
    alt: "Portfólio de produtos na landing Neodent",
    width: 1400,
    height: 2766,
  },
  languages: {
    src: `${base}/screens/languages.webp`,
    alt: "Seletor de idioma e país da landing Neodent",
    width: 1440,
    height: 800,
  },
  mobileOne: {
    src: `${base}/screens/mobile-1.webp`,
    alt: "Landing Neodent no mobile, hero",
    width: 360,
    height: 1152,
  },
  mobileTwo: {
    src: `${base}/screens/mobile-2.webp`,
    alt: "Landing Neodent no mobile, soluções",
    width: 360,
    height: 1509,
  },
  mobileThree: {
    src: `${base}/screens/mobile-3.webp`,
    alt: "Landing Neodent no mobile, produtos",
    width: 360,
    height: 899,
  },
  cluster: {
    src: `${base}/screens/mobiles-cluster.webp`,
    alt: "Grade de telas mobile da landing Neodent",
    width: 1400,
    height: 1405,
  },
} as const satisfies Record<string, NeodentShot>;

export const neodentLogo = {
  lockup: {
    src: `${base}/logo/lockup.svg`,
    alt: "Neodent",
    width: 380,
    height: 80,
  },
} as const;

export type NeodentIsoFrame = NeodentShot & {
  objectPosition: string;
};

export const neodentIsoFrames: NeodentIsoFrame[] = [
  { ...neodentScreens.mobileOne, objectPosition: "50% 0%" },
  { ...neodentScreens.landingTwo, objectPosition: "50% 8%" },
  { ...neodentScreens.mobileTwo, objectPosition: "50% 0%" },
  { ...neodentScreens.landing, objectPosition: "50% 6%" },
  { ...neodentScreens.languages, objectPosition: "50% 0%" },
  { ...neodentScreens.mobileThree, objectPosition: "50% 0%" },
  { ...neodentScreens.landingThree, objectPosition: "50% 12%" },
  { ...neodentScreens.mobileTwo, objectPosition: "50% 42%" },
  { ...neodentScreens.mobileOne, objectPosition: "50% 58%" },
  { ...neodentScreens.landingTwo, objectPosition: "50% 48%" },
  { ...neodentScreens.languages, objectPosition: "18% 80%" },
  { ...neodentScreens.landingThree, objectPosition: "50% 62%" },
];
