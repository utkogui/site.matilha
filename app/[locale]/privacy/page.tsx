import { setRequestLocale } from "next-intl/server";
import { PageTitle } from "@/components/animation/PageTitle";
import { baseMetadata, buildPageTitle } from "@/lib/seo/metadata";
import { getPrivacyCopy } from "@/lib/content/lgpd-copy";
import type { Locale } from "@/lib/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = getPrivacyCopy(locale as Locale);

  return baseMetadata({
    title: buildPageTitle(copy.title, locale as Locale),
    description: copy.description,
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
  const copy = getPrivacyCopy(locale as Locale);

  return (
    <section className="page-section privacy-page">
      <div className="container-site max-w-3xl">
        <PageTitle text={copy.title} />
        <p className="privacy-updated">{copy.updated}</p>
        <p className="privacy-intro">{copy.intro}</p>
        <p className="privacy-notice">{copy.notice}</p>

        <div className="privacy-sections">
          {copy.sections.map((section) => (
            <section key={section.heading} className="privacy-section">
              <h2 className="privacy-section-title">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="privacy-paragraph">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
