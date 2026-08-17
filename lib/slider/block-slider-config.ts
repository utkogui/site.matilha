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

export const casesSliderConfig = {
  speed: 900,
  spaceBetween: 28,
  slidesPerView: 1.08,
  autoplayDelay: 3600,
  slidesOffsetAfter: 32,
} as const;

export const clientsSliderBreakpoints = {
  0: { slidesPerView: 2.15, spaceBetween: 12 },
  640: { slidesPerView: 3.25, spaceBetween: 16 },
  992: { slidesPerView: 4.4, spaceBetween: 18 },
  1280: { slidesPerView: 5.2, spaceBetween: 20 },
} as const;

export const clientsSliderConfig = {
  speed: 850,
  spaceBetween: 16,
  slidesPerView: 2.15,
  autoplayDelay: 2600,
  slidesOffsetAfter: 24,
} as const;
