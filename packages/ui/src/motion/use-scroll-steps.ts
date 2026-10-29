"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type RefObject, useRef, useState } from "react";

import { stepAt, stepCentre } from "../lib/scroll-step.ts";
import { sceneLength } from "./tokens.ts";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* Pinned only where the whole stage fits on screen: wide and tall enough, with motion allowed. */
const PINNED =
  "(min-width: 64rem) and (min-height: 40rem) and (prefers-reduced-motion: no-preference)";

interface ScrollSteps {
  step: number;
  goTo: (step: number) => void;
}

/* Pins `stage` and walks through `count` steps with the scroll. Elsewhere the steps only change on demand. */
export function useScrollSteps(stage: RefObject<HTMLElement | null>, count: number): ScrollSteps {
  const [step, setStep] = useState(0);
  const pinned = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(PINNED, () => {
        pinned.current = ScrollTrigger.create({
          trigger: stage.current,
          start: "top top",
          end: `+=${sceneLength.long * 100}%`,
          pin: true,
          onUpdate: (self) => {
            setStep((current) => stepAt(self.progress, current, count));
          },
        });
        return () => {
          pinned.current = null;
        };
      });
    },
    { scope: stage, dependencies: [count] },
  );

  function goTo(next: number): void {
    const trigger = pinned.current;
    if (trigger === null) {
      setStep(next);
      return;
    }
    const top = trigger.start + (trigger.end - trigger.start) * stepCentre(next, count);
    window.scrollTo({ top, behavior: "smooth" });
  }

  return { step, goTo };
}
