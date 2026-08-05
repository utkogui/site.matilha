"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export type LeadType = "contact" | "careers";

export function trackLead(type: LeadType) {
  if (typeof window === "undefined") return;

  window.fbq?.("track", "Lead", { content_name: type });

  window.gtag?.("event", "generate_lead", {
    event_category: "engagement",
    event_label: type,
  });
}
