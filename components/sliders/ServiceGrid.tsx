"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { ServiceItem } from "@/lib/content/home";
import { getServiceBlurb } from "@/lib/content/service-blurbs";
import { getServicePageByKey } from "@/lib/content/services";
import { useBlockSliderReveal } from "@/hooks/useBlockSliderReveal";
import { Link } from "@/lib/i18n/navigation";
import type { Locale } from "@/lib/i18n/routing";

interface ServiceGridProps {
  services: ServiceItem[];
}

export function ServiceGrid({ services }: ServiceGridProps) {
  const t = useTranslations("services");
  const locale = useLocale() as Locale;
  const containerRef = useRef<HTMLDivElement>(null);

  useBlockSliderReveal(containerRef);

  return (
    <div ref={containerRef} className="services-grid">
      {services.map((service, index) => {
        const blurb = getServiceBlurb(locale, service.key);
        const page = getServicePageByKey(service.key);
        if (!page) return null;

        return (
          <article key={service.key} className="service-block service-grid-item" data-service={service.key}>
            <Link
              href={{ pathname: "/services/[slug]", params: { slug: page.slugs[locale] } }}
              className="service-grid-link"
              aria-label={`${t(service.key)}. ${blurb}`}
            >
              <div className="block-slide-part service-flip">
                <div className="service-flip-inner">
                  <div className="service-flip-face service-flip-front">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width:767px) 100vw, (max-width:1023px) 50vw, 33vw"
                    />
                  </div>
                  <div className="service-flip-face service-flip-back" aria-hidden>
                    <p className="service-flip-blurb">{blurb}</p>
                  </div>
                </div>
              </div>

              <div className="service-block-content service-grid-item-content">
                <div className="block-slide-part service-block-index-wrapper">
                  <span className="service-block-index">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="block-slide-part service-block-content-inner">
                  <h3 className="service-block-title font-display">
                    {t(service.key)}
                    <span className="service-grid-arrow" aria-hidden>
                      →
                    </span>
                  </h3>
                </div>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
