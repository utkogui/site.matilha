"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { AnimatedHeading } from "@/components/animation/AnimatedHeading";
import { highlightTag } from "@/lib/i18n/rich-tags";

type ContactHeroProps = {
  namespace?: "contact" | "careers";
};

export function ContactHero({ namespace = "contact" }: ContactHeroProps) {
  const t = useTranslations(namespace);
  const locale = useLocale();

  return (
    <section className="contact-hero">
      <div className="contact-hero-media" aria-hidden>
        <Image
          src="/images/brand/matilha-team_2025.png"
          alt=""
          fill
          priority
          className="contact-hero-image"
          sizes="100vw"
        />
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
