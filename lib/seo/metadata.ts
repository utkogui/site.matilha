import type { Metadata } from "next";
import { getPathname } from "@/lib/i18n/navigation";
import type { Locale } from "@/lib/i18n/routing";
import { defaultLocale } from "@/lib/i18n/routing";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://matilha.digital";

const TITLE_SEP = " ∴ ";

export const DEFAULT_OG_IMAGE = "/images/og/matilha-estudio-15anos.jpg";

export function brandName(_locale: Locale): string {
  return "Matilha Estúdio";
}

function anniversaryYears(locale: Locale): string {
  if (locale === "en") return "15 years";
  if (locale === "es") return "15 años";
  return "15 anos";
}

export function buildHomeTitle(locale: Locale): string {
  return `Matilha${TITLE_SEP}${anniversaryYears(locale)}`;
}

export function buildPageTitle(pageName: string, locale: Locale): string {
  return `${pageName}${TITLE_SEP}Matilha${TITLE_SEP}${anniversaryYears(locale)}`;
}

export function getSiteUrl() {
  return siteUrl.replace(/\/$/, "");
}

export function resolveOgImageUrl(image: string): string {
  return image.startsWith("http") ? image : `${getSiteUrl()}${image}`;
}

function ogLocale(locale: Locale): string {
  if (locale === "pt-BR") return "pt_BR";
  if (locale === "pt-PT") return "pt_PT";
  if (locale === "es") return "es_ES";
  return "en_US";
}

function ogAlternateLocales(locale: Locale): string[] {
  const all = ["pt_BR", "pt_PT", "en_US", "es_ES"] as const;
  const current = ogLocale(locale);
  return all.filter((value) => value !== current);
}

function ogImageType(image: string): string {
  if (image.endsWith(".png")) return "image/png";
  if (image.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}

export function buildOpenGraphFields({
  title,
  description,
  url,
  locale,
  image = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  url: string;
  locale: Locale;
  image?: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const imageUrl = resolveOgImageUrl(image);

  return {
    openGraph: {
      title,
      description,
      url,
      siteName: brandName(locale),
      locale: ogLocale(locale),
      alternateLocale: ogAlternateLocales(locale),
      type: "website",
      images: [
        {
          url: imageUrl,
          secureUrl: imageUrl,
          type: ogImageType(image),
          alt: title,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

type PageKey = "/" | "/cases" | "/contact" | "/careers" | "/privacy";

export function buildAlternates(pathname: PageKey, locale: Locale) {
  const languages: Record<string, string> = {
    "pt-BR": `${getSiteUrl()}${getPathname({ locale: "pt-BR", href: pathname })}`,
    "pt-PT": `${getSiteUrl()}${getPathname({ locale: "pt-PT", href: pathname })}`,
    en: `${getSiteUrl()}${getPathname({ locale: "en", href: pathname })}`,
    es: `${getSiteUrl()}${getPathname({ locale: "es", href: pathname })}`,
    "x-default": `${getSiteUrl()}${getPathname({ locale: defaultLocale, href: pathname })}`,
  };

  return {
    canonical: `${getSiteUrl()}${getPathname({ locale, href: pathname })}`,
    languages,
  };
}

export function buildCaseAlternates(
  slug: string,
  locale: Locale,
  slugs: Record<Locale, string>,
) {
  const languages: Record<string, string> = {
    "pt-BR": `${getSiteUrl()}${getPathname({ locale: "pt-BR", href: { pathname: "/cases/[slug]", params: { slug: slugs["pt-BR"] } } })}`,
    "pt-PT": `${getSiteUrl()}${getPathname({ locale: "pt-PT", href: { pathname: "/cases/[slug]", params: { slug: slugs["pt-PT"] } } })}`,
    en: `${getSiteUrl()}${getPathname({ locale: "en", href: { pathname: "/cases/[slug]", params: { slug: slugs.en } } })}`,
    es: `${getSiteUrl()}${getPathname({ locale: "es", href: { pathname: "/cases/[slug]", params: { slug: slugs.es } } })}`,
    "x-default": `${getSiteUrl()}${getPathname({ locale: defaultLocale, href: { pathname: "/cases/[slug]", params: { slug: slugs["pt-BR"] } } })}`,
  };

  return {
    canonical: `${getSiteUrl()}${getPathname({ locale, href: { pathname: "/cases/[slug]", params: { slug } } })}`,
    languages,
  };
}

export function baseMetadata({
  title,
  description,
  pathname,
  locale,
  image = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  pathname: PageKey;
  locale: Locale;
  image?: string;
}): Metadata {
  const url = `${getSiteUrl()}${getPathname({ locale, href: pathname })}`;

  return {
    title,
    description,
    authors: [{ name: "Mila Zanforlin" }],
    creator: "Mila Zanforlin",
    alternates: buildAlternates(pathname, locale),
    ...buildOpenGraphFields({ title, description, url, locale, image }),
  };
}

export function buildCaseMetadata({
  title,
  description,
  locale,
  slug,
  slugs,
  image = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  locale: Locale;
  slug: string;
  slugs: Record<Locale, string>;
  image?: string;
}): Metadata {
  const url = `${getSiteUrl()}${getPathname({
    locale,
    href: { pathname: "/cases/[slug]", params: { slug } },
  })}`;

  return {
    title,
    description,
    authors: [{ name: "Mila Zanforlin" }],
    creator: "Mila Zanforlin",
    alternates: buildCaseAlternates(slug, locale, slugs),
    ...buildOpenGraphFields({ title, description, url, locale, image }),
  };
}
