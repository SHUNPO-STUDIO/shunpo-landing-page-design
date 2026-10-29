"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useRef } from "react";

import { scrub } from "./tokens.ts";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const OPENING = "(min-width: 48rem) and (prefers-reduced-motion: no-preference)";

/* The panel's cut-corner outline, inset from its edges while closed, flush once open. */
const CLOSED = "polygon(12% 16%, calc(88% - 3.5rem) 16%, 88% calc(16% + 3.5rem), 88% 84%, 12% 84%)";
const OPEN = "polygon(0% 0%, calc(100% - 3.5rem) 0%, 100% calc(0% + 3.5rem), 100% 100%, 0% 100%)";

function openPanel(panel: HTMLElement): void {
  gsap
    .timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: panel, start: "top bottom", end: "top 30%", scrub },
    })
    .fromTo(panel, { clipPath: CLOSED }, { clipPath: OPEN }, 0)
    .fromTo(panel.querySelector("[data-case='backdrop']"), { scale: 1.12 }, { scale: 1 }, 0)
    .fromTo(
      panel.querySelector("[data-case='content']"),
      { opacity: 0 },
      { opacity: 1, duration: 0.3 },
      0.7,
    );
}

interface PanelRevealProps {
  children: ReactNode;
}

/* A list of full-width panels that open as they rise: each image unfolds from a smaller frame to the
   full width, tied to the scroll and reversible. Phones and reduced motion show the panels open. */
export function PanelReveal({ children }: PanelRevealProps) {
  const list = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(OPENING, () => {
        for (const panel of gsap.utils.toArray<HTMLElement>("[data-slot='case-panel']")) {
          openPanel(panel);
        }
      });
    },
    { scope: list },
  );

  return (
    <ol ref={list} data-slot="panel-reveal" className="flex flex-col gap-8">
      {children}
    </ol>
  );
}
