import type { ReactNode } from "react";

export const highlightTag = {
  u: (chunks: ReactNode) => <u className="heading-highlight">{chunks}</u>,
};
