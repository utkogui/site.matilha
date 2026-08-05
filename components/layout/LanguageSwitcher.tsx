"use client";

import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import {
  buildLocaleSwitchTarget,
  resolveLocaleForUiLanguage,
  setLocaleCookie,
} from "@/lib/i18n/locale-switch";
import type { Locale } from "@/lib/i18n/routing";
import {
  getUiLanguageKey,
  headerLocaleLabel,
  uiLanguages,
  type UiLanguageKey,
} from "@/lib/i18n/ui-languages";

type StaticPathname = "/" | "/cases" | "/contact" | "/careers" | "/privacy";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const activeKey = getUiLanguageKey(locale);

  function switchUiLanguage(nextKey: UiLanguageKey) {
    const nextLocale = resolveLocaleForUiLanguage(nextKey, locale);
    if (nextLocale === locale) return;

    setLocaleCookie(nextLocale);
    const target = buildLocaleSwitchTarget({
      currentLocale: locale,
      nextLocale,
      pathname,
      slug: typeof params.slug === "string" ? params.slug : undefined,
    });

    if (target.pathname === "/cases/[slug]" && "params" in target && target.params) {
      router.replace(
        { pathname: "/cases/[slug]", params: target.params },
        { locale: target.locale },
      );
      return;
    }

    router.replace(target.pathname as StaticPathname, { locale: target.locale });
  }

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Language">
      {uiLanguages.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => switchUiLanguage(item.key)}
          className={`px-2 py-1 text-sm font-semibold transition ${
            item.key === activeKey ? "text-primary" : "text-white/60 hover:text-white"
          }`}
          aria-current={item.key === activeKey ? "true" : undefined}
        >
          {headerLocaleLabel(item.key)}
        </button>
      ))}
    </div>
  );
}
