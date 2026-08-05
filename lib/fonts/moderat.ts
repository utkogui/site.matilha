import localFont from "next/font/local";

export const moderat = localFont({
  src: [
    {
      path: "../../public/fonts/moderat-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/moderat-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-moderat",
  display: "swap",
});
