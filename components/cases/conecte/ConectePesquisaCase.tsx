"use client";

import { useLayoutEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CaseRelated } from "@/components/cases/CaseRelated";
import { HeroScrollCue } from "@/components/media/HeroScrollCue";
import { asap } from "@/lib/fonts/asap";
import { lexend } from "@/lib/fonts/lexend";
import { conecteReport, type ConecteShot } from "@/lib/media/conecte-assets";
import type { CaseContent } from "@/lib/content/cases-registry";

type RelatedCase = {
  id: string;
  slug: string;
  title: string;
  cover: string;
  coverAlt: string;
};

type ConectePesquisaCaseProps = {
  content: CaseContent;
  related: RelatedCase[];
};

function Label({ children }: { children: string }) {
  return <p className="pesquisa-label">{children}</p>;
}

function Sheet({
  shot,
  className = "",
  sizes,
  priority = false,
}: {
  shot: ConecteShot;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <figure className={`pesquisa-sheet ${className}`.trim()}>
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        quality={90}
        priority={priority}
      />
    </figure>
  );
}

export function ConectePesquisaCase({ content, related }: ConectePesquisaCaseProps) {
  const t = useTranslations("cases");
  const story = content.story;
  const about = story?.chapters?.about;
  const process = story?.chapters?.process;
  const system = story?.chapters?.system;
  const applications = story?.chapters?.applications;
  const concept = story?.chapters?.concept;
  const identity = story?.chapters?.identity;
  const team = story?.team ?? [];
  const deliverables = story?.deliverables ?? [];
  const sheets = [
    { shot: conecteReport.cover, caption: t("pesquisaSheetCover") },
    { shot: conecteReport.method, caption: t("pesquisaSheetMethod") },
    { shot: conecteReport.results, caption: t("pesquisaSheetResults") },
    { shot: conecteReport.valuation, caption: t("pesquisaSheetValuation") },
  ];

  useLayoutEffect(() => {
    document.documentElement.classList.add("conecte-pesquisa-page");
    return () => document.documentElement.classList.remove("conecte-pesquisa-page");
  }, []);

  return (
    <article className={`pesquisa-case ${lexend.variable} ${asap.variable}`}>
      <section className="pesquisa-hero">
        <div className="pesquisa-hero-pattern" aria-hidden>
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="container-site pesquisa-hero-grid">
          <div className="pesquisa-hero-copy">
            <Label>{t("pesquisaVoice")}</Label>
            <h1 className="pesquisa-hero-title">{content.title}</h1>
            <p className="pesquisa-hero-lead">{content.summary}</p>
          </div>
          <Sheet
            shot={conecteReport.cover}
            className="pesquisa-hero-sheet"
            sizes="(max-width: 899px) 78vw, 440px"
            priority
          />
        </div>
        <HeroScrollCue targetId="pesquisa-intro" label={t("pesquisaScroll")} />
      </section>

      <section className="pesquisa-bleed" aria-label={t("pesquisaBleedQuote")}>
        <Image
          src={conecteReport.bleed.src}
          alt={conecteReport.bleed.alt}
          fill
          sizes="100vw"
          quality={82}
          className="pesquisa-bleed-photo"
        />
        <p className="pesquisa-bleed-quote">{t("pesquisaBleedQuote")}</p>
      </section>

      <section className="pesquisa-seal">
        <div className="container-site">
          <Label>{t("pesquisaSealLabel")}</Label>
          <p className="pesquisa-seal-title">{t("pesquisaSeal")}</p>
          {identity?.body ? <p className="pesquisa-seal-body">{identity.body}</p> : null}
        </div>
      </section>

      <section className="pesquisa-intro pesquisa-wash" id="pesquisa-intro">
        <div className="container-site">
          <ul className="pesquisa-services">
            {content.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
          {story?.approachLead ? <p className="pesquisa-approach-lead">{story.approachLead}</p> : null}
          {story?.approach ? <p className="pesquisa-copy">{story.approach}</p> : null}
          <div className="pesquisa-story">
            <article className="pesquisa-story-card">
              <Label>{t("challenge")}</Label>
              <p>{content.challenge}</p>
            </article>
            <article className="pesquisa-story-card pesquisa-story-card-accent">
              <Label>{t("solution")}</Label>
              <p>{content.solution}</p>
            </article>
          </div>
        </div>
      </section>

      {about ? (
        <section className="pesquisa-about pesquisa-purple" aria-labelledby="pesquisa-about-title">
          <div className="container-site pesquisa-split">
            <div>
              <Label>{t("pesquisaIndexLabel")}</Label>
              <h2 id="pesquisa-about-title" className="pesquisa-title">
                {about.title}
              </h2>
              <p className="pesquisa-copy">{about.body}</p>
              {about.points && about.points.length > 0 ? (
                <ol className="pesquisa-toc">
                  {about.points.map((point, index) => (
                    <li key={point}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {point}
                    </li>
                  ))}
                </ol>
              ) : null}
            </div>
            <Sheet
              shot={conecteReport.index}
              className="pesquisa-sheet-matte"
              sizes="(max-width: 900px) 78vw, 420px"
            />
          </div>
        </section>
      ) : null}

      {deliverables.length > 0 ? (
        <section className="pesquisa-kit pesquisa-wash" aria-labelledby="pesquisa-kit-title">
          <div className="container-site">
            <Label>{t("pesquisaMethodLabel")}</Label>
            <h2 id="pesquisa-kit-title" className="pesquisa-title">
              {process?.title ?? t("pesquisaMethodLabel")}
            </h2>
            {process?.body ? <p className="pesquisa-copy">{process.body}</p> : null}
            <div className="pesquisa-kit-grid">
              <ul className="pesquisa-specs">
                {deliverables.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong>
                    <span>{item.body}</span>
                  </li>
                ))}
              </ul>
              <Sheet
                shot={conecteReport.config}
                className="pesquisa-sheet-matte"
                sizes="(max-width: 900px) 78vw, 400px"
              />
            </div>
          </div>
        </section>
      ) : null}

      {concept ? (
        <section className="pesquisa-roles pesquisa-lilac" aria-labelledby="pesquisa-roles-title">
          <div className="container-site">
            <Label>{t("pesquisaRolesLabel")}</Label>
            <h2 id="pesquisa-roles-title" className="pesquisa-title">
              {concept.title}
            </h2>
            <p className="pesquisa-copy">{concept.body}</p>
            <div className="pesquisa-spread">
              <div>
                <Sheet shot={conecteReport.method} sizes="(max-width: 800px) 82vw, 420px" />
                <p className="pesquisa-caption">{t("pesquisaSheetMethod")}</p>
              </div>
              <div>
                <Sheet shot={conecteReport.results} sizes="(max-width: 800px) 82vw, 420px" />
                <p className="pesquisa-caption">{t("pesquisaSheetResults")}</p>
              </div>
            </div>
            {concept.pairs && concept.pairs.length > 0 ? (
              <div className="pesquisa-role-grid">
                {concept.pairs.map((pair, index) => (
                  <article key={pair.title}>
                    <span className="pesquisa-label">{String(index + 1).padStart(2, "0")}</span>
                    <h3>{pair.title}</h3>
                    <p>{pair.body}</p>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {system ? (
        <section className="pesquisa-score pesquisa-wash" aria-labelledby="pesquisa-score-title">
          <div className="container-site pesquisa-split">
            <div>
              <Label>{t("pesquisaAxesLabel")}</Label>
              <h2 id="pesquisa-score-title" className="pesquisa-title">
                {system.title}
              </h2>
              <p className="pesquisa-copy">{system.body}</p>
            </div>
            {system.points && system.points.length > 0 ? (
              <ol className="pesquisa-axes">
                {system.points.map((point) => (
                  <li key={point}>
                    <span>{point}</span>
                    <i aria-hidden />
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        </section>
      ) : null}

      {identity?.points && identity.points.length > 0 ? (
        <section className="pesquisa-levels pesquisa-purple" aria-labelledby="pesquisa-levels-title">
          <div className="container-site">
            <Label>{t("pesquisaLevelsLabel")}</Label>
            <h2 id="pesquisa-levels-title" className="pesquisa-title">
              {t("pesquisaLevelsTitle")}
            </h2>
            <ol className="pesquisa-ladder">
              {identity.points.map((point, index) => (
                <li key={point}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{point}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {applications ? (
        <section className="pesquisa-findings pesquisa-wash" aria-labelledby="pesquisa-findings-title">
          <div className="container-site">
            <Label>{t("pesquisaFindingsLabel")}</Label>
            <h2 id="pesquisa-findings-title" className="pesquisa-title">
              {applications.title}
            </h2>
            <p className="pesquisa-copy">{applications.body}</p>
            {applications.pairs && applications.pairs.length > 0 ? (
              <div className="pesquisa-find-grid">
                {applications.pairs.map((pair) => (
                  <article key={pair.title}>
                    {pair.voice ? <span className="pesquisa-label">{pair.voice}</span> : null}
                    <h3>{pair.title}</h3>
                    <p>{pair.body}</p>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="pesquisa-specimen pesquisa-wash" aria-labelledby="pesquisa-specimen-title">
        <div className="container-site">
          <Label>{t("pesquisaSpecimenLabel")}</Label>
          <h2 id="pesquisa-specimen-title" className="pesquisa-title">
            {t("pesquisaSpecimenTitle")}
          </h2>
          <p className="pesquisa-copy">{t("pesquisaSpecimenBody")}</p>
          <ul className="pesquisa-gallery">
            {sheets.map((item) => (
              <li key={item.shot.src}>
                <Sheet shot={item.shot} className="pesquisa-sheet-matte" sizes="(max-width: 800px) 78vw, 320px" />
                <p className="pesquisa-caption">{item.caption}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {team.length > 0 ? (
        <section className="pesquisa-team pesquisa-purple">
          <div className="container-site">
            <Label>{t("pesquisaTeamLabel")}</Label>
            <ul>
              {team.map((member) => (
                <li key={member}>{member}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CaseRelated related={related} />
    </article>
  );
}
