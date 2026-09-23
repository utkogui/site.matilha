"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { HeroScrollCue } from "@/components/media/HeroScrollCue";
import { heroVideo } from "@/lib/content/home";

export function HeroVideo() {
  const t = useTranslations("home");

  return (
    <section className="hero-section">
      <div className="hero-video-wrap">
        <Image
          src={heroVideo.poster}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={70}
          className="hero-poster"
          aria-hidden
        />
      </div>

      <div className="hero-content-wrap">
        <h1 className="hero-title">MATILHA</h1>
        <HeroScrollCue targetId="home-studio" label={t("scrollDown")}>
          {t("heroScrollHint")}
        </HeroScrollCue>
      </div>
    </section>
  );
}
