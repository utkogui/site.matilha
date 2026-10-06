import { Kanit, Work_Sans } from "next/font/google";

export const beautyDisplay = Kanit({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-beauty-display",
  display: "swap",
});

export const beautyText = Work_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-beauty-text",
  display: "swap",
});
