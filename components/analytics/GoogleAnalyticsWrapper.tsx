"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { hasGoogleAnalytics, gaMeasurementId } from "@/lib/analytics/config";

export function GoogleAnalyticsWrapper() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!hasGoogleAnalytics()) return;

    const enable = () => setReady(true);
    const ric = window.requestIdleCallback?.bind(window);
    const cic = window.cancelIdleCallback?.bind(window);

    if (ric) {
      const idleId = ric(enable, { timeout: 3500 });
      return () => cic?.(idleId);
    }

    const timeoutId = window.setTimeout(enable, 2500);
    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!hasGoogleAnalytics() || !ready) return null;
  return <GoogleAnalytics gaId={gaMeasurementId} />;
}
