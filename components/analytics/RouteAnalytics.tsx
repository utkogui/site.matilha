"use client";

import { useEffect } from "react";
import { usePathname } from "@/lib/i18n/navigation";
import { hasMetaPixel, hasGoogleAnalytics } from "@/lib/analytics/config";

export function RouteAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (hasMetaPixel() && window.fbq) {
      window.fbq("track", "PageView");
    }

    if (hasGoogleAnalytics() && window.gtag) {
      window.gtag("event", "page_view", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
