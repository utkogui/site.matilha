"use client";

import { useMemo, useRef, useState, type DragEvent } from "react";
import { useTranslations } from "next-intl";
import { useScrollGate } from "@/components/services/useScrollGate";

type Phase = "idle" | "play" | "result";
type Side = "proof" | "noise";
type DropTarget = Side | "pool";
type Card = { text: string; real: boolean };

function joinList(items: string[], and: string) {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} ${and} ${items[items.length - 1]}`;
}

function shuffle<T>(values: T[]) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

export function MvpChallenge() {
  const t = useTranslations("servicePage.items.mvp.challenge");
  const real = t.raw("real") as string[];
  const vanity = t.raw("vanity") as string[];
  const deck: Card[] = useMemo(
    () => [...real.map((text) => ({ text, real: true })), ...vanity.map((text) => ({ text, real: false }))],
    [real, vanity],
  );

  const [phase, setPhase] = useState<Phase>("idle");
  const [cards, setCards] = useState<Card[]>(deck);
  const [placed, setPlaced] = useState<Record<string, Side>>({});
  const [armed, setArmed] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [over, setOver] = useState<DropTarget | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const arenaRef = useRef<HTMLDivElement>(null);

  useScrollGate(sectionRef, headRef, arenaRef, phase === "play");

  function start() {
    setCards(shuffle(deck));
    setPlaced({});
    setArmed(null);
    setDragging(null);
    setOver(null);
    setPhase("play");
  }

  function placeCard(text: string, side: Side) {
    if (phase !== "play") return;
    setPlaced((current) => ({ ...current, [text]: side }));
    setArmed(null);
    setDragging(null);
    setOver(null);
  }

  function unplace(text: string) {
    if (phase !== "play") return;
    setPlaced((current) => {
      const next = { ...current };
      delete next[text];
      return next;
    });
    setDragging(null);
    setOver(null);
  }

  function onDragStart(event: DragEvent<HTMLElement>, text: string) {
    if (phase !== "play") return;
    event.dataTransfer.setData("text/plain", text);
    event.dataTransfer.effectAllowed = "move";
    setDragging(text);
    setArmed(text);
  }

  function allowDrop(event: DragEvent<HTMLElement>, target: DropTarget) {
    if (phase !== "play") return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    setOver(target);
  }

  function onDrop(event: DragEvent<HTMLElement>, target: DropTarget) {
    event.preventDefault();
    const text = event.dataTransfer.getData("text/plain") || dragging;
    if (!text) return;
    if (target === "pool") unplace(text);
    else placeCard(text, target);
  }

  const pool = cards.filter((card) => !placed[card.text]);
  const proof = cards.filter((card) => placed[card.text] === "proof");
  const noise = cards.filter((card) => placed[card.text] === "noise");
  const ready = Object.keys(placed).length === cards.length;
  const vanityWrong = proof.filter((card) => !card.real).map((card) => card.text);
  const missed = noise.filter((card) => card.real).map((card) => card.text);
  const sortOk = vanityWrong.length === 0 && missed.length === 0;

  function finish() {
    if (!ready) return;
    setPhase("result");
  }

  return (
    <section
      ref={sectionRef}
      className="mvp-challenge"
      data-phase={phase}
      data-result={phase === "result" ? (sortOk ? "ok" : "bad") : undefined}
    >
      <div className="container-site">
        <div ref={headRef} className="mvp-challenge-head">
          <p className="service-label">{t("label")}</p>
          <h2 className="service-section-heading">{t("heading")}</h2>
          {phase === "idle" ? <p className="mvp-challenge-lead">{t("lead")}</p> : null}
        </div>

        <div ref={arenaRef} className="mvp-challenge-stage">
          {phase === "idle" ? (
            <div className="mvp-challenge-idle">
              <p className="mvp-idle-mark">?</p>
              <button type="button" className="mvp-challenge-start" onClick={start}>
                {t("start")}
              </button>
            </div>
          ) : (
            <div className="mvp-table">
              <div className="mvp-table-bar">
                {phase === "result" ? (
                  <p>{sortOk ? t("resultGoTitle") : t("resultBlindTitle")}</p>
                ) : (
                  <>
                    <p>{ready ? t("decideLead") : t("askTitle")}</p>
                    <span>
                      {Object.keys(placed).length}/{cards.length}
                    </span>
                  </>
                )}
              </div>

              {phase === "play" ? (
                <div
                  className={`mvp-cards${over === "pool" ? " is-over" : ""}`}
                  onDragOver={(event) => allowDrop(event, "pool")}
                  onDrop={(event) => onDrop(event, "pool")}
                >
                  {pool.map((card) => (
                    <button
                      key={card.text}
                      type="button"
                      draggable
                      className={`mvp-card${dragging === card.text ? " is-dragging" : ""}${armed === card.text ? " is-armed" : ""}`}
                      onDragStart={(event) => onDragStart(event, card.text)}
                      onDragEnd={() => {
                        setDragging(null);
                        setOver(null);
                      }}
                      onClick={() => setArmed(card.text)}
                    >
                      {card.text}
                    </button>
                  ))}
                </div>
              ) : null}

              <div className="mvp-bins">
                {(["proof", "noise"] as const).map((side) => {
                  const pile = side === "proof" ? proof : noise;
                  return (
                    <div
                      key={side}
                      className={`mvp-bin is-${side}${armed || dragging ? " is-ready" : ""}${over === side ? " is-over" : ""}`}
                      onDragOver={(event) => allowDrop(event, side)}
                      onDrop={(event) => onDrop(event, side)}
                    >
                      <button
                        type="button"
                        className="mvp-bin-drop"
                        disabled={!armed || phase === "result"}
                        onClick={() => armed && placeCard(armed, side)}
                      >
                        {side === "proof" ? t("proofLabel") : t("noiseLabel")}
                      </button>
                      <ul>
                        {pile.map((card) => {
                          const wrong =
                            phase === "result" &&
                            ((side === "proof" && !card.real) || (side === "noise" && card.real));
                          return (
                            <li key={card.text}>
                              <button
                                type="button"
                                draggable={phase === "play"}
                                className={`mvp-card${dragging === card.text ? " is-dragging" : ""}${wrong ? " is-wrong" : ""}${phase === "result" && !wrong ? " is-right" : ""}`}
                                onDragStart={(event) => onDragStart(event, card.text)}
                                onDragEnd={() => {
                                  setDragging(null);
                                  setOver(null);
                                }}
                                onClick={() => unplace(card.text)}
                              >
                                {card.text}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {phase === "play" ? (
                <div className="mvp-decide">
                  <button type="button" className="mvp-go" disabled={!ready} onClick={finish}>
                    {t("go")}
                  </button>
                </div>
              ) : (
                <div className="mvp-challenge-result">
                  <p>
                    {sortOk
                      ? t("resultGoBody")
                      : [vanityWrong.length ? t("whyVanity", { items: joinList(vanityWrong, t("and")) }) : "", missed.length ? t("whyMissed", { items: joinList(missed, t("and")) }) : ""]
                          .filter(Boolean)
                          .join(" ")}
                  </p>
                  <button type="button" className="mvp-challenge-start" onClick={start}>
                    {t("retry")}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
