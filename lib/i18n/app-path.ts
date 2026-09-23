import { defaultLocale, routing, type Locale } from "@/lib/i18n/routing";

export function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname || "/";
}

export function stripLocalePrefix(pathname: string): { locale: Locale; rest: string } {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return { locale: "en", rest: pathname.slice(3) || "/" };
  }
  if (pathname === "/es" || pathname.startsWith("/es/")) {
    return { locale: "es", rest: pathname.slice(3) || "/" };
  }
  if (pathname === "/pt" || pathname.startsWith("/pt/")) {
    return { locale: "pt-PT", rest: pathname.slice(3) || "/" };
  }
  return { locale: defaultLocale, rest: pathname || "/" };
}

function matchPattern(pattern: string, path: string): Record<string, string> | null {
  const patternParts = pattern.split("/").filter(Boolean);
  const pathParts = path.split("/").filter(Boolean);
  if (patternParts.length !== pathParts.length) return null;

  const params: Record<string, string> = {};
  for (let index = 0; index < patternParts.length; index += 1) {
    const part = patternParts[index];
    if (part.startsWith("[") && part.endsWith("]")) {
      params[part.slice(1, -1)] = pathParts[index];
      continue;
    }
    if (part !== pathParts[index]) return null;
  }
  return params;
}

export function toLogicalPath(pathname: string, locale: Locale): string | null {
  const normalized = normalizePath(pathname);

  for (const [logical, localized] of Object.entries(routing.pathnames)) {
    const candidate = typeof localized === "string" ? localized : localized[locale];
    if (!candidate) continue;

    if (!candidate.includes("[")) {
      if (normalizePath(candidate) === normalized) return logical;
      continue;
    }

    const params = matchPattern(candidate, normalized);
    if (!params) continue;

    let resolved = logical;
    for (const [key, value] of Object.entries(params)) {
      resolved = resolved.replace(`[${key}]`, value);
    }
    return resolved;
  }

  return normalized;
}

/** Caminho interno do App Router, ex. /en/our-work → /en/cases */
export function toInternalPath(pathname: string): string | null {
  const { locale, rest } = stripLocalePrefix(pathname);
  const logical = toLogicalPath(rest, locale);
  if (!logical) return null;
  return `/${locale}${logical === "/" ? "" : logical}`;
}
