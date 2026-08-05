import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HeroVideo } from "@/components/media/HeroVideo";
import { AnimatedHeading } from "@/components/animation/AnimatedHeading";
import { highlightTag } from "@/lib/i18n/rich-tags";
import { GrowSection } from "@/components/animation/GrowSection";
import { ServiceSlider } from "@/components/sliders/ServiceSlider";
import { CaseBlockSlider } from "@/components/sliders/CaseBlockSlider";
import { MatilhaButton } from "@/components/ui/MatilhaButton";
import { baseMetadata, buildHomeTitle } from "@/lib/seo/metadata";
import { clientLogos, homeFeaturedCaseIds, services } from "@/lib/content/home";
import { getAllCases } from "@/lib/content/cases";
import type { Locale } from "@/lib/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return baseMetadata({
    title: buildHomeTitle(locale as Locale),
    description: t("defaultDescription"),
    pathname: "/",
    locale: locale as Locale,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const allCases = await getAllCases(locale as Locale);

  const featuredCases = homeFeaturedCaseIds
    .map((id) => allCases.find((c) => c.id === id))
    .filter(Boolean)
    .map((c) => ({
      slug: c!.slug,
      title: c!.title,
      cover: c!.cover,
      coverAlt: c!.coverAlt,
      services: c!.services.join(", "),
    }));

  return (
    <>
      <HeroVideo />

      <section id="home-studio" className="home-section">
        <div className="container-site home-intro-grid">
          <div>
            <p className="mini-heading">{t("studioLabel")}</p>
            <AnimatedHeading as="div" className="heading-display">
              {t.rich("transformHeading", highlightTag)}
            </AnimatedHeading>
            <span id="o-que-fazemos" className="anchor-target" aria-hidden />
            <span id="what-we-do" className="anchor-target" aria-hidden />
          </div>
        </div>

        <div className="container-site home-slider-row mt-16 lg:mt-24">
          <ServiceSlider services={services} />
        </div>
      </section>

      <section className="home-section">
        <div className="container-site">
          <p className="mini-heading">{t("growLabel")}</p>
          <AnimatedHeading as="div" className="heading-display">
            {t.rich("growHeading", highlightTag)}
          </AnimatedHeading>
          <GrowSection />
        </div>
      </section>

      <section className="home-section">
        <div className="container-site">
          <div className="home-cases-header">
            <div className="home-cases-heading-col">
              <p className="mini-heading">{t("casesLabel")}</p>
              <AnimatedHeading as="div" className="heading-display">
                {t.rich("casesHeading", highlightTag)}
              </AnimatedHeading>
            </div>
            <MatilhaButton href="/cases" variant="icon" className="home-cases-action-btn home-cases-action-btn-header">
              {t("casesLabel").replace("// ", "")}
            </MatilhaButton>
          </div>

          <div className="mt-12 home-slider-row">
            <CaseBlockSlider cases={featuredCases} />
          </div>

          <div className="home-cases-actions mt-12">
            <MatilhaButton href="/cases" variant="icon" className="home-cases-action-btn">
              {t("viewAllCases")}
            </MatilhaButton>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container-site">
          <p className="mini-heading">{t("clientsLabel")}</p>
          <AnimatedHeading as="div" className="heading-display">
            {t.rich("clientsHeading", highlightTag)}
          </AnimatedHeading>

          <div className="clients-grid mt-16">
            {clientLogos.map((logo) => (
              <div key={logo.src} className="clients-grid-item">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={200}
                  height={104}
                  className="h-auto w-full max-w-[200px] object-contain opacity-80 transition hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
