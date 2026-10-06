"use client";

import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { ServiceStepper, type ServiceStep } from "@/components/services/ServiceStepper";

const PALETTE = ["var(--service-accent)", "#2b0f1e", "#f6e7d8", "#0f0f0f"];

function AlbaMark({ className }: { className?: string }) {
  return (
    <span className={["brand-mark", className].filter(Boolean).join(" ")}>
      <span className="brand-mark-sun" />
      <span className="brand-mark-line" />
    </span>
  );
}

export function BrandingBuild() {
  const t = useTranslations("servicePage.items.branding.build");
  const candidates = t.raw("board.candidates") as string[];
  const chosen = t("board.chosen");
  const apps = t.raw("board.apps") as string[];

  return (
    <ServiceStepper
      className="brand-build"
      label={t("label")}
      heading={t("heading")}
      hint={t("scrollHint")}
      steps={t.raw("steps") as ServiceStep[]}
    >
      <div className="service-window brand-board">
        <div className="brand-layer brand-layer-names">
          <p className="brand-board-label">{t("board.namesLabel")}</p>
          <ul className="brand-names">
            {candidates.map((name, index) => (
              <li
                key={name}
                className={`brand-name${name === chosen ? " is-chosen" : ""}`}
                style={{ "--i": index } as CSSProperties}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>

        <div className="brand-layer brand-layer-logo">
          <span className="brand-grid" />
          <div className="brand-lockup">
            <AlbaMark />
            <span className="brand-wordmark">{chosen.toLowerCase()}</span>
          </div>
          <p className="brand-tagline">{t("board.tagline")}</p>

          <div className="brand-system">
            <div className="brand-palette">
              <p className="brand-board-label">{t("board.paletteLabel")}</p>
              <div className="brand-swatches">
                {PALETTE.map((color, index) => (
                  <span key={color} style={{ background: color, "--i": index } as CSSProperties} />
                ))}
              </div>
            </div>
            <div className="brand-type">
              <p className="brand-board-label">{t("board.typeLabel")}</p>
              <p className="brand-type-specimen">
                Aa<span>{t("board.typeName")}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="brand-layer brand-layer-apps">
          <div className="brand-app brand-app-cup" style={{ "--i": 0 } as CSSProperties}>
            <span className="brand-cup">
              <span className="brand-cup-lid" />
              <span className="brand-cup-body">
                <AlbaMark className="is-small" />
              </span>
            </span>
            <span className="brand-app-label">{apps[0]}</span>
          </div>
          <div className="brand-app brand-app-card" style={{ "--i": 1 } as CSSProperties}>
            <span className="brand-card">
              <span className="brand-card-top">
                <AlbaMark className="is-small" />
                <strong>{chosen.toLowerCase()}</strong>
              </span>
              <span className="brand-card-name">{t("board.cardName")}</span>
              <span className="brand-card-role">{t("board.cardRole")}</span>
            </span>
            <span className="brand-app-label">{apps[1]}</span>
          </div>
          <div className="brand-app brand-app-icon" style={{ "--i": 2 } as CSSProperties}>
            <span className="brand-icon">
              <AlbaMark className="is-small" />
            </span>
            <span className="brand-app-label">{apps[2]}</span>
          </div>
        </div>
      </div>
    </ServiceStepper>
  );
}
