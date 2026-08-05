"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { MeupsShot } from "@/lib/media/meups-shots";

gsap.registerPlugin(ScrollTrigger);

type DetailGridProps = {
  shots: MeupsShot[];
  label?: string;
  title?: string;
  body?: string;
};

export function DetailGrid({ shots, label, title, body }: DetailGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const items = grid.querySelectorAll(".meups-detail-item");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 82%",
          },
        },
      );
    }, grid);

    return () => ctx.revert();
  }, [shots]);

  return (
    <section className="meups-detail">
      {(label || title || body) && (
        <div className="meups-chapter-copy">
          {label ? <p className="mini-heading meups-chapter-label">{label}</p> : null}
          {title ? <h2 className="meups-chapter-title">{title}</h2> : null}
          {body ? <p className="meups-chapter-body">{body}</p> : null}
        </div>
      )}
      <div ref={gridRef} className="meups-detail-grid">
        {shots.map((shot) => (
          <figure key={shot.src} className="meups-detail-item">
            <div className="meups-detail-mask">
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                className="meups-detail-image"
                sizes="(max-width: 767px) 50vw, 25vw"
              />
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
