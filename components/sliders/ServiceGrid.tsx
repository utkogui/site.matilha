"use client";

import { useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { ServiceItem } from "@/lib/content/home";
import { getServiceBlurb } from "@/lib/content/service-blurbs";
import { useBlockSliderReveal } from "@/hooks/useBlockSliderReveal";
import type { Locale } from "@/lib/i18n/routing";

interface ServiceGridProps {
  services: ServiceItem[];
}

function canHoverFlip() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function ServiceGrid({ services }: ServiceGridProps) {
  const t = useTranslations("services");
  const locale = useLocale() as Locale;
  const containerRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState<string | null>(null);

  useBlockSliderReveal(containerRef);

  function toggleFlip(key: string) {
    setFlipped((current) => (current === key ? null : key));
  }

  function onCardClick(event: MouseEvent<HTMLElement>, key: string) {
    if (canHoverFlip()) return;
    event.preventDefault();
    toggleFlip(key);
  }

  function onCardKeyDown(event: KeyboardEvent<HTMLElement>, key: string) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    toggleFlip(key);
  }

  return (
    <div ref={containerRef} className="services-grid">
      {services.map((service, index) => {
        const isFlipped = flipped === service.key;
        const blurb = getServiceBlurb(locale, service.key);

        return (
          <article
            key={service.key}
            className={`service-block service-grid-item${isFlipped ? " is-flipped" : ""}`}
          >
            <div
              className="block-slide-part service-flip"
              role="button"
              tabIndex={0}
              aria-pressed={isFlipped}
              aria-label={`${t(service.key)}. ${blurb}`}
              onClick={(event) => onCardClick(event, service.key)}
              onKeyDown={(event) => onCardKeyDown(event, service.key)}
            >
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
                <h3 className="service-block-title font-display">{t(service.key)}</h3>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
