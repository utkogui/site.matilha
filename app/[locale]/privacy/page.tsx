import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageTitle } from "@/components/animation/PageTitle";
import { baseMetadata, buildPageTitle } from "@/lib/seo/metadata";
import type { Locale } from "@/lib/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return baseMetadata({
    title: buildPageTitle(t("title"), locale as Locale),
    description: t("placeholder"),
    pathname: "/privacy",
    locale: locale as Locale,
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

  return (
    <section className="page-section">
      <div className="container-site max-w-3xl">
        <PageTitle text={t("title")} />
        <p className="mt-4 text-sm text-white/50">{t("updated")}</p>
        <p className="mt-8 text-lg text-white/80">{t("placeholder")}</p>
      </div>
    </section>
  );
}
