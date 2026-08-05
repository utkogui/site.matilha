"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { scrollToElementById } from "@/lib/navigation/anchor-scroll";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type LottieArrowProps = {
  scrollTargetId?: string;
  ariaLabel?: string;
};

export function LottieArrow({ scrollTargetId, ariaLabel }: LottieArrowProps) {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setEnabled(false);
      return;
    }

    fetch("/lottie/scroll-arrow.json")
      .then((r) => r.json())
      .then(setAnimationData)
      .catch(() => setEnabled(false));
  }, []);

  const handleClick = useCallback(() => {
    if (!scrollTargetId) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scrollToElementById(scrollTargetId, { behavior: reduced ? "auto" : "smooth" });
  }, [scrollTargetId]);

  if (!enabled || !animationData) return null;

  const lottie = (
    <Lottie animationData={animationData} loop style={{ width: "4vw", minWidth: 32, maxWidth: 56, height: "auto" }} />
  );

  if (!scrollTargetId) {
    return (
      <div className="hero-lottie" aria-hidden>
        {lottie}
      </div>
    );
  }

  return (
    <button type="button" className="hero-lottie hero-lottie-button" aria-label={ariaLabel} onClick={handleClick}>
      {lottie}
    </button>
  );
}
