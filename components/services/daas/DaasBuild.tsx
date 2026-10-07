"use client";

import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { ServiceStepper, type ServiceStep } from "@/components/services/ServiceStepper";

type Person = { role: string; name: string; initial: string };
type Slot = { day: string; time: string; title: string; who: string; whoEmpty?: string };

const TONES = ["#7ea0c4", "#7dae88", "#d4b06a", "#d48989"];

export function DaasBuild() {
  const t = useTranslations("servicePage.items.daas.build");
  const people = t.raw("board.people") as Person[];
  const tools = t.raw("board.tools") as string[];
  const agenda = t.raw("board.agenda") as Slot[];
  const tickets = t.raw("board.tickets") as string[];

  return (
    <ServiceStepper
      className="daas-build"
      label={t("label")}
      heading={t("heading")}
      hint={t("scrollHint")}
      steps={t.raw("steps") as ServiceStep[]}
    >
      <div className="service-window daas-board">
        <div className="daas-bar">
          <i />
          <i />
          <i />
          <em>{t("board.app")}</em>
          <span className="daas-bar-count is-empty">{t("board.countEmpty")}</span>
          <span className="daas-bar-count is-full">{t("board.countFull")}</span>
        </div>

        <div className="daas-screen">
          <div className="daas-layer daas-layer-seat">
            <ul className="daas-people">
              {people.map((person, index) => (
                <li key={person.role} style={{ "--tone": TONES[index], "--i": index } as CSSProperties}>
                  <span className="daas-face">{person.initial}</span>
                  <span>
                    <strong>{person.name}</strong>
                    {person.role}
                  </span>
                </li>
              ))}
              <li className="is-empty">
                <span className="daas-face" />
                <span>
                  <strong>{t("board.emptyTitle")}</strong>
                  {t("board.emptyRole")}
                </span>
              </li>
            </ul>
            <div className="daas-waiting">
              <p>{t("board.waitingLabel")}</p>
              <ul>
                {tickets.map((ticket) => (
                  <li key={ticket}>{ticket}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="daas-layer daas-layer-person">
            <span className="daas-face is-hero">{t("board.designer.initial")}</span>
            <p className="daas-person-name">{t("board.designer.name")}</p>
            <p className="daas-person-role">
              {t("board.designer.role")}, {t("board.designer.from")}
            </p>
            <p className="daas-person-line">{t("board.designer.line")}</p>
            <ul className="daas-tools">
              {tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>

          <div className="daas-layer daas-layer-rituals">
            <div className="daas-ritual-compare">
              <div className="daas-ritual-side is-before">
                <p className="daas-ritual-label">{t("board.ritualBefore")}</p>
                <ol className="daas-agenda is-muted">
                  {agenda.map((slot, index) => (
                    <li key={`before-${slot.title}`} style={{ "--i": index } as CSSProperties}>
                      <span className="daas-agenda-day">{slot.day}</span>
                      <span className="daas-agenda-body">
                        <strong>{slot.title}</strong>
                        {slot.whoEmpty ?? t("board.ritualEmptyWho")}
                      </span>
                      <span className="daas-agenda-time is-gap">{t("board.ritualGap")}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="daas-ritual-side is-after">
                <p className="daas-ritual-label">{t("board.ritualAfter")}</p>
                <ol className="daas-agenda">
                  {agenda.map((slot, index) => (
                    <li key={`after-${slot.title}`} style={{ "--i": index } as CSSProperties}>
                      <span className="daas-agenda-day">{slot.day}</span>
                      <span className="daas-agenda-body">
                        <strong>{slot.title}</strong>
                        {slot.who}
                      </span>
                      <span className="daas-agenda-time">{slot.time}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <div className="daas-layer daas-layer-flow">
            <div className="daas-speed-compare">
              <div className="daas-speed-side is-hire">
                <p className="daas-speed-label">{t("board.speedHireLabel")}</p>
                <strong className="daas-speed-time is-slow">{t("board.speedHireTime")}</strong>
                <div className="daas-speed-seat is-empty">
                  <span className="daas-face" />
                  <p>{t("board.emptyTitle")}</p>
                </div>
                <ul className="daas-speed-queue">
                  {tickets.map((ticket) => (
                    <li key={`hire-${ticket}`}>{ticket}</li>
                  ))}
                </ul>
                <p className="daas-speed-note">{t("board.speedHireNote")}</p>
              </div>
              <div className="daas-speed-side is-daas">
                <p className="daas-speed-label">{t("board.speedDaasLabel")}</p>
                <strong className="daas-speed-time">{t("board.speedDaasTime")}</strong>
                <div className="daas-speed-seat is-filled">
                  <span className="daas-face is-hero-mini">{t("board.designer.initial")}</span>
                  <p>{t("board.designer.name")}</p>
                </div>
                <ul className="daas-speed-queue is-done">
                  {tickets.map((ticket, index) => (
                    <li key={`daas-${ticket}`} style={{ "--i": index } as CSSProperties}>
                      <span />
                      {ticket}
                    </li>
                  ))}
                </ul>
                <p className="daas-speed-note is-ok">{t("board.shipped")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ServiceStepper>
  );
}
