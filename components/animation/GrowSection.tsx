"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useLocale } from "next-intl";
import { getManifesto, manifestoPlainText, type ManifestoBeat } from "@/lib/content/manifesto";
import type { Locale } from "@/lib/i18n/routing";

function parseLine(line: string): ReactNode[] {
  const chunks = line.split(/(\*[^*]+\*)/g).filter(Boolean);
  let delay = 0;
  const nodes: ReactNode[] = [];

  chunks.forEach((chunk, chunkIndex) => {
    const isEm = chunk.startsWith("*") && chunk.endsWith("*");
    const text = isEm ? chunk.slice(1, -1) : chunk;
    const tokens = text.split(/(\s+)/);

    tokens.forEach((token, tokenIndex) => {
      if (!token) return;
      const key = `${chunkIndex}-${tokenIndex}`;
      if (/^\s+$/.test(token)) {
        nodes.push(<span key={`${key}-s`}>{token}</span>);
        return;
      }
      const style = { animationDelay: `${delay}s` };
      delay += 0.07;
      nodes.push(
        isEm ? (
          <em key={key} className="manifesto-em manifesto-word" style={style}>
            {token}
          </em>
        ) : (
          <span key={key} className="manifesto-word" style={style}>
            {token}
          </span>
        ),
      );
    });
  });

  return nodes;
}

function toScreens(beats: ManifestoBeat[]): ManifestoBeat[] {
  const screens: ManifestoBeat[] = [];
  for (const beat of beats) {
    if (beat.close) {
      screens.push(beat);
      continue;
    }
    for (const line of beat.lines) {
      screens.push({ lines: [line] });
    }
  }
  return screens;
}

function screenDuration(beat: ManifestoBeat) {
  if (beat.close) return 5600;
  const words = beat.lines
    .join(" ")
    .replace(/\*/g, "")
    .split(/\s+/)
    .filter(Boolean).length;
  const enter = Math.min(1300, 380 + words * 60);
  const hold = 1100 + words * 90;
  return enter + hold;
}

function beatState(index: number, active: number) {
  if (index === active) return "current";
  if (index === active - 1) return "prev";
  if (index === active + 1) return "next";
  return "idle";
}

export function GrowSection() {
  const locale = useLocale() as Locale;
  const copy = useMemo(() => getManifesto(locale), [locale]);
  const screens = useMemo(() => toScreens(copy.beats), [copy.beats]);
  const total = screens.length;
  const stageRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let timeout: number | undefined;
    let visible = false;

    const schedule = (index: number) => {
      const wait = screenDuration(screens[index] ?? screens[0]);
      timeout = window.setTimeout(() => {
        const next = (activeRef.current + 1) % total;
        setActive(next);
        if (visible) schedule(next);
      }, wait);
    };

    const stop = () => {
      visible = false;
      setPlaying(false);
      if (timeout) window.clearTimeout(timeout);
      timeout = undefined;
    };

    const start = () => {
      if (visible) return;
      visible = true;
      setPlaying(true);
      setActive(0);
      activeRef.current = 0;
      if (timeout) window.clearTimeout(timeout);
      schedule(0);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.4);
        if (inView) start();
        else stop();
      },
      { threshold: [0.25, 0.4, 0.6], rootMargin: "-8% 0px -8% 0px" },
    );

    observer.observe(stage);

    return () => {
      stop();
      observer.disconnect();
    };
  }, [screens, total, locale]);

  const current = screens[active];
  const duration = current ? screenDuration(current) : 3000;

  return (
    <div className={`manifesto-pin${playing ? " is-playing" : ""}`}>
      <div
        ref={stageRef}
        className="manifesto-stage"
        style={{ "--manifesto-dur": `${duration}ms` } as CSSProperties}
      >
        <p className="sr-only">{manifestoPlainText(copy)}</p>
        <div className="manifesto-progress" aria-hidden>
          <span key={active} />
        </div>
        <p className="manifesto-index" aria-hidden>
          {String(active + 1).padStart(2, "0")}
          <span> / {String(total).padStart(2, "0")}</span>
        </p>
        <div className="manifesto-wheel" aria-hidden>
          {screens.map((beat, index) => (
            <div
              key={`${locale}-${index}`}
              className={`manifesto-beat${beat.close ? " manifesto-beat-close" : ""}`}
              data-state={beatState(index, active)}
            >
              {beat.lines.map((line) => (
                <p key={line} className="manifesto-line font-display">
                  {parseLine(line)}
                </p>
              ))}
            </div>
          ))}
        </div>
        {current ? (
          <p className="sr-only" aria-live="polite">
            {current.lines.map((line) => line.replace(/\*/g, "")).join(" ")}
          </p>
        ) : null}
      </div>
    </div>
  );
}
