"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "@/lib/i18n/navigation";
import { useTranslations } from "next-intl";

interface CaseSlide {
  slug: string;
  title: string;
  cover: string;
  coverAlt: string;
}

interface CaseCarouselProps {
  cases: CaseSlide[];
}

export function CaseCarousel({ cases }: CaseCarouselProps) {
  const t = useTranslations("cases");

  return (
    <Swiper
      modules={[Pagination, Navigation]}
      spaceBetween={24}
      slidesPerView={1.1}
      pagination={{ clickable: true }}
      navigation
      breakpoints={{
        768: { slidesPerView: 2.2 },
        1024: { slidesPerView: 3.2 },
      }}
      className="!overflow-visible pb-12"
    >
      {cases.map((item) => (
        <SwiperSlide key={item.slug}>
          <Link
            href={{ pathname: "/cases/[slug]", params: { slug: item.slug } }}
            className="group block overflow-hidden bg-white/5"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={item.cover}
                alt={item.coverAlt}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width:768px) 90vw, 33vw"
              />
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl">{item.title}</h3>
              <span className="mt-2 inline-block text-sm text-primary">{t("viewCase")} →</span>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
