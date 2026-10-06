"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { BeautyShot } from "@/lib/media/beauty-color-assets";

gsap.registerPlugin(ScrollTrigger);

type BeautyProductsFoldProps = {
  desktop: BeautyShot;
  mobile: BeautyShot;
  label?: string;
};

export function BeautyProductsFold({ desktop, mobile, label }: BeautyProductsFoldProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const deskShotRef = useRef<HTMLDivElement>(null);
  const mobileShotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const desk = deskShotRef.current;
    const phone = mobileShotRef.current;
    if (!section || !desk) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const overflowOf = (wrap: HTMLElement) => {
        const viewport = wrap.parentElement;
        if (!viewport) return 0;
        return Math.max(0, wrap.offsetHeight - viewport.clientHeight);
      };

      const travel = () => {
        const maxOverflow = Math.max(
          overflowOf(desk),
          phone ? overflowOf(phone) : 0,
        );
        return Math.min(Math.max(maxOverflow * 0.6, 1000), 2200);
      };

      gsap.from(section.querySelectorAll(".beauty-fold-device"), {
        y: 56,
        opacity: 0,
        duration: 0.95,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
        },
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${Math.round(travel())}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      const scrub = (wrap: HTMLElement) => {
        gsap.fromTo(
          wrap,
          { y: 0 },
          {
            y: () => -overflowOf(wrap),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${Math.round(travel())}`,
              scrub: 0.9,
              invalidateOnRefresh: true,
            },
          },
        );
      };

      scrub(desk);
      if (phone && window.innerWidth >= 900) scrub(phone);

      section.querySelectorAll("img").forEach((el) => {
        if (el.complete) return;
        el.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
      });
    }, section);

    return () => ctx.revert();
  }, [desktop.src, mobile.src]);

  return (
    <section ref={sectionRef} className="beauty-fold" aria-label={label}>
      <div className="beauty-fold-grid">
        <figure className="beauty-fold-device beauty-fold-desktop">
          <div className="beauty-fold-screen">
            <div ref={deskShotRef} className="beauty-fold-shot">
              <Image
                src={desktop.src}
                alt={desktop.alt}
                width={desktop.width}
                height={desktop.height}
                sizes="(max-width: 900px) 100vw, 58vw"
                quality={74}
              />
            </div>
          </div>
        </figure>
        <figure className="beauty-fold-device beauty-fold-mobile">
          <div className="beauty-fold-phone">
            <div ref={mobileShotRef} className="beauty-fold-shot">
              <Image
                src={mobile.src}
                alt={mobile.alt}
                width={mobile.width}
                height={mobile.height}
                sizes="(max-width: 900px) 70vw, 22vw"
                quality={72}
              />
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
