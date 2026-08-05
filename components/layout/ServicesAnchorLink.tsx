"use client";

import type { MouseEvent, ReactNode } from "react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { servicesAnchorId } from "@/lib/i18n/locale-switch";
import { scrollToAnchor } from "@/lib/navigation/anchor-scroll";
import type { Locale } from "@/lib/i18n/routing";

type ServicesAnchorLinkProps = {
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
};

export function ServicesAnchorLink({
  children,
  className,
  onNavigate,
}: ServicesAnchorLinkProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const anchorId = servicesAnchorId[locale];

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onNavigate?.();

    if (pathname !== "/") return;

    event.preventDefault();
    window.setTimeout(() => {
      scrollToAnchor(anchorId);
    }, 60);
  }

  return (
    <Link href={{ pathname: "/", hash: anchorId }} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
