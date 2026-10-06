"use client";

import type { CSSProperties, ReactNode } from "react";
import { useTranslations } from "next-intl";
import { ServiceStepper, type ServiceStep } from "@/components/services/ServiceStepper";

type Metric = { value: string; label: string };

const CODE: ReactNode[] = [
  <>
    <b>export function</b> <i>Checkout</i>({"{ cart }"}) {"{"}
  </>,
  <>
    {"  "}<b>const</b> total = <i>useTotal</i>(cart);
  </>,
  <>
    {"  "}<b>const</b> pay = <i>usePayment</i>(total);
  </>,
  <>{"  "}<b>return</b> (</>,
  <>
    {"    "}&lt;<em>Button</em> onClick={"{pay}"} size=<u>&quot;lg&quot;</u>&gt;
  </>,
  <>
    {"      "}{"{"}<i>format</i>(total){"}"}
  </>,
  <>
    {"    "}&lt;/<em>Button</em>&gt;
  </>,
  <>{"  "});</>,
  <>{"}"}</>,
];

const BARS = [42, 58, 50, 71, 64, 80, 74, 88, 69, 92, 84, 96];

export function DevelopmentBuild() {
  const t = useTranslations("servicePage.items.development.build");
  const tests = t.raw("board.tests") as string[];
  const pipeline = t.raw("board.pipeline") as string[];
  const metrics = t.raw("board.metrics") as Metric[];

  return (
    <ServiceStepper
      className="dev-build"
      label={t("label")}
      heading={t("heading")}
      hint={t("scrollHint")}
      steps={t.raw("steps") as ServiceStep[]}
    >
      <div className="service-window dev-window">
        <div className="service-browser-bar dev-bar">
          <i />
          <i />
          <i />
          <em>{t("board.file")}</em>
        </div>

        <div className="dev-screen">
          <div className="dev-layer dev-layer-code">
            <ol className="dev-code">
              {CODE.map((line, index) => (
                <li key={index} style={{ "--i": index } as CSSProperties}>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="dev-layer dev-layer-tests">
            <p className="dev-cmd">$ npm test</p>
            <ul className="dev-tests">
              {tests.map((test, index) => (
                <li key={test} style={{ "--i": index } as CSSProperties}>
                  <span className="dev-check">✓</span>
                  {test}
                </li>
              ))}
            </ul>
            <p className="dev-summary">{t("board.testsSummary")}</p>
          </div>

          <div className="dev-layer dev-layer-deploy">
            <p className="dev-cmd">$ git push origin main</p>
            <ol className="dev-pipeline">
              {pipeline.map((node, index) => (
                <li key={node} style={{ "--i": index } as CSSProperties}>
                  <span className="dev-node" />
                  {node}
                </li>
              ))}
            </ol>
            <span className="dev-pipeline-track">
              <span />
            </span>
            <p className="dev-summary">{t("board.deployLog")}</p>
          </div>

          <div className="dev-layer dev-layer-live">
            <p className="dev-live">
              <span className="dev-live-dot" />
              {t("board.live")}
            </p>
            <div className="dev-metrics">
              {metrics.map((metric) => (
                <div key={metric.label} className="dev-metric">
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
            <div className="dev-chart">
              {BARS.map((height, index) => (
                <span key={index} style={{ "--h": `${height}%`, "--i": index } as CSSProperties} />
              ))}
            </div>
            <p className="dev-online">
              <strong>{t("board.onlineCount")}</strong> {t("board.online")}
            </p>
          </div>
        </div>
      </div>
    </ServiceStepper>
  );
}
