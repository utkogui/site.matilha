"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CharneyShot } from "@/lib/media/charney-assets";

gsap.registerPlugin(ScrollTrigger);

type Frame = {
  shot: CharneyShot;
  offset?: number;
};

type CharneyPinnedScreensProps = {
  left: Frame;
  right: Frame;
  overlay?: CharneyShot;
  dark?: boolean;
};

export function CharneyPinnedScreens({ left, right, overlay, dark = false }: CharneyPinnedScreensProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftImgRef = useRef<HTMLDivElement>(null);
  const rightImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftImg = leftImgRef.current;
    const rightImg = rightImgRef.current;
    if (!section || !leftImg || !rightImg) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const overflowOf = (wrap: HTMLElement) => {
        const viewport = wrap.parentElement;
        if (!viewport) return 0;
        return Math.max(0, wrap.offsetHeight - viewport.clientHeight);
      };

      const travel = () => {
        const maxOverflow = Math.max(overflowOf(leftImg), overflowOf(rightImg));
        return Math.min(Math.max(maxOverflow * 0.55, 900), 1800);
      };

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
              scrub: 0.85,
              invalidateOnRefresh: true,
            },
          },
        );
      };

      gsap.fromTo(
        section.querySelectorAll(".charney-device"),
        { y: 48, opacity: 0.4 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
          },
        },
      );

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${Math.round(travel())}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      scrub(leftImg);
      scrub(rightImg);

      section.querySelectorAll("img").forEach((el) => {
        if (el.complete) return;
        el.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
      });
    }, section);

    return () => ctx.revert();
  }, [left.shot.src, right.shot.src]);

  return (
    <section ref={sectionRef} className={`charney-pin${dark ? " charney-pin-dark" : ""}`}>
      <div className="charney-pin-grid">
        <figure className="charney-device charney-device-desktop">
          <div className="charney-device-screen">
            <div ref={leftImgRef} className="charney-device-shot">
              <Image
                src={left.shot.src}
                alt={left.shot.alt}
                width={left.shot.width}
                height={left.shot.height}
                sizes="(max-width: 900px) 100vw, 48vw"
                quality={72}
              />
            </div>
          </div>
          {overlay ? (
            <div className="charney-device-float" aria-hidden>
              <Image src={overlay.src} alt="" width={overlay.width} height={overlay.height} />
            </div>
          ) : null}
        </figure>
        <figure className="charney-device charney-device-desktop charney-device-shift">
          <div className="charney-device-screen">
            <div ref={rightImgRef} className="charney-device-shot">
              <Image
                src={right.shot.src}
                alt={right.shot.alt}
                width={right.shot.width}
                height={right.shot.height}
                sizes="(max-width: 900px) 100vw, 44vw"
                quality={72}
              />
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
