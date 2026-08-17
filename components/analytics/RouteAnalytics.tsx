"use client";

import { useEffect } from "react";
import { usePathname } from "@/lib/i18n/navigation";
import { useConsent } from "@/components/consent/ConsentProvider";
import { hasMetaPixel, hasGoogleAnalytics } from "@/lib/analytics/config";

export function RouteAnalytics() {
  const pathname = usePathname();
  const { allowsAnalytics, allowsMarketing } = useConsent();

  useEffect(() => {
    if (allowsMarketing && hasMetaPixel() && window.fbq) {
      window.fbq("track", "PageView");
    }

    if (allowsAnalytics && hasGoogleAnalytics() && window.gtag) {
      window.gtag("event", "page_view", {
        page_path: pathname,
      });
    }
  }, [pathname, allowsAnalytics, allowsMarketing]);

  return null;
}
