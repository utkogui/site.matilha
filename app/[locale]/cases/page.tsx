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
    <section className="page-section">
      <div className="container-site">
        <PageTitle label={t("pageLabel")}>
          {t.rich("pageHeading", highlightTag)}
        </PageTitle>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((item) => (
            <Link
              key={item.id}
              href={{ pathname: "/cases/[slug]", params: { slug: item.slug } }}
              className="group overflow-hidden bg-white/5"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={item.cover}
                  alt={item.coverAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h2 className="font-display text-xl">{item.title}</h2>
                <p className="mt-2 text-sm text-white/60">{item.summary}</p>
                <span className="mt-4 inline-block text-sm text-primary">{t("viewCase")} →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
