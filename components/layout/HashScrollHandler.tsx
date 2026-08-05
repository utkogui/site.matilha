"use client";

import { useEffect } from "react";
import { usePathname } from "@/lib/i18n/navigation";
import { scrollToAnchor } from "@/lib/navigation/anchor-scroll";

export function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || pathname !== "/") return;

    const timer = window.setTimeout(() => {
      scrollToAnchor(hash, "auto");
    }, 120);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
