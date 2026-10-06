"use client";

import { useEffect, useRef } from "react";

export type ScrollDirection = 1 | -1;

/**
 * Returns true when the gesture belongs to the section. With `commit` false it is
 * only a query, with `commit` true the section must perform its step.
 */
export type ScrollStepHandler = (direction: ScrollDirection, commit: boolean) => boolean;

const STEP_COOLDOWN = 850;
const INERTIA_WINDOW = 180;
const TOUCH_THRESHOLD = 36;
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
    let touchStart = 0;
    let touchFired = false;

    const commit = (direction: ScrollDirection) => {
      handlerRef.current(direction, true);
      lockUntil = performance.now() + STEP_COOLDOWN;
    };

    const onWheel = (event: WheelEvent) => {
      if (event.defaultPrevented || event.ctrlKey || Math.abs(event.deltaY) < 4) return;
      const now = performance.now();
      if (now < lockUntil) {
        event.preventDefault();
        lockUntil = Math.max(lockUntil, now + INERTIA_WINDOW);
        return;
      }
      const direction: ScrollDirection = event.deltaY > 0 ? 1 : -1;
      if (!handlerRef.current(direction, false)) return;
      event.preventDefault();
      commit(direction);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStart = event.touches[0]?.clientY ?? 0;
      touchFired = false;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.defaultPrevented) return;
      if (performance.now() < lockUntil) {
        event.preventDefault();
        return;
      }
      const delta = touchStart - (event.touches[0]?.clientY ?? touchStart);
      if (Math.abs(delta) < 4) return;
      const direction: ScrollDirection = delta > 0 ? 1 : -1;
      if (!handlerRef.current(direction, false)) return;
      event.preventDefault();
      if (!touchFired && Math.abs(delta) > TOUCH_THRESHOLD) {
        touchFired = true;
        commit(direction);
      }
    };

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
      commit(direction);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);
}
