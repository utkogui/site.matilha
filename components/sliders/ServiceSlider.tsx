"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import { useTranslations } from "next-intl";
import type { ServiceItem } from "@/lib/content/home";
import {
  blockSliderBreakpoints,
  servicesSliderConfig,
} from "@/lib/slider/block-slider-config";
import { useBlockSliderReveal } from "@/hooks/useBlockSliderReveal";
import { BlockSliderShell } from "@/components/sliders/BlockSliderShell";

interface ServiceSliderProps {
  services: ServiceItem[];
}

export function ServiceSlider({ services }: ServiceSliderProps) {
  const t = useTranslations("home");
  const tServices = useTranslations("services");
  const containerRef = useRef<HTMLDivElement>(null);

  useBlockSliderReveal(containerRef);

  return (
    <div ref={containerRef} className="service-slider-wrap">
      <BlockSliderShell prevLabel={t("sliderPrev")} nextLabel={t("sliderNext")}>
        {({ prevRef, nextRef, onSwiper, onProgress, onBeforeInit }) => (
          <Swiper
            modules={[Autoplay, Navigation]}
            speed={servicesSliderConfig.speed}
            spaceBetween={servicesSliderConfig.spaceBetween}
            slidesPerView={servicesSliderConfig.slidesPerView}
            slidesOffsetAfter={servicesSliderConfig.slidesOffsetAfter}
            grabCursor
            watchOverflow
            autoplay={{
              delay: servicesSliderConfig.autoplayDelay,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={onBeforeInit}
            onSwiper={onSwiper}
            onProgress={onProgress}
            onSlideChange={(swiper) => onProgress(swiper, swiper.progress)}
            breakpoints={blockSliderBreakpoints}
            className="service-slider"
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
                      sizes="(max-width:768px) 85vw, (max-width:1280px) 45vw, 33vw"
                    />
                  </div>
                  <div className="service-block-content">
                    <div className="block-slide-part service-block-index-wrapper">
                      <span className="service-block-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="block-slide-part service-block-content-inner">
                      <h3 className="service-block-title font-display">
                        {tServices(service.key)}
                      </h3>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </BlockSliderShell>
    </div>
  );
}
