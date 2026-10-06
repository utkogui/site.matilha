import { getTranslations } from "next-intl/server";
import { TrainingIcon, type TrainingIconName } from "@/components/training/TrainingIcons";
import {
  trainingMatilhaStepIcons,
  trainingNormalQueueSteps,
  trainingNormalStepIcons,
} from "@/lib/content/training";
import { highlightTag } from "@/lib/i18n/rich-tags";

type TrainingPathsProps = {
  tone?: "light" | "dark";
  showClosing?: boolean;
};

export async function TrainingPaths({ tone = "light", showClosing = true }: TrainingPathsProps) {
  const t = await getTranslations("training");
  const normalSteps = t.raw("normalSteps") as string[];
  const matilhaSteps = t.raw("matilhaSteps") as string[];

  return (
    <>
      <div className={`training-paths${tone === "dark" ? " is-dark" : ""}`}>
        <article className="training-path training-path-normal">
          <header className="training-path-head">
            <p className="training-path-kicker">{t("normalKicker")}</p>
            <h3 className="training-path-title">{t("normalTitle")}</h3>
          </header>
          <ol className="training-path-steps">
            {normalSteps.map((step, index) => {
              const isQueue = (trainingNormalQueueSteps as readonly number[]).includes(index);
              const isLast = index === normalSteps.length - 1;

              return (
                <li
                  key={step}
                  className={`training-path-step${isQueue ? " is-queue" : ""}${isLast ? " is-dead" : ""}`}
                >
                  <span className="training-path-node">
                    <TrainingIcon name={trainingNormalStepIcons[index] as TrainingIconName} />
                  </span>
                  <p className="training-path-step-text">{step}</p>
                  {isQueue ? (
                    <span className="training-path-ticket" aria-hidden>
                      {t("normalTicket")} #04{index + 1}7
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ol>
          <dl className="training-path-summary">
            <div>
              <dt>{t("pathsTimeLabel")}</dt>
              <dd>{t("normalTimeValue")}</dd>
            </div>
            <div>
              <dt>{t("pathsResultLabel")}</dt>
              <dd>{t("normalResultValue")}</dd>
            </div>
          </dl>
        </article>

        <div className="training-paths-side">
          <div className="training-path-pivot">
            <span className="training-path-pivot-icon">
              <TrainingIcon name="next" />
            </span>
            <div>
              <p className="training-path-pivot-title">{t("pivotTitle")}</p>
              <p className="training-path-pivot-body">{t("pivotBody")}</p>
            </div>
          </div>

          <article className="training-path training-path-matilha">
            <header className="training-path-head">
              <p className="training-path-kicker">{t("matilhaKicker")}</p>
              <h3 className="training-path-title">{t("matilhaTitle")}</h3>
            </header>
            <ol className="training-path-steps">
              {matilhaSteps.map((step, index) => {
                const isLaunch = index === matilhaSteps.length - 1;

                return (
                  <li key={step} className={`training-path-step${isLaunch ? " is-launch" : ""}`}>
                    <span className="training-path-node">
                      <TrainingIcon name={trainingMatilhaStepIcons[index] as TrainingIconName} />
                    </span>
                    <p className="training-path-step-text">
                      {step}
                      {isLaunch ? <span className="training-path-tag">{t("matilhaLaunchTag")}</span> : null}
                    </p>
                  </li>
                );
              })}
            </ol>
            <dl className="training-path-summary">
              <div>
                <dt>{t("pathsTimeLabel")}</dt>
                <dd>{t("matilhaTimeValue")}</dd>
              </div>
              <div>
                <dt>{t("pathsResultLabel")}</dt>
                <dd>{t("matilhaResultValue")}</dd>
              </div>
            </dl>
          </article>
        </div>
      </div>

      {showClosing ? (
        <p className="training-paths-closing">{t.rich("pathsClosing", highlightTag)}</p>
      ) : null}
    </>
  );
}
