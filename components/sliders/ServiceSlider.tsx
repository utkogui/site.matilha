"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useTranslations } from "next-intl";
import type { ServiceItem } from "@/lib/content/home";
import {
  blockSliderBreakpoints,
  servicesSliderConfig,
} from "@/lib/slider/block-slider-config";
import { useBlockSliderReveal } from "@/hooks/useBlockSliderReveal";

interface ServiceSliderProps {
  services: ServiceItem[];
}

export function ServiceSlider({ services }: ServiceSliderProps) {
  const t = useTranslations("services");
  const containerRef = useRef<HTMLDivElement>(null);

  useBlockSliderReveal(containerRef);

  return (
    <div ref={containerRef} className="service-slider-wrap">
      <Swiper
        modules={[Autoplay]}
        speed={servicesSliderConfig.speed}
        spaceBetween={servicesSliderConfig.spaceBetween}
        slidesPerView={servicesSliderConfig.slidesPerView}
        autoplay={{
          delay: servicesSliderConfig.autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={blockSliderBreakpoints}
        className="service-slider !overflow-visible"
      >
        {services.map((service, index) => (
          <SwiperSlide key={service.key}>
            <article className="service-block">
              <div className="block-slide-part service-block-thumb">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 80vw, 33vw"
                />
              </div>
              <div className="service-block-content">
                <div className="block-slide-part service-block-index-wrapper">
                  <span className="service-block-index">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="block-slide-part service-block-content-inner">
                  <h3 className="service-block-title font-display">{t(service.key)}</h3>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
