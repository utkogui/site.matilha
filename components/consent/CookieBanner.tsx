"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { useConsent } from "@/components/consent/ConsentProvider";
import { getCookieCopy } from "@/lib/content/lgpd-copy";
import type { Locale } from "@/lib/i18n/routing";

export function CookieBanner() {
  const locale = useLocale() as Locale;
  const copy = getCookieCopy(locale);
  const {
    hydrated,
    consent,
    preferencesOpen,
    openPreferences,
    closePreferences,
    acceptAll,
    rejectNonEssential,
    savePreferences,
  } = useConsent();

  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!consent) {
      setAnalytics(false);
      setMarketing(false);
      return;
    }
    setAnalytics(consent.analytics);
    setMarketing(consent.marketing);
  }, [consent]);

  if (!hydrated) return null;

  const showBanner = consent === null && !preferencesOpen;
  const showPanel = preferencesOpen;

  if (!showBanner && !showPanel) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-modal="true" aria-labelledby="cookie-consent-title">
      <div className="cookie-consent-panel">
        <div className="cookie-consent-copy">
          <h2 id="cookie-consent-title" className="cookie-consent-title">
            {copy.title}
          </h2>
          <p className="cookie-consent-text">
            {copy.description}{" "}
            <Link href="/privacy" className="cookie-consent-link">
              {copy.policyLink}
            </Link>
          </p>
        </div>

        {showPanel ? (
          <div className="cookie-consent-options">
            <label className="cookie-consent-option is-locked">
              <span>
                <strong>{copy.necessaryTitle}</strong>
                <small>{copy.necessaryDescription}</small>
              </span>
              <span className="cookie-consent-badge">{copy.alwaysOn}</span>
            </label>

            <label className="cookie-consent-option">
              <span>
                <strong>{copy.analyticsTitle}</strong>
                <small>{copy.analyticsDescription}</small>
              </span>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
              />
            </label>

            <label className="cookie-consent-option">
              <span>
                <strong>{copy.marketingTitle}</strong>
                <small>{copy.marketingDescription}</small>
              </span>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(event) => setMarketing(event.target.checked)}
              />
            </label>

            <div className="cookie-consent-actions">
              <button type="button" className="cookie-consent-btn cookie-consent-btn-ghost" onClick={closePreferences}>
                {copy.close}
              </button>
              <button
                type="button"
                className="cookie-consent-btn cookie-consent-btn-solid"
                onClick={() => savePreferences({ analytics, marketing })}
              >
                {copy.save}
              </button>
            </div>
          </div>
        ) : (
          <div className="cookie-consent-actions">
            <button type="button" className="cookie-consent-btn cookie-consent-btn-ghost" onClick={openPreferences}>
              {copy.customize}
            </button>
            <button type="button" className="cookie-consent-btn cookie-consent-btn-ghost" onClick={rejectNonEssential}>
              {copy.rejectNonEssential}
            </button>
            <button type="button" className="cookie-consent-btn cookie-consent-btn-solid" onClick={acceptAll}>
              {copy.acceptAll}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
