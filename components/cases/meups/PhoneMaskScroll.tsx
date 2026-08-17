"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { MeupsShot } from "@/lib/media/meups-shots";

gsap.registerPlugin(ScrollTrigger);

type PhoneMaskScrollProps = {
  shots: MeupsShot[];
  label?: string;
  title?: string;
  body?: string;
};

export function PhoneMaskScroll({ shots, label, title, body }: PhoneMaskScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || shots.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const images = imgRefs.current.filter(Boolean) as HTMLElement[];

      const measure = () => {
        images.forEach((img) => {
          const viewport = img.parentElement;
          if (!viewport) return;
          const overflow = Math.max(0, img.offsetHeight - viewport.clientHeight);
          (img as HTMLElement & { __overflow?: number }).__overflow = overflow;
        });
      };

      measure();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => {
            measure();
            const maxOverflow = Math.max(
              ...images.map((img) => (img as HTMLElement & { __overflow?: number }).__overflow ?? 0),
              0,
            );
            // Cap pin distance so tall screenshots don't force endless scrubbing.
            const travel = Math.min(Math.max(maxOverflow * 0.85, 900), 2000);
            return `+=${Math.round(travel)}`;
          },
          scrub: 0.65,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      images.forEach((img, i) => {
        tl.to(
          img,
          {
            y: () => {
              measure();
              const overflow = (img as HTMLElement & { __overflow?: number }).__overflow ?? 0;
              // Match image travel to the capped scroll distance (partial reveal of tall shots).
              const travel = Math.min(Math.max(overflow * 0.85, 900), 2000);
              const ratio = overflow > 0 ? Math.min(1, travel / Math.max(overflow, 1)) : 0;
              return -(overflow * ratio);
            },
            ease: "none",
            duration: 1,
          },
          i === 0 ? 0 : i * 0.08,
        );
      });

      section.querySelectorAll("img").forEach((el) => {
        if (el.complete) return;
        el.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
      });
    }, section);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [shots]);

  return (
    <section ref={sectionRef} className="meups-phone-runway" aria-label={label}>
      {(label || title || body) && (
        <div className="meups-chapter-copy meups-chapter-copy-center">
          {label ? <p className="meups-chapter-label mini-heading">{label}</p> : null}
          {title ? <h2 className="meups-chapter-title">{title}</h2> : null}
          {body ? <p className="meups-chapter-body">{body}</p> : null}
        </div>
      )}
      <div className="meups-phone-runway-row">
        {shots.map((shot, index) => (
          <div key={shot.src} className="meups-phone">
            <div className="meups-phone-bezel">
              <div className="meups-phone-viewport">
                <div
                  className="meups-phone-scroll"
                  ref={(el) => {
                    imgRefs.current[index] = el;
                  }}
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    className="meups-phone-image"
                    sizes="(max-width: 1023px) 42vw, 280px"
                    quality={70}
                    loading="eager"
                    unoptimized={shot.height > 8000}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
