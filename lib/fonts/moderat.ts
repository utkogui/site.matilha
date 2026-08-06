import localFont from "next/font/local";

export const moderat = localFont({
  src: [
    {
      path: "../../public/fonts/moderat-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/moderat-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-moderat",
  display: "swap",
  preload: true,
});
