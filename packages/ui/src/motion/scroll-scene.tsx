"use client";

import { useGSAP } from "@gsap/react";
import { cva } from "class-variance-authority";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useRef } from "react";

import { ease, pinFrom, sceneLength, scrub } from "./tokens.ts";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const stageVariants = cva("grid grid-cols-1 place-items-center overflow-clip", {
  variants: {
    minWidth: {
      all: "motion-safe:h-dvh motion-reduce:py-24",
      md: "py-24 md:motion-safe:h-dvh md:motion-safe:py-0",
    },
  },
});

interface ScrollSceneProps {
  children: ReactNode;
  /* Shown instead of the scene under reduced motion: every stage of the story as a still plate. */
  still?: ReactNode;
  choreography: (timeline: gsap.core.Timeline) => void;
  length?: keyof typeof sceneLength;
  minWidth?: keyof typeof pinFrom;
}

export function ScrollScene({
  children,
  still,
  choreography,
  length = "medium",
  minWidth = "all",
}: ScrollSceneProps) {
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(pinFrom[minWidth], () => {
        choreography(
          gsap.timeline({
            defaults: { ease: ease.standard },
            scrollTrigger: {
              trigger: stage.current,
              start: "top top",
              end: `+=${sceneLength[length] * 100}%`,
              pin: true,
              scrub,
            },
          }),
        );
      });
    },
    { scope: stage },
  );

  return (
    <div ref={stage} data-slot="scroll-scene" className={stageVariants({ minWidth })}>
      {still === undefined ? (
        children
      ) : (
        <>
          <div className="w-full motion-reduce:hidden">{children}</div>
          <div className="hidden w-full motion-reduce:block">{still}</div>
        </>
      )}
    </div>
  );
}
