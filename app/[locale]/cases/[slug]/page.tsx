import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { ImageCarousel } from "@/components/media/ImageCarousel";
import { AnimatedHeading } from "@/components/animation/AnimatedHeading";
import { PageTitle } from "@/components/animation/PageTitle";
import { LottieArrow } from "@/components/animation/LottieArrow";
import { MeuPlaystationCase } from "@/components/cases/meups/MeuPlaystationCase";
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

  return (
    <article className="page-section">
      <div className="container-site">
        <div className="relative mb-12 aspect-[21/9] overflow-hidden bg-white/5">
          <Image
            src={content.cover}
            alt={content.coverAlt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        <header className="max-w-3xl">
          <p className="text-label mb-2">{content.client}</p>
          <PageTitle text={content.title} />
          <p className="mt-6 text-lg text-white/70">{content.summary}</p>
        </header>

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

        {related.length > 0 && (
          <section className="mt-24">
            <AnimatedHeading
              as="h2"
              text={t("related")}
              trigger="scroll"
              className="mb-8 text-[length:var(--text-h2)]"
            />
            <div className="grid gap-8 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={{ pathname: "/cases/[slug]", params: { slug: item.slug } }}
                  className="group flex gap-4 bg-white/5 p-4"
                >
                  <div className="relative h-24 w-32 shrink-0 overflow-hidden">
                    <Image src={item.cover} alt={item.coverAlt} fill className="object-cover" sizes="128px" />
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
