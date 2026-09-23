"use client";

import type { ReactNode } from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
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

type LocaleLinksVariant = "footer" | "menu";

type LocaleLinksProps = {
  variant?: LocaleLinksVariant;
  hideLabel?: boolean;
  inline?: boolean;
  onNavigate?: () => void;
  className?: string;
};

function localeHrefLang(locale: Locale) {
  if (locale === "pt-BR" || locale === "pt-PT") return "pt";
  return locale;
}

function useLocaleTargets() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : undefined;
  const activeKey = getUiLanguageKey(locale);

  function targetFor(nextKey: UiLanguageKey) {
    const nextLocale = resolveLocaleForUiLanguage(nextKey, locale);
    return buildLocaleSwitchTarget({
      currentLocale: locale,
      nextLocale,
      pathname,
      slug,
    });
  }

  return { locale, activeKey, targetFor };
}

function LocaleSwitchLink({
  targetUiKey,
  className,
  onNavigate,
  children,
  "aria-label": ariaLabel,
}: {
  targetUiKey: UiLanguageKey;
  className: string;
  onNavigate?: () => void;
  children: ReactNode;
  "aria-label"?: string;
}) {
  const { targetFor } = useLocaleTargets();
  const target = targetFor(targetUiKey);

  return (
    <a
      href={getLocaleSwitchHref(target)}
      hrefLang={localeHrefLang(target.locale)}
      aria-label={ariaLabel}
      className={className}
      onClick={() => {
        setLocaleCookie(target.locale);
        onNavigate?.();
      }}
    >
      {children}
    </a>
  );
}

export function HeaderLocaleLinks({ className = "" }: { className?: string }) {
  const { activeKey } = useLocaleTargets();
  const tFooter = useTranslations("footer");

  return (
    <nav
      aria-label={tFooter("languagesLabel")}
      className={`header-locale-switch ${className}`.trim()}
    >
      {uiLanguages.map((item) => {
        const isActive = item.key === activeKey;

        if (isActive) {
          return (
            <span
              key={item.key}
              className="header-locale-option is-active"
              aria-label={item.label}
              aria-current="true"
            >
              <span className="header-locale-option-label">{headerLocaleLabel(item.key)}</span>
            </span>
          );
        }

        return (
          <LocaleSwitchLink
            key={item.key}
            targetUiKey={item.key}
            className="header-locale-option"
            aria-label={item.label}
          >
            <span className="header-locale-option-label">{headerLocaleLabel(item.key)}</span>
          </LocaleSwitchLink>
        );
      })}
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
  const { activeKey } = useLocaleTargets();
  const tFooter = useTranslations("footer");

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
      <ul className={listClass} role="list">
        {uiLanguages.map((item) => (
          <li key={item.key}>
            {item.key === activeKey ? (
              <span className={activeClass} aria-current="true">
                {item.label}
              </span>
            ) : (
              <LocaleSwitchLink targetUiKey={item.key} className={linkClass} onNavigate={onNavigate}>
                {item.label}
              </LocaleSwitchLink>
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
  const { activeKey } = useLocaleTargets();

  if (targetUiKey === activeKey) {
    return (
      <span className={`${className} text-primary`} aria-current="true">
        {children}
      </span>
    );
  }

  return (
    <LocaleSwitchLink targetUiKey={targetUiKey} className={className} onNavigate={onNavigate}>
      {children}
    </LocaleSwitchLink>
  );
}
