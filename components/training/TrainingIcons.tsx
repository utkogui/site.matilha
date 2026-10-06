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
  | "enterprise"
  | "ticket"
  | "clock"
  | "hidden"
  | "launch";

const marks: Record<TrainingIconName, ReactNode> = {
  legal: (
    <>
      <path d="M10 5.5h9.5L24.5 10v16.5H10Z" />
      <path d="M19.5 5.5V10h5" />
      <path d="M13.5 15h8M13.5 19.5h8M13.5 24h5" />
    </>
  ),
  compliance: (
    <>
      <path d="M16 4.5 7 8.2v7.6c0 5.6 4 9.4 9 11.7 5-2.3 9-6.1 9-11.7V8.2Z" />
      <path d="m12 16.2 3.1 3.1 6.2-7.1" />
    </>
  ),
  engineering: (
    <>
      <circle cx="8.5" cy="16" r="2.6" />
      <circle cx="23.5" cy="10" r="2.6" />
      <circle cx="23.5" cy="22" r="2.6" />
      <path d="M11.2 16H21M21 12.4v7.2" />
    </>
  ),
  operations: (
    <>
      <circle cx="11" cy="11" r="4" />
      <circle cx="21" cy="11" r="4" />
      <circle cx="11" cy="21" r="4" />
      <circle cx="21" cy="21" r="4" />
    </>
  ),
  marketing: (
    <>
      <path d="M7 12.5h7.5L25.5 7v18L14.5 19.5H7Z" />
      <path d="M11 12.5v7" />
    </>
  ),
  finance: (
    <>
      <path d="M8 24.5V15.5M16 24.5V8.5M24 24.5V18" />
    </>
  ),
  hr: (
    <>
      <circle cx="11.2" cy="11" r="3.2" />
      <circle cx="20.8" cy="11" r="3.2" />
      <path d="M5.8 24.8c1.1-3.6 3.2-5.4 5.4-5.4s4.3 1.8 5.4 5.4M15.4 24.8c1.1-3.6 3.2-5.4 5.4-5.4s4.3 1.8 5.4 5.4" />
    </>
  ),
  support: (
    <>
      <path d="M8 8h16.5a1.5 1.5 0 0 1 1.5 1.5v10.2a1.5 1.5 0 0 1-1.5 1.5H14.2L8 25.5V9.5A1.5 1.5 0 0 1 9.5 8Z" />
      <path d="M12.5 14.5h8M12.5 18.2h5" />
    </>
  ),
  demand: (
    <>
      <path d="M9 6.5h11.2L24.5 11v14.5H9Z" />
      <path d="M20.2 6.5V11h4.3" />
      <path d="M12.5 16.5h8.5M12.5 21h6" />
    </>
  ),
  queue: (
    <>
      <path d="M7 10h18M7 16h13M7 22h8" />
    </>
  ),
  product: (
    <>
      <path d="M16 5.5 26 11v10.2L16 26.5 6 21.2V11Z" />
      <path d="M16 5.5v21M6 11l10 5.6L26 11" />
    </>
  ),
  repeat: (
    <>
      <path d="M9 14.2A7 7 0 0 1 22.2 10" />
      <path d="M19.4 7.2h4.2v4.2" />
      <path d="M23 17.8A7 7 0 0 1 9.8 22" />
      <path d="M12.6 24.8H8.4v-4.2" />
    </>
  ),
  team: (
    <>
      <circle cx="16" cy="10.2" r="3.6" />
      <path d="M7.4 25.2c1.4-5.4 4.2-8.1 8.6-8.1s7.2 2.7 8.6 8.1" />
    </>
  ),
  lab: (
    <>
      <path d="M12.2 5.5h7.6M14.2 5.5v6.2L9 24.2h14L17.8 11.7V5.5" />
      <path d="M11.2 19.5h9.6" />
    </>
  ),
  autonomy: (
    <>
      <path d="M8 27.2V14.2a8 8 0 0 1 16 0v13" />
      <path d="M16 27.2V14.8" />
      <circle cx="20.4" cy="19.6" r="1.05" />
    </>
  ),
  next: (
    <>
      <path d="M7 7.5v17h11" />
      <path d="M18 7.5c5.6 3.4 5.6 13.6 0 17" />
      <path d="M14 16.2h10.5" />
      <path d="m21.4 13 3.2 3.2-3.2 3.2" />
    </>
  ),
  startups: (
    <>
      <path d="M16 5.5 18.3 13H26l-6.2 4.5 2.4 7.5L16 21.2 9.8 25l2.4-7.5L6 13h7.7Z" />
    </>
  ),
  enterprise: (
    <>
      <path d="M7.5 27V11.5h7.2V6.5h10.8V27" />
      <path d="M11 14.5h1.6M11 18.2h1.6M11 22h1.6M21.4 10.8h1.6M21.4 14.5h1.6M21.4 18.2h1.6M21.4 22h1.6" />
    </>
  ),
  ticket: (
    <>
      <path d="M6 10h20v3.6a2.4 2.4 0 0 0 0 4.8V22H6v-3.6a2.4 2.4 0 0 0 0-4.8Z" />
      <path d="M19 10v12" strokeDasharray="1.6 2" />
    </>
  ),
  clock: (
    <>
      <circle cx="16" cy="16" r="9.5" />
      <path d="M16 10.5V16l3.8 2.4" />
    </>
  ),
  hidden: (
    <>
      <path d="M5.5 16s3.8-6.5 10.5-6.5S26.5 16 26.5 16 22.7 22.5 16 22.5 5.5 16 5.5 16Z" />
      <circle cx="16" cy="16" r="2.8" />
      <path d="M7.5 25 24.5 7" />
    </>
  ),
  launch: (
    <>
      <path d="M16 4.8c4 2.8 6 7 6 11.8l-2.6 4.6h-6.8L10 16.6c0-4.8 2-9 6-11.8Z" />
      <circle cx="16" cy="13.2" r="2.1" />
      <path d="M12.6 21.2 10 25.6M19.4 21.2l2.6 4.4M16 21.2v5" />
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
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {marks[name]}
    </svg>
  );
}
