export type SyxSwatch = {
  name: string;
  hex: string;
  text: string;
};

const base = "/images/cases/syx";

export const syxLogos = {
  black: `${base}/logo/wordmark-black.svg`,
  white: `${base}/logo/wordmark-white.svg`,
  sober: `${base}/logo/wordmark-sober.svg`,
  magic: `${base}/logo/wordmark-magic.svg`,
  cover: `${base}/cover.webp`,
};

export const syxPalettePrimary: readonly SyxSwatch[] = [
  { name: "Sober Blue Darker", hex: "#063C3B", text: "#ffffff" },
  { name: "Sober Blue Dark", hex: "#0B6868", text: "#ffffff" },
  { name: "Sober Blue Regular", hex: "#0F9594", text: "#ffffff" },
  { name: "Sober Blue Light", hex: "#57B5B4", text: "#1a1a1a" },
  { name: "Sober Blue Lightest", hex: "#9FD5D4", text: "#1a1a1a" },
];

export const syxPaletteSecondary: readonly SyxSwatch[] = [
  { name: "Magic Green Darker", hex: "#536501", text: "#ffffff" },
  { name: "Magic Green Dark", hex: "#92B001", text: "#1a1a1a" },
  { name: "Magic Green Regular", hex: "#D0FC02", text: "#1a1a1a" },
  { name: "Magic Green Light", hex: "#E8FE81", text: "#1a1a1a" },
  { name: "Magic Green Lightest", hex: "#F6FECC", text: "#1a1a1a" },
];

export const syxPaletteNeutral: readonly SyxSwatch[] = [
  { name: "Dark Syx", hex: "#1A1A1A", text: "#ffffff" },
  { name: "Grey Darkest", hex: "#363636", text: "#ffffff" },
  { name: "Grey Darker", hex: "#666666", text: "#ffffff" },
  { name: "Grey Regular", hex: "#C7C7C7", text: "#1a1a1a" },
  { name: "Grey Lightest", hex: "#F2F2F2", text: "#1a1a1a" },
];

export const syxTypeScale = [
  { name: "Big", size: "72px" },
  { name: "Hero", size: "56px" },
  { name: "H1", size: "40px" },
  { name: "H2", size: "32px" },
  { name: "H3", size: "28px" },
  { name: "H4", size: "24px" },
] as const;

export const syxSpace = [4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 104] as const;

export const syxSystemGroups = [
  {
    key: "foundation",
    items: ["syxMapBrand", "syxMapColor", "syxMapType", "syxMapSpace", "syxMapShapes", "syxMapIcons"],
  },
  { key: "action", items: ["syxMapButtons", "syxMapFields", "syxMapSelect", "syxMapTags"] },
  { key: "structure", items: ["syxMapHeader", "syxMapNav", "syxMapFooter", "syxMapTitle"] },
  { key: "product", items: ["syxMapCards", "syxMapList", "syxMapFilters", "syxMapBanner", "syxMapSearch"] },
  { key: "flow", items: ["syxMapModal", "syxMapDialog", "syxMapDropdown", "syxMapUpload", "syxMapAccordion"] },
] as const;

export const syxApps = [
  { src: `${base}/gallery-1.webp`, alt: "SYX | marketplace", labelKey: "syxAppHome" as const },
  { src: `${base}/gallery-2.webp`, alt: "SYX | plataforma", labelKey: "syxAppPlatform" as const },
  { src: `${base}/gallery-3.webp`, alt: "SYX | produto", labelKey: "syxAppProduct" as const },
  { src: `${base}/gallery-4.webp`, alt: "SYX | listagem", labelKey: "syxAppListing" as const },
  { src: `${base}/gallery-5.webp`, alt: "SYX | detalhe", labelKey: "syxAppDetail" as const },
  { src: `${base}/gallery-6.webp`, alt: "SYX | aplicação", labelKey: "syxAppExtra" as const },
];
