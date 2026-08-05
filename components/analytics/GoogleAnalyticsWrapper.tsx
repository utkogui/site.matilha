"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { hasGoogleAnalytics, gaMeasurementId } from "@/lib/analytics/config";

export function GoogleAnalyticsWrapper() {
  if (!hasGoogleAnalytics()) return null;
  return <GoogleAnalytics gaId={gaMeasurementId} />;
}
