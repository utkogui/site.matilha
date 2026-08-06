"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { growSectionVideo, growSectionVideoSrc } from "@/lib/content/home";
import type { Locale } from "@/lib/i18n/routing";

export function GrowSection() {
  const ref = useRef<HTMLDivElement>(null);
  const locale = useLocale() as Locale;
  const [inView, setInView] = useState(false);
  const [allowVideo, setAllowVideo] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 992px)").matches;
    const saveData =
      "connection" in navigator &&
      Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);

    // Vimeo is heavy — only on desktop PT locales, without reduced motion / data saver.
    setAllowVideo(!reduced && desktop && !saveData);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setInView(true);
        observer.disconnect();
      },
      { rootMargin: "200px 0px", threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 992px)").matches;

    if (reduced || !desktop) {
      el.style.clipPath = "none";
      return;
    }

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !ref.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const tween = gsap.fromTo(
        ref.current,
        { clipPath: "polygon(1.5% 3%, 98.5% 3%, 98.5% 97%, 1.5% 97%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  const useVideo =
    (locale === "pt-BR" || locale === "pt-PT") && allowVideo && inView;

  return (
    <div ref={ref} className={`grow-section${useVideo ? "" : " grow-section--poster"}`}>
      <div className="grow-section-media" aria-hidden>
        {useVideo ? (
          <iframe
            src={growSectionVideoSrc}
            className="grow-section-video"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            title={growSectionVideo.title}
            loading="lazy"
            tabIndex={-1}
          />
        ) : (
          <Image
            src={growSectionVideo.poster}
            alt=""
            fill
            className="grow-section-poster-image object-cover"
            sizes="100vw"
            quality={70}
          />
        )}
        <div className="grow-section-overlay" />
      </div>
    </div>
  );
}
