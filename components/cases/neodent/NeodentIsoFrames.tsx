"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { neodentIsoFrames } from "@/lib/media/neodent-assets";

gsap.registerPlugin(ScrollTrigger);

type NeodentIsoFramesProps = {
  label: string;
};

export function NeodentIsoFrames({ label }: NeodentIsoFramesProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = Array.from(section.querySelectorAll<HTMLElement>(".neodent-iso-card"));
    if (!cards.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(cards, { clearProps: "all", autoAlpha: 1 });
      return;
    }

    const ctx = gsap.context(() => {
        const originFor = (index: number) => {
          const col = index % 4;
          const row = Math.floor(index / 4);
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const fromLeft = col < 2;

          return {
            x: fromLeft ? -(vw * (1.18 + row * 0.06)) : vw * (1.18 + row * 0.06),
            y:
              row === 2
                ? vh * (0.92 + col * 0.04)
                : fromLeft
                  ? vh * (0.12 + row * 0.22)
                  : -(vh * (0.06 + row * 0.04)),
            rotate: fromLeft ? -12 : 12,
          };
        };

      cards.forEach((card, index) => {
        const from = originFor(index);
        gsap.set(card, { x: from.x, y: from.y, rotate: from.rotate, autoAlpha: 0 });
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 1.55)}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, index) => {
        const col = index % 4;
        const row = Math.floor(index / 4);
        tl.to(
          card,
          {
            x: 0,
            y: 0,
            rotate: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power3.out",
          },
          row * 0.16 + col * 0.07,
        );
      });

      tl.to({}, { duration: 0.4 });

      section.querySelectorAll("img").forEach((img) => {
        if (img.complete) return;
        img.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="neodent-cluster" aria-label={label}>
      <div className="neodent-iso-wrap">
        <div className="neodent-iso">
          {neodentIsoFrames.map((frame, index) => (
            <figure key={`${frame.src}-${frame.objectPosition}-${index}`} className="neodent-iso-card">
              <div className="neodent-iso-tilt">
                <div className="neodent-iso-shot">
                  <Image
                    src={frame.src}
                    alt=""
                    fill
                    sizes="180px"
                    quality={75}
                    style={{ objectFit: "cover", objectPosition: frame.objectPosition }}
                  />
                </div>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
