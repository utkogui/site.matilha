"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MouseTrail = dynamic(
  () => import("@/components/animation/MouseTrail").then((mod) => ({ default: mod.MouseTrail })),
  { ssr: false },
);

export function MouseTrailLazy() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!enabled) return null;
  return <MouseTrail />;
}
