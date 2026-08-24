"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/lib/i18n/navigation";
import { AnimatedHeading } from "@/components/animation/AnimatedHeading";
import { FadeInUp } from "@/components/animation/FadeInUp";
import { HeroScrollCue } from "@/components/media/HeroScrollCue";
import { NeodentIsoFrames } from "@/components/cases/neodent/NeodentIsoFrames";
import { NeodentLockup } from "@/components/cases/neodent/NeodentLockup";
import { publicSans } from "@/lib/fonts/public-sans";
import { neodentPhotos, neodentScreens } from "@/lib/media/neodent-assets";
import type { CaseContent } from "@/lib/content/cases-registry";

gsap.registerPlugin(ScrollTrigger);

type RelatedCase = {
  id: string;
  slug: string;
  title: string;
  cover: string;
  coverAlt: string;
};

type NeodentCaseProps = {
  content: CaseContent;
  related: RelatedCase[];
};

export function NeodentCase({ content, related }: NeodentCaseProps) {
  const t = useTranslations("cases");
  const heroRef = useRef<HTMLElement>(null);
  const story = content.story;
  const about = story?.chapters?.about;
  const process = story?.chapters?.process;
  const team = story?.team ?? [];

  useEffect(() => {
    document.documentElement.classList.add("neodent-page");
    return () => document.documentElement.classList.remove("neodent-page");
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const hero = heroRef.current;
      if (hero) {
        gsap.from(hero.querySelectorAll(".neodent-hero-anim"), {
          opacity: 0,
          y: 24,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
        });

        const photo = hero.querySelector(".neodent-hero-photo");
        if (photo) {
          gsap.fromTo(
            photo,
            { y: 28, scale: 1.04 },
            {
              y: -12,
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

      gsap.from(".neodent-stage-anim", {
        y: 48,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".neodent-stage",
          start: "top 74%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <article className={`neodent-case ${publicSans.variable}`}>
      <section ref={heroRef} className="neodent-hero">
        <span className="neodent-orb neodent-orb-tl" aria-hidden />
        <span className="neodent-orb neodent-orb-br" aria-hidden />
        <span className="neodent-orb neodent-orb-fill" aria-hidden />
        <div className="container-site neodent-hero-top">
          <div className="neodent-hero-tags neodent-hero-anim">
            {content.services.map((service) => (
              <span key={service}>{service}</span>
            ))}
            <em>{t("neodentYear")}</em>
          </div>
        </div>
        <figure className="container-site neodent-hero-media">
          <Image
            src={neodentPhotos.hero.src}
            alt={neodentPhotos.hero.alt}
            width={neodentPhotos.hero.width}
            height={neodentPhotos.hero.height}
            priority
            sizes="(max-width: 1100px) 92vw, 1240px"
            quality={78}
            className="neodent-hero-photo"
          />
        </figure>
        <HeroScrollCue targetId="neodent-intro" label={t("neodentScroll")} />
      </section>

      <div className="container-site neodent-intro" id="neodent-intro">
        <FadeInUp>
          <p className="neodent-chip">{t("neodentVoice")}</p>
          <p className="neodent-kicker">
            {t("neodentKicker")}
            <NeodentLockup className="neodent-lockup-kicker" decorative />
          </p>
          <h1 className="neodent-page-title">
            <NeodentLockup />
          </h1>
          <p className="neodent-lead">{content.summary}</p>
        </FadeInUp>
        <div className="neodent-story">
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
      </div>

      <section className="neodent-about" aria-labelledby="neodent-about-title">
        <span className="neodent-orb neodent-orb-about" aria-hidden />
        <div className="container-site neodent-about-grid">
          <FadeInUp>
            <p className="mini-heading neodent-on-dark">{t("neodentAboutLabel")}</p>
            <h2 id="neodent-about-title" className="neodent-about-heading">
              <span className="neodent-sr">{about?.title ?? t("neodentAboutTitle")}</span>
              <span className="neodent-display" aria-hidden="true">
                {t("neodentAboutLead")}
              </span>
              <NeodentLockup decorative />
            </h2>
            {about?.body ? <p className="neodent-body">{about.body}</p> : null}
          </FadeInUp>
          <figure className="neodent-about-photo">
            <Image
              src={neodentPhotos.about.src}
              alt={neodentPhotos.about.alt}
              width={neodentPhotos.about.width}
              height={neodentPhotos.about.height}
              sizes="(max-width: 900px) 100vw, 48vw"
              quality={76}
            />
          </figure>
        </div>
      </section>

      <section className="neodent-process" aria-labelledby="neodent-process-title">
        <div className="container-site neodent-process-grid">
          <FadeInUp>
            <p className="mini-heading">{t("neodentProcessLabel")}</p>
            <h2 id="neodent-process-title" className="neodent-display neodent-display-ink">
              {process?.title ?? t("neodentProcessTitle")}
            </h2>
            {process?.body ? <p className="neodent-process-body">{process.body}</p> : null}
          </FadeInUp>
          <ul className="neodent-stats">
            <li>
              <strong>14</strong>
              <span>{t("neodentCountries")}</span>
            </li>
            <li>
              <strong>7</strong>
              <span>{t("neodentLanguages")}</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="neodent-stage" aria-label={t("neodentScreensLabel")}>
        <span className="neodent-orb neodent-orb-stage" aria-hidden />
        <div className="container-site neodent-stage-grid">
          <figure className="neodent-desktop neodent-stage-anim">
            <Image
              src={neodentScreens.landing.src}
              alt={neodentScreens.landing.alt}
              width={neodentScreens.landing.width}
              height={neodentScreens.landing.height}
              sizes="(max-width: 900px) 100vw, 52vw"
              quality={72}
            />
          </figure>
          <div className="neodent-stage-side">
            <figure className="neodent-languages neodent-stage-anim">
              <Image
                src={neodentScreens.languages.src}
                alt={neodentScreens.languages.alt}
                width={neodentScreens.languages.width}
                height={neodentScreens.languages.height}
                sizes="(max-width: 900px) 100vw, 44vw"
                quality={76}
              />
            </figure>
            <div className="neodent-phones">
              {[neodentScreens.mobileOne, neodentScreens.mobileTwo, neodentScreens.mobileThree].map((shot) => (
                <figure key={shot.src} className="neodent-phone neodent-stage-anim">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    sizes="260px"
                    quality={74}
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="neodent-pair" aria-label={t("neodentScreensLabel")}>
        <div className="container-site neodent-pair-grid">
          <figure>
            <Image
              src={neodentScreens.landingTwo.src}
              alt={neodentScreens.landingTwo.alt}
              width={neodentScreens.landingTwo.width}
              height={neodentScreens.landingTwo.height}
              sizes="(max-width: 900px) 100vw, 48vw"
              quality={72}
            />
          </figure>
          <figure>
            <Image
              src={neodentScreens.landingThree.src}
              alt={neodentScreens.landingThree.alt}
              width={neodentScreens.landingThree.width}
              height={neodentScreens.landingThree.height}
              sizes="(max-width: 900px) 100vw, 48vw"
              quality={72}
            />
          </figure>
        </div>
      </section>

      <NeodentIsoFrames label={t("neodentMobileLabel")} />

      <section className="neodent-thanks">
        <div className="container-site neodent-thanks-grid">
          <div>
            <p className="neodent-chip neodent-chip-dark">{t("neodentVoice")}</p>
            <p className="neodent-thanks-title">{t("neodentThanks")}</p>
            <p className="neodent-thanks-body">{t("neodentThanksBody")}</p>
          </div>
          {team.length > 0 ? (
            <ul className="neodent-credits">
              {team.map((person) => (
                <li key={person}>{person}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      {related.length > 0 ? (
        <section className="neodent-related">
          <div className="container-site">
            <AnimatedHeading
              as="h2"
              text={t("related")}
              trigger="scroll"
              className="mb-8 text-[length:var(--text-h2)]"
            />
            <div className="neodent-related-grid">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={{ pathname: "/cases/[slug]", params: { slug: item.slug } }}
                  className="neodent-related-card group"
                >
                  <div className="neodent-related-cover">
                    <Image src={item.cover} alt={item.coverAlt} fill className="object-cover" sizes="320px" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg group-hover:text-primary">{item.title}</h3>
                    <span className="text-sm text-primary">{t("viewCase")} →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
