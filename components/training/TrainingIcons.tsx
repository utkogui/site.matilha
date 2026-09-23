import type { ReactNode } from "react";
import type { TrainingSectorKey } from "@/lib/content/training";

export type TrainingIconName =
  | TrainingSectorKey
  | "demand"
  | "queue"
  | "product"
  | "repeat"
  | "team"
  | "lab"
  | "autonomy"
  | "next"
  | "startups"
  | "enterprise";

const marks: Record<TrainingIconName, ReactNode> = {
  legal: (
    <>
      <rect x="8" y="5" width="16" height="22" />
      <path d="M12 11h8M12 16h8M12 21h5" />
    </>
  ),
  compliance: (
    <>
      <path d="M16 4 6 8v8c0 6 4.5 10 10 12 5.5-2 10-6 10-12V8Z" />
      <path d="m12 16 3 3 6-7" />
    </>
  ),
  engineering: (
    <>
      <circle cx="8" cy="16" r="3" />
      <circle cx="24" cy="10" r="3" />
      <circle cx="24" cy="22" r="3" />
      <path d="M11 16h10M21 12v8" />
    </>
  ),
  operations: (
    <>
      <rect x="5" y="5" width="9" height="9" />
      <rect x="18" y="5" width="9" height="9" />
      <rect x="5" y="18" width="9" height="9" />
      <rect x="18" y="18" width="9" height="9" />
    </>
  ),
  marketing: (
    <>
      <path d="M6 12h8l12-6v20L14 20H6Z" />
      <path d="M10 12v8" />
    </>
  ),
  finance: (
    <>
      <path d="M6 26V14h5v12M13.5 26V8h5v18M21 26V17h5v9" />
    </>
  ),
  hr: (
    <>
      <circle cx="11" cy="11" r="3.5" />
      <circle cx="21" cy="11" r="3.5" />
      <path d="M5 25c1.2-4 3.5-6 6-6s4.8 2 6 6M15 25c1.2-4 3.5-6 6-6s4.8 2 6 6" />
    </>
  ),
  support: (
    <>
      <path d="M7 7h18v14H13l-6 4V7Z" />
      <path d="M12 14h8M12 18h5" />
    </>
  ),
  demand: (
    <>
      <path d="M7 6h13l5 5v15H7Z" />
      <path d="M20 6v5h5M11 16h10M11 21h7" />
    </>
  ),
  queue: (
    <>
      <path d="M6 9h20M6 16h14M6 23h8" />
    </>
  ),
  product: (
    <>
      <path d="M16 5 27 11v10L16 27 5 21V11Z" />
      <path d="M16 5v22M5 11l11 6 11-6" />
    </>
  ),
  repeat: (
    <>
      <path d="M8 12V7h14v7" />
      <path d="m18 10 4 4-4 4" />
      <path d="M24 20v5H10v-7" />
      <path d="m14 22-4-4 4-4" />
    </>
  ),
  team: (
    <>
      <circle cx="16" cy="10" r="4" />
      <path d="M7 26c1.5-6 4.5-9 9-9s7.5 3 9 9" />
    </>
  ),
  lab: (
    <>
      <circle cx="8" cy="8" r="2" />
      <circle cx="16" cy="8" r="2" />
      <circle cx="24" cy="8" r="2" />
      <circle cx="8" cy="16" r="2" />
      <circle cx="16" cy="16" r="2" />
      <circle cx="24" cy="16" r="2" />
      <circle cx="8" cy="24" r="2" />
      <circle cx="16" cy="24" r="2" />
      <circle cx="24" cy="24" r="2" />
    </>
  ),
  autonomy: (
    <>
      <path d="M7 28V8l9-4 9 4v20" />
      <path d="M16 28V12M21 20h2" />
    </>
  ),
  next: (
    <>
      <rect x="5" y="7" width="14" height="18" />
      <path d="M19 12h8v13H19M23 18v6M20 21h6" />
    </>
  ),
  startups: (
    <>
      <path d="M16 5 18.5 13H27l-6.8 5 2.6 8L16 21l-6.8 5 2.6-8L5 13h8.5Z" />
    </>
  ),
  enterprise: (
    <>
      <path d="M6 28V10h8V6h12v22" />
      <path d="M10 14h2M10 18h2M10 22h2M20 11h2M20 15h2M20 19h2M20 23h2" />
    </>
  ),
};

export function TrainingIcon({ name, className = "" }: { name: TrainingIconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`training-icon ${className}`.trim()}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden
    >
      {marks[name]}
    </svg>
  );
}
