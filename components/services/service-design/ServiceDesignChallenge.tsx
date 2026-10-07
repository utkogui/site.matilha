"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useScrollGate } from "@/components/services/useScrollGate";

type Phase = "idle" | "live" | "play" | "result";
type Room = { id: string; title: string; line: string; miss?: string; fix?: string };
type LiveBeat = {
  id: string;
  title: string;
  body: string;
  cta: string;
  cta2?: string;
  clock?: string;
  clock2?: string;
};
type Kpi = { label: string; from: string; to: string };
type SceneCopy = {
  onTime: string;
  ready: string;
  appTitle: string;
  product: string;
  order: string;
  paid: string;
  pickupCta: string;
  waitTitle: string;
  ticket: string;
  desk: string;
  noEta: string;
  you: string;
  called: string;
  arrived: string;
  waitClock: string;
  counterTitle: string;
  counterOk: string;
  counterTime: string;
  staff: string;
  bag: string;
  stockTitle: string;
  stockError: string;
  stockHint: string;
};

const HOLE = "stock";

function SdFig({ who }: { who: "you" | "clerk" | "other" }) {
  return (
    <span className={`sd-fig is-${who}`} aria-hidden>
      <i />
      <b />
      <em />
    </span>
  );
}

function SdScene({
  kind,
  clock,
  waited,
  copy,
  compact,
}: {
  kind: string;
  clock?: string;
  waited?: boolean;
  copy: SceneCopy;
  compact?: boolean;
}) {
  const minutes = (clock ?? copy.waitClock).replace(/\D/g, "") || "40";

  if (kind === "app") {
    return (
      <div className={`sd-scene is-app${compact ? " is-compact" : ""}`} aria-hidden>
        <div className="sd-phone">
          <span className="sd-phone-notch" />
          <div className="sd-phone-screen">
            <div className="sd-phone-top">
              <small>{copy.appTitle}</small>
              <span>{copy.ready}</span>
            </div>
            <div className="sd-product">
              <span className="sd-product-art">
                <i />
                <b />
              </span>
              <div>
                <strong>{copy.product}</strong>
                <small>
                  {copy.order} · {copy.paid}
                </small>
              </div>
            </div>
            <p className="sd-phone-ready">{copy.ready}</p>
            <span className="sd-phone-cta">{copy.pickupCta}</span>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "wait") {
    return (
      <div
        className={`sd-scene is-wait${waited ? " is-long" : ""}${compact ? " is-compact" : ""}`}
        aria-hidden
      >
        <div className="sd-display">
          <div className="sd-display-top">
            <strong>{copy.waitTitle}</strong>
            <span>{copy.onTime}</span>
          </div>
          <p className="sd-display-ticket">{copy.ticket}</p>
          <div className="sd-display-meta">
            <span>{copy.desk}</span>
            <b>{copy.noEta}</b>
          </div>
          {waited ? <em className="sd-display-call">{copy.called}</em> : null}
        </div>

        <div className="sd-lobby">
          <div className="sd-queue">
            <span className={`sd-spot${waited ? " is-empty" : ""}`}>
              {waited ? null : <SdFig who="other" />}
            </span>
            <span className="sd-spot is-you">
              <SdFig who="you" />
              <small>{copy.you}</small>
            </span>
            <span className="sd-spot">
              <SdFig who="other" />
            </span>
          </div>

          <div className="sd-timer" data-long={waited ? "true" : "false"}>
            <strong>{minutes}</strong>
            <span>min</span>
          </div>
        </div>

        <div className="sd-wait-track">
          <i style={{ width: waited ? "86%" : "34%" }} />
          <small>{copy.arrived}</small>
        </div>
      </div>
    );
  }

  if (kind === "counter") {
    return (
      <div className={`sd-scene is-counter${compact ? " is-compact" : ""}`} aria-hidden>
        <div className="sd-counter-stage">
          <span className="sd-counter-col is-clerk">
            <SdFig who="clerk" />
            <small>{copy.staff}</small>
          </span>
          <span className="sd-bag">
            <em />
            <i />
            <b />
            <small>{copy.bag}</small>
          </span>
          <span className="sd-counter-col is-you">
            <SdFig who="you" />
            <small>{copy.you}</small>
          </span>
          <span className="sd-counter-desk" />
        </div>
        <p className="sd-counter-time">{copy.counterTime}</p>
      </div>
    );
  }

  return (
    <div className={`sd-scene is-stock${compact ? " is-compact" : ""}`} aria-hidden>
      <div className="sd-shelf-frame">
        <div className="sd-shelf">
          <span className="is-box" />
          <span className="is-miss">
            <b />
          </span>
          <span className="is-box" />
        </div>
        <p className="sd-stock-error">{copy.stockError}</p>
        <small className="sd-stock-hint">{copy.stockHint}</small>
      </div>
    </div>
  );
}

export function ServiceDesignChallenge() {
  const t = useTranslations("servicePage.items.serviceDesign.challenge");
  const rooms = t.raw("rooms") as Room[];
  const live = t.raw("live") as LiveBeat[];
  const designed = t.raw("designed") as string[];
  const kpis = t.raw("kpis") as Kpi[];
  const scene = t.raw("scene") as SceneCopy;

  const [phase, setPhase] = useState<Phase>("idle");
  const [liveStep, setLiveStep] = useState(0);
  const [waited, setWaited] = useState(false);
  const [misses, setMisses] = useState(0);
  const [lastMiss, setLastMiss] = useState<string | null>(null);
  const [flash, setFlash] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const arenaRef = useRef<HTMLDivElement>(null);

  const playing = phase === "live" || phase === "play";
  useScrollGate(sectionRef, headRef, arenaRef, playing);

  const beat = live[liveStep];
  const missRoom = rooms.find((room) => room.id === lastMiss);

  function start() {
    setLiveStep(0);
    setWaited(false);
    setMisses(0);
    setLastMiss(null);
    setFlash(0);
    setPhase("live");
  }

  function advanceLive() {
    if (!beat) return;
    if (beat.id === "wait" && !waited) {
      setWaited(true);
      return;
    }
    if (liveStep < live.length - 1) {
      setLiveStep((step) => step + 1);
      return;
    }
    setPhase("play");
  }

  function pick(id: string) {
    if (phase !== "play") return;
    if (id === HOLE) {
      setLastMiss(null);
      setPhase("result");
      return;
    }
    setLastMiss(id);
    setMisses((count) => count + 1);
    setFlash((count) => count + 1);
  }

  return (
    <section ref={sectionRef} className="sd-challenge" data-phase={phase}>
      <div className="container-site">
        <div ref={headRef} className="sd-challenge-head">
          <p className="service-label">{t("label")}</p>
          <h2 className="service-section-heading">{t("heading")}</h2>
          <p className="sd-challenge-lead">{t("lead")}</p>
        </div>

        <div ref={arenaRef} className="sd-challenge-stage">
          <div className="sd-store">
            <div className="sd-store-bar">
              <strong>{t("store")}</strong>
              <span className={`sd-store-chip${phase === "result" ? " is-ok" : ""}`}>
                {phase === "result" ? t("fixedLabel") : t("complaint")}
              </span>
            </div>

            {phase === "live" && beat ? (
              <div
                key={`${beat.id}-${waited ? "long" : "short"}`}
                className="sd-live"
                data-beat={beat.id}
                data-waited={waited ? "true" : "false"}
              >
                <div className="sd-live-stage">
                  <SdScene
                    kind={beat.id}
                    waited={waited}
                    copy={scene}
                    clock={beat.id === "wait" && waited ? beat.clock2 : beat.clock}
                  />
                </div>
                <div className="sd-live-copy">
                  <p className="sd-live-kicker">{t("liveLabel")}</p>
                  <p className="sd-live-status">{t("status")}</p>
                  <p className="sd-live-title">{beat.title}</p>
                  <p className="sd-live-body">{beat.body}</p>
                  <button type="button" className="sd-challenge-start" onClick={advanceLive}>
                    {beat.id === "wait" && waited ? beat.cta2 : beat.cta}
                  </button>
                </div>
              </div>
            ) : (
              <div className={`sd-floor${phase === "idle" ? " is-idle" : ""}`}>
                {rooms.map((room) => {
                  const hole = room.id === HOLE;
                  const bait = room.id === "wait";
                  return (
                    <button
                      key={room.id}
                      type="button"
                      className={[
                        "sd-room",
                        bait ? "is-bait" : "",
                        hole ? "is-hole" : "",
                        lastMiss === room.id ? "is-miss" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => pick(room.id)}
                      disabled={phase !== "play"}
                    >
                      <SdScene
                        kind={room.id}
                        waited={room.id === "wait"}
                        copy={scene}
                        clock={scene.waitClock}
                        compact
                      />
                      <strong>{room.title}</strong>
                      <span>{phase === "result" && hole ? room.fix : room.line}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {phase === "play" ? (
              <>
                <p className="sd-diagnose">{t("diagnose")}</p>
                <p className={`sd-challenge-miss${flash > 0 ? " is-visible" : ""}`} key={flash}>
                  {missRoom?.miss ?? ""}
                </p>
              </>
            ) : null}

            {phase === "result" ? (
              <div className="sd-challenge-result">
                <p className="sd-reveal">{t("reveal")}</p>
                <ol className="sd-fixed-path">
                  {designed.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
                <ul className="sd-result-kpis">
                  {kpis.map((kpi) => (
                    <li key={kpi.label}>
                      <span>{kpi.label}</span>
                      <strong>
                        <em>{kpi.from}</em>
                        {kpi.to}
                      </strong>
                    </li>
                  ))}
                </ul>
                <p className="sd-challenge-result-title">{t("resultTitle")}</p>
                <p className="sd-challenge-result-body">
                  {misses === 0 ? t("resultClean") : t("resultBody", { count: misses })}
                </p>
                <button type="button" className="sd-challenge-start" onClick={start}>
                  {t("retry")}
                </button>
              </div>
            ) : null}

            {phase === "idle" ? (
              <div className="sd-challenge-cover">
                <button type="button" className="sd-challenge-start" onClick={start}>
                  {t("start")}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
