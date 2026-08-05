"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ServiceItem } from "@/lib/content/home";
import { useBlockSliderReveal } from "@/hooks/useBlockSliderReveal";

interface ServiceGridProps {
  services: ServiceItem[];
}

export function ServiceGrid({ services }: ServiceGridProps) {
  const t = useTranslations("services");
  const containerRef = useRef<HTMLDivElement>(null);

  useBlockSliderReveal(containerRef);

  return (
    <div ref={containerRef} className="services-grid">
      {services.map((service, index) => (
        <article key={service.key} className="service-block service-grid-item">
          <div className="block-slide-part service-block-thumb">
            <Image
              src={service.image}
              alt={service.alt}
              fill
              className="object-cover"
              sizes="(max-width:767px) 100vw, (max-width:1023px) 50vw, 33vw"
            />
          </div>
          <div className="service-block-content service-grid-item-content">
            <div className="block-slide-part service-block-index-wrapper">
              <span className="service-block-index">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="block-slide-part service-block-content-inner">
              <h3 className="service-block-title font-display">{t(service.key)}</h3>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
