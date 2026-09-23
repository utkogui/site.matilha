export const trainingSectorKeys = [
  "legal",
  "compliance",
  "engineering",
  "operations",
  "marketing",
  "finance",
  "hr",
  "support",
] as const;

export const trainingTimelineWeekKeys = ["week1", "week2", "after"] as const;
export const trainingMethodKeys = ["1", "2", "3"] as const;
export const trainingBuyStepIcons = ["demand", "queue", "product", "repeat"] as const;
export const trainingLearnStepIcons = ["team", "lab", "autonomy", "next"] as const;
export const trainingTimelineIcons = ["lab", "product", "engineering", "autonomy", "next"] as const;
export const trainingStatKeys = ["weeks", "doors", "app", "queue"] as const;

export type TrainingSectorKey = (typeof trainingSectorKeys)[number];
export type TrainingTimelineWeekKey = (typeof trainingTimelineWeekKeys)[number];
export type TrainingStatKey = (typeof trainingStatKeys)[number];
