"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatedHeading } from "@/components/animation/AnimatedHeading";
import { LottieArrow } from "@/components/animation/LottieArrow";
import { MatilhaButton } from "@/components/ui/MatilhaButton";
import { heroVideo } from "@/lib/content/home";

const WHATSAPP_URL = "https://wa.me/message/X6BX7BCQE564O1";

export function HeroVideo() {
  const t = useTranslations("home");
  const locale = useLocale();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => undefined);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-video-wrap">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster={heroVideo.poster}
          aria-hidden
        >
          <source src={heroVideo.src} type="video/webm" />
        </video>
      </div>

      <div className="container-site hero-content-wrap">
        <div className="hero-content-grid">
          <div className="hero-content">
            <AnimatedHeading key={locale} as="h1" trigger="load" className="hero-title" text={t("heroTitle")} />
            <div className="hero-cta-row">
              <MatilhaButton href={WHATSAPP_URL} variant="cta" external>
                {t("heroCta")}
              </MatilhaButton>
            </div>
          </div>
          <div className="hero-lottie-col">
            <LottieArrow scrollTargetId="home-studio" ariaLabel={t("scrollDown")} />
          </div>
        </div>
      </div>
    </section>
  );
}
