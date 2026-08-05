import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/lib/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { RouteAnalytics } from "@/components/analytics/RouteAnalytics";
import { GoogleAnalyticsWrapper } from "@/components/analytics/GoogleAnalyticsWrapper";
import { MouseTrail } from "@/components/animation/MouseTrail";
import { BackToTop } from "@/components/layout/BackToTop";
import { HashScrollHandler } from "@/components/layout/HashScrollHandler";
import { moderat } from "@/lib/fonts/moderat";
import { manrope } from "@/lib/fonts/manrope";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://matilha.digital"),
  icons: {
    icon: [
      { url: "/images/brand/favicon-32.webp", sizes: "32x32", type: "image/webp" },
      { url: "/images/brand/icon-192.webp", sizes: "192x192", type: "image/webp" },
    ],
    apple: "/images/brand/apple-touch-icon.webp",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale === "pt-BR" ? "pt-BR" : locale === "pt-PT" ? "pt-PT" : locale === "es" ? "es" : "en"}
      className={`${moderat.variable} ${manrope.variable}`}
    >
      <body className={`${moderat.className} min-h-screen antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <BackToTop />
          <MouseTrail />
          <MetaPixel />
          <GoogleAnalyticsWrapper />
          <RouteAnalytics />
          <HashScrollHandler />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
