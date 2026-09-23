"use client";

import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { usePathname } from "@/lib/i18n/navigation";
import {
  buildLocaleSwitchTarget,
  getLocaleSwitchHref,
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

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();
  const activeKey = getUiLanguageKey(locale);
  const slug = typeof params.slug === "string" ? params.slug : undefined;

  function targetFor(nextKey: UiLanguageKey) {
    const nextLocale = resolveLocaleForUiLanguage(nextKey, locale);
    return buildLocaleSwitchTarget({
      currentLocale: locale,
      nextLocale,
      pathname,
      slug,
    });
  }

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Language">
      {uiLanguages.map((item) => {
        if (item.key === activeKey) {
          return (
            <span key={item.key} className="px-2 py-1 text-sm font-semibold text-primary" aria-current="true">
              {headerLocaleLabel(item.key)}
            </span>
          );
        }

        const target = targetFor(item.key);

        return (
          <a
            key={item.key}
            href={getLocaleSwitchHref(target)}
            className="px-2 py-1 text-sm font-semibold text-white/60 transition hover:text-white"
            onClick={() => setLocaleCookie(target.locale)}
          >
            {headerLocaleLabel(item.key)}
          </a>
        );
      })}
    </div>
  );
}
