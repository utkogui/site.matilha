"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { useScrollGate } from "@/components/services/useScrollGate";

type Phase = "idle" | "gap" | "hiring" | "result";
type Seat = { role: string; name: string; initial: string };

const TONES = ["#7ea0c4", "#7dae88", "#d4b06a", "#d48989"];

export function DaasChallenge() {
  const t = useTranslations("servicePage.items.daas.challenge");
  const people = t.raw("people") as Seat[];
  const openRoles = t.raw("openRoles") as string[];
  const tickets = t.raw("tickets") as string[];
  const hireTickets = t.raw("hireTickets") as string[];
  const designer = t.raw("designer") as { name: string; role: string; initial: string };

  const [phase, setPhase] = useState<Phase>("idle");
  const [days, setDays] = useState(0);
  const [triedHire, setTriedHire] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const arenaRef = useRef<HTMLDivElement>(null);

  const playing = phase === "gap" || phase === "hiring";
  useScrollGate(sectionRef, headRef, arenaRef, playing);

  useEffect(() => {
    if (phase !== "hiring") return;
    setDays(1);
    const timer = window.setInterval(() => {
      setDays((value) => {
        if (value >= 45) {
          window.clearInterval(timer);
          return 45;
        }
        return value + 2;
      });
    }, 40);
    return () => window.clearInterval(timer);
  }, [phase]);

  function start() {
    setDays(0);
    setTriedHire(false);
    setPhase("gap");
  }

  function tryHire() {
    if (phase !== "gap" && phase !== "hiring") return;
    setTriedHire(true);
    setPhase("hiring");
  }

  function allocate() {
    if (phase !== "gap" && phase !== "hiring") return;
    setPhase("result");
  }

  const filled = phase === "result";
  const hiring = phase === "hiring";
  const hireDone = hiring && days >= 45;
  const queue = hiring ? [...tickets, ...hireTickets] : tickets;

  return (
    <section ref={sectionRef} className="daas-challenge" data-phase={phase}>
      <div className="container-site">
        <div ref={headRef} className="daas-challenge-head">
          <p className="service-label">{t("label")}</p>
          <h2 className="service-section-heading">{t("heading")}</h2>
          <p className="daas-challenge-lead">{t("lead")}</p>
        </div>

        <div ref={arenaRef} className="daas-challenge-stage">
          <div className="daas-scene">
            <div className={`daas-board-live${filled ? " is-filled" : ""}${hiring ? " is-hiring" : ""}`}>
              <div className="daas-board-live-top">
                <strong>{t("squad")}</strong>
                <span className={`daas-board-live-chip${filled ? " is-ok" : hiring ? " is-warn" : ""}`}>
                  {filled ? t("period") : hiring ? t("hireRunning", { days: Math.min(days, 45) }) : t("gapChip")}
                </span>
              </div>

              <ul className="daas-table-people">
                {people.map((person, index) => (
                  <li key={person.role} style={{ "--tone": TONES[index] } as CSSProperties}>
                    <span className="daas-face">{person.initial}</span>
                    <span>
                      <strong>{person.name}</strong>
                      {person.role}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="daas-open">
                <p className="daas-open-label">{filled ? t("openFilledLabel") : t("openLabel")}</p>
                <ul className="daas-open-seats">
                  {openRoles.map((role, index) => {
                    const isPrimary = index === 0;
                    const isFilled = filled && isPrimary;
                    return (
                      <li
                        key={role}
                        className={isFilled ? "is-filled" : filled ? "is-open" : "is-empty"}
                      >
                        <span className="daas-face">{isFilled ? designer.initial : null}</span>
                        {isFilled ? (
                          <span>
                            <strong>{designer.name}</strong>
                            {designer.role}
                          </span>
                        ) : (
                          <strong>{role}</strong>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className={`daas-table-queue${filled ? " is-moving" : hiring ? " is-stuck" : ""}`}>
                <p>{filled ? t("movingLabel") : hiring ? t("hireWaiting") : t("waitingLabel")}</p>
                <ul>
                  {queue.map((ticket) => (
                    <li key={ticket}>{ticket}</li>
                  ))}
                </ul>
              </div>

              {hiring ? (
                <div className={`daas-hire-meter${hireDone ? " is-done" : ""}`} aria-hidden>
                  <i style={{ width: `${Math.min((days / 45) * 100, 100)}%` }} />
                  <small>{t("hireMeter")}</small>
                </div>
              ) : null}
            </div>

            {phase === "idle" ? (
              <div className="daas-challenge-cover">
                <button type="button" className="daas-challenge-start" onClick={start}>
                  {t("start")}
                </button>
              </div>
            ) : null}

            {playing ? (
              <aside className={`daas-prompt${hiring ? " is-hiring" : ""}${hireDone ? " is-ready" : ""}`}>
                <p className="daas-prompt-kicker">{hireDone ? t("promptReady") : t("promptKicker")}</p>
                <p className="daas-prompt-lead">
                  {hiring ? t("hireLead") : t("gapLead")}
                </p>
                {hireDone ? (
                  <button
                    type="button"
                    className="daas-action is-daas is-focus is-solo"
                    onClick={allocate}
                  >
                    <strong>{t("daasAction")}</strong>
                    <span>{t("daasActionHint")}</span>
                  </button>
                ) : (
                  <div className="daas-actions-row">
                    <button
                      type="button"
                      className={`daas-action is-hire${hiring ? " is-active" : ""}`}
                      onClick={tryHire}
                      disabled={hiring}
                    >
                      <strong>{t("hireAction")}</strong>
                      <span>{t("hireActionHint")}</span>
                    </button>
                    <button
                      type="button"
                      className={`daas-action is-daas${triedHire ? " is-focus" : ""}`}
                      onClick={allocate}
                    >
                      <strong>{t("daasAction")}</strong>
                      <span>{t("daasActionHint")}</span>
                    </button>
                  </div>
                )}
              </aside>
            ) : null}

            {phase === "result" ? (
              <aside className="daas-prompt is-result">
                <div className="daas-result-compare">
                  <span>
                    <em>{t("hireTime")}</em>
                    {t("hireLabel")}
                  </span>
                  <span>
                    <strong>{t("daasTime")}</strong>
                    {t("daasLabel")}
                  </span>
                </div>
                <p className="daas-challenge-result-title">{t("resultTitle")}</p>
                <p className="daas-challenge-result-body">
                  {triedHire ? t("resultBody") : t("resultClean")}
                </p>
                <ul className="daas-result-points">
                  {(t.raw("points") as string[]).map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <button type="button" className="daas-challenge-start" onClick={start}>
                  {t("retry")}
                </button>
              </aside>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
