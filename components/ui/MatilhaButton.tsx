"use client";

import type { ReactNode } from "react";
import { Link } from "@/lib/i18n/navigation";

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="matilha-btn-arrow" aria-hidden>
    <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
  </svg>
);

type InternalHref = "/" | "/cases" | "/contact" | "/careers" | "/training" | "/privacy";

type MatilhaButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "underline" | "cta" | "icon" | "solid";
  external?: boolean;
  className?: string;
  onClick?: () => void;
};

export function MatilhaButton({
  children,
  href,
  variant = "cta",
  external,
  className = "",
  onClick,
}: MatilhaButtonProps) {
  const classes = [
    "matilha-btn",
    variant === "underline" && "matilha-btn-underline",
    variant === "cta" && "matilha-btn-cta",
    variant === "icon" && "matilha-btn-icon",
    variant === "solid" && "matilha-btn-solid",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const withArrow = variant === "cta" || variant === "icon" || variant === "solid";

  const content = (
    <>
      <span className="matilha-btn-label">{children}</span>
      {withArrow && (
        <span className="matilha-btn-icon-wrap">
          <ArrowIcon />
        </span>
      )}
    </>
  );

  if (external || href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        target={external || href.startsWith("http") ? "_blank" : undefined}
        rel={external || href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href as InternalHref} className={classes} onClick={onClick}>
      {content}
    </Link>
  );
}

type MatilhaSubmitButtonProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "submit" | "button";
};

export function MatilhaSubmitButton({
  children,
  className = "",
  disabled,
  type = "submit",
}: MatilhaSubmitButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={["matilha-btn", "matilha-btn-cta", className].filter(Boolean).join(" ")}
    >
      <span className="matilha-btn-label">{children}</span>
      <span className="matilha-btn-icon-wrap">
        <ArrowIcon />
      </span>
    </button>
  );
}
