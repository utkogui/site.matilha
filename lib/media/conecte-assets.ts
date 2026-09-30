export type ConecteShot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const product = "/images/cases/conecte-ai";
const research = "/images/cases/conecte-ai-pesquisa";

export const conecteBrand = {
  cover: {
    src: `${product}/cover.webp`,
    alt: "Conecte.ai",
    width: 1200,
    height: 720,
  },
  logo: {
    src: `${product}/logo.png`,
    alt: "conecte.ai",
    width: 340,
    height: 132,
  },
} as const satisfies Record<string, ConecteShot>;

export const conecteScreens = {
  plans: {
    src: `${product}/screens/plans.png`,
    alt: "Vitrine de planos Conecte.ai no desktop",
    width: 1440,
    height: 810,
  },
  plansPage: {
    src: `${product}/screens/plans-page.png`,
    alt: "Página de planos Conecte.ai",
    width: 996,
    height: 1200,
  },
  descubra: {
    src: `${product}/screens/descubra.png`,
    alt: "Funcionalidade Descubra seu plano",
    width: 1440,
    height: 1771,
  },
} as const satisfies Record<string, ConecteShot>;

export const conecteCards = {
  offer: {
    src: `${product}/cards/melhor-oferta.png`,
    alt: "Card de plano com selo de melhor oferta",
    width: 482,
    height: 513,
  },
  standard: {
    src: `${product}/cards/padrao.png`,
    alt: "Card de plano",
    width: 478,
    height: 509,
  },
  hover: {
    src: `${product}/cards/hover.png`,
    alt: "Card de plano no estado hover",
    width: 501,
    height: 517,
  },
  widget: {
    src: `${product}/cards/descubra-widget.png`,
    alt: "Widget Descubra seu plano",
    width: 412,
    height: 312,
  },
} as const satisfies Record<string, ConecteShot>;

export const conecteReport = {
  cover: {
    src: `${research}/cover.png`,
    alt: "Capa do relatório de teste de usabilidade",
    width: 1190,
    height: 1684,
  },
  bleed: {
    src: `${research}/bleed.jpg`,
    alt: "Painel analógico de controle, foto da abertura do relatório",
    width: 2400,
    height: 1600,
  },
  manifesto: {
    src: `${research}/pages/manifesto.png`,
    alt: "Página de abertura do relatório",
    width: 1190,
    height: 1684,
  },
  index: {
    src: `${research}/pages/sumario.png`,
    alt: "Sumário do relatório",
    width: 1190,
    height: 1684,
  },
  method: {
    src: `${research}/pages/metodologia.png`,
    alt: "Abertura do capítulo de metodologia",
    width: 1190,
    height: 1684,
  },
  config: {
    src: `${research}/pages/config.png`,
    alt: "Configuração do teste de usabilidade",
    width: 1190,
    height: 1684,
  },
  results: {
    src: `${research}/pages/resultados.png`,
    alt: "Abertura do capítulo de resultados",
    width: 1190,
    height: 1684,
  },
  valuation: {
    src: `${research}/pages/valoracao.png`,
    alt: "Critérios de valoração dos achados",
    width: 1190,
    height: 1684,
  },
} as const satisfies Record<string, ConecteShot>;

export const conectePalette = [
  { name: "Roxo Conecte", hex: "#4B2C87" },
  { name: "Lilás", hex: "#E4D6FF" },
  { name: "Cinza 05", hex: "#242634" },
  { name: "Fundo", hex: "#ECEEF0" },
] as const;
