"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FadeInUp } from "@/components/animation/FadeInUp";
import { syxSpace, syxSystemGroups } from "@/lib/media/syx-assets";

type SyxSystemProps = {
  title: string;
  body: string;
  cover: string;
};

const groupLabel: Record<(typeof syxSystemGroups)[number]["key"], "syxSystemFoundation" | "syxSystemAction" | "syxSystemStructure" | "syxSystemProduct" | "syxSystemFlow"> = {
  foundation: "syxSystemFoundation",
  action: "syxSystemAction",
  structure: "syxSystemStructure",
  product: "syxSystemProduct",
  flow: "syxSystemFlow",
};

const icons = [
  { name: "syxIconSearch", path: "M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm10 2-5.2-5.2" },
  { name: "syxIconBid", path: "M4 18V6m0 12 6-4 5 3 5-7" },
  { name: "syxIconCheck", path: "M5 12.5 9.2 17 19 7" },
  { name: "syxIconFilter", path: "M4 6h16M7 12h10M10 18h4" },
  { name: "syxIconTag", path: "M4 11.5 11.5 4H20v8.5L12.5 20 4 11.5Zm12-5.5h.01" },
  { name: "syxIconUser", path: "M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm7 9a7 7 0 0 0-14 0" },
  { name: "syxIconChat", path: "M5 18v-2.2A6 6 0 0 1 8 5.2 7 7 0 0 1 19 11a6.5 6.5 0 0 1-2.4 5L19 19l-5-1.1A7 7 0 0 1 5 18Z" },
  { name: "syxIconCalendar", path: "M7 4v3M17 4v3M5 9h14M6 6h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" },
] as const;

export function SyxSystem({ title, body, cover }: SyxSystemProps) {
  const t = useTranslations("cases");
  const [active, setActive] = useState(true);

  return (
    <section className="syx-chapter syx-system" aria-labelledby="syx-system-title">
      <div className="container-site">
        <FadeInUp>
          <p className="mini-heading syx-chapter-label">{t("syxSystemLabel")}</p>
          <h2 id="syx-system-title" className="syx-chapter-title">
            {title}
          </h2>
          <p className="syx-chapter-body">{body}</p>
        </FadeInUp>

        <div className="syx-system-map">
          <p className="syx-system-kicker">{t("syxSystemMap")}</p>
          <div className="syx-system-groups">
            {syxSystemGroups.map((group) => (
              <div key={group.key} className="syx-system-group">
                <p>{t(groupLabel[group.key])}</p>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{t(item)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="syx-system-board">
          <p className="syx-system-kicker">{t("syxSystemSpace")}</p>
          <ul className="syx-space">
            {syxSpace.map((size) => (
              <li key={size}>
                <span className="syx-space-bar" style={{ width: size }} />
                <strong>{size}</strong>
              </li>
            ))}
          </ul>
        </div>

        <div className="syx-system-board">
          <p className="syx-system-kicker">{t("syxSystemIcons")}</p>
          <ul className="syx-icons">
            {icons.map((icon) => (
              <li key={icon.name}>
                <svg viewBox="0 0 24 24" aria-hidden>
                  <path d={icon.path} />
                </svg>
                <span>{t(icon.name)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="syx-system-board">
          <p className="syx-system-kicker">{t("syxSystemButtons")}</p>
          <div className="syx-btn-row">
            <button type="button" className="syx-ui-btn is-primary">
              {t("syxBtnPrimary")}
            </button>
            <button type="button" className="syx-ui-btn is-secondary">
              {t("syxBtnSecondary")}
            </button>
            <button type="button" className="syx-ui-btn is-ghost">
              {t("syxBtnGhost")}
            </button>
            <button type="button" className="syx-ui-btn is-link">
              {t("syxBtnLink")}
            </button>
            <button type="button" className="syx-ui-btn is-danger">
              {t("syxBtnDanger")}
            </button>
            <button type="button" className="syx-ui-btn is-primary" disabled>
              {t("syxBtnPrimary")}
            </button>
          </div>
        </div>

        <div className="syx-system-split">
          <div className="syx-system-board">
            <p className="syx-system-kicker">{t("syxSystemFields")}</p>
            <label className="syx-field">
              <span>{t("syxFieldLabel")}</span>
              <input type="text" placeholder={t("syxFieldPlaceholder")} />
            </label>
            <label className="syx-field is-error">
              <span>{t("syxFieldLabel")}</span>
              <input type="text" defaultValue="" readOnly />
              <small>{t("syxFieldError")}</small>
            </label>
            <label className="syx-field is-ok">
              <span>{t("syxFieldLabel")}</span>
              <input type="text" defaultValue={t("syxFieldPlaceholder")} readOnly />
              <small>{t("syxFieldOk")}</small>
            </label>
          </div>

          <div className="syx-system-board">
            <p className="syx-system-kicker">{t("syxSystemSelect")}</p>
            <label className="syx-choice">
              <input type="radio" name="syx-sale" defaultChecked />
              <span>{t("syxSelectRadio")}</span>
            </label>
            <label className="syx-choice">
              <input type="checkbox" defaultChecked />
              <span>{t("syxSelectCheck")}</span>
            </label>
            <label className="syx-switch">
              <input type="checkbox" checked={active} onChange={() => setActive((value) => !value)} />
              <span />
              {t("syxSelectSwitch")}
            </label>

            <p className="syx-system-kicker">{t("syxSystemTags")}</p>
            <ul className="syx-tags">
              <li className="is-sober">{t("syxTagSober")}</li>
              <li className="is-magic">{t("syxTagMagic")}</li>
              <li className="is-grey">{t("syxTagGrey")}</li>
              <li className="is-alert">{t("syxTagAlert")}</li>
            </ul>
          </div>
        </div>

        <div className="syx-system-board">
          <p className="syx-system-kicker">{t("syxSystemCards")}</p>
          <article className="syx-listing">
            <div className="syx-listing-media">
              <Image src={cover} alt="" fill className="object-cover" sizes="(max-width: 700px) 100vw, 280px" />
            </div>
            <div className="syx-listing-copy">
              <ul className="syx-tags">
                <li className="is-sober">{t("syxTagSober")}</li>
                <li className="is-magic">{t("syxTagMagic")}</li>
              </ul>
              <h3>{t("syxCardTitle")}</h3>
              <p>{t("syxCardMeta")}</p>
              <strong>{t("syxCardPrice")}</strong>
              <button type="button" className="syx-ui-btn is-primary">
                {t("syxCardCta")}
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
