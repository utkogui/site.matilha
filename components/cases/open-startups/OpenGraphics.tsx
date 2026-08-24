type OpenMarkKind = "triangle" | "square" | "disc" | "corner" | "bar";
type OpenMarkTone = "sober" | "energy" | "ink" | "white";

const FIELD: { kind: OpenMarkKind; tone: OpenMarkTone }[] = [
  { kind: "triangle", tone: "sober" },
  { kind: "square", tone: "energy" },
  { kind: "disc", tone: "sober" },
  { kind: "corner", tone: "energy" },
  { kind: "bar", tone: "sober" },
];

export function OpenMark({
  kind,
  tone,
  className = "",
}: {
  kind: OpenMarkKind;
  tone: OpenMarkTone;
  className?: string;
}) {
  return <span className={`open-mark open-mark-${kind} open-mark-${tone} ${className}`.trim()} />;
}

export function OpenRibbon() {
  return (
    <div className="open-ribbon" aria-hidden>
      <span className="open-ribbon-fill" />
      <span className="open-ribbon-split" />
      <span className="open-ribbon-arcs" />
      <span className="open-ribbon-stripes" />
    </div>
  );
}

export function OpenField() {
  return (
    <div className="open-field" aria-hidden>
      {FIELD.map((item) => (
        <OpenMark key={item.kind} kind={item.kind} tone={item.tone} />
      ))}
    </div>
  );
}

export function OpenStoryGraphic({ variant }: { variant: "challenge" | "solution" }) {
  if (variant === "challenge") {
    return (
      <div className="open-story-graphic" aria-hidden>
        <OpenMark kind="triangle" tone="sober" />
        <OpenMark kind="bar" tone="energy" />
        <OpenMark kind="bar" tone="energy" />
        <OpenMark kind="bar" tone="energy" />
      </div>
    );
  }

  return (
    <div className="open-story-graphic open-story-graphic-accent" aria-hidden>
      <OpenMark kind="disc" tone="white" />
      <OpenMark kind="corner" tone="energy" />
    </div>
  );
}

export function OpenIndexGraphic({ variant }: { variant: 0 | 1 | 2 }) {
  if (variant === 0) {
    return (
      <div className="open-index-graphic" aria-hidden>
        <OpenMark kind="triangle" tone="sober" />
        <OpenMark kind="bar" tone="energy" />
        <OpenMark kind="bar" tone="energy" />
      </div>
    );
  }

  if (variant === 1) {
    return (
      <div className="open-index-graphic open-index-graphic-ink" aria-hidden>
        <OpenMark kind="disc" tone="energy" />
        <OpenMark kind="corner" tone="sober" />
      </div>
    );
  }

  return (
    <div className="open-index-graphic open-index-graphic-sober" aria-hidden>
      <OpenMark kind="square" tone="white" />
      <OpenMark kind="bar" tone="energy" />
      <OpenMark kind="bar" tone="energy" />
      <OpenMark kind="bar" tone="energy" />
    </div>
  );
}

export function OpenBandCompose() {
  return (
    <div className="open-band-compose" aria-hidden>
      <span className="open-compose-arcs" />
      <span className="open-compose-block" />
      <span className="open-compose-triangle" />
      <span className="open-compose-stripes" />
    </div>
  );
}

export function OpenClosingCompose() {
  return (
    <div className="open-closing-compose" aria-hidden>
      <span className="open-compose-arcs open-compose-arcs-up" />
      <span className="open-compose-cyan" />
      <span className="open-compose-cut" />
      <span className="open-compose-bars" />
    </div>
  );
}

export function OpenAppFrame({ index }: { index: number }) {
  const kinds: OpenMarkKind[] = ["triangle", "disc", "square", "corner"];
  const tones: OpenMarkTone[] = ["sober", "energy", "sober", "energy"];
  return (
    <span className="open-app-frame" aria-hidden>
      <OpenMark kind={kinds[index] ?? "bar"} tone={tones[index] ?? "energy"} />
    </span>
  );
}
