"use client";

import { useTranslations } from "next-intl";
import { ServiceStepper, type ServiceStep } from "@/components/services/ServiceStepper";

const HEARD = 20;
const WOULD_PAY = 12;

type Line = { from: "pai" | "matilha"; text: string };

function Cohort({ filled }: { filled: number }) {
  return (
    <ul className="mvp-cohort" aria-hidden>
      {Array.from({ length: HEARD }, (_, index) => (
        <li key={index} className={index < filled ? "is-yes" : ""} />
      ))}
    </ul>
  );
}

export function MvpBuild() {
  const t = useTranslations("servicePage.items.mvp.build");
  const chips = t.raw("board.chips") as string[];
  const noise = t.raw("board.noise") as string[];
  const quotes = t.raw("board.quotes") as string[];
  const thread = t.raw("board.thread") as Line[];

  return (
    <ServiceStepper
      className="mvp-build"
      label={t("label")}
      heading={t("heading")}
      hint={t("scrollHint")}
      steps={t.raw("steps") as ServiceStep[]}
    >
      <div className="service-window mvp-desk">
        <div className="mvp-desk-top">
          <strong>{t("board.case")}</strong>
          <span className="mvp-desk-chips">
            {chips.map((chip) => (
              <em key={chip}>{chip}</em>
            ))}
          </span>
        </div>

        <div className="mvp-desk-body">
          <aside className="mvp-bet">
            <p className="mvp-kicker">{t("board.betLabel")}</p>
            <p className="mvp-bet-line">
              <span>{t("board.if")}</span>
              {t("board.hypothesis")}
            </p>
            <p className="mvp-bet-line">
              <span>{t("board.then")}</span>
              {t("board.outcome")}
            </p>
            <p className="mvp-kicker is-noise">{t("board.noiseLabel")}</p>
            <ul className="mvp-noise">
              {noise.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>

          <div className="mvp-pane">
            <div className="mvp-pane-empty">
              <Cohort filled={0} />
              <p>
                <strong>{t("board.emptyCount")}</strong>
                {t("board.emptyTitle")}
              </p>
              <span>{t("board.emptyBody")}</span>
            </div>

            <div className="mvp-pane-phone">
              <div className="mvp-chat">
                <header>
                  <strong>{t("board.chatTitle")}</strong>
                  <em>{t("board.chatWho")}</em>
                </header>
                <ul>
                  {thread.map((line) => (
                    <li key={line.text} className={`is-${line.from}`}>
                      {line.text}
                    </li>
                  ))}
                </ul>
              </div>
              <small>{t("board.proto")}</small>
            </div>

            <div className="mvp-pane-lab">
              <div className="mvp-lab-head">
                <Cohort filled={WOULD_PAY} />
                <p>
                  <strong>
                    {WOULD_PAY}/{HEARD}
                  </strong>
                  {t("board.payLabel")}
                </p>
              </div>
              <ul className="mvp-lab-metrics">
                <li>
                  <strong>{t("board.accessValue")}</strong>
                  {t("board.accessLabel")}
                </li>
                <li>
                  <strong>{t("board.talkValue")}</strong>
                  {t("board.talkLabel")}
                </li>
              </ul>
              <blockquote>{quotes[0]}</blockquote>
              <div className="mvp-verdict">
                <span>{t("board.stamp")}</span>
                <p>
                  <strong>{t("board.decision")}</strong>
                  {t("board.next")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ServiceStepper>
  );
}
