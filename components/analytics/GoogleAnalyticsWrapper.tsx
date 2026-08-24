"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useConsent } from "@/components/consent/ConsentProvider";
import { hasGoogleAnalytics, gaMeasurementId } from "@/lib/analytics/config";

export function GoogleAnalyticsWrapper() {
  const { hydrated, allowsAnalytics } = useConsent();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!hydrated || !allowsAnalytics) {
      setReady(false);
      return;
    }

    const enable = () => setReady(true);
    const ric = window.requestIdleCallback?.bind(window);
    const cic = window.cancelIdleCallback?.bind(window);

    if (ric) {
      const id = ric(enable, { timeout: 4500 });
      return () => cic?.(id);
    }

    const timeoutId = window.setTimeout(enable, 2800);
    return () => window.clearTimeout(timeoutId);
  }, [hydrated, allowsAnalytics]);

  if (!hasGoogleAnalytics() || !ready) return null;
  return <GoogleAnalytics gaId={gaMeasurementId} />;
}
