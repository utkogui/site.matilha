"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export type LeadType = "contact" | "careers";

function hasMarketingConsent() {
  try {
    const raw = window.localStorage.getItem("matilha_cookie_consent");
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { marketing?: boolean };
    return Boolean(parsed.marketing);
  } catch {
    return false;
  }
}

function hasAnalyticsConsent() {
  try {
    const raw = window.localStorage.getItem("matilha_cookie_consent");
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { analytics?: boolean };
    return Boolean(parsed.analytics);
  } catch {
    return false;
  }
}

export function trackLead(type: LeadType) {
  if (typeof window === "undefined") return;

  if (hasMarketingConsent()) {
    window.fbq?.("track", "Lead", { content_name: type });
  }

  if (hasAnalyticsConsent()) {
    window.gtag?.("event", "generate_lead", {
      event_category: "engagement",
      event_label: type,
    });
  }
}
