import { getTranslations, setRequestLocale } from "next-intl/server";
import { MatilhaButton } from "@/components/ui/MatilhaButton";
import { TrainingIcon, type TrainingIconName } from "@/components/training/TrainingIcons";
import { TrainingPaths } from "@/components/training/TrainingPaths";
import { TrainingSectorAutonomia } from "@/components/training/TrainingSectorAutonomia";
import { highlightTag } from "@/lib/i18n/rich-tags";
import {
  trainingStatKeys,
  trainingTimelineIcons,
  trainingTimelineWeekKeys,
} from "@/lib/content/training";
import { baseMetadata, buildPageTitle } from "@/lib/seo/metadata";
import type { Locale } from "@/lib/i18n/routing";

type TimelineStep = {
  mark: string;
  title: string;
  body: string;
};

type TimelineWeek = {
  label: string;
  steps: TimelineStep[];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "training" });

  return baseMetadata({
    title: buildPageTitle(t("title"), locale as Locale),
    description: t("description"),
    pathname: "/training",
    locale: locale as Locale,
  });
}

export default async function TrainingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("training");
  const basicItems = t.raw("basicItems") as string[];
  const advancedItems = t.raw("advancedItems") as string[];
  const timeline = t.raw("timeline") as Record<string, TimelineWeek>;
  const sectors = t.raw("sectors") as Record<string, string>;
  let timelineIconIndex = 0;

  return (
    <article className="training-page">
      <section className="training-hero">
        <div className="training-hero-media" aria-hidden>
          <img
            src="/images/training/hero-incompany-1920.webp"
            srcSet="/images/training/hero-incompany-1280.webp 1280w, /images/training/hero-incompany-1920.webp 1920w, /images/training/hero-incompany-2400.webp 2400w"
            sizes="100vw"
            alt=""
            className="training-hero-image"
            width={1920}
            height={1280}
            fetchPriority="high"
          />
          <div className="training-hero-veil" />
        </div>

        <div className="container-site training-hero-layout">
          <div className="training-hero-copy">
            <p className="mini-heading">{t("heroLabel")}</p>
            <TrainingSectorAutonomia
              prefix={t("autonomiaPrefix")}
              suffixLead={t("autonomiaSuffixLead")}
              autonomiaBase={t("autonomiaBase")}
              autonomiaAccent={t("autonomiaAccent")}
              sectors={sectors}
            />
            <p className="training-hero-lead">{t("heroLead")}</p>
            <div className="training-hero-actions">
              <MatilhaButton href="/contact" variant="solid">
                {t("heroCta")}
              </MatilhaButton>
            </div>
          </div>

          <dl className="training-stats">
            {trainingStatKeys.map((key, index) => (
              <div
                key={key}
                className={`training-stat${index === 0 ? " is-featured" : ""}`}
              >
                <dt>
                  <strong className={key === "sectors" ? "training-infinity" : undefined}>
                    {t(`stats.${key}.value`)}
                  </strong>
                  <span>{t(`stats.${key}.unit`)}</span>
                </dt>
                <dd>{t(`stats.${key}.label`)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="training-shift" className="training-section training-section-paper">
        <div className="container-site">
          <p className="mini-heading">{t("learnLabel")}</p>
          <h2 className="heading-display training-section-heading">
            {t.rich("learnHeading", highlightTag)}
          </h2>
          <p className="training-section-lead">{t("learnLead")}</p>

          <TrainingPaths />
        </div>
      </section>

      <section className="training-section training-section-paper training-section-paper-alt">
        <div className="container-site">
          <p className="mini-heading">{t("shiftLabel")}</p>
          <h2 className="heading-display training-section-heading">{t("shiftHeading")}</h2>

          <div className="training-shift-compare" role="group" aria-label={t("shiftHeading")}>
            <article className="training-shift-card training-shift-before">
              <p className="training-shift-side">{t("beforeTitle")}</p>
              <p>{t("beforeBody")}</p>
              <p className="training-shift-formula" aria-hidden>
                <span className="training-infinity">∞</span>
                <small>{t("beforeFormula")}</small>
                <span className="training-shift-arrow">→</span>
                <span>1</span>
                <small>{t("beforeFormulaDoor")}</small>
              </p>
            </article>

            <p className="training-shift-vs" aria-hidden>
              {t("shiftVersus")}
            </p>

            <article className="training-shift-card training-shift-card-now">
              <p className="training-shift-side">{t("afterTitle")}</p>
              <p>{t("afterBody")}</p>
              <p className="training-shift-formula" aria-hidden>
                <span className="training-infinity">∞</span>
                <small>{t("afterFormula")}</small>
                <span className="training-shift-arrow">→</span>
                <span className="training-infinity">∞</span>
                <small>{t("afterFormulaDoor")}</small>
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="training-section training-section-paper">
        <div className="container-site">
          <p className="mini-heading">{t("timelineLabel")}</p>
          <h2 className="heading-display training-section-heading">{t("timelineHeading")}</h2>
          <p className="training-section-lead">{t("timelineLead")}</p>

          <ol className="training-timeline">
            {trainingTimelineWeekKeys.map((weekKey) => {
              const week = timeline[weekKey];

              return (
                <li key={weekKey} className={`training-timeline-week training-timeline-week-${weekKey}`}>
                  <p className="training-timeline-week-label">{week.label}</p>
                  <ol className="training-timeline-steps">
                    {week.steps.map((step) => {
                      const icon = trainingTimelineIcons[timelineIconIndex] as TrainingIconName;
                      timelineIconIndex += 1;

                      return (
                        <li key={step.mark} className="training-timeline-step">
                          <span className="training-timeline-icon">
                            <TrainingIcon name={icon} />
                          </span>
                          <div className="training-timeline-copy">
                            <p className="training-timeline-mark">{step.mark}</p>
                            <h3>{step.title}</h3>
                            <p>{step.body}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="training-section training-section-modules">
        <div className="container-site">
          <p className="mini-heading">{t("modulesLabel")}</p>
          <h2 className="heading-display training-section-heading">{t("modulesHeading")}</h2>

          <div className="training-modules-grid">
            <article className="training-module training-module-basic">
              <p className="training-module-tag">{t("basicTag")}</p>
              <p className="training-module-index" aria-hidden>
                01
              </p>
              <h3 className="font-display">{t("basicName")}</h3>
              <p className="training-module-duration">{t("basicDuration")}</p>
              <p className="training-module-body">{t("basicBody")}</p>
              <ul>
                {basicItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="training-module training-module-advanced">
              <p className="training-module-tag">{t("advancedTag")}</p>
              <p className="training-module-index" aria-hidden>
                02
              </p>
              <h3 className="font-display">{t("advancedName")}</h3>
              <p className="training-module-duration">{t("advancedDuration")}</p>
              <p className="training-module-body">{t("advancedBody")}</p>
              <ul>
                {advancedItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="training-section training-section-paper">
        <div className="container-site">
          <p className="mini-heading">{t("whoLabel")}</p>
          <h2 className="heading-display training-section-heading training-who-heading">
            {t("whoHeading")}
          </h2>
          <p className="training-section-lead">{t("whoLead")}</p>

          <div className="training-who-grid">
            <article className="training-who-card">
              <span className="training-who-icon">
                <TrainingIcon name="startups" />
              </span>
              <h3>{t("whoStartupsTitle")}</h3>
              <p>{t("whoStartupsBody")}</p>
            </article>
            <article className="training-who-card">
              <span className="training-who-icon">
                <TrainingIcon name="enterprise" />
              </span>
              <h3>{t("whoEnterpriseTitle")}</h3>
              <p>{t("whoEnterpriseBody")}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="training-cta">
        <div className="container-site training-cta-simple">
          <p className="mini-heading">{t("ctaLabel")}</p>
          <h2 className="font-display training-cta-heading">
            <span>{t("ctaFormulaIn")}</span>
            <span className="training-shift-arrow" aria-hidden>
              →
            </span>
            <span>{t("ctaFormulaOut")}</span>
          </h2>
          <MatilhaButton href="/contact" variant="solid" className="training-cta-button">
            {t("ctaButton")}
          </MatilhaButton>
        </div>
      </section>
    </article>
  );
}
