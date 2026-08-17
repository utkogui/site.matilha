"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useConsent } from "@/components/consent/ConsentProvider";
import { hasGoogleAnalytics, gaMeasurementId } from "@/lib/analytics/config";

export function GoogleAnalyticsWrapper() {
  const { hydrated, allowsAnalytics } = useConsent();

  if (!hasGoogleAnalytics() || !hydrated || !allowsAnalytics) return null;
  return <GoogleAnalytics gaId={gaMeasurementId} />;
}
