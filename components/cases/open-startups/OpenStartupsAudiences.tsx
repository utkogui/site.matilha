"use client";

import { useEffect, useId, useState } from "react";
import { FadeInUp } from "@/components/animation/FadeInUp";
import { openAudience } from "@/lib/media/open-startups-assets";
import type { CaseStoryChapter } from "@/lib/content/cases-registry";

const audienceShots = [
  openAudience.startups,
  openAudience.corporations,
  openAudience.professionals,
  openAudience.investors,
  openAudience.researchers,
] as const;

type OpenStartupsAudiencesProps = {
  chapter: CaseStoryChapter;
  label: string;
  howWeSpeak: string;
};

export function OpenStartupsAudiences({ chapter, label, howWeSpeak }: OpenStartupsAudiencesProps) {
  const headingId = useId();
  const pairs = chapter.pairs ?? [];
  const [active, setActive] = useState(0);
  const current = pairs[active];
  const shot = audienceShots[active] ?? audienceShots[0];

  useEffect(() => {
    if (active >= pairs.length) setActive(0);
  }, [active, pairs.length]);

  if (!current || pairs.length === 0) return null;

  return (
    <section className="open-chapter open-audiences" aria-labelledby={headingId}>
      <div className="container-site">
        <FadeInUp>
          <p className="mini-heading open-chapter-label">{label}</p>
          <h2 id={headingId} className="open-chapter-title">
            {chapter.title}
          </h2>
          <p className="open-chapter-body">{chapter.body}</p>
        </FadeInUp>

        <div className="open-audience-stage">
          <div className="open-audience-nav" role="tablist" aria-label={chapter.title}>
            {pairs.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  id={`open-audience-tab-${index}`}
                  aria-selected={selected}
                  aria-controls="open-audience-panel"
                  className={`open-audience-tab${selected ? " is-active" : ""}`}
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                >
                  <span className="open-audience-index" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="open-audience-tab-title">{item.title}</span>
                </button>
              );
            })}
          </div>

          <div
            className="open-audience-panel"
            id="open-audience-panel"
            role="tabpanel"
            aria-labelledby={`open-audience-tab-${active}`}
          >
            <figure className="open-audience-photo">
              <img src={shot.src} alt={current.title} width={shot.width} height={shot.height} />
            </figure>
            <div className="open-audience-copy">
              <p className="open-audience-kicker">{howWeSpeak}</p>
              <h3 className="open-audience-name">{current.title}</h3>
              <p className="open-audience-lead">{current.body}</p>
              {current.voice ? <p className="open-audience-voice">{current.voice}</p> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
