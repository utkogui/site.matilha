"use client";

import { useTranslations } from "next-intl";
import { ServiceStepper, type ServiceStep } from "@/components/services/ServiceStepper";

const SIZES = [38, 39, 40, 41, 42];

export function UxuiBuild() {
  const t = useTranslations("servicePage.items.uxui.build");

  return (
    <ServiceStepper
      className="uxui-build"
      label={t("label")}
      heading={t("heading")}
      hint={t("scrollHint")}
      steps={t.raw("steps") as ServiceStep[]}
    >
      <div className="uxui-mock">
        <div className="service-browser-bar">
          <i />
          <i />
          <i />
          <em>{t("mock.url")}</em>
        </div>

        <div className="uxui-mock-body">
          <div className="uxui-mock-media">
            <span className="uxui-mock-orb" />
            <span className="uxui-mock-orb uxui-mock-orb-small" />
            <span className="uxui-mock-badge">01</span>
          </div>

          <div className="uxui-mock-info">
            <p className="uxui-mock-brand">
              <span className="uxui-mock-text">{t("mock.brand")}</span>
            </p>
            <p className="uxui-mock-category">
              <span className="uxui-mock-text">{t("mock.category")}</span>
            </p>
            <p className="uxui-mock-title">
              <span className="uxui-mock-text">{t("mock.product")}</span>
            </p>
            <p className="uxui-mock-rating">
              <span className="uxui-mock-text">★★★★★ {t("mock.rating")}</span>
            </p>
            <p className="uxui-mock-price">
              <span className="uxui-mock-text">{t("mock.price")}</span>
            </p>
            <div className="uxui-mock-sizes">
              <span className="uxui-mock-size-label">
                <span className="uxui-mock-text">{t("mock.sizeLabel")}</span>
              </span>
              <div className="uxui-mock-size-row">
                {SIZES.map((size) => (
                  <span key={size} className={`uxui-mock-size${size === 40 ? " is-selected" : ""}`}>
                    {size}
                  </span>
                ))}
              </div>
            </div>
            <span className="uxui-mock-cta">
              <span className="uxui-mock-text">{t("mock.cta")}</span>
            </span>
          </div>
        </div>

        <div className="uxui-mock-toast">
          <span className="uxui-mock-toast-check">✓</span>
          {t("mock.toast")}
        </div>
      </div>
    </ServiceStepper>
  );
}
