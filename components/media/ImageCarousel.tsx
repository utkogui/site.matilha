"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface GalleryImage {
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  images: GalleryImage[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  if (images.length === 0) return null;

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={16}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        768: { slidesPerView: 1.2 },
        1024: { slidesPerView: 1.5 },
      }}
      className="pb-12"
    >
      {images.map((img) => (
        <SwiperSlide key={img.src}>
          <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 70vw"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
