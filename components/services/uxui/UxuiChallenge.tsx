"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useScrollGate } from "@/components/services/useScrollGate";

type Phase = "idle" | "a" | "b" | "result";

const TARGET = -1;

function shuffle(values: number[]) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

export function UxuiChallenge() {
  const t = useTranslations("servicePage.items.uxui.challenge");
  const locale = useLocale();
  const decoys = t.raw("decoys") as string[];
  const items = t.raw("items") as string[];
  const itemPrices = t.raw("itemPrices") as string[];

  const [phase, setPhase] = useState<Phase>("idle");
  const [order, setOrder] = useState<number[]>(() => [...decoys.map((_, index) => index), TARGET]);
  const [elapsed, setElapsed] = useState(0);
  const [times, setTimes] = useState({ a: 0, b: 0 });
  const [misses, setMisses] = useState(0);
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

  const format = (value: number) =>
    new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value);

  function start() {
    setOrder(shuffle([...decoys.map((_, index) => index), TARGET]));
    setTimes({ a: 0, b: 0 });
    setMisses(0);
    setElapsed(0);
    startRef.current = performance.now();
    setPhase("a");
  }

  function hit() {
    const value = (performance.now() - startRef.current) / 1000;
    setMisses(0);
    if (phase === "a") {
      setTimes({ a: value, b: 0 });
      setElapsed(0);
      startRef.current = performance.now();
      setPhase("b");
      return;
    }
    setTimes((current) => ({ ...current, b: value }));
    setPhase("result");
  }

  function miss() {
    setMisses((count) => count + 1);
  }

  const factor = times.b > 0 ? times.a / times.b : 0;
  const maxTime = Math.max(times.a, times.b, 0.1);

  return (
    <section ref={sectionRef} className="service-challenge" data-phase={phase}>
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
                <p className="service-challenge-round">
                  {phase === "b" ? t("roundB") : t("roundA")}
                </p>
                <p className="service-challenge-timer">
                  {format(elapsed)}
                  <span>{t("seconds")}</span>
                </p>
                <p className={`service-challenge-miss${misses > 0 ? " is-visible" : ""}`} key={misses}>
                  {t("miss")}
                </p>
              </>
            )}
          </aside>

          <div className="service-challenge-screen">
            <div className="service-challenge-frame">
              <div className="service-browser-bar">
                <i />
                <i />
                <i />
                <em>matilha.store/checkout</em>
              </div>

              {phase === "b" || phase === "result" ? (
                <div className="uxui-clean" inert={phase === "result" ? true : undefined}>
                  <p className="uxui-clean-title">{t("cleanTitle")}</p>
                  <ul className="uxui-clean-items">
                    {items.map((item, index) => (
                      <li key={item}>
                        <span>{item}</span>
                        <span>{itemPrices[index]}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="uxui-clean-total">
                    <span>{t("totalLabel")}</span>
                    <strong>{t("total")}</strong>
                  </p>
                  <button type="button" className="uxui-clean-cta" onClick={hit}>
                    {t("target")}
                  </button>
                  <p className="uxui-clean-secure">{t("secure")}</p>
                </div>
              ) : (
                <div className="uxui-clutter" inert={phase !== "a" ? true : undefined}>
                  <p className="uxui-clutter-banner">{t("banner")}</p>
                  <div className="uxui-clutter-top">
                    <p className="uxui-clutter-title">{t("cartTitle")}</p>
                    <p className="uxui-clutter-coupon">{t("coupon")}</p>
                  </div>
                  <ul className="uxui-clutter-items">
                    {items.map((item, index) => (
                      <li key={item}>
                        <span>{item}</span>
                        <span>{itemPrices[index]}</span>
                      </li>
                    ))}
                    <li className="uxui-clutter-total">
                      <span>{t("totalLabel")}</span>
                      <span>{t("total")}</span>
                    </li>
                  </ul>
                  <div className="uxui-clutter-actions">
                    {order.map((entry) =>
                      entry === TARGET ? (
                        <button key="target" type="button" className="uxui-clutter-btn is-target" onClick={hit}>
                          {t("target")}
                        </button>
                      ) : (
                        <button
                          key={entry}
                          type="button"
                          className={`uxui-clutter-btn is-decoy-${entry % 4}`}
                          onClick={miss}
                        >
                          {decoys[entry]}
                        </button>
                      ),
                    )}
                  </div>
                  <div className="uxui-clutter-popup">
                    <span>{t("popup")}</span>
                    <button type="button" onClick={miss} aria-label="×">
                      ×
                    </button>
                  </div>
                </div>
              )}

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
