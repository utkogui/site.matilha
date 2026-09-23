"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { usePathname } from "next/navigation";

/** Inspirado em https://motion.dev/examples/js-curtains-doors */
const DOOR_TRANSITION = { duration: 0.4, ease: [0.65, 0, 0.35, 1] } as const;
const ANIMATE_TIMEOUT_MS = 700;

function waitFrame() {
  return new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
}

function withTimeout(promise: Promise<unknown>, ms: number) {
  return Promise.race([
    promise,
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, ms);
    }),
  ]);
}

export function PageCurtain() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const previousPathRef = useRef(pathname);
  const runIdRef = useRef(0);

  useEffect(() => {
    if (previousPathRef.current === pathname) {
      return;
    }
    previousPathRef.current = pathname;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const left = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return;

    const runId = ++runIdRef.current;
    setActive(true);
    left.style.transform = "translate3d(0,0,0)";
    right.style.transform = "translate3d(0,0,0)";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    void (async () => {
      try {
        await waitFrame();
        await waitFrame();
        await withTimeout(
          Promise.all([
            animate(left, { transform: ["translate3d(0,0,0)", "translate3d(-100%,0,0)"] }, DOOR_TRANSITION)
              .finished,
            animate(right, { transform: ["translate3d(0,0,0)", "translate3d(100%,0,0)"] }, DOOR_TRANSITION)
              .finished,
          ]),
          ANIMATE_TIMEOUT_MS,
        );
      } finally {
        if (runIdRef.current === runId) {
          setActive(false);
        }
      }
    })();
  }, [pathname]);

  return (
    <div className={`page-curtain${active ? " is-active" : ""}`} aria-hidden="true">
      <div ref={leftRef} className="page-curtain-door page-curtain-door-left" />
      <div ref={rightRef} className="page-curtain-door page-curtain-door-right" />
    </div>
  );
}
