"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { AnimatedHeading } from "@/components/animation/AnimatedHeading";
import { FadeInUp } from "@/components/animation/FadeInUp";
import { SestiniApplications } from "@/components/cases/sestini/SestiniApplications";
import { SestiniLanguage } from "@/components/cases/sestini/SestiniLanguage";
import { unbounded } from "@/lib/fonts/unbounded";
import { sestiniLogos, sestiniPalette, sestiniPaletteSecondary } from "@/lib/media/sestini-assets";
import type { CaseContent } from "@/lib/content/cases-registry";

type RelatedCase = {
  id: string;
  slug: string;
  title: string;
  cover: string;
  coverAlt: string;
};

type SestiniCaseProps = {
  content: CaseContent;
  related: RelatedCase[];
};

export function SestiniCase({ content, related }: SestiniCaseProps) {
  const t = useTranslations("cases");
  const story = content.story;
  const chapters = story?.chapters;
  const quote = story?.quote ?? "A gente cuida, você vai.";

  useEffect(() => {
    document.documentElement.classList.add("sestini-page");
    return () => document.documentElement.classList.remove("sestini-page");
  }, []);

  return (
    <article className={`sestini-case ${unbounded.variable}`}>
      <section className="sestini-hero">
        <div className="sestini-hero-shape" aria-hidden>
          <img src={sestiniLogos.heroShape} alt="" width={1920} height={1080} />
        </div>
        <div className="sestini-hero-wrap">
          <div className="container-site">
            <div className="sestini-hero-content">
              <p className="sestini-studio-chip">{t("sestiniVoice")}</p>
              <p className="sestini-hero-kicker">{t("sestiniClientKicker")}</p>
              <img
                src={sestiniLogos.horizontal}
                alt="Sestini"
                width={883}
                height={200}
                className="sestini-hero-logo"
              />
              <h1 className="sestini-hero-title">
                <span className="sestini-hero-title-light">{t("sestiniGuideLight")}</span>
                <span>{t("sestiniGuideStrong")}</span>
              </h1>
              <p className="sestini-hero-summary">{content.summary}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-site sestini-intro">
        <FadeInUp>
          <ul className="sestini-services" aria-label={t("services")}>
            {content.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </FadeInUp>

        <div className="sestini-story">
          <FadeInUp>
            <section className="sestini-story-block">
              <h2 className="mini-heading">{t("challenge")}</h2>
              <p>{content.challenge}</p>
            </section>
          </FadeInUp>
          <FadeInUp>
            <section className="sestini-story-block sestini-story-block-accent">
              <h2 className="mini-heading">{t("solution")}</h2>
              <p className="whitespace-pre-line">{content.solution}</p>
            </section>
          </FadeInUp>
        </div>
      </div>

      {story?.approachLead || story?.approach ? (
        <section className="sestini-band" aria-labelledby="sestini-approach-heading">
          <div className="container-site">
            <FadeInUp>
              <p id="sestini-approach-heading" className="mini-heading">
                {t("sestiniVoice")}
              </p>
              {story.approachLead ? <p className="sestini-band-lead">{story.approachLead}</p> : null}
              {story.approach ? <p className="sestini-band-text">{story.approach}</p> : null}
            </FadeInUp>
          </div>
        </section>
      ) : null}

      {story?.deliverables && story.deliverables.length > 0 ? (
        <div className="container-site">
          <section className="sestini-deliverables">
            <FadeInUp>
              <p className="mini-heading sestini-chapter-label">{t("sestiniDeliverables")}</p>
            </FadeInUp>
            <ol className="sestini-index">
              {story.deliverables.map((item, index) => (
                <li key={item.title} className="sestini-index-item">
                  <span className="sestini-index-num" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="sestini-index-title">{item.title}</h3>
                  <p className="sestini-index-body">{item.body}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      ) : null}

      <section className="sestini-chapter" aria-labelledby="sestini-identity-title">
        <div className="container-site">
          <FadeInUp>
            <p className="mini-heading sestini-chapter-label">{t("sestiniIdentity")}</p>
            {chapters?.identity ? (
              <>
                <h2 id="sestini-identity-title" className="sestini-chapter-title">
                  {chapters.identity.title}
                </h2>
                <p className="sestini-chapter-body">{chapters.identity.body}</p>
              </>
            ) : (
              <h2 id="sestini-identity-title" className="sestini-chapter-title">
                {t("sestiniIdentity")}
              </h2>
            )}
          </FadeInUp>

          <div className="sestini-lockups">
            <figure className="sestini-lockup sestini-lockup-wide sestini-lockup-mirage">
              <img
                src={sestiniLogos.horizontal}
                alt=""
                width={883}
                height={200}
                className="sestini-lockup-mark sestini-lockup-mark-h"
              />
              <figcaption>{t("sestiniLockupH")}</figcaption>
            </figure>
            <figure className="sestini-lockup sestini-lockup-narrow">
              <img
                src={sestiniLogos.vertical}
                alt=""
                width={508}
                height={283}
                className="sestini-lockup-mark sestini-lockup-mark-v"
              />
              <figcaption>{t("sestiniLockupV")}</figcaption>
            </figure>
            <figure className="sestini-lockup sestini-lockup-wide sestini-lockup-white">
              <div className="sestini-lockup-stack">
                <img
                  src={sestiniLogos.horizontal}
                  alt=""
                  width={883}
                  height={200}
                  className="sestini-lockup-mark sestini-lockup-mark-h"
                />
                <img
                  src={sestiniLogos.tagline}
                  alt=""
                  width={478}
                  height={40}
                  className="sestini-lockup-tagline sestini-lockup-tagline-offset"
                />
              </div>
              <figcaption>{t("sestiniLockupHTag")}</figcaption>
            </figure>
            <figure className="sestini-lockup sestini-lockup-narrow">
              <div className="sestini-lockup-stack sestini-lockup-stack-center">
                <img
                  src={sestiniLogos.vertical}
                  alt=""
                  width={508}
                  height={283}
                  className="sestini-lockup-mark sestini-lockup-mark-v"
                />
                <img
                  src={sestiniLogos.tagline}
                  alt=""
                  width={478}
                  height={40}
                  className="sestini-lockup-tagline"
                />
              </div>
              <figcaption>{t("sestiniLockupVTag")}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="sestini-chapter sestini-palette" aria-labelledby="sestini-palette-title">
        <div className="container-site">
          <div className="sestini-palette-intro">
            <FadeInUp>
              <p className="mini-heading sestini-chapter-label">{t("sestiniPalette")}</p>
              {chapters?.palette ? (
                <>
                  <h2 id="sestini-palette-title" className="sestini-chapter-title">
                    {chapters.palette.title}
                  </h2>
                  <p className="sestini-chapter-body">{chapters.palette.body}</p>
                </>
              ) : (
                <h2 id="sestini-palette-title" className="sestini-chapter-title">
                  {t("sestiniPalette")}
                </h2>
              )}
            </FadeInUp>
          </div>
          <div className="sestini-swatch-grid">
            {sestiniPalette.map((color, index) => (
              <div
                key={color.hex}
                className={`sestini-swatch${color.bordered ? " sestini-swatch-bordered" : ""}${index === 0 ? " sestini-swatch-hero" : ""}`}
                style={{ backgroundColor: color.hex, color: color.text }}
              >
                <span className="sestini-swatch-name">{color.name}</span>
                <span className="sestini-swatch-hex">{color.hex}</span>
              </div>
            ))}
          </div>
          <div className="sestini-swatch-row">
            {sestiniPaletteSecondary.map((color) => (
              <div
                key={color.hex}
                className="sestini-swatch sestini-swatch-secondary"
                style={{ backgroundColor: color.hex, color: color.text }}
              >
                <span className="sestini-swatch-name">{color.name}</span>
                <span className="sestini-swatch-hex">{color.hex}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SestiniLanguage part="inspire" inspiration={chapters?.inspiration} quote={quote} />

      <section className="sestini-chapter sestini-type" aria-labelledby="sestini-type-title">
        <div className="container-site">
          <FadeInUp>
            <p className="mini-heading sestini-chapter-label">{t("sestiniType")}</p>
            {chapters?.type ? (
              <>
                <h2 id="sestini-type-title" className="sestini-chapter-title">
                  {chapters.type.title}
                </h2>
                <p className="sestini-chapter-body">{chapters.type.body}</p>
              </>
            ) : (
              <h2 id="sestini-type-title" className="sestini-chapter-title">
                {t("sestiniType")}
              </h2>
            )}
          </FadeInUp>
          <div className="sestini-type-specimen">
            <p className="sestini-type-display" aria-hidden>
              Unbounded
            </p>
            <ul className="sestini-type-weights" aria-label={t("sestiniTypeWeights")}>
              <li className="sestini-type-regular">Regular</li>
              <li className="sestini-type-medium">Medium</li>
              <li className="sestini-type-bold">Bold</li>
            </ul>
            <p className="sestini-type-alphabet" aria-hidden>
              Aa Gg Rr Ss  0123456789
            </p>
            <p className="sestini-type-phrase">{quote}</p>
          </div>
        </div>
      </section>

      <SestiniLanguage
        part="system"
        graphics={chapters?.graphics}
        elements={chapters?.elements}
        quote={quote}
      />

      <SestiniApplications title={chapters?.applications?.title} body={chapters?.applications?.body} />

      <section className="sestini-closing" aria-label={quote}>
        <div className="container-site sestini-closing-content">
          <p className="sestini-studio-chip">{t("sestiniVoice")}</p>
          <p className="sestini-closing-quote">{quote}</p>
          <p className="sestini-closing-credit">{t("sestiniClosingCredit")}</p>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="sestini-related">
          <div className="container-site">
            <AnimatedHeading
              as="h2"
              text={t("related")}
              trigger="scroll"
              className="mb-8 text-[length:var(--text-h2)]"
            />
            <div className="sestini-related-grid">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={{ pathname: "/cases/[slug]", params: { slug: item.slug } }}
                  className="sestini-related-card group"
                >
                  <div className="sestini-related-cover">
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
