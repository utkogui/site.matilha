import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ImageCarousel } from "@/components/media/ImageCarousel";
import { PageTitle } from "@/components/animation/PageTitle";
import { CaseRelated } from "@/components/cases/CaseRelated";
import { LottieArrow } from "@/components/animation/LottieArrow";
import { MeuPlaystationCase } from "@/components/cases/meups/MeuPlaystationCase";
import { SestiniCase } from "@/components/cases/sestini/SestiniCase";
import { CharneyCase } from "@/components/cases/charney/CharneyCase";
import { OpenStartupsCase } from "@/components/cases/open-startups/OpenStartupsCase";
import { NeodentCase } from "@/components/cases/neodent/NeodentCase";
import { SyxCase } from "@/components/cases/syx/SyxCase";
import { getCaseContent, getAllCases } from "@/lib/content/cases";
import { caseRegistry, getCaseBySlug, getCaseSlug } from "@/lib/content/cases-registry";
import { buildCaseMetadata, buildPageTitle } from "@/lib/seo/metadata";
import type { Locale } from "@/lib/i18n/routing";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return caseRegistry.flatMap((item) =>
    (["pt-BR", "pt-PT", "en", "es"] as const).map((locale) => ({
      locale,
      slug: item.slugs[locale],
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const caseItem = getCaseBySlug(locale as Locale, slug);
  if (!caseItem) return {};

  const content = await getCaseContent(locale as Locale, slug);
  if (!content) return {};

  const pageTitle = buildPageTitle(content.title, locale as Locale);

  return buildCaseMetadata({
    title: pageTitle,
    description: content.seo.description,
    locale: locale as Locale,
    slug,
    slugs: caseItem.slugs,
  });
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cases");

  const content = await getCaseContent(locale as Locale, slug);
  if (!content) notFound();

  const allCases = await getAllCases(locale as Locale);
  const related = content.relatedCases
    .map((id) => {
      const relatedSlug = getCaseSlug(id, locale as Locale);
      return allCases.find((c) => c.id === id && relatedSlug);
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      cover: item.cover,
      coverAlt: item.coverAlt,
    }));

  if (content.id === "meu-playstation") {
    return <MeuPlaystationCase content={content} related={related} />;
  }

  if (content.id === "sestini") {
    return <SestiniCase content={content} related={related} />;
  }

  if (content.id === "charney-companies") {
    return <CharneyCase content={content} related={related} />;
  }

  if (content.id === "open-startups") {
    return <OpenStartupsCase content={content} related={related} />;
  }

  if (content.id === "neodent") {
    return <NeodentCase content={content} related={related} />;
  }

  if (content.id === "syx") {
    return <SyxCase content={content} related={related} />;
  }

  return (
    <article className="case-detail">
      <section className="case-hero">
        <div className="case-hero-media">
          <Image
            src={content.cover}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="case-hero-veil" />
        </div>
        <header className="container-site case-hero-content">
          <p className="text-label mb-2">{content.client}</p>
          <PageTitle text={content.title} />
          <p className="case-hero-summary">{content.summary}</p>
        </header>
      </section>

      <div className="container-site case-detail-body">
        <LottieArrow />

        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          <section>
            <h2 className="text-label mb-4">{t("challenge")}</h2>
            <p className="text-white/80">{content.challenge}</p>
          </section>
          <section>
            <h2 className="text-label mb-4">{t("solution")}</h2>
            <p className="whitespace-pre-line text-white/80">{content.solution}</p>
          </section>
        </div>

        <section className="mt-16">
          <h2 className="text-label mb-4">{t("services")}</h2>
          <ul className="flex flex-wrap gap-3">
            {content.services.map((service) => (
              <li key={service} className="border border-white/20 px-4 py-2 text-sm">
                {service}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <ImageCarousel images={content.gallery} />
        </section>
      </div>

      <CaseRelated related={related} />
    </article>
  );
}
