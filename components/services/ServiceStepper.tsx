"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useScrollSteps } from "@/components/services/useScrollSteps";

export type ServiceStep = { title: string; body: string };

type ServiceStepperProps = {
  className: string;
  label: string;
  heading: string;
  hint: string;
  steps: ServiceStep[];
  children: ReactNode;
};

const EDGE = 2;

function measure(section: HTMLElement) {
  const rect = section.getBoundingClientRect();
  const travel = Math.max(rect.height - window.innerHeight, 1);
  const progress = Math.min(Math.max(-rect.top / travel, 0), 1);
  return { rect, travel, progress, top: rect.top + window.scrollY };
}

export function ServiceStepper({ className, label, heading, hint, steps, children }: ServiceStepperProps) {
  const last = steps.length - 1;
  const sectionRef = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);

  const goTo = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const { travel, top } = measure(section);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: top + (travel * index) / last, behavior: reduce ? "auto" : "smooth" });
  };

  useScrollSteps((direction, commit) => {
    const section = sectionRef.current;
    if (!section) return false;
    const { rect, progress } = measure(section);
    const viewport = window.innerHeight;
    const pinned = rect.top <= EDGE && rect.bottom >= viewport - EDGE;
    const current = Math.round(progress * last);
    let target = -1;

    if (pinned) {
      const next = current + direction;
      if (next >= 0 && next <= last) target = next;
    } else if (direction === 1 && rect.top > EDGE && rect.top < viewport * 0.65) {
      target = 0;
    } else if (direction === -1 && rect.bottom < viewport - EDGE && rect.bottom > viewport * 0.35) {
      target = last;
    }

    if (target < 0) return false;
    if (commit) goTo(target);
    return true;
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const { progress } = measure(section);
      section.style.setProperty("--build-progress", progress.toFixed(4));
      setStage(Math.round(progress * last));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [last]);

  return (
    <section ref={sectionRef} className={`service-stepper ${className}`} data-stage={stage}>
      <div className="service-stepper-sticky">
        <div className="container-site service-stepper-grid">
          <div className="service-stepper-copy">
            <p className="service-label">{label}</p>
            <h2 className="service-section-heading">{heading}</h2>

            <ol className="service-stepper-steps">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className={`service-stepper-step${index === stage ? " is-active" : ""}${index < stage ? " is-done" : ""}`}
                >
                  <button
                    type="button"
                    className="service-stepper-step-button"
                    onClick={() => goTo(index)}
                    aria-current={index === stage ? "step" : undefined}
                  >
                    <span className="service-stepper-step-index">{String(index + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="service-stepper-step-title">{step.title}</span>
                      <span className="service-stepper-step-body">{step.body}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            <div className="service-stepper-progress" aria-hidden>
              <span />
            </div>
            <p className="service-stepper-hint">{hint}</p>
          </div>

          <div className="service-stepper-stage" aria-hidden>
            {children}
            <div className="service-stepper-stage-tag">
              <span>{String(stage + 1).padStart(2, "0")}</span>
              {steps[stage]?.title}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
