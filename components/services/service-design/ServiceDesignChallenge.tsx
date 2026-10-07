"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Step = "symptom" | "cause" | "done";
type Side = "front" | "back";
type Fact = { id: string; title: string; line: string; side: Side };

const SYMPTOM = "wait";
const CAUSE = "stock";

export function ServiceDesignChallenge() {
  const t = useTranslations("servicePage.items.serviceDesign.challenge");
  const facts = t.raw("facts") as Fact[];
  const [step, setStep] = useState<Step>("symptom");
  const [miss, setMiss] = useState("");

  const front = facts.filter((fact) => fact.side === "front");
  const back = facts.filter((fact) => fact.side === "back");
  const showBack = step !== "symptom";

  function pick(id: string) {
    if (step === "done") return;

    if (step === "symptom") {
      if (id === SYMPTOM) {
        setMiss("");
        setStep("cause");
        return;
      }
      setMiss(t("symptomMiss"));
      return;
    }

    if (id === CAUSE) {
      setMiss("");
      setStep("done");
      return;
    }

    setMiss(t("causeMiss"));
  }

  return (
    <section className="sd-challenge" data-step={step}>
      <div className="container-site">
        <div className="sd-challenge-head">
          <p className="service-label">{t("label")}</p>
          <h2 className="service-section-heading">{t("heading")}</h2>
          <p className="sd-challenge-lead">{t("lead")}</p>
        </div>

        <div className="sd-challenge-stage">
          <p className="sd-ask">
            {step === "cause" ? t("causeAsk") : step === "done" ? t("doneAsk") : t("symptomAsk")}
          </p>

          <div className="sd-board">
            <div className="sd-lane">
              <p className="sd-lane-label">{t("frontLabel")}</p>
              <div className="sd-facts">
                {front.map((fact) => (
                  <button
                    key={fact.id}
                    type="button"
                    className={[
                      "sd-fact",
                      step !== "symptom" && fact.id === SYMPTOM ? "is-symptom" : "",
                      step === "done" ? "is-locked" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => pick(fact.id)}
                    disabled={step === "done"}
                  >
                    <strong>{fact.title}</strong>
                    <span>{fact.line}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={`sd-lane is-back${showBack ? " is-open" : ""}`}>
              <p className="sd-lane-label">{t("backLabel")}</p>
              {showBack ? (
                <div className="sd-facts">
                  {back.map((fact) => (
                    <button
                      key={fact.id}
                      type="button"
                      className={`sd-fact is-back${step === "done" && fact.id === CAUSE ? " is-cause" : ""}`}
                      onClick={() => pick(fact.id)}
                      disabled={step === "done"}
                    >
                      <strong>{fact.title}</strong>
                      <span>{fact.line}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="sd-back-locked">{t("backLocked")}</p>
              )}
            </div>
          </div>

          <p className={`sd-challenge-miss${miss ? " is-visible" : ""}`}>{miss}</p>

          {step === "done" ? (
            <div className="sd-challenge-result is-short">
              <p className="sd-challenge-result-title">{t("resultTitle")}</p>
              <p className="sd-challenge-result-body">{t("resultBody")}</p>
              <button
                type="button"
                className="sd-challenge-start"
                onClick={() => {
                  setStep("symptom");
                  setMiss("");
                }}
              >
                {t("retry")}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
