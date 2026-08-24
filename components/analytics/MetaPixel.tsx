"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useConsent } from "@/components/consent/ConsentProvider";
import { hasMetaPixel, metaPixelId } from "@/lib/analytics/config";

export function MetaPixel() {
  const { hydrated, allowsMarketing } = useConsent();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!hydrated || !allowsMarketing) {
      setReady(false);
      return;
    }

    const enable = () => setReady(true);
    const ric = window.requestIdleCallback?.bind(window);
    const cic = window.cancelIdleCallback?.bind(window);

    if (ric) {
      const id = ric(enable, { timeout: 4000 });
      return () => cic?.(id);
    }

    const timeoutId = window.setTimeout(enable, 2500);
    return () => window.clearTimeout(timeoutId);
  }, [hydrated, allowsMarketing]);

  if (!hasMetaPixel() || !ready) return null;

  return (
    <Script id="meta-pixel" strategy="lazyOnload">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${metaPixelId}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}
