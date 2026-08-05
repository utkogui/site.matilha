import type { ReactNode } from "react";
import { AnimatedHeading } from "@/components/animation/AnimatedHeading";

interface PageTitleProps {
  text?: string;
  children?: ReactNode;
  label?: string;
  className?: string;
}

export function PageTitle({ text, children, label, className = "" }: PageTitleProps) {
  return (
    <header className="page-title-block">
      {label ? <p className="mini-heading">{label}</p> : null}
      <AnimatedHeading
        as="h1"
        text={text}
        trigger="load"
        className={`heading-display ${className}`}
      >
        {children}
      </AnimatedHeading>
    </header>
  );
}
