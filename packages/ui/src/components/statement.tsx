"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type HTMLAttributes, useRef } from "react";

import { cn } from "../lib/cn.ts";
import { mounted } from "../lib/mounted.ts";
import { duration, ease, stagger } from "../motion/tokens.ts";
import { Heading } from "../typography/heading.tsx";
import { Shuriken } from "./shuriken.tsx";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ALLOW_MOTION = "(prefers-reduced-motion: no-preference)";
/* Each sentence waits under its mask; the shuriken arrives a quarter turn behind. */
const BELOW_MASK_PERCENT = 115;
const QUARTER_TURN = -90;
const ARRIVING_SCALE = 0.6;

function enter(root: HTMLElement): void {
  gsap
    .timeline({ scrollTrigger: { trigger: root, start: "top 70%", once: true } })
    .from("[data-slot=shuriken]", {
      rotation: QUARTER_TURN,
      scale: ARRIVING_SCALE,
      opacity: 0,
      duration: duration.slow,
      ease: ease.emphasized,
    })
    .from(
      "[data-statement-sentence]",
      {
        yPercent: BELOW_MASK_PERCENT,
        duration: duration.slow,
        ease: ease.emphasized,
        stagger: stagger.loose,
      },
      stagger.loose,
    );
}

interface StatementProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /* The sentence that sets the scene, in regular weight. */
  lead: string;
  /* The sentence that matters, in semibold. */
  emphasis: string;
}

/* A centred two-sentence statement under the shuriken. On entering, the shuriken turns a quarter
   into place and each sentence rises out of its mask, once. */
export function Statement({ lead, emphasis, className, ...props }: StatementProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(ALLOW_MOTION, () => {
        enter(mounted(root));
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      data-slot="statement"
      className={cn("flex flex-col items-center gap-8 md:gap-10", className)}
      {...props}
    >
      <Shuriken size="md" />
      <Heading level={2} size="title-lg" align="center">
        <span className="block overflow-clip py-1">
          <span data-statement-sentence className="block">
            {lead}
          </span>
        </span>{" "}
        <span className="block overflow-clip py-1">
          <span data-statement-sentence className="block font-semibold">
            {emphasis}
          </span>
        </span>
      </Heading>
    </div>
  );
}
