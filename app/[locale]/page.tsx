import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HeroVideo } from "@/components/media/HeroVideo";
import { HomeTheme } from "@/components/layout/HomeTheme";
import { HomeTraining } from "@/components/home/HomeTraining";
import { AnimatedHeading } from "@/components/animation/AnimatedHeading";
import { highlightTag } from "@/lib/i18n/rich-tags";
import { MatilhaButton } from "@/components/ui/MatilhaButton";
import { CaseBlockSlider } from "@/components/sliders/CaseBlockSlider";
import { baseMetadata, buildHomeTitle } from "@/lib/seo/metadata";
import { clientLogos, homeFeaturedCaseIds, services } from "@/lib/content/home";
import { getAllCases } from "@/lib/content/cases";
import type { Locale } from "@/lib/i18n/routing";

const ServiceGrid = dynamic(() =>
  import("@/components/sliders/ServiceGrid").then((mod) => ({ default: mod.ServiceGrid })),
);

const GrowSection = dynamic(() =>
  import("@/components/animation/GrowSection").then((mod) => ({ default: mod.GrowSection })),
);

const ClientsLogoSlider = dynamic(() =>
  import("@/components/sliders/ClientsLogoSlider").then((mod) => ({ default: mod.ClientsLogoSlider })),
);

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
    <div className="home-shell">
      <HomeTheme />
      <HeroVideo />

      <section id="home-studio" className="home-section home-section-services">
        <div className="container-site home-intro-grid">
          <div>
            <p className="mini-heading">{t("servicesLabel")}</p>
            <AnimatedHeading as="h2" className="heading-display">
              {t.rich("transformHeading", highlightTag)}
            </AnimatedHeading>
            <span id="o-que-fazemos" className="anchor-target" aria-hidden />
            <span id="what-we-do" className="anchor-target" aria-hidden />
          </div>
        </div>

        <div className="container-site mt-16 lg:mt-24">
          <ServiceGrid services={services} />
        </div>
      </section>

      <HomeTraining />

      <section id="home-grow" className="home-section home-section-grow">
        <div className="container-site">
          <p className="mini-heading">{t("growLabel")}</p>
          <AnimatedHeading as="h2" className="heading-display">
            {t.rich("growHeading", highlightTag)}
          </AnimatedHeading>
          <GrowSection />
        </div>
      </section>

      <section id="home-cases" className="home-section home-section-cases">
        <div className="container-site">
          <div className="home-cases-header">
            <div className="home-cases-heading-col">
              <p className="mini-heading">{t("casesLabel")}</p>
              <AnimatedHeading as="h2" className="heading-display">
                {t.rich("casesHeading", highlightTag)}
              </AnimatedHeading>
            </div>
            <MatilhaButton href="/cases" variant="icon" className="home-cases-action-btn home-cases-action-btn-header">
              {t("casesCta")}
            </MatilhaButton>
          </div>

          <div className="mt-12 home-cases-row">
            <CaseBlockSlider cases={featuredCases} />
          </div>

          <div className="home-cases-actions mt-12">
            <MatilhaButton href="/contact" variant="solid">
              {t("casesTalkCta")}
            </MatilhaButton>
            <MatilhaButton href="/cases" variant="icon" className="home-cases-action-btn">
              {t("viewAllCases")}
            </MatilhaButton>
          </div>
        </div>
      </section>

      <section id="home-clients" className="home-section home-section-clients">
        <div className="container-site">
          <div className="clients-header">
            <div className="clients-heading-col">
              <p className="mini-heading">{t("clientsLabel")}</p>
              <AnimatedHeading as="h2" className="heading-display">
                {t.rich("clientsHeading", highlightTag)}
              </AnimatedHeading>
              <p className="clients-support">{t("clientsSupport")}</p>
            </div>
            <p className="clients-stat font-display" aria-hidden>
              {t("clientsStat")}
            </p>
          </div>

          <div className="clients-slider-row mt-16">
            <ClientsLogoSlider logos={clientLogos} />
          </div>

          <div className="home-section-cta-band">
            <p className="home-section-cta-copy">{t("clientsTalkCopy")}</p>
            <MatilhaButton href="/contact" variant="solid">
              {t("clientsTalkCta")}
            </MatilhaButton>
          </div>
        </div>
      </section>
    </div>
  );
}
