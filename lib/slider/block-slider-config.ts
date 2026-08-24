export const blockSliderBreakpoints = {
  0: { slidesPerView: 1.12, spaceBetween: 16 },
  640: { slidesPerView: 1.45, spaceBetween: 22 },
  992: { slidesPerView: 2.25, spaceBetween: 28 },
  1280: { slidesPerView: 2.45, spaceBetween: 30 },
} as const;

export const servicesSliderConfig = {
  speed: 900,
  spaceBetween: 28,
  slidesPerView: 1.08,
  autoplayDelay: 4800,
  slidesOffsetAfter: 32,
} as const;
