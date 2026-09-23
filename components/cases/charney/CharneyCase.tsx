"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FadeInUp } from "@/components/animation/FadeInUp";
import { CaseRelated } from "@/components/cases/CaseRelated";
import { CharneyPinnedScreens } from "@/components/cases/charney/CharneyPinnedScreens";
import { barlowCondensed } from "@/lib/fonts/barlow-condensed";
import {
  charneyMark,
  charneyMobile,
  charneyPhotos,
  charneyScreens,
} from "@/lib/media/charney-assets";
import type { CaseContent } from "@/lib/content/cases-registry";

gsap.registerPlugin(ScrollTrigger);

type RelatedCase = {
  id: string;
  slug: string;
  title: string;
  cover: string;
  coverAlt: string;
};

type CharneyCaseProps = {
  content: CaseContent;
  related: RelatedCase[];
};

export function CharneyCase({ content, related }: CharneyCaseProps) {
  const t = useTranslations("cases");
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const phonesRef = useRef<HTMLElement>(null);
  const story = content.story;
  const about = story?.chapters?.about;
  const process = story?.chapters?.process;
  const team = story?.team ?? [];

  useEffect(() => {
    document.documentElement.classList.add("charney-page");
    return () => document.documentElement.classList.remove("charney-page");
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const hero = heroRef.current;
      if (hero) {
        const photo = hero.querySelector(".charney-hero-photo");
        if (photo) {
          gsap.fromTo(
            photo,
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

      const about = aboutRef.current;
      if (about) {
        const mark = about.querySelector(".charney-scribble");
        const photo = about.querySelector(".charney-about-photo img");
        if (mark) {
          gsap.fromTo(
            mark,
            { scaleX: 0, opacity: 0 },
            {
              scaleX: 1,
              opacity: 1,
              duration: 0.9,
              ease: "power2.out",
              scrollTrigger: { trigger: about, start: "top 70%" },
            },
          );
        }
        if (photo) {
          gsap.fromTo(
            photo,
            { y: 36, scale: 1.06 },
            {
              y: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: about,
                start: "top 80%",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
      }

      const phones = phonesRef.current;
      if (phones) {
        const cards = phones.querySelectorAll(".charney-phone");
        gsap.from(cards, {
          y: 64,
          opacity: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: phones, start: "top 75%" },
        });
        cards.forEach((card, index) => {
          gsap.to(card, {
            y: (index - 1) * 18,
            ease: "none",
            scrollTrigger: {
              trigger: phones,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <article className={`charney-case ${barlowCondensed.variable}`}>
      <section ref={heroRef} className="charney-hero">
        <div className="charney-hero-split">
          <div className="charney-hero-panel">
            <div className="charney-hero-tags">
              {content.services.map((service) => (
                <span key={service}>{service}</span>
              ))}
              <em>{t("charneyYear")}</em>
            </div>
            <div className="charney-hero-copy">
              <p className="charney-chip">{t("charneyVoice")}</p>
              <p className="charney-kicker">{t("charneyKicker")}</p>
              <h1 className="charney-hero-title">{content.title}</h1>
              <p className="charney-hero-summary">{content.summary}</p>
            </div>
          </div>
          <figure className="charney-hero-media">
            <Image
              src={charneyPhotos.hero.src}
              alt=""
              fill
              priority
              sizes="(max-width: 899px) 100vw, 50vw"
              className="charney-hero-photo"
              quality={78}
            />
          </figure>
        </div>
        <nav className="charney-hero-pillars" aria-label={t("charneyPillarsLabel")}>
          <span>{t("charneyPillarDev")}</span>
          <span>{t("charneyPillarBrokerage")}</span>
          <span>{t("charneyPillarManagement")}</span>
        </nav>
      </section>

      <figure className="charney-opening-site">
        <Image
          src={charneyScreens.heroSite.src}
          alt={charneyScreens.heroSite.alt}
          width={charneyScreens.heroSite.width}
          height={charneyScreens.heroSite.height}
          sizes="(max-width: 1100px) 92vw, 1167px"
          quality={74}
        />
      </figure>

      <div className="container-site charney-intro">
        <FadeInUp>
          <section>
            <h2 className="mini-heading">{t("challenge")}</h2>
            <p>{content.challenge}</p>
          </section>
        </FadeInUp>
        <FadeInUp>
          <section>
            <h2 className="mini-heading">{t("solution")}</h2>
            <p>{content.solution}</p>
          </section>
        </FadeInUp>
      </div>

      <section ref={aboutRef} className="charney-about" aria-labelledby="charney-about-title">
        <div className="container-site charney-about-grid">
          <div>
            <p className="mini-heading">{t("charneyAboutLabel")}</p>
            <h2 id="charney-about-title" className="charney-display">
              {about?.title ?? t("charneyAboutTitle")}
              <span>{t("charneyAboutAccent")}</span>
            </h2>
            <div className="charney-scribble" aria-hidden>
              <img src={charneyMark} alt="" width={403} height={152} />
            </div>
            {about?.body ? <p className="charney-body">{about.body}</p> : null}
          </div>
          <figure className="charney-about-photo">
            <Image
              src={charneyPhotos.greenhouse.src}
              alt={charneyPhotos.greenhouse.alt}
              width={charneyPhotos.greenhouse.width}
              height={charneyPhotos.greenhouse.height}
              sizes="(max-width: 900px) 100vw, 40vw"
              quality={74}
            />
          </figure>
        </div>
      </section>

      <div className="charney-screens-wrap">
        <div className="charney-screens-bg" aria-hidden>
          <Image src={charneyPhotos.dime.src} alt="" fill sizes="100vw" className="object-cover" quality={70} />
        </div>
        <CharneyPinnedScreens
          left={{ shot: charneyScreens.home }}
          right={{ shot: charneyScreens.development, offset: 0.06 }}
          overlay={charneyPhotos.overlay}
        />
      </div>

      <section className="charney-process" aria-labelledby="charney-process-title">
        <div className="container-site">
          <FadeInUp>
            <p className="mini-heading">{t("charneyProcessLabel")}</p>
            <h2 id="charney-process-title" className="charney-display">
              {process?.title ?? t("charneyProcessTitle")}
              <span>{t("charneyProcessAccent")}</span>
            </h2>
            <div className="charney-scribble charney-scribble-static" aria-hidden>
              <img src={charneyMark} alt="" width={403} height={152} />
            </div>
            {process?.body ? <p className="charney-body">{process.body}</p> : null}
          </FadeInUp>
        </div>
      </section>

      <div className="charney-screens-wrap charney-screens-wrap-dark">
        <CharneyPinnedScreens
          left={{ shot: charneyScreens.management }}
          right={{ shot: charneyScreens.brokerage, offset: 0.1 }}
          dark
        />
      </div>

      <section ref={phonesRef} className="charney-phones" aria-label={t("charneyMobileLabel")}>
        <div className="charney-phones-bg" aria-hidden>
          <Image
            src={charneyPhotos.dimeSkyline.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            quality={70}
          />
        </div>
        <div className="container-site charney-phones-stage">
          <figure className="charney-phone charney-phone-nav">
            <Image
              src={charneyMobile.nav.src}
              alt={charneyMobile.nav.alt}
              fill
              sizes="(max-width: 767px) 72vw, 300px"
              className="charney-phone-shot"
            />
          </figure>
          <figure className="charney-phone charney-phone-blog">
            <Image
              src={charneyMobile.blog.src}
              alt={charneyMobile.blog.alt}
              fill
              sizes="(max-width: 767px) 72vw, 300px"
              className="charney-phone-shot"
            />
          </figure>
          <figure className="charney-phone charney-phone-team">
            <Image
              src={charneyMobile.blogMenu.src}
              alt={charneyMobile.blogMenu.alt}
              fill
              sizes="(max-width: 767px) 72vw, 300px"
              className="charney-phone-shot"
            />
          </figure>
        </div>
      </section>

      <section className="charney-thanks">
        <div className="container-site charney-thanks-grid">
          <div>
            <p className="charney-chip">{t("charneyVoice")}</p>
            <p className="charney-thanks-title">{t("charneyThanks")}</p>
            <p className="charney-thanks-body">{t("charneyThanksBody")}</p>
          </div>
          {team.length > 0 ? (
            <ul className="charney-credits">
              {team.map((person) => (
                <li key={person}>{person}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      <CaseRelated related={related} />
    </article>
  );
}
