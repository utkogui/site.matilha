import { getTranslations } from "next-intl/server";
import { AnimatedHeading } from "@/components/animation/AnimatedHeading";
import { TrainingIcon } from "@/components/training/TrainingIcons";
import { TrainingPaths } from "@/components/training/TrainingPaths";
import { MatilhaButton } from "@/components/ui/MatilhaButton";
import { trainingSectorKeys, trainingStatKeys } from "@/lib/content/training";
import { highlightTag } from "@/lib/i18n/rich-tags";

export async function HomeTraining() {
  const t = await getTranslations("home");
  const tTraining = await getTranslations("training");

  return (
    <section className="home-section home-section-training">
      <div className="container-site home-training-grid">
        <div className="home-training-copy">
          <p className="mini-heading">{t("trainingLabel")}</p>
          <AnimatedHeading as="h2" className="heading-display">
            {t.rich("trainingHeading", highlightTag)}
          </AnimatedHeading>
          <p className="home-training-lead">{tTraining("learnLead")}</p>
          <div className="home-training-actions">
            <MatilhaButton href="/training" variant="solid">
              {t("trainingCta")}
            </MatilhaButton>
          </div>
        </div>

        <div className="home-training-paths">
          <TrainingPaths tone="dark" showClosing={false} />
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
                <strong className={key === "sectors" ? "training-infinity" : undefined}>
                  {tTraining(`stats.${key}.value`)}
                </strong>
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
