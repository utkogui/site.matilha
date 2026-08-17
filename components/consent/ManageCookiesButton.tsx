"use client";

import { useLocale } from "next-intl";
import { useConsent } from "@/components/consent/ConsentProvider";
import { getCookieCopy } from "@/lib/content/lgpd-copy";
import type { Locale } from "@/lib/i18n/routing";

export function ManageCookiesButton({ className = "" }: { className?: string }) {
  const locale = useLocale() as Locale;
  const copy = getCookieCopy(locale);
  const { openPreferences } = useConsent();

  return (
    <button type="button" className={className} onClick={openPreferences}>
      {copy.manageCookies}
    </button>
  );
}
