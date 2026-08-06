"use client";

import dynamic from "next/dynamic";

const MouseTrail = dynamic(
  () => import("@/components/animation/MouseTrail").then((mod) => ({ default: mod.MouseTrail })),
  { ssr: false },
);

export function MouseTrailLazy() {
  return <MouseTrail />;
}
