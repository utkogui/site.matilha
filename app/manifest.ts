import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Matilha Estúdio",
    short_name: "Matilha",
    description: "Estúdio de design e produto digital.",
    start_url: "/",
    display: "browser",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/images/brand/icon-192.webp",
        sizes: "192x192",
        type: "image/webp",
      },
      {
        src: "/images/brand/favicon-32.webp",
        sizes: "32x32",
        type: "image/webp",
      },
    ],
  };
}
