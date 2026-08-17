"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import { useTranslations } from "next-intl";
import {
  clientsSliderBreakpoints,
  clientsSliderConfig,
} from "@/lib/slider/block-slider-config";
import { BlockSliderShell } from "@/components/sliders/BlockSliderShell";

export type ClientLogo = {
  src: string;
  alt: string;
};

type ClientsLogoSliderProps = {
  logos: ClientLogo[];
};

export function ClientsLogoSlider({ logos }: ClientsLogoSliderProps) {
  const t = useTranslations("home");

  if (logos.length === 0) return null;

  return (
    <div className="clients-slider-wrap">
      <BlockSliderShell prevLabel={t("sliderPrev")} nextLabel={t("sliderNext")}>
        {({ prevRef, nextRef, onSwiper, onProgress, onBeforeInit }) => (
          <Swiper
            modules={[Autoplay, Navigation]}
            speed={clientsSliderConfig.speed}
            spaceBetween={clientsSliderConfig.spaceBetween}
            slidesPerView={clientsSliderConfig.slidesPerView}
            slidesOffsetAfter={clientsSliderConfig.slidesOffsetAfter}
            grabCursor
            watchOverflow
            loop={logos.length > 6}
            autoplay={{
              delay: clientsSliderConfig.autoplayDelay,
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
            breakpoints={clientsSliderBreakpoints}
            className="clients-logo-slider"
          >
            {logos.map((logo) => (
              <SwiperSlide key={logo.src}>
                <div className="clients-grid-item clients-slide-item">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={200}
                    height={104}
                    className="clients-logo"
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </BlockSliderShell>
    </div>
  );
}
