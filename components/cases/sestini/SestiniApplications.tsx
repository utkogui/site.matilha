"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FadeInUp } from "@/components/animation/FadeInUp";
import { sestiniApplications, type SestiniShot } from "@/lib/media/sestini-assets";

gsap.registerPlugin(ScrollTrigger);

type SestiniApplicationsProps = {
  title?: string;
  body?: string;
};

function Frame({
  shot,
  caption,
  featured = false,
  priority = false,
}: {
  shot: SestiniShot;
  caption: string;
  featured?: boolean;
  priority?: boolean;
}) {
  return (
    <figure className={`sestini-frame${featured ? " sestini-frame-featured" : ""}`}>
      <div className={`relative sestini-frame-media sestini-crop-${shot.crop}`} style={{ position: "relative" }}>
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          sizes={featured ? "100vw" : "(max-width: 767px) 100vw, 50vw"}
          className="sestini-frame-image"
          quality={72}
          priority={priority}
        />
      </div>
      <figcaption className="sestini-frame-caption">{caption}</figcaption>
    </figure>
  );
}

export function SestiniApplications({ title, body }: SestiniApplicationsProps) {
  const t = useTranslations("cases");
  const mosaicRef = useRef<HTMLDivElement>(null);
  const shots = sestiniApplications;

  useEffect(() => {
    const mosaic = mosaicRef.current;
    if (!mosaic) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const frames = mosaic.querySelectorAll(".sestini-frame");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        frames,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mosaic,
            start: "top 82%",
          },
        },
      );
    }, mosaic);

    return () => ctx.revert();
  }, []);

  return (
    <section className="sestini-applications" aria-labelledby="sestini-apps-title">
      <div className="container-site sestini-applications-intro">
        <FadeInUp>
          <p className="mini-heading sestini-chapter-label">{t("sestiniApplications")}</p>
          {title ? (
            <h2 id="sestini-apps-title" className="sestini-chapter-title">
              {title}
            </h2>
          ) : (
            <h2 id="sestini-apps-title" className="sestini-chapter-title">
              {t("sestiniApplications")}
            </h2>
          )}
          {body ? <p className="sestini-chapter-body">{body}</p> : null}
        </FadeInUp>
      </div>

      <div ref={mosaicRef} className="container-site sestini-apps-mosaic">
        <Frame
          shot={shots.instagram}
          caption={t("sestiniAppSocial")}
          featured
          priority
        />
        <div className="sestini-apps-row">
          <Frame shot={shots.poster} caption={t("sestiniAppPoster")} />
          <Frame shot={shots.airport} caption={t("sestiniAppAirport")} />
        </div>
        <Frame shot={shots.accessories} caption={t("sestiniAppPackaging")} featured />
        <div className="sestini-apps-row">
          <Frame shot={shots.tote} caption={t("sestiniAppTote")} />
          <Frame shot={shots.tapeBox} caption={t("sestiniAppTape")} />
        </div>
        <div className="sestini-apps-row">
          <Frame shot={shots.suitcase} caption={t("sestiniAppSuitcase")} />
          <Frame shot={shots.backpack} caption={t("sestiniAppBackpack")} />
        </div>
        <div className="sestini-apps-row">
          <Frame shot={shots.luggageTag} caption={t("sestiniAppTag")} />
          <Frame shot={shots.details} caption={t("sestiniAppDetails")} />
        </div>
      </div>
    </section>
  );
}
