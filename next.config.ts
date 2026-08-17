import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

const nextConfig: NextConfig = {
  // Netlify usa o adapter OpenNext, não usar output: "standalone"
  // Permite abrir o dev server pela rede (ex.: http://10.0.1.122:3000)
  allowedDevOrigins: ["10.0.1.122"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75],
  },
  async redirects() {
    return [
      { source: "/en/our-work/syx_", destination: "/en/our-work/syx", permanent: true },
      { source: "/en/our-work/cormora_", destination: "/en/our-work/cormora", permanent: true },
      { source: "/en/our-work/charney-companies_", destination: "/en/our-work/charney-companies", permanent: true },
      { source: "/en/our-work/conecte-ai_", destination: "/en/our-work/conecte-ai", permanent: true },
      { source: "/en/our-work/pubg_", destination: "/en/our-work/pubg", permanent: true },
      { source: "/en/our-work/sestini_", destination: "/en/our-work/sestini", permanent: true },
      { source: "/en/our-work/mon-oscar-niemeyer-museum_", destination: "/en/our-work/mon-oscar-niemeyer-museum", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
