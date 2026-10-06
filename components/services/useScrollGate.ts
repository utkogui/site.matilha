"use client";

import { useRef, type RefObject } from "react";
import { useScrollSteps } from "@/components/services/useScrollSteps";

/**
 * Holds the page once on a section while scrolling down, so its heading and
 * interactive area are seen before the visitor moves on.
 */
export function useScrollGate(
  sectionRef: RefObject<HTMLElement | null>,
  headRef: RefObject<HTMLElement | null>,
  arenaRef: RefObject<HTMLElement | null>,
  disabled: boolean,
) {
  const gatedRef = useRef(false);

  useScrollSteps((direction, commit) => {
    const section = sectionRef.current;
    const head = headRef.current;
    const arena = arenaRef.current;
    if (!section || !head || !arena) return false;

    const viewport = window.innerHeight;
    const rect = section.getBoundingClientRect();
    if (rect.top > viewport + 4 || rect.bottom < 0) {
      gatedRef.current = false;
      return false;
    }
    if (direction !== 1 || gatedRef.current || disabled) return false;

    const headerBottom = document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
    const target = head.getBoundingClientRect().top + window.scrollY - headerBottom - 24;
    const arenaBottom = arena.getBoundingClientRect().bottom;
    if (arenaBottom < viewport * 0.6 || Math.abs(target - window.scrollY) < 8) return false;

    if (commit) {
      gatedRef.current = true;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: target, behavior: reduce ? "auto" : "smooth" });
    }
    return true;
  });
}
