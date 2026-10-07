"use client";

import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { ServiceStepper, type ServiceStep } from "@/components/services/ServiceStepper";

type Cell = { title: string; messy: string; fix: string };
type Kpi = { label: string; from: string; to: string };

function SdRow({
  kind,
  label,
  cells,
}: {
  kind: "client" | "front" | "back";
  label: string;
  cells: Cell[];
}) {
  return (
    <div className={`sd-row is-${kind}`}>
      <span className="sd-row-label">{label}</span>
      {cells.map((cell, index) => (
        <div key={cell.title} className="sd-cell" style={{ "--i": index } as CSSProperties}>
          <strong>{cell.title}</strong>
          <span className="sd-cell-messy">{cell.messy}</span>
          <span className="sd-cell-fix">{cell.fix}</span>
        </div>
      ))}
    </div>
  );
}

export function ServiceDesignBuild() {
  const t = useTranslations("servicePage.items.serviceDesign.build");
  const moments = t.raw("board.moments") as string[];
  const client = t.raw("board.client") as Cell[];
  const front = t.raw("board.front") as Cell[];
  const back = t.raw("board.back") as Cell[];
  const kpis = t.raw("board.kpis") as Kpi[];

  return (
    <ServiceStepper
      className="sd-build"
      label={t("label")}
      heading={t("heading")}
      hint={t("scrollHint")}
      steps={t.raw("steps") as ServiceStep[]}
    >
      <div className="service-window sd-board">
        <div className="sd-head">
          <strong>{t("board.case")}</strong>
          <span className="sd-head-state is-warn">{t("board.complaint")}</span>
          <span className="sd-head-state is-ok">{t("board.fixed")}</span>
        </div>

        <div className="sd-blueprint">
          <div className="sd-row is-moments">
            <span className="sd-row-label">{t("board.momentsLabel")}</span>
            {moments.map((moment) => (
              <span key={moment} className="sd-moment">
                {moment}
              </span>
            ))}
          </div>

          <SdRow kind="client" label={t("board.clientLabel")} cells={client} />
          <p className="sd-rule">{t("board.visibility")}</p>
          <SdRow kind="front" label={t("board.frontLabel")} cells={front} />
          <p className="sd-rule is-interaction">{t("board.interaction")}</p>
          <SdRow kind="back" label={t("board.backLabel")} cells={back} />
        </div>

        <ul className="sd-kpis">
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
      </div>
    </ServiceStepper>
  );
}
