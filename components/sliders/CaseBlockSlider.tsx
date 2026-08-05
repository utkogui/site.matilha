"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "@/lib/i18n/navigation";
import { blockSliderBreakpoints, casesSliderConfig } from "@/lib/slider/block-slider-config";
import { useBlockSliderReveal } from "@/hooks/useBlockSliderReveal";

export interface CaseBlockItem {
  slug: string;
  title: string;
  cover: string;
  coverAlt: string;
  services: string;
}

interface CaseBlockSliderProps {
  cases: CaseBlockItem[];
}

export function CaseBlockSlider({ cases }: CaseBlockSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useBlockSliderReveal(containerRef);

  return (
    <div ref={containerRef} className="case-block-slider-wrap">
      <Swiper
        modules={[Autoplay]}
        speed={casesSliderConfig.speed}
        spaceBetween={casesSliderConfig.spaceBetween}
        slidesPerView={casesSliderConfig.slidesPerView}
        autoplay={{
          delay: casesSliderConfig.autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={blockSliderBreakpoints}
        className="case-block-slider !overflow-visible"
      >
        {cases.map((item) => (
          <SwiperSlide key={item.slug}>
            <Link href={{ pathname: "/cases/[slug]", params: { slug: item.slug } }} className="case-block group">
              <div className="block-slide-part case-block-thumb">
                <Image
                  src={item.cover}
                  alt={item.coverAlt}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width:768px) 85vw, 33vw"
                />
              </div>
              <div className="case-block-content">
                <div className="block-slide-part case-block-content-inner">
                  <h3 className="case-block-title font-display">{item.title}</h3>
                  <p className="case-block-services">{item.services}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
