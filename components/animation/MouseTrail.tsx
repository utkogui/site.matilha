"use client";

import { useEffect, useRef } from "react";

const POINT_COUNT = 50;
const LAG = 0.1;
const OFFSET_X = 8;
const OFFSET_Y = 4;
const DESKTOP_MIN = 992;

function canUseMouseTrail() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(pointer: coarse)").matches) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.innerWidth < DESKTOP_MIN) return false;
  return true;
}

export function MouseTrail() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pointsRef = useRef<{ x: number; y: number }[]>([]);
  const targetRef = useRef({ x: 0, y: 0 });
  const enabledRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!svg || !path) return;

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      svg.style.width = `${width}px`;
      svg.style.height = `${height}px`;
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    };

    const animate = () => {
      if (!enabledRef.current) return;

      let x = targetRef.current.x;
      let y = targetRef.current.y;
      const points = pointsRef.current;

      points.forEach((point, index) => {
        point.x = x;
        point.y = y;
        const next = points[index + 1];
        if (next) {
          x -= LAG * (point.x - next.x);
          y -= LAG * (point.y - next.y);
        }
      });

      const d = `M ${points.map((point) => `${point.x} ${point.y}`).join(" L ")}`;
      if (d !== "M ") {
        path.setAttribute("d", d);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const stop = () => {
      enabledRef.current = false;
      pointsRef.current = [];
      path.setAttribute("d", "");
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const start = () => {
      if (!canUseMouseTrail()) {
        stop();
        return;
      }

      enabledRef.current = true;
      resize();
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!enabledRef.current) return;

      targetRef.current.x = event.clientX + OFFSET_X;
      targetRef.current.y = event.clientY + OFFSET_Y;

      if (pointsRef.current.length === 0) {
        for (let i = 0; i < POINT_COUNT; i += 1) {
          pointsRef.current.push({ x: event.clientX, y: event.clientY });
        }
      }
    };

    const onResize = () => {
      if (canUseMouseTrail()) {
        start();
        resize();
        return;
      }
      stop();
    };

    start();
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      stop();
    };
  }, []);

  return (
    <svg ref={svgRef} className="matilha-mouse-trail" viewBox="0 0 1 1" aria-hidden>
      <path ref={pathRef} d="" />
    </svg>
  );
}
