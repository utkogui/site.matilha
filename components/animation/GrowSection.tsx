"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { growSectionVideo, growSectionVideoSrc } from "@/lib/content/home";
import type { Locale } from "@/lib/i18n/routing";

gsap.registerPlugin(ScrollTrigger);

export function GrowSection() {
  const ref = useRef<HTMLDivElement>(null);
  const locale = useLocale() as Locale;
  const [allowVideo, setAllowVideo] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAllowVideo(!reduced);
  }, []);

  const useVideo = (locale === "pt-BR" || locale === "pt-PT") && allowVideo;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 992px)").matches;

    if (reduced || !desktop) {
      el.style.clipPath = "none";
      return;
    }

    const tween = gsap.fromTo(
      el,
      { clipPath: "polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)" },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

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
            tabIndex={-1}
          />
        ) : (
          <div
            className="grow-section-bg"
            style={{ backgroundImage: `url(${growSectionVideo.poster})` }}
          />
        )}
        <div className="grow-section-overlay" />
      </div>
    </div>
  );
}
