"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { OfficePhoto } from "@/lib/media/office-photos";

type OfficeFadeFrameProps = {
  photos: OfficePhoto[];
  /** Crossfade hold time in ms (before starting next fade). */
  intervalMs?: number;
  /** Stagger offset so multiple frames don't sync. */
  delayMs?: number;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
};

export function OfficeFadeFrame({
  photos,
  intervalMs = 4500,
  delayMs = 0,
  className = "",
  imageClassName = "office-photo",
  sizes = "100vw",
  priority = false,
}: OfficeFadeFrameProps) {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduceMotion || photos.length <= 1) return;

    let intervalId: ReturnType<typeof setInterval> | undefined;
    const startId = window.setTimeout(() => {
      intervalId = setInterval(() => {
        setIndex((current) => (current + 1) % photos.length);
      }, intervalMs);
    }, delayMs);

    return () => {
      window.clearTimeout(startId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [delayMs, intervalMs, photos.length, reduceMotion]);

  if (photos.length === 0) return null;

  const activeIndex = reduceMotion ? 0 : index;

  return (
    <div className={`office-fade-frame ${className}`.trim()} aria-hidden>
      {photos.map((photo, i) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          fill
          priority={priority && i === 0}
          sizes={sizes}
          className={`${imageClassName} office-fade-frame-image${i === activeIndex ? " is-active" : ""}`}
        />
      ))}
    </div>
  );
}
