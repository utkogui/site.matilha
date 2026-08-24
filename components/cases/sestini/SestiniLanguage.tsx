"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { FadeInUp } from "@/components/animation/FadeInUp";
import {
  sestiniBrandbook,
  sestiniInspireCallouts,
  sestiniLogos,
} from "@/lib/media/sestini-assets";

type Chapter = {
  title?: string;
  body?: string;
};

type SestiniLanguageProps = {
  inspiration?: Chapter;
  graphics?: Chapter;
  elements?: Chapter;
  quote: string;
  part: "inspire" | "system";
};

const patternFields = [
  { name: "Vermelho", hex: "#DA291C", ink: "#F0E9DB" },
  { name: "Azul", hex: "#006298", ink: "#FFFFFF" },
  { name: "Laranja", hex: "#DC6B2F", ink: "#F0E9DB" },
  { name: "Topaz", hex: "#FFAA4D", ink: "#161020" },
] as const;

export function SestiniLanguage({
  inspiration,
  graphics,
  elements,
  part,
}: SestiniLanguageProps) {
  const t = useTranslations("cases");
  const windowPlane = sestiniBrandbook.windowPlane;
  const tote = sestiniBrandbook.tote;
  const pattern = sestiniBrandbook.pattern;
  const luggage = sestiniBrandbook.luggageGraphic;
  const tapeBox = sestiniBrandbook.tapeBox;
  const shapesBand = sestiniBrandbook.shapesBand;

  if (part === "inspire") {
    return (
      <section className="sestini-chapter sestini-inspire" aria-labelledby="sestini-inspire-title">
        <div className="container-site">
          <div className="sestini-inspire-grid">
            <FadeInUp>
              <p className="mini-heading sestini-chapter-label">{t("sestiniInspire")}</p>
              <h2 id="sestini-inspire-title" className="sestini-chapter-title">
                {inspiration?.title ?? t("sestiniInspire")}
              </h2>
              {inspiration?.body ? <p className="sestini-chapter-body">{inspiration.body}</p> : null}
            </FadeInUp>

            <figure className="sestini-inspire-shot">
              <div className="sestini-inspire-visual">
                <ul className="sestini-inspire-callouts" aria-label={t("sestiniInspire")}>
                  {sestiniInspireCallouts.map((color) => (
                    <li key={color.hex} className="sestini-inspire-callout" data-tone={color.tone}>
                      <span className="sestini-inspire-dot" style={{ backgroundColor: color.hex }} />
                      <span className="sestini-inspire-callout-name">{color.name}</span>
                    </li>
                  ))}
                </ul>
                <div className="relative sestini-inspire-media" style={{ position: "relative" }}>
                  <Image
                    src={windowPlane.src}
                    alt={windowPlane.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 42vw"
                    className="sestini-frame-image sestini-inspire-photo"
                    quality={78}
                  />
                </div>
              </div>
            </figure>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="sestini-chapter sestini-graphics" aria-labelledby="sestini-graphics-title">
        <div className="container-site">
          <div className="sestini-split">
            <FadeInUp>
              <p className="mini-heading sestini-chapter-label">{t("sestiniGraphics")}</p>
              <h2 id="sestini-graphics-title" className="sestini-chapter-title">
                {graphics?.title ?? t("sestiniGraphics")}
              </h2>
              {graphics?.body ? <p className="sestini-chapter-body">{graphics.body}</p> : null}
            </FadeInUp>
            <figure className="sestini-graphics-shot">
              <div className="relative sestini-graphics-media" style={{ position: "relative" }}>
                <Image
                  src={tote.src}
                  alt={tote.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 48vw"
                  className="sestini-frame-image sestini-inspire-photo"
                  quality={78}
                />
              </div>
            </figure>
          </div>
          <div className="sestini-graphics-pair">
            <figure className="sestini-graphics-shot">
              <div className="relative sestini-graphics-media sestini-graphics-media-pattern" style={{ position: "relative" }}>
                <Image
                  src={pattern.src}
                  alt={pattern.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className="sestini-frame-image sestini-inspire-photo"
                  quality={72}
                />
              </div>
            </figure>
            <figure className="sestini-graphics-shot">
              <div className="relative sestini-graphics-media" style={{ position: "relative" }}>
                <Image
                  src={luggage.src}
                  alt={luggage.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className="sestini-frame-image sestini-inspire-photo"
                  quality={78}
                />
              </div>
            </figure>
          </div>
          <div className="sestini-pattern-row" aria-hidden>
            {patternFields.map((field) => (
              <div
                key={field.hex}
                className="sestini-pattern-field"
                style={{ backgroundColor: field.hex, color: field.ink }}
              >
                <span className="sestini-pattern-name">{field.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sestini-elements" aria-labelledby="sestini-elements-title">
        <div className="container-site sestini-elements-intro">
          <div className="sestini-elements-head">
            <FadeInUp>
              <p className="mini-heading sestini-chapter-label">{t("sestiniElements")}</p>
              <h2 id="sestini-elements-title" className="sestini-chapter-title">
                {elements?.title ?? t("sestiniElements")}
              </h2>
              {elements?.body ? <p className="sestini-chapter-body">{elements.body}</p> : null}
            </FadeInUp>
            <img
              src={sestiniLogos.symbol}
              alt=""
              width={186}
              height={200}
              className="sestini-elements-mark"
            />
          </div>
        </div>

        <div className="sestini-elements-band" aria-hidden>
          <img src={shapesBand.src} alt="" width={shapesBand.width} height={shapesBand.height} />
        </div>

        <figure className="sestini-elements-mockup">
          <div className="relative sestini-elements-mockup-media" style={{ position: "relative" }}>
            <Image
              src={tapeBox.src}
              alt={tapeBox.alt}
              fill
              sizes="100vw"
              className="sestini-frame-image sestini-inspire-photo"
              quality={78}
            />
          </div>
        </figure>
      </section>
    </>
  );
}
