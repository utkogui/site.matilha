import { getTranslations, setRequestLocale } from "next-intl/server";
import { JoinForm } from "@/components/forms/JoinForm";
import { ContactHero } from "@/components/media/ContactHero";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { baseMetadata, buildPageTitle } from "@/lib/seo/metadata";
import type { Locale } from "@/lib/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "careers" });

  return baseMetadata({
    title: buildPageTitle(t("title"), locale as Locale),
    description: t("subtitle"),
    pathname: "/careers",
    locale: locale as Locale,
  });
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ContactHero namespace="careers" />

      <section className="contact-body">
        <div className="container-site contact-body-grid">
          <ContactInfo />
          <JoinForm />
        </div>
      </section>
    </>
  );
}
