export type BeautyShot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const base = "/images/cases/beauty-color";

export const beautyBrand = {
  logo: {
    src: `${base}/logo/logo.svg`,
    alt: "Beauty Color",
    width: 1735,
    height: 287,
  },
  cover: {
    src: `${base}/cover.webp`,
    alt: "Beauty Color | Matilha Estúdio",
    width: 1600,
    height: 900,
  },
} as const;

export const beautyScreens = {
  hero: {
    src: `${base}/screens/hero.webp`,
    alt: "Hero Beauty Color no desktop",
    width: 2880,
    height: 1568,
  },
  home: {
    src: `${base}/screens/home.webp`,
    alt: "Homepage Beauty Color, scroll completo",
    width: 894,
    height: 4096,
  },
  sobre: {
    src: `${base}/screens/sobre.webp`,
    alt: "Página Sobre Beauty Color",
    width: 1800,
    height: 3654,
  },
  produtosLista: {
    src: `${base}/screens/produtos-lista.webp`,
    alt: "Lista de produtos Beauty Color",
    width: 2160,
    height: 5933,
  },
  produtoInterna: {
    src: `${base}/screens/produto-interna.webp`,
    alt: "Página interna de produto Beauty Color",
    width: 1800,
    height: 3307,
  },
  quiz: {
    src: `${base}/screens/quiz.webp`,
    alt: "Quiz Beauty Color, tela inicial",
    width: 2160,
    height: 2007,
  },
  quizResultado: {
    src: `${base}/screens/quiz-resultado.webp`,
    alt: "Resultado do quiz Beauty Color",
    width: 1800,
    height: 4437,
  },
} as const satisfies Record<string, BeautyShot>;

export const beautyMobile = {
  home: {
    src: `${base}/mobile/home.webp`,
    alt: "Homepage Beauty Color no mobile",
    width: 720,
    height: 16202,
  },
  produtosLista: {
    src: `${base}/mobile/produtos-lista.webp`,
    alt: "Lista de produtos Beauty Color no mobile",
    width: 720,
    height: 9966,
  },
} as const satisfies Record<string, BeautyShot>;

export const beautySections = {
  homeProdutos: {
    src: `${base}/sections/home-produtos.webp`,
    alt: "Dobra de produtos na home Beauty Color",
    width: 2160,
    height: 1569,
  },
  produtosHero: {
    src: `${base}/sections/produtos-hero.webp`,
    alt: "Hero da lista de produtos Beauty Color",
    width: 2160,
    height: 648,
  },
  produtosFold: {
    src: `${base}/sections/produtos-fold.webp`,
    alt: "Grade de produtos Beauty Color",
    width: 2160,
    height: 3762,
  },
  freefrom: {
    src: `${base}/sections/freefrom.webp`,
    alt: "Selo free from Beauty Color",
    width: 2160,
    height: 1284,
  },
  influencers: {
    src: `${base}/sections/influencers.webp`,
    alt: "Influenciadoras Beauty Color",
    width: 2160,
    height: 1734,
  },
} as const satisfies Record<string, BeautyShot>;

export const beautyPalette = [
  { name: "Violeta", hex: "#5C2D91" },
  { name: "Magenta", hex: "#E91E8C" },
  { name: "Amarelo", hex: "#F5C518" },
  { name: "Creme", hex: "#FBF6F0" },
  { name: "Ink", hex: "#1A0F2E" },
] as const;
