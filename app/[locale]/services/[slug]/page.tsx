import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HeroScrollCue } from "@/components/media/HeroScrollCue";
import { BrandingBuild } from "@/components/services/branding/BrandingBuild";
import { BrandingChallenge } from "@/components/services/branding/BrandingChallenge";
import { DaasBuild } from "@/components/services/daas/DaasBuild";
import { DaasChallenge } from "@/components/services/daas/DaasChallenge";
import { DevelopmentBuild } from "@/components/services/development/DevelopmentBuild";
import { DevelopmentChallenge } from "@/components/services/development/DevelopmentChallenge";
import { MvpBuild } from "@/components/services/mvp/MvpBuild";
import { MvpChallenge } from "@/components/services/mvp/MvpChallenge";
import { ServiceDesignBuild } from "@/components/services/service-design/ServiceDesignBuild";
import { ServiceDesignChallenge } from "@/components/services/service-design/ServiceDesignChallenge";
import { UxuiBuild } from "@/components/services/uxui/UxuiBuild";
import { UxuiChallenge } from "@/components/services/uxui/UxuiChallenge";
import { getAllCases } from "@/lib/content/cases";
import { getServiceBlurb } from "@/lib/content/service-blurbs";
import { getServicePageBySlug, servicePages } from "@/lib/content/services";
import { Link } from "@/lib/i18n/navigation";
import { locales, type Locale } from "@/lib/i18n/routing";
import { buildPageTitle, buildServiceMetadata } from "@/lib/seo/metadata";

type StepCopy = { title: string; body: string };

type ServicePageParams = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return servicePages.flatMap((item) => locales.map((locale) => ({ locale, slug: item.slugs[locale] })));
}

export async function generateMetadata({ params }: ServicePageParams): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServicePageBySlug(locale as Locale, slug);
  if (!service) return {};

  const tServices = await getTranslations({ locale, namespace: "services" });
  const t = await getTranslations({ locale, namespace: "servicePage" });

  return buildServiceMetadata({
    title: buildPageTitle(tServices(service.key), locale as Locale),
    description: t(`items.${service.key}.seoDescription`),
    locale: locale as Locale,
    slug,
    slugs: service.slugs,
    image: service.hero,
  });
}

function titleLineChars(title: string) {
  if (title.length <= 16) return title.length;
  return Math.ceil(title.length / 2) + 1;
}

export default async function ServicePage({ params }: ServicePageParams) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = getServicePageBySlug(locale as Locale, slug);
  if (!service) notFound();

  const t = await getTranslations("servicePage");
  const tServices = await getTranslations("services");
  const title = tServices(service.key);
  const index = servicePages.findIndex((item) => item.key === service.key);
  const deliverables = t.raw(`items.${service.key}.deliverables`) as StepCopy[];
  const process = t.raw("common.process") as StepCopy[];

  const allCases = await getAllCases(locale as Locale);
  const cases = service.relatedCases
    .map((id) => allCases.find((item) => item.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const others = servicePages.filter((item) => item.key !== service.key);
  const pad = (value: number) => String(value).padStart(2, "0");

  return (
    <div className="service-page" style={{ "--service-accent": service.accent } as CSSProperties}>
      <section className="service-hero">
        <Image
          src={service.hero}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={72}
          className="service-hero-media"
          style={{ objectPosition: service.heroPosition }}
        />
        <span className="service-hero-veil" aria-hidden />

        <div className="container-site service-hero-inner">
          <p className="service-hero-index">
            {t("common.indexLabel")} {pad(index + 1)} / {pad(servicePages.length)}
          </p>
          <h1
            className="service-hero-title"
            style={
              {
                "--title-line-chars": titleLineChars(title),
                "--title-word-chars": Math.max(...title.split(" ").map((word) => word.length)),
              } as CSSProperties
            }
          >
            {title}
          </h1>
          <p className="service-hero-tagline">{getServiceBlurb(locale as Locale, service.key)}</p>
        </div>

        <div className="hero-scroll-slot">
          <HeroScrollCue targetId="service-intro" label={t("common.scrollDown")}>
            {t("common.scrollHint")}
          </HeroScrollCue>
        </div>
      </section>

      <section id="service-intro" className="service-intro">
        <div className="container-site service-intro-grid">
          <p className="service-label">{t("common.introLabel")}</p>
          <h2 className="service-intro-statement">{t(`items.${service.key}.intro`)}</h2>
          <p className="service-intro-lead">{t(`items.${service.key}.lead`)}</p>
        </div>
      </section>

      <section className="service-deliverables">
        <div className="container-site">
          <p className="service-label">{t("common.deliverablesLabel")}</p>
          <ol className="service-deliverables-list">
            {deliverables.map((item, itemIndex) => (
              <li key={item.title} className="service-deliverable">
                <span className="service-deliverable-index" aria-hidden>
                  {pad(itemIndex + 1)}
                </span>
                <h3 className="service-deliverable-title">{item.title}</h3>
                <p className="service-deliverable-body">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {service.key === "uxui" ? (
        <>
          <UxuiBuild />
          <UxuiChallenge />
        </>
      ) : null}

      {service.key === "serviceDesign" ? (
        <>
          <ServiceDesignBuild />
          <ServiceDesignChallenge />
        </>
      ) : null}

      {service.key === "daas" ? (
        <>
          <DaasBuild />
          <DaasChallenge />
        </>
      ) : null}

      {service.key === "branding" ? (
        <>
          <BrandingBuild />
          <BrandingChallenge />
        </>
      ) : null}

      {service.key === "development" ? (
        <>
          <DevelopmentBuild />
          <DevelopmentChallenge />
        </>
      ) : null}

      {service.key === "mvp" ? (
        <>
          <MvpBuild />
          <MvpChallenge />
        </>
      ) : null}

      <section className="service-process">
        <div className="container-site">
          <p className="service-label">{t("common.processLabel")}</p>
          <h2 className="service-section-heading">{t("common.processHeading")}</h2>
          <ol className="service-process-steps">
            {process.map((step, stepIndex) => (
              <li key={step.title} className="service-process-step">
                <span className="service-process-dot" aria-hidden>
                  {stepIndex + 1}
                </span>
                <h3 className="service-process-title">{step.title}</h3>
                <p className="service-process-body">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {cases.length > 0 ? (
        <section className="service-cases">
          <div className="container-site">
            <p className="service-label">{t("common.casesLabel")}</p>
            <h2 className="service-section-heading">{t("common.casesHeading")}</h2>
            <div className="service-cases-grid">
              {cases.map((item) => (
                <Link
                  key={item.id}
                  href={{ pathname: "/cases/[slug]", params: { slug: item.slug } }}
                  className="service-case"
                >
                  <span className="service-case-cover">
                    <Image
                      src={item.cover}
                      alt={item.coverAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 767px) 100vw, 33vw"
                    />
                  </span>
                  <span className="service-case-meta">
                    <span className="service-case-title">{item.title}</span>
                    <span className="service-case-cta">
                      {t("common.viewCase")} <span aria-hidden>→</span>
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="service-others">
        <div className="container-site">
          <p className="service-label">{t("common.otherLabel")}</p>
          <ul className="service-others-list">
            {others.map((item) => (
              <li key={item.key}>
                <Link
                  href={{ pathname: "/services/[slug]", params: { slug: item.slugs[locale as Locale] } }}
                  className="service-other"
                  data-service={item.key}
                  style={{ "--other-accent": item.accent } as CSSProperties}
                >
                  <span className="service-other-index">
                    <span className="service-tag-dot" aria-hidden />
                    {pad(servicePages.findIndex((entry) => entry.key === item.key) + 1)}
                  </span>
                  <span className="service-other-name">{tServices(item.key)}</span>
                  <span className="service-other-blurb">{getServiceBlurb(locale as Locale, item.key)}</span>
                  <span className="service-other-arrow" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
