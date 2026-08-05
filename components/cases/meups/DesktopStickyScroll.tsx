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

      gsap.fromTo(
        imgWrap,
        { y: 0 },
        {
          y: () => -getOverflow(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.max(getOverflow() * 0.7, 1200)}`,
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
                      sizes="(max-width: 1023px) 92vw, min(1100px, 86vw)"
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
