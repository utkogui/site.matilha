"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/lib/i18n/navigation";
import { AnimatedHeading } from "@/components/animation/AnimatedHeading";
import { PageTitle } from "@/components/animation/PageTitle";
import { FadeInUp } from "@/components/animation/FadeInUp";
import { PhoneMaskScroll } from "@/components/cases/meups/PhoneMaskScroll";
import { DesktopStickyScroll } from "@/components/cases/meups/DesktopStickyScroll";
import { DetailGrid } from "@/components/cases/meups/DetailGrid";
import { MeupsNarration } from "@/components/cases/meups/MeupsNarration";
import {
  meupsDesktopChapters,
  meupsDetailGrid,
  meupsHero,
  meupsPhoneRunway,
} from "@/lib/media/meups-shots";
import type { CaseContent } from "@/lib/content/cases-registry";

gsap.registerPlugin(ScrollTrigger);

type RelatedCase = {
  id: string;
  slug: string;
  title: string;
  cover: string;
  coverAlt: string;
};

type MeuPlaystationCaseProps = {
  content: CaseContent;
  related: RelatedCase[];
};

export function MeuPlaystationCase({ content, related }: MeuPlaystationCaseProps) {
  const t = useTranslations("cases");
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const story = content.story;
  const chapters = story?.chapters;
  const voice = t("meupsVoice");

  useEffect(() => {
    const media = heroMediaRef.current;
    if (!media) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const img = media.querySelector(".meups-hero-image");
    if (!img) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { scale: 1.08, y: 0 },
        {
          scale: 1,
          y: 48,
          ease: "none",
          scrollTrigger: {
            trigger: media,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, media);

    return () => ctx.revert();
  }, []);

  return (
    <article className="meups-case">
      <section className="meups-hero">
        <div ref={heroMediaRef} className="meups-hero-media" aria-hidden>
          <Image
            src={meupsHero.src}
            alt=""
            width={meupsHero.width}
            height={meupsHero.height}
            priority
            className="meups-hero-image"
            sizes="100vw"
          />
          <div className="meups-hero-overlay" />
        </div>

        <div className="container-site meups-hero-content">
          <p className="mini-heading">{t("meupsLabel")}</p>
          <PageTitle text={content.title} />
          <p className="meups-hero-summary">{content.summary}</p>
        </div>
      </section>

      <div className="container-site">
        <FadeInUp>
          <ul className="meups-services" aria-label={t("services")}>
            {content.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </FadeInUp>

        <div className="meups-story">
          <FadeInUp>
            <section className="meups-story-block">
              <h2 className="mini-heading">{t("challenge")}</h2>
              <p>{content.challenge}</p>
            </section>
          </FadeInUp>
          <FadeInUp>
            <section className="meups-story-block meups-story-block-accent">
              <h2 className="mini-heading">{t("solution")}</h2>
              <p className="whitespace-pre-line">{content.solution}</p>
            </section>
          </FadeInUp>
        </div>

        {story?.approachLead || story?.approach ? (
          <FadeInUp>
            <section className="meups-approach" aria-labelledby="meups-approach-heading">
              <p id="meups-approach-heading" className="mini-heading">
                {t("meupsApproach")}
              </p>
              {story.approachLead ? (
                <p className="meups-approach-lead">{story.approachLead}</p>
              ) : null}
              {story.approach ? <p className="meups-approach-text">{story.approach}</p> : null}
            </section>
          </FadeInUp>
        ) : null}

        {story?.deliverables && story.deliverables.length > 0 ? (
          <section className="meups-deliverables">
            <FadeInUp>
              <p className="mini-heading meups-chapter-label">{t("meupsDeliverables")}</p>
            </FadeInUp>
            <div className="meups-deliverables-grid">
              {story.deliverables.map((item, index) => (
                <FadeInUp key={item.title}>
                  <article className="meups-deliverable">
                    <span className="meups-deliverable-index" aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="meups-deliverable-title">{item.title}</h3>
                    <p className="meups-deliverable-body">{item.body}</p>
                  </article>
                </FadeInUp>
              ))}
            </div>
          </section>
        ) : null}

        {story?.quote ? (
          <FadeInUp>
            <blockquote className="meups-quote">
              <p>“{story.quote}”</p>
              {story.quoteAuthor ? <cite>{story.quoteAuthor}</cite> : null}
            </blockquote>
          </FadeInUp>
        ) : null}
      </div>

      {chapters?.app ? (
        <MeupsNarration
          eyebrow={voice}
          label={t("meupsApp")}
          title={chapters.app.title}
          body={chapters.app.body}
          points={chapters.app.points}
        />
      ) : null}
      <PhoneMaskScroll shots={meupsPhoneRunway} label={t("meupsApp")} />

      {chapters?.site ? (
        <MeupsNarration
          eyebrow={voice}
          label={t("meupsSite")}
          title={chapters.site.title}
          body={chapters.site.body}
          points={chapters.site.points}
        />
      ) : null}
      {meupsDesktopChapters
        .filter((chapter) => chapter.labelKey === "site")
        .map((chapter) => (
          <DesktopStickyScroll
            key={chapter.shot.src}
            shot={chapter.shot}
            label={t("meupsSite")}
          />
        ))}

      {chapters?.article ? (
        <MeupsNarration
          eyebrow={voice}
          label={t("meupsArticle")}
          title={chapters.article.title}
          body={chapters.article.body}
          points={chapters.article.points}
        />
      ) : null}
      {meupsDesktopChapters
        .filter((chapter) => chapter.labelKey === "article")
        .map((chapter) => (
          <DesktopStickyScroll
            key={chapter.shot.src}
            shot={chapter.shot}
            label={t("meupsArticle")}
          />
        ))}

      {chapters?.details ? (
        <MeupsNarration
          eyebrow={voice}
          label={t("meupsDetails")}
          title={chapters.details.title}
          body={chapters.details.body}
          points={chapters.details.points}
        />
      ) : null}

      <div className="container-site">
        <DetailGrid shots={meupsDetailGrid} label={t("meupsDetails")} />

        {story?.team && story.team.length > 0 ? (
          <FadeInUp>
            <section className="meups-team">
              <p className="mini-heading meups-chapter-label">{t("meupsTeam")}</p>
              <ul className="meups-team-list">
                {story.team.map((member) => (
                  <li key={member}>{member}</li>
                ))}
              </ul>
            </section>
          </FadeInUp>
        ) : null}

        {related.length > 0 && (
          <section className="meups-related">
            <AnimatedHeading
              as="h2"
              text={t("related")}
              trigger="scroll"
              className="mb-8 text-[length:var(--text-h2)]"
            />
            <div className="meups-related-grid">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={{ pathname: "/cases/[slug]", params: { slug: item.slug } }}
                  className="meups-related-card group"
                >
                  <div className="meups-related-cover">
                    <Image src={item.cover} alt={item.coverAlt} fill className="object-cover" sizes="320px" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg group-hover:text-primary">{item.title}</h3>
                    <span className="text-sm text-primary">{t("viewCase")} →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
