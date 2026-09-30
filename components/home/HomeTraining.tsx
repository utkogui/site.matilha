import { getTranslations } from "next-intl/server";
import { AnimatedHeading } from "@/components/animation/AnimatedHeading";
import { TrainingIcon, type TrainingIconName } from "@/components/training/TrainingIcons";
import { MatilhaButton } from "@/components/ui/MatilhaButton";
import {
  trainingBuyStepIcons,
  trainingLearnStepIcons,
  trainingSectorKeys,
  trainingStatKeys,
} from "@/lib/content/training";
import { highlightTag } from "@/lib/i18n/rich-tags";

type StepCopy = { title: string; body: string };

export async function HomeTraining() {
  const t = await getTranslations("home");
  const tTraining = await getTranslations("training");
  const buySteps = tTraining.raw("buySteps") as StepCopy[];
  const learnSteps = tTraining.raw("learnSteps") as StepCopy[];

  return (
    <section className="home-section home-section-training">
      <div className="container-site home-training-grid">
        <div className="home-training-copy">
          <p className="mini-heading">{t("trainingLabel")}</p>
          <AnimatedHeading as="h2" className="heading-display">
            {t.rich("trainingHeading", highlightTag)}
          </AnimatedHeading>
          <p className="home-training-lead">{t("trainingLead")}</p>
          <div className="home-training-actions">
            <MatilhaButton href="/training" variant="solid">
              {t("trainingCta")}
            </MatilhaButton>
          </div>
        </div>

        <div className="home-training-versus" aria-label={t("trainingVersusLabel")}>
          <article className="home-training-path home-training-path-buy">
            <header className="home-training-path-head">
              <p className="home-training-path-kicker">{tTraining("buyKicker")}</p>
              <h3 className="home-training-path-title">{tTraining("buyTitle")}</h3>
            </header>
            <ol className="home-training-flow home-training-flow-loop home-training-flow-row">
              {buySteps.map((step, index) => (
                <li key={step.title}>
                  <span className="home-training-node">
                    <TrainingIcon name={trainingBuyStepIcons[index] as TrainingIconName} />
                  </span>
                  <span className="home-training-step">
                    <strong>{step.title}</strong>
                  </span>
                </li>
              ))}
            </ol>
            <p className="home-training-path-outcome">{tTraining("buyOutcome")}</p>
          </article>

          <p className="home-training-pivot">{tTraining("versusPivot")}</p>

          <article className="home-training-path home-training-path-learn">
            <header className="home-training-path-head">
              <p className="home-training-path-kicker">{tTraining("learnKicker")}</p>
              <h3 className="home-training-path-title">{tTraining("learnTitle")}</h3>
            </header>
            <ol className="home-training-flow home-training-flow-spine home-training-flow-grid">
              {learnSteps.map((step, index) => (
                <li key={step.title}>
                  <span className="home-training-node">
                    <TrainingIcon name={trainingLearnStepIcons[index] as TrainingIconName} />
                  </span>
                  <span className="home-training-step">
                    <strong>{step.title}</strong>
                    <span>{step.body}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="home-training-path-outcome">{tTraining("learnOutcome")}</p>
          </article>
        </div>

        <ul className="home-training-doors">
          {trainingSectorKeys.map((key) => (
            <li key={key}>
              <span className="home-training-door-icon">
                <TrainingIcon name={key} />
              </span>
              <span>{tTraining(`sectors.${key}`)}</span>
            </li>
          ))}
        </ul>

        <dl className="home-training-stats">
          {trainingStatKeys.map((key) => (
            <div key={key} className="home-training-stat">
              <dt>
                <strong>{tTraining(`stats.${key}.value`)}</strong>
                <span>{tTraining(`stats.${key}.unit`)}</span>
              </dt>
              <dd>{tTraining(`stats.${key}.label`)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
