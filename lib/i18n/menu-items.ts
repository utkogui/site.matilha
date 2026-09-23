import type { Locale } from "@/lib/i18n/routing";
import { servicesAnchor } from "@/lib/i18n/locale-switch";

export type MenuItemKey = "home" | "services" | "training" | "cases" | "contact";

export function getMenuItems(locale: Locale) {
  return [
    { href: "/" as const, key: "home" as const },
    { href: servicesAnchor[locale], key: "services" as const },
    { href: "/training" as const, key: "training" as const },
    { href: "/cases" as const, key: "cases" as const },
    { href: "/contact" as const, key: "contact" as const },
  ] as const;
}
