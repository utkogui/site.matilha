"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useScrollGate } from "@/components/services/useScrollGate";

type Phase = "idle" | "show" | "ask" | "result";
type Kind = "strong" | "generic" | "decoy";
type Entry = { name: string; kind: Kind; index: number };

const FLASH_MS = 560;

function shuffle<T>(values: T[]) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

function Mark({ kind, index }: { kind: Kind; index: number }) {
  if (kind === "strong" && index === 0) {
    return (
      <span className="brand-recall-mark is-alba" aria-hidden>
        <span />
        <span />
      </span>
    );
  }
  if (kind === "strong") {
    return <span className="brand-recall-mark is-tucano" aria-hidden />;
  }
  return <span className="brand-recall-mark is-generic" aria-hidden />;
}

export function BrandingChallenge() {
  const t = useTranslations("servicePage.items.branding.challenge");
  const strong = t.raw("strong") as string[];
  const generic = t.raw("generic") as string[];
  const decoys = t.raw("decoys") as string[];

  const shownEntries: Entry[] = [
    ...strong.map((name, index) => ({ name, kind: "strong" as const, index })),
    ...generic.map((name, index) => ({ name, kind: "generic" as const, index })),
  ];
  const allEntries: Entry[] = [
    ...shownEntries,
    ...decoys.map((name, index) => ({ name, kind: "decoy" as const, index })),
  ];

  const [phase, setPhase] = useState<Phase>("idle");
  const [shown, setShown] = useState<Entry[]>(shownEntries);
  const [options, setOptions] = useState<Entry[]>(allEntries);
  const [picked, setPicked] = useState<Set<string>>(() => new Set());
  const [flash, setFlash] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const arenaRef = useRef<HTMLDivElement>(null);

  useScrollGate(sectionRef, headRef, arenaRef, phase === "show" || phase === "ask");

  useEffect(() => {
    if (phase !== "show") return;
    let index = 0;
    const id = window.setInterval(() => {
      index += 1;
      if (index >= shown.length) {
        window.clearInterval(id);
        setPhase("ask");
        return;
      }
      setFlash(index);
    }, FLASH_MS);
    return () => window.clearInterval(id);
  }, [phase, shown.length]);

  function start() {
    setShown(shuffle(shownEntries));
    setOptions(shuffle(allEntries));
    setPicked(new Set());
    setFlash(0);
    setPhase("show");
  }

  function toggle(name: string) {
    if (phase !== "ask") return;
    setPicked((current) => {
      const next = new Set(current);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  const count = (kind: Kind) => allEntries.filter((entry) => entry.kind === kind && picked.has(entry.name)).length;
  const strongHits = count("strong");
  const genericHits = count("generic");
  const falseHits = count("decoy");
  const current = shown[Math.min(flash, shown.length - 1)];

  return (
    <section ref={sectionRef} className="brand-recall" data-phase={phase}>
      <div className="container-site">
        <div ref={headRef} className="brand-recall-head">
          <p className="service-label">{t("label")}</p>
          <h2 className="service-section-heading">{t("heading")}</h2>
          <p className="brand-recall-lead">{t("lead")}</p>
        </div>

        <div ref={arenaRef} className="brand-recall-stage">
          {phase === "idle" ? (
            <div className="brand-recall-idle">
              <p className="brand-recall-idle-kicker">{t("memorize")}</p>
              <p className="brand-recall-idle-count">{shownEntries.length}</p>
              <p className="brand-recall-idle-unit">{t("idleUnit")}</p>
              <button type="button" className="brand-recall-start" onClick={start}>
                {t("start")}
              </button>
            </div>
          ) : null}

          {phase === "show" && current ? (
            <div
              key={`${current.kind}-${current.name}-${flash}`}
              className={`brand-recall-poster is-${current.kind} is-${current.kind}-${current.index}`}
            >
              <Mark kind={current.kind} index={current.index} />
              <p className="brand-recall-poster-name">{current.name}</p>
              <p className="brand-recall-poster-index">
                {t("flashIndex", { current: flash + 1, total: shown.length })}
              </p>
            </div>
          ) : null}

          {phase === "ask" || phase === "result" ? (
            <div className="brand-recall-wall">
              <div className="brand-recall-wall-bar">
                {phase === "result" ? (
                  <p className="brand-recall-wall-title">{t("resultTitle")}</p>
                ) : (
                  <>
                    <p className="brand-recall-wall-title">{t("askTitle")}</p>
                    <p className="brand-recall-wall-count">
                      {picked.size} {t("askCount")}
                    </p>
                  </>
                )}
              </div>
              <div className="brand-recall-stickers">
                {options.map((entry, index) => {
                  const isPicked = picked.has(entry.name);
                  const reveal = phase === "result" ? ` is-${entry.kind}` : "";
                  return (
                    <button
                      key={entry.name}
                      type="button"
                      className={`brand-recall-sticker is-${entry.kind}-${entry.index}${isPicked ? " is-picked" : ""}${reveal}`}
                      style={{ "--i": index } as CSSProperties}
                      aria-pressed={isPicked}
                      disabled={phase === "result"}
                      onClick={() => toggle(entry.name)}
                    >
                      <Mark kind={entry.kind === "decoy" ? "generic" : entry.kind} index={entry.index} />
                      <span>{entry.name}</span>
                    </button>
                  );
                })}
              </div>
              {phase === "ask" ? (
                <button type="button" className="brand-recall-start is-check" onClick={() => setPhase("result")}>
                  {t("check")}
                </button>
              ) : (
                <div className="brand-recall-score" aria-live="polite">
                  <div className="brand-recall-score-col is-strong">
                    <strong>
                      {strongHits}/{strong.length}
                    </strong>
                    <span>{t("labelStrong")}</span>
                  </div>
                  <div className="brand-recall-score-col is-generic">
                    <strong>
                      {genericHits}/{generic.length}
                    </strong>
                    <span>{t("labelGeneric")}</span>
                  </div>
                  <div className="brand-recall-score-copy">
                    <p className="brand-recall-score-body">
                      {t("resultBody", { strong: strongHits, generic: genericHits })}
                    </p>
                    <p className="brand-recall-score-note">
                      {falseHits > 0 ? t("resultFalse", { count: falseHits }) : t("resultClean")}
                    </p>
                  </div>
                  <button type="button" className="brand-recall-start" onClick={start}>
                    {t("retry")}
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
