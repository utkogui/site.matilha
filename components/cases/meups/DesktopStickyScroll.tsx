"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { MeupsShot } from "@/lib/media/meups-shots";

gsap.registerPlugin(ScrollTrigger);

type DesktopStickyScrollProps = {
  shot: MeupsShot;
  label: string;
  title?: string;
  body?: string;
  url?: string;
};

export function DesktopStickyScroll({
  shot,
  label,
  title,
  body,
  url = "meuplaystation.com.br",
}: DesktopStickyScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imgWrap = imgWrapRef.current;
    const screen = screenRef.current;
    if (!section || !imgWrap || !screen) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const getOverflow = () => Math.max(0, imgWrap.offsetHeight - screen.clientHeight);
      const getTravel = () => {
        const overflow = getOverflow();
        // Cap pin distance so 10k+ desktop shots don't scrub for multiple viewports.
        return Math.min(Math.max(overflow * 0.7, 1200), 2200);
      };

      gsap.fromTo(
        imgWrap,
        { y: 0 },
        {
          y: () => {
            const overflow = getOverflow();
            const travel = getTravel();
            const ratio = overflow > 0 ? Math.min(1, travel / Math.max(overflow, 1)) : 0;
            return -(overflow * ratio);
          },
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.round(getTravel())}`,
            scrub: 0.7,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        },
      );

      section.querySelectorAll("img").forEach((el) => {
        if (el.complete) return;
        el.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
      });
    }, section);

    return () => ctx.revert();
  }, [shot.src]);

  return (
    <section ref={sectionRef} className="meups-desktop-chapter">
      <div className="meups-desktop-chapter-meta">
        <p className="mini-heading meups-chapter-label">{label}</p>
        {title ? <h2 className="meups-chapter-title">{title}</h2> : null}
        {body ? <p className="meups-chapter-body meups-chapter-body-desktop">{body}</p> : null}
      </div>

      <div className="meups-desktop-stage">
        <div className="meups-desktop-device" aria-hidden={false}>
          <div className="meups-desktop-laptop">
            <div className="meups-desktop-lid">
              <div className="meups-desktop-browser">
                <div className="meups-desktop-chrome">
                  <div className="meups-desktop-dots" aria-hidden>
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="meups-desktop-url">
                    <span className="meups-desktop-url-lock" aria-hidden />
                    <span>{url}</span>
                  </div>
                </div>
                <div ref={screenRef} className="meups-desktop-screen">
                  <div ref={imgWrapRef} className="meups-desktop-scroll">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      className="meups-desktop-image"
                      sizes="(max-width: 767px) 100vw, 1100px"
                      quality={70}
                      loading="eager"
                      // Tall showcase shots blow up if the optimizer picks a huge width
                      // (e.g. 3840×33k), which many GPUs refuse to paint.
                      unoptimized={shot.height > 8000}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="meups-desktop-chin" aria-hidden>
              <span className="meups-desktop-notch" />
            </div>
          </div>
          <div className="meups-desktop-base" aria-hidden />
        </div>
      </div>
    </section>
  );
}
