export type ServiceItem = {
  key: "uxui" | "serviceDesign" | "daas" | "branding" | "development" | "mvp";
  image: string;
  alt: string;
};

export const growSectionVideo = {
  vimeoId: "504394316",
  title: "Manifesto | Matilha Estúdio",
  poster: "/images/brand/wall.webp",
} as const;

export const heroVideo = {
  src: "/video/hero.webm",
  poster: "/video/hero-poster.webp",
} as const;

export const growSectionVideoSrc =
  `https://player.vimeo.com/video/${growSectionVideo.vimeoId}?muted=1&autoplay=1&loop=1&background=1&app_id=122963`;

export const clientLogos = [
  { src: "/images/clients/matilha-digital_cliente-parceria-syx.png", alt: "SYX" },
  { src: "/images/clients/matilha-digital_cliente-parceria-cormora.png", alt: "Cormora" },
  { src: "/images/clients/matilha-digital_cliente-parceria-pubg-battlegrounds.png", alt: "PUBG" },
  { src: "/images/clients/matilha-digital_cliente-parceria-mon.png", alt: "MON" },
  { src: "/images/clients/matilha-digital_cliente-parceria-meu-playstation.png", alt: "Meu PlayStation" },
  { src: "/images/clients/matilha-digital_cliente-parceria-neodente.png", alt: "Neodent" },
  { src: "/images/clients/matilha-digital_cliente-parceria-banco-do-brasil.png", alt: "Banco do Brasil" },
  { src: "/images/clients/matilha-digital_cliente-parceria-volvo.png", alt: "Volvo" },
  { src: "/images/clients/matilha-digital_cliente-parceria-mondelez.png", alt: "Mondelez" },
  { src: "/images/clients/matilha-digital_cliente-parceria-pipefy.png", alt: "Pipefy" },
  { src: "/images/clients/matilha-digital_cliente-parceria-sebrae.png", alt: "Sebrae" },
  { src: "/images/clients/matilha-digital_cliente-parceria-ftd-educacao.png", alt: "FTD Educação" },
  { src: "/images/clients/matilha-digital_cliente-parceria-autoescola-mapfre.png", alt: "Mapfre" },
  { src: "/images/clients/matilha-digital_cliente-parceria-juno.png", alt: "Juno" },
  { src: "/images/clients/matilha-digital_cliente-parceria-vanguarda.png", alt: "Vanguarda" },
  { src: "/images/clients/matilha-digital_cliente-parceria-apolar-imoveis.png", alt: "Apolar Imóveis" },
  { src: "/images/clients/matilha-digital_cliente-parceria-future-dojo.png", alt: "Future Dojo" },
  { src: "/images/clients/matilha-digital_cliente-parceria-eunerd.png", alt: "EuNerd" },
  { src: "/images/clients/matilha-digital_cliente-parceria-bonus-xp.png", alt: "Bonus XP" },
  { src: "/images/clients/matilha-digital_cliente-parceria-autoescola-bello.png", alt: "Autoescola Bello" },
];

export const services: ServiceItem[] = [
  {
    key: "uxui",
    image: "/images/services/service-uxui.webp",
    alt: "UI/UX Design | Matilha Estúdio",
  },
  {
    key: "serviceDesign",
    image: "/images/services/service-service.webp",
    alt: "Design de Serviço | Matilha Estúdio",
  },
  {
    key: "daas",
    image: "/images/services/service-alocacao.webp",
    alt: "Alocação DaaS | Matilha Estúdio",
  },
  {
    key: "branding",
    image: "/images/services/service-branding.webp",
    alt: "Branding e Naming | Matilha Estúdio",
  },
  {
    key: "development",
    image: "/images/services/service-dev.webp",
    alt: "Desenvolvimento e Tech | Matilha Estúdio",
  },
  {
    key: "mvp",
    image: "/images/services/service-mvp.webp",
    alt: "Validação de Modelo de Negócio | Matilha Estúdio",
  },
];

export const homeFeaturedCaseIds = [
  "mon-museu-oscar-niemeyer",
  "meu-playstation",
  "charney-companies",
  "pubg",
];

export const footerData = {
  phone: "+5541997376060",
  phoneDisplay: "+55 41 99737-6060",
  email: "talk@matilha.digital",
  whatsapp: "https://wa.me/message/X6BX7BCQE564O1",
  social: {
    linkedin: "https://www.linkedin.com/company/matilhaestudio",
    instagram: "https://www.instagram.com/matilhaestudio/",
    medium: "https://medium.com/matilha-est%C3%BAdio",
    behance: "https://www.behance.net/estudiomatilha",
  },
  addresses: {
    brazil: {
      label: "Brasil | Curitiba - PR",
      street: "Rua Emiliano Perneta, 680",
      maps: "https://maps.google.com/?q=Rua+Emiliano+Perneta+680+Curitiba",
    },
    usa: {
      label: "EUA | Orlando - FL",
      street: "7345 W Sand Lake RD, STE 210 Office 8716",
      maps: "https://maps.google.com/?q=7345+W+Sand+Lake+RD+Orlando+FL",
    },
  },
};
