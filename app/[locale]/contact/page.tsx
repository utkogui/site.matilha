import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactHero } from "@/components/media/ContactHero";
import { OfficePhotoMosaic } from "@/components/media/OfficePhotoMosaic";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { baseMetadata, buildPageTitle } from "@/lib/seo/metadata";
import type { Locale } from "@/lib/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return baseMetadata({
    title: buildPageTitle(t("title"), locale as Locale),
    description: t("subtitle"),
    pathname: "/contact",
    locale: locale as Locale,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ContactHero variant="office" />
      <OfficePhotoMosaic />

      <section className="contact-body">
        <div className="container-site contact-body-grid">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
    </>
  );
}
