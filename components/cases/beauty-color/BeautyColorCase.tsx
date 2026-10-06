"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FadeInUp } from "@/components/animation/FadeInUp";
import { CaseRelated } from "@/components/cases/CaseRelated";
import { HeroScrollCue } from "@/components/media/HeroScrollCue";
import { BeautyProductsFold } from "@/components/cases/beauty-color/BeautyProductsFold";
import { beautyDisplay, beautyText } from "@/lib/fonts/beauty-color";
import {
  beautyBrand,
  beautyMobile,
  beautyPalette,
  beautyScreens,
  beautySections,
} from "@/lib/media/beauty-color-assets";
import type { CaseContent } from "@/lib/content/cases-registry";
import { ServiceTag } from "@/components/ui/ServiceTag";

gsap.registerPlugin(ScrollTrigger);

type RelatedCase = {
  id: string;
  slug: string;
  title: string;
  cover: string;
  coverAlt: string;
};

type BeautyColorCaseProps = {
  content: CaseContent;
  related: RelatedCase[];
};

export function BeautyColorCase({ content, related }: BeautyColorCaseProps) {
  const t = useTranslations("cases");
  const heroRef = useRef<HTMLElement>(null);
  const story = content.story;
  const about = story?.chapters?.about;
  const system = story?.chapters?.system;
  const applications = story?.chapters?.applications;
  const process = story?.chapters?.process;
  const palette = story?.chapters?.palette;
  const type = story?.chapters?.type;
  const team = story?.team ?? [];

  useEffect(() => {
    document.documentElement.classList.add("beauty-page");
    return () => document.documentElement.classList.remove("beauty-page");
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const hero = heroRef.current;
      if (hero) {
        gsap.from(hero.querySelectorAll(".beauty-hero-anim"), {
          opacity: 0,
          y: 28,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
        });
        const media = hero.querySelector(".beauty-hero-media img");
        if (media) {
          gsap.fromTo(
            media,
            { scale: 1.08 },
            {
              scale: 1,
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

      gsap.from(".beauty-swatch", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".beauty-palette-row",
          start: "top 80%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
    <article className={`beauty-case ${beautyDisplay.variable} ${beautyText.variable}`}>
      <section ref={heroRef} className="beauty-hero">
        <div className="beauty-hero-media" aria-hidden>
          <Image
            src={beautyScreens.hero.src}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={78}
          />
          <div className="beauty-hero-veil" />
        </div>
        <div className="container-site beauty-hero-inner">
          <p className="beauty-chip beauty-hero-anim">{t("beautyVoice")}</p>
          <img
            src={beautyBrand.logo.src}
            alt={content.title}
            width={beautyBrand.logo.width}
            height={beautyBrand.logo.height}
            className="beauty-hero-logo beauty-hero-anim"
          />
          <h1 className="beauty-hero-title beauty-hero-anim">{content.summary}</h1>
        </div>
        <HeroScrollCue targetId="beauty-intro" label={t("beautyScroll")} />
      </section>

      <div className="container-site beauty-intro" id="beauty-intro">
        <FadeInUp>
          <ul className="beauty-services" aria-label={t("services")}>
            {content.services.map((service) => (
              <ServiceTag key={service} label={service} />
            ))}
          </ul>
        </FadeInUp>
        <div className="beauty-story">
          <FadeInUp>
            <section className="beauty-story-block">
              <h2 className="mini-heading">{t("challenge")}</h2>
              <p>{content.challenge}</p>
            </section>
          </FadeInUp>
          <FadeInUp>
            <section className="beauty-story-block beauty-story-block-accent">
              <h2 className="mini-heading">{t("solution")}</h2>
              <p>{content.solution}</p>
            </section>
          </FadeInUp>
        </div>
      </div>

      {story?.approachLead || story?.approach ? (
        <section className="beauty-band" aria-labelledby="beauty-approach-heading">
          <div className="container-site">
            <FadeInUp>
              <p id="beauty-approach-heading" className="mini-heading beauty-on-dark">
                {t("beautyApproach")}
              </p>
              {story.approachLead ? <p className="beauty-band-lead">{story.approachLead}</p> : null}
              {story.approach ? <p className="beauty-band-text">{story.approach}</p> : null}
            </FadeInUp>
          </div>
        </section>
      ) : null}

      {about ? (
        <section className="beauty-about" aria-labelledby="beauty-about-title">
          <div className="container-site beauty-about-grid">
            <FadeInUp>
              <p className="mini-heading">{t("beautyAboutLabel")}</p>
              <h2 id="beauty-about-title" className="beauty-display">
                {about.title}
              </h2>
              <p className="beauty-body">{about.body}</p>
            </FadeInUp>
            <figure className="beauty-frame">
              <Image
                src={beautyScreens.sobre.src}
                alt={beautyScreens.sobre.alt}
                width={beautyScreens.sobre.width}
                height={beautyScreens.sobre.height}
                sizes="(max-width: 900px) 100vw, 48vw"
                quality={74}
              />
            </figure>
          </div>
        </section>
      ) : null}

      {system ? (
        <section className="beauty-home-story" aria-labelledby="beauty-home-title">
          <div className="container-site">
            <FadeInUp>
              <p className="mini-heading beauty-on-dark">{t("beautyHomeLabel")}</p>
              <h2 id="beauty-home-title" className="beauty-display beauty-on-dark">
                {system.title}
              </h2>
              <p className="beauty-body beauty-on-dark-body">{system.body}</p>
            </FadeInUp>
          </div>
          <div className="container-site beauty-home-pair">
            <figure className="beauty-frame beauty-frame-tall">
              <Image
                src={beautyScreens.home.src}
                alt={beautyScreens.home.alt}
                width={beautyScreens.home.width}
                height={beautyScreens.home.height}
                sizes="(max-width: 900px) 100vw, 42vw"
                quality={72}
              />
            </figure>
            <div className="beauty-home-side">
              <figure className="beauty-frame">
                <Image
                  src={beautySections.homeProdutos.src}
                  alt={beautySections.homeProdutos.alt}
                  width={beautySections.homeProdutos.width}
                  height={beautySections.homeProdutos.height}
                  sizes="(max-width: 900px) 100vw, 48vw"
                  quality={76}
                />
              </figure>
              <figure className="beauty-frame">
                <Image
                  src={beautySections.influencers.src}
                  alt={beautySections.influencers.alt}
                  width={beautySections.influencers.width}
                  height={beautySections.influencers.height}
                  sizes="(max-width: 900px) 100vw, 48vw"
                  quality={76}
                />
              </figure>
            </div>
          </div>
        </section>
      ) : null}

      {applications ? (
        <section className="beauty-products" aria-labelledby="beauty-products-title">
          <div className="container-site beauty-products-copy">
            <FadeInUp>
              <p className="mini-heading">{t("beautyProductsLabel")}</p>
              <h2 id="beauty-products-title" className="beauty-display">
                {applications.title}
              </h2>
              <p className="beauty-body">{applications.body}</p>
              {applications.points && applications.points.length > 0 ? (
                <ul className="beauty-points">
                  {applications.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
            </FadeInUp>
          </div>
          <figure className="container-site beauty-frame beauty-products-hero-shot">
            <Image
              src={beautySections.produtosHero.src}
              alt={beautySections.produtosHero.alt}
              width={beautySections.produtosHero.width}
              height={beautySections.produtosHero.height}
              sizes="100vw"
              quality={78}
            />
          </figure>
          <BeautyProductsFold
            desktop={beautyScreens.produtosLista}
            mobile={beautyMobile.produtosLista}
            label={t("beautyProductsLabel")}
          />
          <div className="container-site beauty-pdp">
            <FadeInUp>
              <p className="mini-heading">{t("beautyPdpLabel")}</p>
            </FadeInUp>
            <figure className="beauty-frame">
              <Image
                src={beautyScreens.produtoInterna.src}
                alt={beautyScreens.produtoInterna.alt}
                width={beautyScreens.produtoInterna.width}
                height={beautyScreens.produtoInterna.height}
                sizes="(max-width: 900px) 100vw, 70vw"
                quality={74}
              />
            </figure>
          </div>
        </section>
      ) : null}

      {process ? (
        <section className="beauty-quiz" aria-labelledby="beauty-quiz-title">
          <div className="container-site beauty-quiz-grid">
            <FadeInUp>
              <p className="mini-heading beauty-on-dark">{t("beautyQuizLabel")}</p>
              <h2 id="beauty-quiz-title" className="beauty-display beauty-on-dark">
                {process.title}
              </h2>
              <p className="beauty-body beauty-on-dark-body">{process.body}</p>
            </FadeInUp>
            <figure className="beauty-frame">
              <Image
                src={beautyScreens.quiz.src}
                alt={beautyScreens.quiz.alt}
                width={beautyScreens.quiz.width}
                height={beautyScreens.quiz.height}
                sizes="(max-width: 900px) 100vw, 52vw"
                quality={76}
              />
            </figure>
          </div>
          <div className="container-site beauty-quiz-result">
            <figure className="beauty-frame">
              <Image
                src={beautyScreens.quizResultado.src}
                alt={beautyScreens.quizResultado.alt}
                width={beautyScreens.quizResultado.width}
                height={beautyScreens.quizResultado.height}
                sizes="(max-width: 900px) 100vw, 64vw"
                quality={74}
              />
            </figure>
          </div>
        </section>
      ) : null}

      <section className="beauty-freefrom" aria-label={t("beautyFreeFromLabel")}>
        <div className="container-site">
          <FadeInUp>
            <p className="mini-heading">{t("beautyFreeFromLabel")}</p>
          </FadeInUp>
          <figure className="beauty-frame">
            <Image
              src={beautySections.freefrom.src}
              alt={beautySections.freefrom.alt}
              width={beautySections.freefrom.width}
              height={beautySections.freefrom.height}
              sizes="100vw"
              quality={76}
            />
          </figure>
        </div>
      </section>

      {palette || type ? (
        <section className="beauty-system" aria-labelledby="beauty-system-title">
          <div className="container-site">
            <FadeInUp>
              <p className="mini-heading">{t("beautySystemLabel")}</p>
              {palette ? (
                <>
                  <h2 id="beauty-system-title" className="beauty-display">
                    {palette.title}
                  </h2>
                  <p className="beauty-body">{palette.body}</p>
                </>
              ) : null}
            </FadeInUp>
            <div className="beauty-palette-row">
              {beautyPalette.map((swatch) => (
                <div key={swatch.hex} className="beauty-swatch">
                  <span
                    className="beauty-swatch-chip"
                    style={{ background: swatch.hex }}
                    aria-hidden
                  />
                  <span className="beauty-swatch-name">{swatch.name}</span>
                  <span className="beauty-swatch-hex">{swatch.hex}</span>
                </div>
              ))}
            </div>
            {type ? (
              <FadeInUp>
                <h3 className="beauty-type-title">{type.title}</h3>
                <p className="beauty-body">{type.body}</p>
              </FadeInUp>
            ) : null}
          </div>
        </section>
      ) : null}

      {story?.quote ? (
        <section className="beauty-quote" aria-label={t("beautyQuoteLabel")}>
          <div className="container-site">
            <FadeInUp>
              <blockquote>
                <p>{story.quote}</p>
              </blockquote>
            </FadeInUp>
          </div>
        </section>
      ) : null}

      {team.length > 0 ? (
        <section className="beauty-team" aria-labelledby="beauty-team-title">
          <div className="container-site">
            <FadeInUp>
              <p id="beauty-team-title" className="mini-heading">
                {t("beautyTeamLabel")}
              </p>
              <ul className="beauty-team-list">
                {team.map((member) => (
                  <li key={member}>{member}</li>
                ))}
              </ul>
            </FadeInUp>
          </div>
        </section>
      ) : null}
    </article>
    <CaseRelated related={related} />
    </>
  );
}
