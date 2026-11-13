"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type RevealOptions = {
  start?: string;
  y?: number;
  stagger?: number;
  duration?: number;
};

/**
 * Fade/slide in `[data-reveal]` children when their section enters view.
 * If `[data-reveal-section]` nodes exist under the root, each is its own trigger;
 * otherwise the root itself is the trigger.
 */
export function useScrollReveal(
  rootRef: RefObject<HTMLElement | null>,
  options: RevealOptions = {},
) {
  const {
    start = "top 82%",
    y = 28,
    stagger = 0.08,
    duration = 0.55,
  } = options;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const sections = gsap.utils.toArray<HTMLElement>(
        "[data-reveal-section]",
        root,
      );
      const triggers = sections.length > 0 ? sections : [root];

      triggers.forEach((section) => {
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", section);
        if (items.length === 0) return;

        gsap.set(items, { autoAlpha: 0, y });

        gsap.to(items, {
          autoAlpha: 1,
          y: 0,
          duration,
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start,
            once: true,
          },
        });
      });
    },
    { scope: rootRef },
  );
}
