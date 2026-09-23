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
          <article className="home-training-flow home-training-flow-buy">
            <p className="home-training-flow-kicker">{tTraining("buyTitle")}</p>
            <ol>
              {buySteps.map((step, index) => (
                <li key={step.title}>
                  <span className="home-training-flow-icon">
                    <TrainingIcon name={trainingBuyStepIcons[index] as TrainingIconName} />
                  </span>
                  <span>{step.title}</span>
                </li>
              ))}
            </ol>
          </article>
          <article className="home-training-flow home-training-flow-learn">
            <p className="home-training-flow-kicker">{tTraining("learnTitle")}</p>
            <ol>
              {learnSteps.map((step, index) => (
                <li key={step.title}>
                  <span className="home-training-flow-icon">
                    <TrainingIcon name={trainingLearnStepIcons[index] as TrainingIconName} />
                  </span>
                  <span>{step.title}</span>
                </li>
              ))}
            </ol>
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
