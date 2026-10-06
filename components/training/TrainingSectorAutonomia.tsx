"use client";

import { useEffect, useState } from "react";
import { TrainingIcon, type TrainingIconName } from "@/components/training/TrainingIcons";
import { trainingSectorKeys } from "@/lib/content/training";

type TrainingSectorAutonomiaProps = {
  prefix: string;
  suffixLead: string;
  autonomiaBase: string;
  autonomiaAccent: string;
  sectors: Record<string, string>;
};

export function TrainingSectorAutonomia({
  prefix,
  suffixLead,
  autonomiaBase,
  autonomiaAccent,
  sectors,
}: TrainingSectorAutonomiaProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const keys = trainingSectorKeys;
  const activeKey = keys[index] ?? keys[0];
  const activeLabel = sectors[activeKey] ?? "";

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let timeoutId = 0;
    const id = window.setInterval(() => {
      setVisible(false);
      timeoutId = window.setTimeout(() => {
        setIndex((current) => (current + 1) % keys.length);
        setVisible(true);
      }, 220);
    }, 2400);

    return () => {
      window.clearInterval(id);
      window.clearTimeout(timeoutId);
    };
  }, [keys.length]);

  return (
    <h1 className="training-hero-heading heading-display">
      <span className="training-hero-heading-line">
        <span className="training-hero-heading-static">{prefix}</span>{" "}
        <span
          className={`training-hero-heading-sector${visible ? " is-visible" : ""}`}
          aria-live="polite"
        >
          <TrainingIcon name={activeKey as TrainingIconName} />
          <span>{activeLabel}</span>
        </span>
      </span>
      <span className="training-hero-heading-line">
        <span className="training-hero-heading-static">{suffixLead}</span>
        <span className="training-hero-heading-static">{autonomiaBase}</span>
        <span className="training-hero-heading-ia">{autonomiaAccent}</span>
      </span>
    </h1>
  );
}
