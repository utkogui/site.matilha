"use client";

import { FadeInUp } from "@/components/animation/FadeInUp";

type MeupsNarrationProps = {
  eyebrow: string;
  label?: string;
  title: string;
  body: string;
  points?: string[];
};

/** Bloco de storytelling Matilha, visualmente separado das screenshots do cliente. */
export function MeupsNarration({ eyebrow, label, title, body, points }: MeupsNarrationProps) {
  return (
    <section className="meups-narration" aria-label={title}>
      <div className="container-site">
        <FadeInUp>
          <div className="meups-narration-frame">
            <div className="meups-narration-meta">
              <p className="meups-narration-eyebrow">{eyebrow}</p>
              {label ? <p className="mini-heading meups-narration-label">{label}</p> : null}
            </div>
            <h2 className="meups-narration-title">{title}</h2>
            <p className="meups-narration-body">{body}</p>
            {points && points.length > 0 ? (
              <ul className="meups-narration-points">
                {points.map((point, index) => (
                  <li key={point}>
                    <span className="meups-narration-point-index" aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
