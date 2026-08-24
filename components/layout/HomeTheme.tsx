"use client";

import { useEffect } from "react";

export function HomeTheme() {
  useEffect(() => {
    document.documentElement.classList.add("home-page");
    return () => document.documentElement.classList.remove("home-page");
  }, []);

  return null;
}
