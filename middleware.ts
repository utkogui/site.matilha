import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing, type Locale } from "./lib/i18n/routing";
import { PT_VARIANT_COOKIE } from "./lib/i18n/locale-switch";

const intlMiddleware = createMiddleware(routing);

const BOT_PATTERN =
  /bot|crawl|spider|slurp|facebookexternalhit|bingpreview|linkedinbot|twitterbot|whatsapp|googlebot|skypeuripreview|microsoftpreview|slackbot|discordbot/i;

const PT_PT_COUNTRIES = new Set(["PT", "AO", "MZ", "CV", "GW", "ST", "TL"]);

type PortugueseVariant = "pt-BR" | "pt-PT";

function detectPortugueseVariant(request: NextRequest): PortugueseVariant {
  const acceptLanguage = request.headers.get("accept-language") ?? "";

  if (/pt-pt/i.test(acceptLanguage)) return "pt-PT";
  if (/pt-br/i.test(acceptLanguage)) return "pt-BR";

  const country = request.headers.get("cf-ipcountry");
  if (country === "BR") return "pt-BR";
  if (country && PT_PT_COUNTRIES.has(country)) return "pt-PT";

  return "pt-BR";
}

function isPortugueseBrazilPath(pathname: string): boolean {
  if (pathname === "/en" || pathname.startsWith("/en/")) return false;
  if (pathname === "/es" || pathname.startsWith("/es/")) return false;
  if (pathname === "/pt" || pathname.startsWith("/pt/")) return false;
  return true;
}

function isPortuguesePortugalPath(pathname: string): boolean {
  return pathname === "/pt" || pathname.startsWith("/pt/");
}

function stripPtPrefix(pathname: string): string {
  if (pathname === "/pt") return "/";
  if (pathname.startsWith("/pt/")) return pathname.slice(3) || "/";
  return pathname;
}

function addPtPrefix(pathname: string): string {
  if (pathname === "/") return "/pt";
  return `/pt${pathname}`;
}

function withVariantCookies(response: NextResponse, variant: PortugueseVariant) {
  response.cookies.set("NEXT_LOCALE", variant, {
    path: "/",
    maxAge: 31536000,
    sameSite: "lax",
  });
  response.cookies.set(PT_VARIANT_COOKIE, variant, {
    path: "/",
    maxAge: 31536000,
    sameSite: "lax",
  });
  return response;
}

function redirectWithVariant(request: NextRequest, pathname: string, variant: PortugueseVariant) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return withVariantCookies(NextResponse.redirect(url), variant);
}

function isKnownLocale(value: string | undefined): value is Locale {
  return Boolean(value && routing.locales.includes(value as Locale));
}

export default function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? "";
  const isBot = BOT_PATTERN.test(userAgent);
  const pathname = request.nextUrl.pathname;

  if (!isBot) {
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

    if (!isKnownLocale(cookieLocale)) {
      const variant = detectPortugueseVariant(request);

      if (isPortuguesePortugalPath(pathname) && variant === "pt-BR") {
        return redirectWithVariant(request, stripPtPrefix(pathname), "pt-BR");
      }

      if (isPortugueseBrazilPath(pathname) && variant === "pt-PT") {
        return redirectWithVariant(request, addPtPrefix(pathname), "pt-PT");
      }
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
