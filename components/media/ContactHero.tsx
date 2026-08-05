"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { AnimatedHeading } from "@/components/animation/AnimatedHeading";
import { OfficeFadeFrame } from "@/components/media/OfficeFadeFrame";
import { highlightTag } from "@/lib/i18n/rich-tags";
import { officeHeroPhotos } from "@/lib/media/office-photos";

type ContactHeroProps = {
  namespace?: "contact" | "careers";
  variant?: "team" | "office";
};

export function ContactHero({ namespace = "contact", variant = "team" }: ContactHeroProps) {
  const t = useTranslations(namespace);
  const locale = useLocale();
  const isOffice = variant === "office";

  return (
    <section className={`contact-hero${isOffice ? " contact-hero-office" : ""}`}>
      <div className="contact-hero-media" aria-hidden>
        {isOffice ? (
          <>
            <OfficeFadeFrame
              photos={officeHeroPhotos}
              intervalMs={5000}
              sizes="100vw"
              priority
              imageClassName="contact-hero-image office-photo"
            />
            <div className="contact-hero-overlay" />
          </>
        ) : (
          <Image
            src="/images/brand/matilha-team_2025.png"
            alt=""
            fill
            priority
            className="contact-hero-image"
            sizes="100vw"
          />
        )}
      </div>

      <div className="container-site contact-hero-title">
        <p className="mini-heading">{t("pageLabel")}</p>
        <AnimatedHeading key={locale} as="h1" className="heading-display" trigger="load">
          {t.rich("pageHeading", highlightTag)}
        </AnimatedHeading>
      </div>
    </section>
  );
}
