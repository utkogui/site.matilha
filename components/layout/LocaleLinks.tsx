"use client";

import type { ReactNode } from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
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

type LocaleLinksVariant = "footer" | "menu";

type LocaleLinksProps = {
  variant?: LocaleLinksVariant;
  hideLabel?: boolean;
  inline?: boolean;
  onNavigate?: () => void;
  className?: string;
};

function useLocaleSwitch(onNavigate?: () => void) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const slug = typeof params.slug === "string" ? params.slug : undefined;

  function navigateToLocale(nextLocale: Locale) {
    setLocaleCookie(nextLocale);
    const target = buildLocaleSwitchTarget({
      currentLocale: locale,
      nextLocale,
      pathname,
      slug,
    });

    if (target.pathname === "/cases/[slug]" && "params" in target && target.params) {
      router.replace(
        { pathname: "/cases/[slug]", params: target.params },
        { locale: target.locale },
      );
    } else {
      router.replace(target.pathname as StaticPathname, { locale: target.locale });
    }

    onNavigate?.();
  }

  function switchUiLanguage(nextKey: UiLanguageKey) {
    const nextLocale = resolveLocaleForUiLanguage(nextKey, locale);
    if (nextLocale === locale) return;
    navigateToLocale(nextLocale);
  }

  return { locale, switchUiLanguage };
}

export function HeaderLocaleLinks({ className = "" }: { className?: string }) {
  const { locale, switchUiLanguage } = useLocaleSwitch();
  const tFooter = useTranslations("footer");
  const activeKey = getUiLanguageKey(locale);
  const alternates = uiLanguages.filter((item) => item.key !== activeKey);

  return (
    <nav
      aria-label={tFooter("languagesLabel")}
      className={`header-locale-links hidden items-center gap-6 lg:flex lg:gap-10 ${className}`}
    >
      {alternates.map((item) => (
        <button
          key={item.key}
          type="button"
          className="matilha-btn matilha-btn-underline matilha-btn-header"
          onClick={() => switchUiLanguage(item.key)}
        >
          {headerLocaleLabel(item.key)}
        </button>
      ))}
    </nav>
  );
}

export function LocaleLinks({
  variant = "footer",
  hideLabel = false,
  inline = false,
  onNavigate,
  className = "",
}: LocaleLinksProps) {
  const { locale, switchUiLanguage } = useLocaleSwitch(onNavigate);
  const tFooter = useTranslations("footer");
  const activeKey = getUiLanguageKey(locale);

  const linkClass =
    variant === "menu"
      ? "menu-locale-link"
      : inline
        ? "footer-locale-link"
        : "block w-full text-left text-white/70 hover:text-primary";

  const activeClass =
    variant === "menu"
      ? "menu-locale-link menu-locale-link-active"
      : inline
        ? "footer-locale-link footer-locale-link-active"
        : "text-primary";

  const listClass = variant === "menu" ? "menu-locale-list" : inline ? "footer-locale-list" : "space-y-2";

  return (
    <nav aria-label={tFooter("languagesLabel")} className={className}>
      {variant === "footer" && !hideLabel && (
        <h3 className="text-label mb-4">{tFooter("languagesLabel")}</h3>
      )}
      <ul className={listClass}>
        {uiLanguages.map((item) => (
          <li key={item.key}>
            {item.key === activeKey ? (
              <span className={activeClass} aria-current="true">
                {item.label}
              </span>
            ) : (
              <button type="button" className={linkClass} onClick={() => switchUiLanguage(item.key)}>
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function LocaleLinkButton({
  targetUiKey,
  onNavigate,
  className = "",
  children,
}: {
  targetUiKey: UiLanguageKey;
  onNavigate?: () => void;
  className?: string;
  children: ReactNode;
}) {
  const { locale, switchUiLanguage } = useLocaleSwitch(onNavigate);
  const activeKey = getUiLanguageKey(locale);

  if (targetUiKey === activeKey) {
    return (
      <span className={`${className} text-primary`} aria-current="true">
        {children}
      </span>
    );
  }

  return (
    <button type="button" className={className} onClick={() => switchUiLanguage(targetUiKey)}>
      {children}
    </button>
  );
}
