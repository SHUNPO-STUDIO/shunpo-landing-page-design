"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useRef } from "react";

import { duration, ease } from "./tokens.ts";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SIDE_BY_SIDE = "(min-width: 64rem) and (prefers-reduced-motion: no-preference)";

interface ComparisonRevealProps {
  standard: ReactNode;
  custom: ReactNode;
  note?: ReactNode;
}

function halfGap(grid: Element): number {
  return Number(getComputedStyle(grid).columnGap.replace(/px$/u, "")) / 2;
}

/* Builds the swap: the standard side starts alone in the centre, the custom side waits under it. */
function swapTimeline(grid: Element): gsap.core.Timeline {
  const offset = halfGap(grid);
  return gsap
    .timeline({ paused: true, defaults: { duration: duration.base, ease: ease.inOut } })
    .fromTo("[data-reveal='standard']", { xPercent: 50, x: offset }, { xPercent: 0, x: 0 }, 0)
    .fromTo(
      "[data-reveal='custom']",
      { xPercent: -50, x: -offset, scale: 0.8 },
      { xPercent: 0, x: 0, scale: 1 },
      0,
    )
    .fromTo("[data-reveal='note']", { autoAlpha: 0 }, { autoAlpha: 1, duration: duration.fast });
}

/* Two sides of a comparison. On wide screens the custom side slides out from under the standard one
   when the cards reach the lower third of the screen, and slides back if the visitor scrolls up. */
export function ComparisonReveal({ standard, custom, note }: ComparisonRevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(SIDE_BY_SIDE, () => {
        const grid = root.current?.querySelector("[data-reveal='grid']");
        if (grid === null || grid === undefined) {
          return;
        }
        const timeline = swapTimeline(grid);
        ScrollTrigger.create({
          trigger: grid,
          start: "top 70%",
          onEnter: () => timeline.play(),
        });
        ScrollTrigger.create({
          trigger: grid,
          start: "top 90%",
          onLeaveBack: () => timeline.reversed(true).resume(),
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} data-slot="comparison-reveal" className="flex flex-col gap-6">
      <div data-reveal="grid" className="grid gap-6 lg:grid-cols-2">
        <div data-reveal="standard" className="relative z-10">
          {standard}
        </div>
        <div data-reveal="custom">{custom}</div>
      </div>
      {note === undefined ? null : <div data-reveal="note">{note}</div>}
    </div>
  );
}
