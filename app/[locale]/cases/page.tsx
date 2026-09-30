import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { PageTitle } from "@/components/animation/PageTitle";
import { highlightTag } from "@/lib/i18n/rich-tags";
import { baseMetadata, buildPageTitle } from "@/lib/seo/metadata";
import { getAllCases } from "@/lib/content/cases";
import type { Locale } from "@/lib/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cases" });

  return baseMetadata({
    title: buildPageTitle(t("title"), locale as Locale),
    description: t("subtitle"),
    pathname: "/cases",
    locale: locale as Locale,
  });
}

export default async function CasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cases");
  const cases = await getAllCases(locale as Locale);

  return (
    <section className="page-section cases-index">
      <div className="container-site">
        <PageTitle label={t("pageLabel")}>
          {t.rich("pageHeading", highlightTag)}
        </PageTitle>

        <div className="cases-index-grid">
          {cases.map((item) => (
            <Link
              key={item.id}
              href={{ pathname: "/cases/[slug]", params: { slug: item.slug } }}
              className="cases-card group"
            >
              <div className="cases-card-media">
                <p className="cases-card-tag">{t(`kinds.${item.kind}`)}</p>
                <Image
                  src={item.cover}
                  alt={item.coverAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, (max-width:1100px) 50vw, 33vw"
                />
              </div>
              <div className="cases-card-body">
                <h2 className="font-display cases-card-title">{item.title}</h2>
                <p className="cases-card-summary">{item.summary}</p>
                <span className="cases-card-cta">{t("viewCase")} →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
