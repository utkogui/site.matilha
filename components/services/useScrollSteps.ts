"use client";

import { useEffect, useRef } from "react";

export type ScrollDirection = 1 | -1;

/**
 * Returns true when the gesture belongs to the section. With `commit` false it is
 * only a query, with `commit` true the section must perform its step.
 */
export type ScrollStepHandler = (direction: ScrollDirection, commit: boolean) => boolean;

const STEP_COOLDOWN = 850;
const KEYS_DOWN = new Set(["ArrowDown", "PageDown"]);
const KEYS_UP = new Set(["ArrowUp", "PageUp"]);

let lockUntil = 0;

function isInteractive(target: EventTarget | null) {
  return target instanceof HTMLElement && Boolean(target.closest("button, a, input, textarea, select, [contenteditable]"));
}

export function useScrollSteps(handler: ScrollStepHandler) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.metaKey || event.ctrlKey) return;
      let direction: ScrollDirection | 0 = 0;
      if (KEYS_DOWN.has(event.key)) direction = 1;
      else if (KEYS_UP.has(event.key)) direction = -1;
      else if (event.key === " " && !isInteractive(event.target)) direction = event.shiftKey ? -1 : 1;
      if (!direction) return;
      if (performance.now() < lockUntil) {
        event.preventDefault();
        return;
      }
      if (!handlerRef.current(direction, false)) return;
      event.preventDefault();
      handlerRef.current(direction, true);
      lockUntil = performance.now() + STEP_COOLDOWN;
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}
