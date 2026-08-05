"use client";

import { OfficeFadeFrame } from "@/components/media/OfficeFadeFrame";
import { officeMosaicSlots } from "@/lib/media/office-photos";

export function OfficePhotoMosaic() {
  return (
    <section className="office-mosaic" aria-label="Escritório Matilha">
      <div className="office-mosaic-grid">
        {officeMosaicSlots.map((photos, slotIndex) => (
          <div key={slotIndex} className="office-mosaic-slot">
            <OfficeFadeFrame
              photos={photos}
              intervalMs={4800}
              delayMs={slotIndex * 1400}
              sizes="(max-width: 767px) 100vw, 33vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
