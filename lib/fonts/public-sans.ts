import { Public_Sans } from "next/font/google";

export const publicSans = Public_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-neodent-display",
  display: "swap",
});
