"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FadeInUp } from "@/components/animation/FadeInUp";
import { CaseRelated } from "@/components/cases/CaseRelated";
import { HeroScrollCue } from "@/components/media/HeroScrollCue";
import {
  OpenAppFrame,
  OpenBandCompose,
  OpenClosingCompose,
  OpenField,
  OpenIndexGraphic,
  OpenMark,
  OpenRibbon,
  OpenStoryGraphic,
} from "@/components/cases/open-startups/OpenGraphics";
import { kanit } from "@/lib/fonts/kanit";
import { readexPro } from "@/lib/fonts/readex-pro";
import {
  openApps,
  openLogos,
  openPalettePrimary,
  openPaletteSecondary,
  openPaletteSupport,
  type OpenSwatch,
} from "@/lib/media/open-startups-assets";
import type { CaseContent } from "@/lib/content/cases-registry";

gsap.registerPlugin(ScrollTrigger);

type RelatedCase = {
  id: string;
  slug: string;
  title: string;
  cover: string;
  coverAlt: string;
};

type OpenStartupsCaseProps = {
  content: CaseContent;
  related: RelatedCase[];
};

export function OpenStartupsCase({ content, related }: OpenStartupsCaseProps) {
  const t = useTranslations("cases");
  const heroRef = useRef<HTMLElement>(null);
  const story = content.story;
  const chapters = story?.chapters;
  const quote = story?.quote ?? "Essential connections";
  const applications = [
    { shot: openApps.billboard, label: t("openAppBillboard") },
    { shot: openApps.poster, label: t("openAppPoster") },
    { shot: openApps.card, label: t("openAppCard") },
    { shot: openApps.tee, label: t("openAppTee") },
  ];

  useEffect(() => {
    document.documentElement.classList.add("open-startups-page");
    return () => document.documentElement.classList.remove("open-startups-page");
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const hero = heroRef.current;
      if (hero) {
        gsap.from(hero.querySelectorAll(".open-hero-anim"), {
          opacity: 0,
          y: 28,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
        });

        const graph = hero.querySelector(".open-hero-graph");
        if (graph) {
          gsap.fromTo(
            graph,
            { yPercent: 8, rotate: -6 },
            {
              yPercent: -10,
              rotate: 4,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
      }

      gsap.utils.toArray<HTMLElement>(".open-swatch").forEach((swatch, index) => {
        gsap.from(swatch, {
          opacity: 0,
          y: 24,
          duration: 0.45,
          delay: index * 0.03,
          ease: "power2.out",
          scrollTrigger: { trigger: swatch, start: "top 92%" },
        });
      });

      const tagline = document.querySelector(".open-tagline-display");
      if (tagline) {
        gsap.from(tagline.querySelectorAll("span"), {
          yPercent: 110,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: tagline, start: "top 80%" },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <article className={`open-startups-case ${kanit.variable} ${readexPro.variable}`}>
      <section className="open-hero" ref={heroRef}>
        <div className="open-hero-graph" aria-hidden>
          <img src={openLogos.graph} alt="" width={742} height={1920} />
        </div>
        <div className="open-hero-wrap">
          <div className="container-site">
            <div className="open-hero-content">
              <p className="open-chip open-hero-anim">{t("openVoice")}</p>
              <p className="open-hero-kicker open-hero-anim">{t("openKicker")}</p>
              <p className="open-hero-brandbook open-hero-anim">{t("openBrandbook")}</p>
              <h1 className="open-hero-wordmark open-hero-anim">
                <span>Open</span>
                <span>Startups</span>
              </h1>
              <p className="open-hero-tagline open-hero-anim">{quote}</p>
              <p className="open-hero-summary open-hero-anim">{content.summary}</p>
            </div>
          </div>
        </div>
        <HeroScrollCue targetId="open-intro" label={t("openScroll")} />
      </section>

      <OpenRibbon />

      <div className="container-site open-intro" id="open-intro">
        <FadeInUp>
          <ul className="open-services" aria-label={t("services")}>
            {content.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </FadeInUp>

        <div className="open-story">
          <FadeInUp>
            <section className="open-story-block">
              <OpenStoryGraphic variant="challenge" />
              <div className="open-story-copy">
                <h2 className="mini-heading">{t("challenge")}</h2>
                <p>{content.challenge}</p>
              </div>
            </section>
          </FadeInUp>
          <FadeInUp>
            <section className="open-story-block open-story-block-accent">
              <OpenStoryGraphic variant="solution" />
              <div className="open-story-copy">
                <h2 className="mini-heading">{t("solution")}</h2>
                <p className="whitespace-pre-line">{content.solution}</p>
              </div>
            </section>
          </FadeInUp>
        </div>
      </div>

      <OpenRibbon />

      {story?.approachLead || story?.approach ? (
        <section className="open-band" aria-labelledby="open-approach-heading">
          <OpenBandCompose />
          <div className="container-site">
            <FadeInUp>
              <p id="open-approach-heading" className="mini-heading">
                {t("openVoice")}
              </p>
              {story.approachLead ? <p className="open-band-lead">{story.approachLead}</p> : null}
              {story.approach ? <p className="open-band-text">{story.approach}</p> : null}
            </FadeInUp>
          </div>
        </section>
      ) : null}

      {story?.deliverables && story.deliverables.length > 0 ? (
        <div className="container-site">
          <section className="open-deliverables">
            <FadeInUp>
              <p className="mini-heading open-chapter-label">{t("openDeliverables")}</p>
            </FadeInUp>
            <ol className="open-index">
              {story.deliverables.map((item, index) => (
                <li key={item.title} className="open-index-item">
                  <OpenIndexGraphic variant={(index % 3) as 0 | 1 | 2} />
                  <div className="open-index-copy">
                    <span className="open-index-num" aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="open-index-title">{item.title}</h3>
                    <p className="open-index-body">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      ) : null}

      <OpenField />

      {chapters?.identity ? (
        <section className="open-identity" aria-labelledby="open-identity-title">
          <div className="open-identity-marks" aria-hidden>
            <OpenMark kind="disc" tone="sober" className="open-mark-xl" />
            <OpenMark kind="corner" tone="energy" className="open-mark-xl" />
            <OpenMark kind="bar" tone="energy" />
          </div>
          <div className="container-site">
            <FadeInUp>
              <p className="mini-heading open-chapter-label">{t("openIdentityLabel")}</p>
              <h2 id="open-identity-title" className="open-chapter-title">
                {chapters.identity.title}
              </h2>
              <p className="open-chapter-body">{chapters.identity.body}</p>
            </FadeInUp>
            <div className="open-identity-stage">
              <figure className="open-identity-symbol">
                <img
                  src={openLogos.symbolOnDark.src}
                  alt={openLogos.symbolOnDark.alt}
                  width={openLogos.symbolOnDark.width}
                  height={openLogos.symbolOnDark.height}
                />
              </figure>
              <figure className="open-identity-wordmark">
                <img
                  src={openLogos.wordmarkOnDark.src}
                  alt={openLogos.wordmarkOnDark.alt}
                  width={openLogos.wordmarkOnDark.width}
                  height={openLogos.wordmarkOnDark.height}
                />
              </figure>
            </div>
          </div>
        </section>
      ) : null}

      {chapters?.palette ? (
        <section className="open-chapter open-palette" aria-labelledby="open-palette-title">
          <div className="open-palette-marks" aria-hidden>
            <OpenMark kind="disc" tone="energy" className="open-mark-xl" />
            <OpenMark kind="triangle" tone="sober" className="open-mark-xl" />
          </div>
          <div className="container-site">
            <FadeInUp>
              <p className="mini-heading open-chapter-label">{t("openPaletteLabel")}</p>
              <h2 id="open-palette-title" className="open-chapter-title">
                {chapters.palette.title}
              </h2>
              <p className="open-chapter-body">{chapters.palette.body}</p>
            </FadeInUp>
            <PaletteRow label={t("openPalettePrimary")} swatches={openPalettePrimary} />
            <PaletteRow label={t("openPaletteSecondary")} swatches={openPaletteSecondary} />
            <PaletteRow label={t("openPaletteSupport")} swatches={openPaletteSupport} />
          </div>
        </section>
      ) : null}

      {chapters?.type ? (
        <section className="open-chapter open-type" aria-labelledby="open-type-title">
          <div className="container-site">
            <FadeInUp>
              <p className="mini-heading open-chapter-label">{t("openTypeLabel")}</p>
              <h2 id="open-type-title" className="open-chapter-title">
                {chapters.type.title}
              </h2>
              <p className="open-chapter-body">{chapters.type.body}</p>
            </FadeInUp>
            <div className="open-type-specimen">
              <div className="open-type-marks" aria-hidden>
                <OpenMark kind="bar" tone="sober" />
                <OpenMark kind="bar" tone="energy" />
                <OpenMark kind="corner" tone="sober" />
              </div>
              <p className="open-type-display" aria-hidden>
                Kanit
              </p>
              <ul className="open-type-weights" aria-label={t("openTypeWeights")}>
                <li className="open-type-light">Light</li>
                <li className="open-type-regular">Regular</li>
                <li className="open-type-medium">Medium</li>
                <li className="open-type-semibold">SemiBold</li>
                <li className="open-type-bold">Bold</li>
              </ul>
              <p className="open-type-alphabet" aria-hidden>
                Aa Gg Rr Ss  0123456789
              </p>
              <p className="open-type-phrase">{quote}</p>
            </div>
          </div>
        </section>
      ) : null}

      <OpenRibbon />

      {chapters?.tagline ? (
        <section className="open-tagline" aria-labelledby="open-tagline-title">
          <div className="open-tagline-graph" aria-hidden>
            <img src={openLogos.graph} alt="" width={742} height={1920} />
          </div>
          <div className="container-site">
            <FadeInUp>
              <p className="mini-heading open-chapter-label">{t("openTaglineLabel")}</p>
              <h2 id="open-tagline-title" className="open-chapter-title">
                {chapters.tagline.title}
              </h2>
              <p className="open-chapter-body">{chapters.tagline.body}</p>
            </FadeInUp>
            <p className="open-tagline-display" aria-hidden>
              <span>Essential</span>
              <span>connections</span>
            </p>
          </div>
        </section>
      ) : null}

      {chapters?.applications ? (
        <section className="open-chapter open-apps" aria-labelledby="open-apps-title">
          <div className="container-site">
            <FadeInUp>
              <p className="mini-heading open-chapter-label">{t("openApplicationsLabel")}</p>
              <h2 id="open-apps-title" className="open-chapter-title">
                {chapters.applications.title}
              </h2>
              <p className="open-chapter-body">{chapters.applications.body}</p>
            </FadeInUp>
            <div className="open-apps-grid">
              {applications.map((item, index) => (
                <figure key={item.shot.src} className="open-app-card">
                  <div className="open-app-media">
                    <Image
                      src={item.shot.src}
                      alt={item.shot.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 700px) 100vw, 50vw"
                    />
                    <OpenAppFrame index={index} />
                  </div>
                  <figcaption>{item.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="open-closing" aria-label={quote}>
        <OpenClosingCompose />
        <div className="container-site open-closing-content">
          <p className="open-chip">{t("openVoice")}</p>
          <p className="open-closing-quote">{quote}</p>
          <p className="open-closing-credit">{t("openClosingCredit")}</p>
        </div>
      </section>

      <CaseRelated related={related} />
    </article>
  );
}

function PaletteRow({ label, swatches }: { label: string; swatches: readonly OpenSwatch[] }) {
  return (
    <div className="open-palette-row">
      <p className="open-palette-row-label">{label}</p>
      <ul className="open-swatches">
        {swatches.map((swatch) => (
          <li
            key={swatch.hex}
            className={`open-swatch${swatch.featured ? " is-featured" : ""}`}
            style={{ backgroundColor: swatch.hex, color: swatch.hex.toLowerCase() === "#ffffff" ? "#252830" : "#fff" }}
          >
            <span>{swatch.name}</span>
            <span>{swatch.hex}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
