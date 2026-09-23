"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";

export type RelatedCase = {
  id: string;
  slug: string;
  title: string;
  cover: string;
  coverAlt: string;
};

type CaseRelatedProps = {
  related: RelatedCase[];
  tone?: "matilha" | "syx";
};

export function CaseRelated({ related, tone = "matilha" }: CaseRelatedProps) {
  const t = useTranslations("cases");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || related.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !sectionRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const cards = section.querySelectorAll<HTMLElement>(".case-related-card");

      const intro = gsap.fromTo(
        cards,
        { opacity: 0, y: 72 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
          },
        },
      );

      cleanup = () => {
        intro.scrollTrigger?.kill();
        intro.kill();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [related.length]);

  if (related.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className={`case-related${tone === "syx" ? " is-syx" : ""}`}
      aria-labelledby="case-related-title"
    >
      <div className="container-site case-related-head">
        <p className="case-related-chip">{t("nextLabel")}</p>
        <h2 id="case-related-title" className="case-related-title">
          {t("nextHeading")}
        </h2>
        <p className="case-related-cue">{t("nextCue")}</p>
      </div>

      <div className="case-related-track">
        {related.map((item, index) => (
          <Link
            key={item.id}
            href={{ pathname: "/cases/[slug]", params: { slug: item.slug } }}
            className={`case-related-card${index === 0 ? " is-lead" : ""}`}
          >
            <span className="case-related-cover" aria-hidden>
              <Image
                src={item.cover}
                alt=""
                fill
                className="case-related-media object-cover"
                sizes={index === 0 ? "(max-width: 860px) 100vw, 62vw" : "(max-width: 860px) 100vw, 38vw"}
              />
            </span>
            <span className="case-related-veil" aria-hidden />
            <span className="case-related-mark" aria-hidden />
            <span className="case-related-copy">
              <span className="case-related-index" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="case-related-name">{item.title}</span>
              <span className="case-related-cta">
                {t("viewCase")}
                <span className="case-related-arrow" aria-hidden>
                  →
                </span>
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
