export const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
export const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

export function hasMetaPixel() {
  return Boolean(metaPixelId);
}

export function hasGoogleAnalytics() {
  return Boolean(gaMeasurementId);
}
