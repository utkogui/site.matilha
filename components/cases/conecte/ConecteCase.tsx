"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FadeInUp } from "@/components/animation/FadeInUp";
import { CaseRelated } from "@/components/cases/CaseRelated";
import { HeroScrollCue } from "@/components/media/HeroScrollCue";
import { lexend } from "@/lib/fonts/lexend";
import { asap } from "@/lib/fonts/asap";
import {
  conecteBrand,
  conecteCards,
  conectePalette,
  conecteScreens,
} from "@/lib/media/conecte-assets";
import type { CaseContent } from "@/lib/content/cases-registry";

gsap.registerPlugin(ScrollTrigger);

type RelatedCase = {
  id: string;
  slug: string;
  title: string;
  cover: string;
  coverAlt: string;
};

type ConecteCaseProps = {
  content: CaseContent;
  related: RelatedCase[];
};

export function ConecteCase({ content, related }: ConecteCaseProps) {
  const t = useTranslations("cases");
  const heroRef = useRef<HTMLElement>(null);
  const story = content.story;
  const about = story?.chapters?.about;
  const process = story?.chapters?.process;
  const system = story?.chapters?.system;
  const applications = story?.chapters?.applications;
  const palette = story?.chapters?.palette;
  const type = story?.chapters?.type;
  const team = story?.team ?? [];

  useEffect(() => {
    document.documentElement.classList.add("conecte-page");
    return () => document.documentElement.classList.remove("conecte-page");
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const hero = heroRef.current;
      if (hero) {
        gsap.from(hero.querySelectorAll(".conecte-hero-anim"), {
          opacity: 0,
          y: 22,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
        });
      }

      gsap.from(".conecte-card-anim", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".conecte-cards",
          start: "top 78%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
    <article className={`conecte-case ${lexend.variable} ${asap.variable}`}>
      <section ref={heroRef} className="conecte-hero">
        <div className="conecte-hero-pattern" aria-hidden>
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="container-site conecte-hero-inner">
          <div className="conecte-hero-copy">
            <p className="conecte-chip conecte-hero-anim">{t("conecteVoice")}</p>
            <img
              src={conecteBrand.logo.src}
              alt={content.title}
              width={conecteBrand.logo.width}
              height={conecteBrand.logo.height}
              className="conecte-hero-logo conecte-hero-anim"
            />
            <h1 className="conecte-hero-title conecte-hero-anim">{content.summary}</h1>
          </div>
        </div>
        <HeroScrollCue targetId="conecte-intro" label={t("conecteScroll")} />
      </section>

      <div className="container-site conecte-intro" id="conecte-intro">
        <FadeInUp>
          <ul className="conecte-services" aria-label={t("services")}>
            {content.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </FadeInUp>
        <div className="conecte-story">
          <FadeInUp>
            <section className="conecte-story-block">
              <h2 className="mini-heading">{t("challenge")}</h2>
              <p>{content.challenge}</p>
            </section>
          </FadeInUp>
          <FadeInUp>
            <section className="conecte-story-block conecte-story-block-accent">
              <h2 className="mini-heading">{t("solution")}</h2>
              <p>{content.solution}</p>
            </section>
          </FadeInUp>
        </div>
      </div>

      {about ? (
        <section className="conecte-about" aria-labelledby="conecte-about-title">
          <div className="container-site conecte-about-grid">
            <FadeInUp>
              <p className="mini-heading conecte-on-dark">{t("conecteAboutLabel")}</p>
              <h2 id="conecte-about-title" className="conecte-display">
                {about.title}
              </h2>
              <p className="conecte-body">{about.body}</p>
            </FadeInUp>
            <figure className="conecte-about-cover">
              <Image
                src={conecteBrand.cover.src}
                alt={conecteBrand.cover.alt}
                width={conecteBrand.cover.width}
                height={conecteBrand.cover.height}
                sizes="(max-width: 900px) 100vw, 48vw"
                quality={75}
              />
            </figure>
          </div>
        </section>
      ) : null}

      {system ? (
        <section className="conecte-plans" aria-labelledby="conecte-plans-title">
          <div className="container-site">
            <FadeInUp>
              <p className="mini-heading">{t("conectePlansLabel")}</p>
              <h2 id="conecte-plans-title" className="conecte-display conecte-display-ink">
                {system.title}
              </h2>
              <p className="conecte-body conecte-body-ink">{system.body}</p>
            </FadeInUp>
            <figure className="conecte-browser">
              <Image
                src={conecteScreens.plans.src}
                alt={conecteScreens.plans.alt}
                width={conecteScreens.plans.width}
                height={conecteScreens.plans.height}
                sizes="(max-width: 1100px) 94vw, 1200px"
                quality={75}
                priority
              />
            </figure>
          </div>
        </section>
      ) : null}

      <section className="conecte-cards" aria-label={t("conectePlansLabel")}>
        <div className="container-site conecte-cards-row">
          <figure className="conecte-card-anim">
            <Image
              src={conecteCards.standard.src}
              alt={conecteCards.standard.alt}
              width={conecteCards.standard.width}
              height={conecteCards.standard.height}
              sizes="(max-width: 800px) 80vw, 320px"
            />
          </figure>
          <figure className="conecte-card-anim conecte-card-featured">
            <Image
              src={conecteCards.offer.src}
              alt={conecteCards.offer.alt}
              width={conecteCards.offer.width}
              height={conecteCards.offer.height}
              sizes="(max-width: 800px) 80vw, 320px"
            />
          </figure>
          <figure className="conecte-card-anim">
            <Image
              src={conecteCards.hover.src}
              alt={conecteCards.hover.alt}
              width={conecteCards.hover.width}
              height={conecteCards.hover.height}
              sizes="(max-width: 800px) 80vw, 320px"
            />
          </figure>
        </div>
      </section>

      {applications ? (
        <section className="conecte-discover" aria-labelledby="conecte-discover-title">
          <div className="container-site conecte-discover-grid">
            <FadeInUp>
              <p className="mini-heading conecte-on-dark">{t("conecteDiscoverLabel")}</p>
              <h2 id="conecte-discover-title" className="conecte-display">
                {applications.title}
              </h2>
              <p className="conecte-body">{applications.body}</p>
              {applications.points && applications.points.length > 0 ? (
                <ol className="conecte-steps">
                  {applications.points.map((point, index) => (
                    <li key={point}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {point}
                    </li>
                  ))}
                </ol>
              ) : null}
            </FadeInUp>
            <figure className="conecte-browser conecte-browser-tall">
              <Image
                src={conecteScreens.descubra.src}
                alt={conecteScreens.descubra.alt}
                width={conecteScreens.descubra.width}
                height={conecteScreens.descubra.height}
                sizes="(max-width: 1100px) 94vw, 640px"
                quality={75}
              />
            </figure>
          </div>
        </section>
      ) : null}

      {palette || type ? (
        <section className="conecte-system" aria-labelledby="conecte-system-title">
          <div className="container-site">
            {palette ? (
              <FadeInUp>
                <p className="mini-heading">{t("conecteTypeLabel")}</p>
                <h2 id="conecte-system-title" className="conecte-display conecte-display-ink">
                  {palette.title}
                </h2>
                <p className="conecte-body conecte-body-ink">{palette.body}</p>
              </FadeInUp>
            ) : null}
            <ul className="conecte-swatches">
              {conectePalette.map((swatch) => (
                <li key={swatch.hex}>
                  <span style={{ background: swatch.hex }} />
                  <strong>{swatch.name}</strong>
                  <em>{swatch.hex}</em>
                </li>
              ))}
            </ul>
            {type ? (
              <div className="conecte-type">
                <p className="conecte-type-display" aria-hidden>
                  Lexend
                </p>
                <p className="conecte-type-ui">{type.body}</p>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {process ? (
        <section className="conecte-process" aria-labelledby="conecte-process-title">
          <div className="container-site">
            <FadeInUp>
              <p className="mini-heading">{t("conecteProcessLabel")}</p>
              <h2 id="conecte-process-title" className="conecte-display conecte-display-ink">
                {process.title}
              </h2>
              <p className="conecte-body conecte-body-ink">{process.body}</p>
            </FadeInUp>
          </div>
        </section>
      ) : null}

      {team.length > 0 ? (
        <section className="conecte-team" aria-labelledby="conecte-team-title">
          <div className="container-site">
            <h2 id="conecte-team-title" className="mini-heading">
              {t("conecteTeamLabel")}
            </h2>
            <ul>
              {team.map((member) => (
                <li key={member}>{member}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

    </article>
    <CaseRelated related={related} />
    </>
  );
}
