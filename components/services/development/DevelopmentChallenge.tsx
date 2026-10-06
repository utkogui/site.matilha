"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useScrollGate } from "@/components/services/useScrollGate";

type Phase = "idle" | "a" | "b" | "result";

const SLOW_CONTENT = 2200;
const SLOW_SHIFT = 2650;
const FAST_CONTENT = 250;

export function DevelopmentChallenge() {
  const t = useTranslations("servicePage.items.development.challenge");
  const locale = useLocale();

  const [phase, setPhase] = useState<Phase>("idle");
  const [load, setLoad] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [times, setTimes] = useState({ a: 0, b: 0 });
  const [misses, setMisses] = useState({ a: 0, b: 0 });
  const [missFlash, setMissFlash] = useState(0);
  const startRef = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const arenaRef = useRef<HTMLDivElement>(null);

  const running = phase === "a" || phase === "b";

  useScrollGate(sectionRef, headRef, arenaRef, running);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setElapsed((performance.now() - startRef.current) / 1000);
    }, 47);
    return () => window.clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (!running) return;
    const timers =
      phase === "a"
        ? [window.setTimeout(() => setLoad(1), SLOW_CONTENT), window.setTimeout(() => setLoad(2), SLOW_SHIFT)]
        : [window.setTimeout(() => setLoad(2), FAST_CONTENT)];
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [phase, running]);

  const format = (value: number) =>
    new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value);

  function beginRound(next: "a" | "b") {
    setLoad(0);
    setElapsed(0);
    setMissFlash(0);
    startRef.current = performance.now();
    setPhase(next);
  }

  function start() {
    setTimes({ a: 0, b: 0 });
    setMisses({ a: 0, b: 0 });
    beginRound("a");
  }

  function buy() {
    const value = (performance.now() - startRef.current) / 1000;
    if (phase === "a") {
      setTimes({ a: value, b: 0 });
      beginRound("b");
      return;
    }
    setTimes((current) => ({ ...current, b: value }));
    setPhase("result");
  }

  function miss() {
    if (phase !== "a" && phase !== "b") return;
    const key = phase;
    setMisses((current) => ({ ...current, [key]: current[key] + 1 }));
    setMissFlash((count) => count + 1);
  }

  const factor = times.b > 0 ? times.a / times.b : 0;
  const maxTime = Math.max(times.a, times.b, 0.1);
  const showPage = phase === "result" || load > 0;
  const showBanner = phase === "result" || phase === "b" || load === 2;
  const fast = phase === "b" || phase === "result";

  return (
    <section ref={sectionRef} className="service-challenge dev-challenge" data-phase={phase}>
      <div className="container-site">
        <div ref={headRef} className="service-challenge-head">
          <p className="service-label">{t("label")}</p>
          <h2 className="service-section-heading">{t("heading")}</h2>
          <p className="service-challenge-lead">{t("lead")}</p>
        </div>

        <div ref={arenaRef} className="service-challenge-arena">
          <aside className="service-challenge-board" aria-live="polite">
            {phase === "result" ? (
              <div className="service-challenge-result">
                <p className="service-challenge-result-title">{t("resultTitle")}</p>
                <div className="service-challenge-bars">
                  <div className="service-challenge-bar is-a">
                    <span className="service-challenge-bar-label">{t("labelA")}</span>
                    <span className="service-challenge-bar-track">
                      <span style={{ width: `${(times.a / maxTime) * 100}%` }} />
                    </span>
                    <span className="service-challenge-bar-value">{format(times.a)}s</span>
                  </div>
                  <div className="service-challenge-bar is-b">
                    <span className="service-challenge-bar-label">{t("labelB")}</span>
                    <span className="service-challenge-bar-track">
                      <span style={{ width: `${(times.b / maxTime) * 100}%` }} />
                    </span>
                    <span className="service-challenge-bar-value">{format(times.b)}s</span>
                  </div>
                </div>
                <p className="service-challenge-result-body">
                  {t("resultBody", { a: format(times.a), b: format(times.b) })}
                  {misses.a > 0 ? ` ${t("resultMisses", { count: misses.a })}` : ""}
                </p>
                <p className="service-challenge-result-factor">
                  {factor >= 1.2 ? t("resultFactor", { factor: format(factor) }) : t("resultEqual")}
                </p>
                <button type="button" className="service-challenge-start" onClick={start}>
                  {t("retry")}
                </button>
              </div>
            ) : (
              <>
                <p className="service-challenge-round">{phase === "b" ? t("roundB") : t("roundA")}</p>
                <p className="service-challenge-timer">
                  {format(elapsed)}
                  <span>{t("seconds")}</span>
                </p>
                <p className={`service-challenge-miss${missFlash > 0 ? " is-visible" : ""}`} key={missFlash}>
                  {t("miss")}
                </p>
              </>
            )}
          </aside>

          <div className="service-challenge-screen">
            <div className={`service-challenge-frame dev-frame${fast ? " is-fast" : ""}`}>
              <div className="service-browser-bar">
                <i />
                <i />
                <i />
                <em>{fast ? t("urlFast") : t("urlSlow")}</em>
                {running && !showPage ? <span className="dev-frame-loading" /> : null}
              </div>

              <div className="dev-page" onClick={miss} inert={running ? undefined : true}>
                {showPage ? (
                  <>
                    {showBanner ? <div className="dev-page-banner">{t("banner")}</div> : null}
                    <div className="dev-page-product">
                      <div className="dev-page-media">
                        <span />
                      </div>
                      <div className="dev-page-info">
                        <p className="dev-page-store">{t("store")}</p>
                        <p className="dev-page-title">{t("product")}</p>
                        <p className="dev-page-price">{t("price")}</p>
                        <button
                          type="button"
                          className="dev-page-buy"
                          onClick={(event) => {
                            event.stopPropagation();
                            buy();
                          }}
                        >
                          {t("buy")}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="dev-page-skeleton">
                    <span className="dev-spinner" />
                    <p>{t("loading")}</p>
                    <span className="dev-sk dev-sk-wide" />
                    <span className="dev-sk" />
                    <span className="dev-sk dev-sk-short" />
                  </div>
                )}
              </div>

              {phase === "idle" ? (
                <div className="service-challenge-cover">
                  <button type="button" className="service-challenge-start" onClick={start}>
                    {t("start")}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
