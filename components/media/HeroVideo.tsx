"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatedHeading } from "@/components/animation/AnimatedHeading";
import { LottieArrow } from "@/components/animation/LottieArrow";
import { MatilhaButton } from "@/components/ui/MatilhaButton";
import { heroVideo } from "@/lib/content/home";
import { highlightTag } from "@/lib/i18n/rich-tags";

const WHATSAPP_URL = "https://wa.me/message/X6BX7BCQE564O1";

export function HeroVideo() {
  const t = useTranslations("home");
  const locale = useLocale();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canLoadVideo, setCanLoadVideo] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData =
      "connection" in navigator &&
      Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
    if (reduced || saveData) return;

    const enable = () => setCanLoadVideo(true);
    const ric = window.requestIdleCallback?.bind(window);
    const cic = window.cancelIdleCallback?.bind(window);

    if (ric) {
      const idleId = ric(enable, { timeout: 1800 });
      return () => cic?.(idleId);
    }

    const timeoutId = window.setTimeout(enable, 1200);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!canLoadVideo) return;
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.play().catch(() => undefined);
  }, [canLoadVideo]);

  return (
    <section className="hero-section">
      <div className="hero-video-wrap">
        <video
          ref={videoRef}
          className="hero-video"
          muted
          loop
          playsInline
          preload="none"
          poster={heroVideo.poster}
          aria-hidden
        >
          {canLoadVideo ? <source src={heroVideo.src} type="video/webm" /> : null}
        </video>
      </div>

      <div className="container-site hero-content-wrap">
        <div className="hero-content-grid">
          <div className="hero-content">
            <p className="mini-heading hero-eyebrow">{t("studioLabel")}</p>
            <AnimatedHeading key={locale} as="h1" trigger="load" className="hero-title">
              {t.rich("heroTitle", highlightTag)}
            </AnimatedHeading>
            <div className="hero-cta-row">
              <MatilhaButton href={WHATSAPP_URL} variant="solid" external>
                {t("heroCta")}
              </MatilhaButton>
              <p className="hero-cta-hint">{t("heroCtaHint")}</p>
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
