"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FadeInUp } from "@/components/animation/FadeInUp";
import { HeroScrollCue } from "@/components/media/HeroScrollCue";
import { CaseRelated } from "@/components/cases/CaseRelated";
import { SyxSystem } from "@/components/cases/syx/SyxSystem";
import { ibmPlexSans } from "@/lib/fonts/ibm-plex-sans";
import { workSans } from "@/lib/fonts/work-sans";
import {
  syxApps,
  syxLogos,
  syxPaletteNeutral,
  syxPalettePrimary,
  syxPaletteSecondary,
  syxTypeScale,
  type SyxSwatch,
} from "@/lib/media/syx-assets";
import type { CaseContent } from "@/lib/content/cases-registry";

type RelatedCase = {
  id: string;
  slug: string;
  title: string;
  cover: string;
  coverAlt: string;
};

type SyxCaseProps = {
  content: CaseContent;
  related: RelatedCase[];
};

export function SyxCase({ content, related }: SyxCaseProps) {
  const t = useTranslations("cases");
  const story = content.story;
  const chapters = story?.chapters;

  useEffect(() => {
    document.documentElement.classList.add("syx-page");
    return () => document.documentElement.classList.remove("syx-page");
  }, []);

  return (
    <article className={`syx-case ${ibmPlexSans.variable} ${workSans.variable}`}>
      <section className="syx-hero">
        <div className="syx-hero-shapes" aria-hidden>
          <span className="syx-hero-lime" />
        </div>
        <div className="syx-hero-wrap">
          <div className="container-site">
            <div className="syx-hero-content">
              <div className="syx-hero-chips">
                <p className="syx-chip">{t("syxVoice")}</p>
                <p className="syx-chip">{t("caseKindStyleguide")}</p>
              </div>
              <p className="syx-hero-kicker">{t("syxKicker")}</p>
              <img
                src={syxLogos.black}
                alt="SYX"
                width={252}
                height={104}
                className="syx-hero-wordmark"
              />
              <h1 className="syx-hero-title">
                <span>{t("syxGuideLight")}</span>
                <span>{t("syxGuideStrong")}</span>
              </h1>
              <p className="syx-hero-year">{t("syxYear")}</p>
              <p className="syx-hero-summary">{content.summary}</p>
            </div>
          </div>
        </div>
        <HeroScrollCue targetId="syx-intro" label={t("syxScroll")} />
      </section>

      <div className="container-site syx-intro" id="syx-intro">
        <FadeInUp>
          <ul className="syx-services" aria-label={t("services")}>
            {content.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </FadeInUp>

        <div className="syx-story">
          <FadeInUp>
            <section className="syx-story-block">
              <h2 className="mini-heading">{t("challenge")}</h2>
              <p>{content.challenge}</p>
            </section>
          </FadeInUp>
          <FadeInUp>
            <section className="syx-story-block syx-story-block-accent">
              <h2 className="mini-heading">{t("solution")}</h2>
              <p className="whitespace-pre-line">{content.solution}</p>
            </section>
          </FadeInUp>
        </div>
      </div>

      {story?.approachLead || story?.approach ? (
        <section className="syx-band" aria-labelledby="syx-approach-heading">
          <div className="container-site">
            <FadeInUp>
              <p id="syx-approach-heading" className="mini-heading">
                {t("syxVoice")}
              </p>
              {story.approachLead ? <p className="syx-band-lead">{story.approachLead}</p> : null}
              {story.approach ? <p className="syx-band-text">{story.approach}</p> : null}
            </FadeInUp>
          </div>
        </section>
      ) : null}

      {story?.deliverables && story.deliverables.length > 0 ? (
        <div className="container-site">
          <section className="syx-deliverables">
            <FadeInUp>
              <p className="mini-heading syx-chapter-label">{t("syxDeliverables")}</p>
            </FadeInUp>
            <ol className="syx-index">
              {story.deliverables.map((item, index) => (
                <li key={item.title} className="syx-index-item">
                  <span className="syx-index-num" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="syx-index-title">{item.title}</h3>
                  <p className="syx-index-body">{item.body}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      ) : null}

      {chapters?.identity ? (
        <section className="syx-chapter syx-identity" aria-labelledby="syx-identity-title">
          <div className="container-site">
            <FadeInUp>
              <p className="mini-heading syx-chapter-label">{t("syxIdentityLabel")}</p>
              <h2 id="syx-identity-title" className="syx-chapter-title">
                {chapters.identity.title}
              </h2>
              <p className="syx-chapter-body">{chapters.identity.body}</p>
            </FadeInUp>
            <div className="syx-logo-grid">
              <figure className="syx-logo-card">
                <img src={syxLogos.black} alt="" width={252} height={104} />
                <figcaption>{t("syxLogoNeutral")}</figcaption>
              </figure>
              <figure className="syx-logo-card syx-logo-card-ink">
                <img src={syxLogos.white} alt="" width={252} height={104} />
                <figcaption>{t("syxLogoWhite")}</figcaption>
              </figure>
              <figure className="syx-logo-card">
                <img src={syxLogos.sober} alt="" width={252} height={104} />
                <figcaption>{t("syxLogoSober")}</figcaption>
              </figure>
              <figure className="syx-logo-card syx-logo-card-ink">
                <img src={syxLogos.magic} alt="" width={252} height={104} />
                <figcaption>{t("syxLogoMagic")}</figcaption>
              </figure>
            </div>
          </div>
        </section>
      ) : null}

      {chapters?.palette ? (
        <section className="syx-chapter syx-palette" aria-labelledby="syx-palette-title">
          <div className="container-site">
            <FadeInUp>
              <p className="mini-heading syx-chapter-label">{t("syxPaletteLabel")}</p>
              <h2 id="syx-palette-title" className="syx-chapter-title">
                {chapters.palette.title}
              </h2>
              <p className="syx-chapter-body">{chapters.palette.body}</p>
            </FadeInUp>
            <PaletteRow label={t("syxPalettePrimary")} swatches={syxPalettePrimary} />
            <PaletteRow label={t("syxPaletteSecondary")} swatches={syxPaletteSecondary} />
            <PaletteRow label={t("syxPaletteNeutral")} swatches={syxPaletteNeutral} />
          </div>
        </section>
      ) : null}

      {chapters?.type ? (
        <section className="syx-chapter syx-type" aria-labelledby="syx-type-title">
          <div className="container-site">
            <FadeInUp>
              <p className="mini-heading syx-chapter-label">{t("syxTypeLabel")}</p>
              <h2 id="syx-type-title" className="syx-chapter-title">
                {chapters.type.title}
              </h2>
              <p className="syx-chapter-body">{chapters.type.body}</p>
            </FadeInUp>
            <div className="syx-type-specimen">
              <p className="syx-type-display" aria-hidden>
                IBM Plex Sans
              </p>
              <ul className="syx-type-scale" aria-label={t("syxTypeScale")}>
                {syxTypeScale.map((item) => (
                  <li key={item.name}>
                    <span>{item.name}</span>
                    <strong>{item.size}</strong>
                  </li>
                ))}
              </ul>
              <p className="syx-type-support">{t("syxTypeSupport")}</p>
            </div>
          </div>
        </section>
      ) : null}

      {chapters?.graphics ? (
        <section className="syx-chapter syx-forms" aria-labelledby="syx-forms-title">
          <div className="container-site">
            <FadeInUp>
              <p className="mini-heading syx-chapter-label">{t("syxFormsLabel")}</p>
              <h2 id="syx-forms-title" className="syx-chapter-title">
                {chapters.graphics.title}
              </h2>
              <p className="syx-chapter-body">{chapters.graphics.body}</p>
            </FadeInUp>
            <div className="syx-form-row">
              <div className="syx-form-group">
                <p>{t("syxFormsSym")}</p>
                <span className="syx-form-sym" />
              </div>
              <div className="syx-form-group">
                <p>{t("syxFormsAsym")}</p>
                <span className="syx-form-asym-a" />
                <span className="syx-form-asym-b" />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {chapters?.system ? (
        <SyxSystem
          title={chapters.system.title}
          body={chapters.system.body}
          cover={syxApps[2]?.src ?? content.cover}
        />
      ) : null}

      {chapters?.applications ? (
        <section className="syx-chapter syx-apps" aria-labelledby="syx-apps-title">
          <div className="container-site">
            <FadeInUp>
              <p className="mini-heading syx-chapter-label">{t("syxApplicationsLabel")}</p>
              <h2 id="syx-apps-title" className="syx-chapter-title">
                {chapters.applications.title}
              </h2>
              <p className="syx-chapter-body">{chapters.applications.body}</p>
            </FadeInUp>
            <div className="syx-apps-grid">
              {syxApps.map((item) => (
                <figure key={item.src} className="syx-app-card">
                  <div className="syx-app-media">
                    <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="(max-width: 700px) 100vw, 50vw" />
                  </div>
                  <figcaption>{t(item.labelKey)}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="syx-closing" aria-label={t("syxGuideStrong")}>
        <div className="syx-closing-shapes" aria-hidden>
          <span className="syx-closing-lime" />
        </div>
        <div className="container-site syx-closing-content">
          <p className="syx-chip">{t("syxVoice")}</p>
          <img src={syxLogos.white} alt="" width={252} height={104} className="syx-closing-wordmark" />
          <p className="syx-closing-quote">{t("syxGuideLight")} {t("syxGuideStrong")}</p>
          <p className="syx-closing-credit">{t("syxClosingCredit")}</p>
        </div>
      </section>

      <CaseRelated related={related} tone="syx" />
    </article>
  );
}

function PaletteRow({ label, swatches }: { label: string; swatches: readonly SyxSwatch[] }) {
  return (
    <div className="syx-palette-row">
      <p className="syx-palette-row-label">{label}</p>
      <ul className="syx-swatches">
        {swatches.map((swatch) => (
          <li key={swatch.hex} className="syx-swatch" style={{ backgroundColor: swatch.hex, color: swatch.text }}>
            <span>{swatch.name}</span>
            <span>{swatch.hex}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
