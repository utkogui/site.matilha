import { getTranslations, setRequestLocale } from "next-intl/server";
import { MatilhaButton } from "@/components/ui/MatilhaButton";
import { TrainingIcon, type TrainingIconName } from "@/components/training/TrainingIcons";
import { highlightTag } from "@/lib/i18n/rich-tags";
import {
  trainingBuyStepIcons,
  trainingLearnStepIcons,
  trainingSectorKeys,
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

type VersusStep = {
  title: string;
  body: string;
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
  const buySteps = t.raw("buySteps") as VersusStep[];
  const learnSteps = t.raw("learnSteps") as VersusStep[];
  const timeline = t.raw("timeline") as Record<string, TimelineWeek>;
  let timelineIconIndex = 0;

  return (
    <article className="training-page">
      <section className="training-hero">
        <div className="container-site training-grid">
          <div className="training-hero-copy">
            <p className="mini-heading">{t("heroLabel")}</p>
            <h1 className="training-hero-heading heading-display">
              {t.rich("heroHeading", highlightTag)}
            </h1>
            <p className="training-hero-lead">{t("heroLead")}</p>
            <div className="training-hero-actions">
              <MatilhaButton href="/contact" variant="solid">
                {t("heroCta")}
              </MatilhaButton>
            </div>
          </div>

          <aside className="training-doors" aria-label={t("doorsLabel")}>
            <p className="training-doors-kicker">{t("doorsLabel")}</p>
            <ul className="training-doors-grid">
              {trainingSectorKeys.map((key) => (
                <li key={key}>
                  <TrainingIcon name={key} />
                  <span>{t(`sectors.${key}`)}</span>
                </li>
              ))}
            </ul>
          </aside>

          <dl className="training-stats">
            {trainingStatKeys.map((key) => (
              <div key={key} className="training-stat">
                <dt>
                  <strong>{t(`stats.${key}.value`)}</strong>
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

          <div className="training-versus">
            <article className="training-versus-col training-versus-buy">
              <p className="training-versus-kicker">{t("buyTitle")}</p>
              <ol>
                {buySteps.map((step, index) => (
                  <li key={step.title}>
                    <span className="training-versus-icon">
                      <TrainingIcon name={trainingBuyStepIcons[index] as TrainingIconName} />
                    </span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="training-versus-outcome">{t("buyOutcome")}</p>
            </article>

            <article className="training-versus-col training-versus-learn">
              <p className="training-versus-kicker">{t("learnTitle")}</p>
              <ol>
                {learnSteps.map((step, index) => (
                  <li key={step.title}>
                    <span className="training-versus-icon">
                      <TrainingIcon name={trainingLearnStepIcons[index] as TrainingIconName} />
                    </span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="training-versus-outcome">{t("learnOutcome")}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="training-section training-section-paper training-section-paper-alt">
        <div className="container-site">
          <p className="mini-heading">{t("shiftLabel")}</p>
          <h2 className="heading-display training-section-heading">{t("shiftHeading")}</h2>

          <div className="training-shift-grid">
            <article className="training-shift-card">
              <p className="training-shift-index">01</p>
              <h3>{t("beforeTitle")}</h3>
              <p>{t("beforeBody")}</p>
              <p className="training-shift-formula" aria-hidden>
                <span>8</span>
                <small>{t("beforeFormula")}</small>
                <span className="training-shift-arrow">→</span>
                <span>1</span>
                <small>{t("beforeFormulaDoor")}</small>
              </p>
            </article>
            <article className="training-shift-card training-shift-card-now">
              <p className="training-shift-index">02</p>
              <h3>{t("afterTitle")}</h3>
              <p>{t("afterBody")}</p>
              <p className="training-shift-formula" aria-hidden>
                <span>8</span>
                <small>{t("afterFormula")}</small>
                <span className="training-shift-arrow">→</span>
                <span>8</span>
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

          <div className="training-weekbar" aria-hidden>
            <div className="training-weekbar-week">
              <p>{t("timeline.week1.label")}</p>
              <ol>
                {Array.from({ length: 5 }, (_, index) => (
                  <li key={`w1-${index}`} />
                ))}
              </ol>
            </div>
            <div className="training-weekbar-week">
              <p>{t("timeline.week2.label")}</p>
              <ol>
                {Array.from({ length: 5 }, (_, index) => (
                  <li key={`w2-${index}`} />
                ))}
              </ol>
            </div>
            <div className="training-weekbar-week training-weekbar-after">
              <p>{t("timeline.after.label")}</p>
              <ol>
                <li />
              </ol>
            </div>
          </div>

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
                          <p className="training-timeline-mark">{step.mark}</p>
                          <h3>{step.title}</h3>
                          <p>{step.body}</p>
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
          <h2 className="heading-display training-section-heading">{t("whoHeading")}</h2>

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
        <div className="container-site training-cta-grid">
          <div>
            <p className="mini-heading">{t("ctaLabel")}</p>
            <h2 className="font-display training-cta-heading">{t("ctaHeading")}</h2>
            <p className="training-cta-body">{t("ctaBody")}</p>
            <MatilhaButton href="/contact" variant="solid" className="training-cta-button">
              {t("ctaButton")}
            </MatilhaButton>
          </div>

          <aside className="training-cta-graphic" aria-hidden>
            <p className="training-cta-formula">
              <span>{t("ctaFormulaIn")}</span>
              <span className="training-shift-arrow">→</span>
              <span>{t("ctaFormulaOut")}</span>
            </p>
            <p>{t("ctaFormulaNote")}</p>
          </aside>
        </div>
      </section>
    </article>
  );
}
