"use client";

import { useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";
import { useLocale } from "next-intl";

type AnimatedHeadingProps = {
  text?: string;
  children?: ReactNode;
  as?: ElementType;
  className?: string;
  trigger?: "scroll" | "load";
};

function appendCharSpan(parent: ParentNode, char: string) {
  const span = document.createElement("span");
  span.className = "animated-heading-char";
  span.textContent = char;
  parent.appendChild(span);
}

function splitTextNodes(root: HTMLElement) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (
        parent?.classList.contains("animated-heading-char") ||
        parent?.classList.contains("animated-heading-word")
      ) {
        return NodeFilter.FILTER_REJECT;
      }
      return node.textContent?.length ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });

  const textNodes: Text[] = [];
  let current = walker.nextNode();
  while (current) {
    textNodes.push(current as Text);
    current = walker.nextNode();
  }

  textNodes.forEach((node) => {
    const content = node.textContent ?? "";
    const fragment = document.createDocumentFragment();
    const parts = content.split(/( +|\t+|\n+|\r+|\f+|\v+)/);

    for (const part of parts) {
      if (!part) continue;

      if (/^[ \t\n\r\f\v]+$/.test(part)) {
        fragment.appendChild(document.createTextNode(part));
      } else {
        const wordSpan = document.createElement("span");
        wordSpan.className = "animated-heading-word";

        for (const char of part) {
          appendCharSpan(wordSpan, char);
        }

        fragment.appendChild(wordSpan);
      }
    }

    node.parentNode?.replaceChild(fragment, node);
  });
}

export function AnimatedHeading({
  text,
  children,
  as: Tag = "h2",
  className = "",
  trigger = "scroll",
}: AnimatedHeadingProps) {
  const locale = useLocale();
  const triggerRef = useRef<HTMLElement>(null);
  const contentKey = `${locale}-${text ?? "children"}`;

  useLayoutEffect(() => {
    const triggerEl = triggerRef.current;
    const contentEl = triggerEl?.querySelector<HTMLElement>("[data-animated-heading-content]");
    if (!triggerEl || !contentEl) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // Mobile: keep text static, avoids loading GSAP on the critical path.
    const isDesktop = window.matchMedia("(min-width: 992px)").matches;
    if (!isDesktop) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      splitTextNodes(contentEl);

      const chars = contentEl.querySelectorAll(".animated-heading-char");
      if (!chars.length) return;

      const ctx = gsap.context(() => {
        if (trigger === "load") {
          gsap.from(chars, {
            opacity: 0,
            y: 10,
            duration: 0.5,
            stagger: 0.06,
            ease: "power3.out",
          });
          return;
        }

        gsap.from(chars, {
          opacity: 0,
          y: 10,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: triggerEl,
            start: "top bottom",
            end: "top 40%",
            scrub: true,
          },
        });
      }, contentEl);

      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [text, trigger, locale]);

  return (
    <Tag ref={triggerRef} className={`font-display ${className}`}>
      <span key={contentKey} data-animated-heading-content className="animated-heading-content">
        {children ?? text}
      </span>
    </Tag>
  );
}
