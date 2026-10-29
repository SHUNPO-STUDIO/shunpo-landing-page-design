"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type HTMLAttributes, type ReactElement, useRef } from "react";

import { Container } from "../layout/container.tsx";
import { Section } from "../layout/section.tsx";
import { mounted } from "../lib/mounted.ts";
import { holdLength } from "./tokens.ts";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PIN_FROM_MD = "(min-width: 48rem) and (prefers-reduced-motion: no-preference)";

interface PhotoStageProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /* One 16:9 photograph: `<Image fill sizes="…" alt="…" />`. */
  image: ReactElement;
}

/* A full-screen sheet of paper framing one photograph. It slides over the pinned scene before it,
   then holds for a breath (tablet up) before the page moves on. */
export function PhotoStage({ image, ...props }: PhotoStageProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(PIN_FROM_MD, () => {
        ScrollTrigger.create({
          trigger: mounted(root),
          start: "top top",
          end: `+=${holdLength * 100}%`,
          pin: true,
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} data-slot="photo-stage" className="relative z-10">
      <Section scheme="light" spacing="sm" className="md:h-svh md:py-24" {...props}>
        <Container size="wide" className="grid h-full place-items-center md:fit-stage">
          <div className="relative aspect-16/9 w-full overflow-clip md:fit-video [&_img]:object-cover">
            {image}
          </div>
        </Container>
      </Section>
    </div>
  );
}
