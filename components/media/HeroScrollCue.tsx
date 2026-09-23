"use client";

import type { ReactNode } from "react";
import { useCallback } from "react";
import { scrollToElementById } from "@/lib/navigation/anchor-scroll";

type HeroScrollCueProps = {
  targetId: string;
  label: string;
  children?: ReactNode;
};

export function HeroScrollCue({ targetId, label, children }: HeroScrollCueProps) {
  const handleClick = useCallback(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scrollToElementById(targetId, { behavior: reduced ? "auto" : "smooth" });
  }, [targetId]);

  return (
    <button
      type="button"
      className={`hero-scroll-cue${children ? " hero-scroll-alert" : ""}`}
      aria-label={label}
      onClick={handleClick}
    >
      {children ? <span className="hero-scroll-alert-label">{children}</span> : null}
      <svg
        className="hero-scroll-cue-icon"
        viewBox="0 0 24 24"
        width="32"
        height="32"
        aria-hidden
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  );
}
