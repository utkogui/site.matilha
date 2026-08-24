import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import type { CSSProperties, ReactNode } from "react";
import { Link } from "@/lib/i18n/navigation";
import { caseRegistry } from "@/lib/content/cases-registry";
import { homeHeroImages, type HomeHeroProject } from "@/lib/media/home-hero-assets";
import { HeroScrollCue } from "@/components/media/HeroScrollCue";
import { highlightTag } from "@/lib/i18n/rich-tags";
import type { Locale } from "@/lib/i18n/routing";

const projectCaseId: Record<HomeHeroProject, string> = {
  ideias: "open-startups",
  design: "sestini",
  tech: "pubg",
  people: "meu-playstation",
  brands: "neodent",
  business: "charney-companies",
};

function caseHref(caseId: string, locale: Locale) {
  const item = caseRegistry.find((entry) => entry.id === caseId);
  return {
    pathname: "/cases/[slug]" as const,
    params: { slug: item?.slugs[locale] ?? caseId },
  };
}

function hotspot(project: HomeHeroProject, locale: Locale) {
  return (chunks: ReactNode) => (
    <Link
      href={caseHref(projectCaseId[project], locale)}
      className={`home-hero-hotspot home-hero-hotspot-${project}`}
    >
      {chunks}
    </Link>
  );
}

export async function HomeHero() {
  const t = await getTranslations("home");
  const locale = (await getLocale()) as Locale;

  const tags = {
    ...highlightTag,
    ideias: hotspot("ideias", locale),
    design: hotspot("design", locale),
    tech: hotspot("tech", locale),
    people: hotspot("people", locale),
    brands: hotspot("brands", locale),
    business: hotspot("business", locale),
  };

  return (
    <section className="hero-section home-hero">
      <div className="home-hero-grid">
        <div className="home-hero-stage" aria-hidden>
          {homeHeroImages.map((image, index) => (
            <figure
              key={image.src}
              className={`home-hero-card home-hero-card-${image.shape}`}
              data-project={image.project}
              style={
                {
                  "--rot": `${image.rotate}deg`,
                  "--dx": image.dx,
                  "--dy": image.dy,
                  top: image.top,
                  left: image.left,
                  width: image.size,
                  zIndex: image.z,
                  animationDelay: image.delay,
                } as CSSProperties
              }
            >
              <Image
                src={image.src}
                alt=""
                width={image.width}
                height={image.height}
                sizes="(min-width: 1024px) 42vw, 85vw"
                className="home-hero-card-img"
                style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
                priority={index < 4}
              />
            </figure>
          ))}
        </div>

        <div className="home-hero-copy">
          <h1 className="home-hero-title">{t.rich("heroTitle", tags)}</h1>
          <p className="home-hero-lead">{t.rich("heroLead", tags)}</p>
          <p className="home-hero-close">{t.rich("heroClose", tags)}</p>
        </div>
      </div>

      <HeroScrollCue targetId="home-studio" label={t("scrollDown")} />
    </section>
  );
}
