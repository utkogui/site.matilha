"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import type { Swiper as SwiperType } from "swiper";

type ShellApi = {
  prevRef: RefObject<HTMLButtonElement | null>;
  nextRef: RefObject<HTMLButtonElement | null>;
  onSwiper: (swiper: SwiperType) => void;
  onProgress: (swiper: SwiperType, progress: number) => void;
  onBeforeInit: (swiper: SwiperType) => void;
};

type BlockSliderShellProps = {
  className?: string;
  prevLabel: string;
  nextLabel: string;
  children: (api: ShellApi) => ReactNode;
};

export function BlockSliderShell({
  className = "",
  prevLabel,
  nextLabel,
  children,
}: BlockSliderShellProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [edge, setEdge] = useState({ beginning: true, end: false });

  const syncEdges = useCallback((swiper: SwiperType) => {
    setEdge({ beginning: swiper.isBeginning, end: swiper.isEnd });
  }, []);

  const onProgress = useCallback((swiper: SwiperType, progress: number) => {
    if (progressRef.current) {
      const value = Math.min(1, Math.max(0, progress));
      progressRef.current.style.transform = `scaleX(${value || 0.08})`;
    }
    syncEdges(swiper);
  }, [syncEdges]);

  const onSwiper = useCallback(
    (swiper: SwiperType) => {
      swiperRef.current = swiper;

      const nav = swiper.params.navigation;
      if (nav && typeof nav !== "boolean") {
        nav.prevEl = prevRef.current;
        nav.nextEl = nextRef.current;
        swiper.navigation.destroy();
        swiper.navigation.init();
        swiper.navigation.update();
      }

      syncEdges(swiper);
      onProgress(swiper, swiper.progress);
    },
    [onProgress, syncEdges],
  );

  const onBeforeInit = useCallback((swiper: SwiperType) => {
    const nav = swiper.params.navigation;
    if (nav && typeof nav !== "boolean") {
      nav.prevEl = prevRef.current;
      nav.nextEl = nextRef.current;
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const viewport = viewportRef.current;
    if (!root || !viewport) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        viewport.classList.add("is-nudging");
        observer.disconnect();
        window.setTimeout(() => viewport.classList.remove("is-nudging"), 1400);
      },
      { threshold: 0.45 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const edgeClass = [
    edge.beginning ? "is-beginning" : "",
    edge.end ? "is-end" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={rootRef}
      className={["block-slider-shell", edgeClass, className].filter(Boolean).join(" ")}
    >
      <div ref={viewportRef} className="block-slider-viewport">
        {children({ prevRef, nextRef, onSwiper, onProgress, onBeforeInit })}
      </div>

      <div className="block-slider-chrome">
        <div className="block-slider-progress" aria-hidden>
          <div ref={progressRef} className="block-slider-progress-fill" />
        </div>
        <div className="block-slider-nav">
          <button
            ref={prevRef}
            type="button"
            className="block-slider-nav-btn"
            aria-label={prevLabel}
          >
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </button>
          <button
            ref={nextRef}
            type="button"
            className="block-slider-nav-btn"
            aria-label={nextLabel}
          >
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M4 11h12.17l-5.59-5.59L12 4l8 8-8 8-1.41-1.41L16.17 13H4v-2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
