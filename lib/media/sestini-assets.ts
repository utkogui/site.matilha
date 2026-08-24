export type SestiniShot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  crop: "board" | "poster" | "airport" | "pack" | "photo";
};

const base = "/images/cases/sestini";
const showcase = `${base}/showcase`;

export const sestiniLogos = {
  horizontal: `${base}/logo-horizontal.svg`,
  vertical: `${base}/logo-vertical.svg`,
  tagline: `${base}/tagline.svg`,
  heroShape: `${base}/hero-shape.svg`,
  symbol: `${base}/symbol.svg`,
  pattern: `${base}/pattern.svg`,
};

export const sestiniPalette = [
  { name: "Vermelho", hex: "#DA291C", text: "#ffffff", bordered: false },
  { name: "Sand", hex: "#F0E9DB", text: "#161020", bordered: true },
  { name: "Mirage", hex: "#161020", text: "#ffffff", bordered: false },
  { name: "Branco", hex: "#FFFFFF", text: "#161020", bordered: true },
] as const;

export const sestiniPaletteSecondary = [
  { name: "Azul", hex: "#006298", text: "#ffffff" },
  { name: "Laranja", hex: "#DC6B2F", text: "#ffffff" },
  { name: "Topaz", hex: "#FFAA4D", text: "#161020" },
] as const;

export const sestiniInspireCallouts = [
  { name: "Topaz", hex: "#FFAA4D", tone: "topaz" },
  { name: "Laranja", hex: "#DC6B2F", tone: "laranja" },
  { name: "Azul", hex: "#006298", tone: "azul" },
] as const;

export const sestiniBrandbook = {
  windowPlane: {
    src: `${base}/inspire/window-plane.webp`,
    alt: "Vista pela janela do avião, inspiração da paleta Sestini",
    width: 1210,
    height: 1816,
    crop: "photo",
  },
  tote: {
    src: `${base}/graphics/tote.webp`,
    alt: "Sacola Sestini com símbolo e grafismo",
    width: 1600,
    height: 1200,
    crop: "photo",
  },
  pattern: {
    src: `${base}/graphics/pattern.webp`,
    alt: "Grafismo institucional Sestini",
    width: 1800,
    height: 1013,
    crop: "photo",
  },
  luggageGraphic: {
    src: `${base}/graphics/luggage.webp`,
    alt: "Aplicação do grafismo sobre bagagem",
    width: 1600,
    height: 1067,
    crop: "photo",
  },
  shapesBand: {
    src: `${base}/elements/shapes-band.png`,
    alt: "Formas de apoio e a tagline A gente cuida, você vai.",
    width: 1920,
    height: 224,
    crop: "photo",
  },
  tapeBox: {
    src: `${base}/elements/tape-box.webp`,
    alt: "Caixa Sestini com fita das formas de apoio",
    width: 1800,
    height: 1201,
    crop: "photo",
  },
} as const satisfies Record<string, SestiniShot>;

const frame: Pick<SestiniShot, "width" | "height"> = {
  width: 1920,
  height: 1080,
};

export const sestiniApplications = {
  instagram: {
    src: `${showcase}/instagram.webp`,
    alt: "Sestini, aplicações em redes sociais",
    crop: "board",
    ...frame,
  },
  poster: {
    src: `${showcase}/poster.webp`,
    alt: "Sestini, poster institucional",
    crop: "poster",
    ...frame,
  },
  airport: {
    src: `${showcase}/airport.webp`,
    alt: "Sestini, mídia em aeroporto",
    crop: "airport",
    ...frame,
  },
  accessories: {
    src: `${showcase}/accessories.webp`,
    alt: "Sestini, embalagem e merchandising",
    crop: "pack",
    ...frame,
  },
  tote: sestiniBrandbook.tote,
  tapeBox: sestiniBrandbook.tapeBox,
  suitcase: {
    src: `${showcase}/suitcase.webp`,
    alt: "Sestini, mala de bordo",
    crop: "board",
    ...frame,
  },
  backpack: {
    src: `${showcase}/backpack.webp`,
    alt: "Sestini, mochila Work",
    crop: "board",
    ...frame,
  },
  details: {
    src: `${showcase}/details.webp`,
    alt: "Sestini, detalhes de produto",
    crop: "board",
    ...frame,
  },
  luggageTag: {
    src: `${showcase}/luggage-tag.webp`,
    alt: "Sestini, tag de bagagem",
    crop: "board",
    ...frame,
  },
} as const satisfies Record<string, SestiniShot>;
