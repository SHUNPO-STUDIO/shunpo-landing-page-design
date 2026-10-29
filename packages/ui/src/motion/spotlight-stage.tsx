"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type HTMLAttributes, type ReactElement, type ReactNode, useRef } from "react";

import { Container } from "../layout/container.tsx";
import { Section } from "../layout/section.tsx";
import { Stack } from "../layout/stack.tsx";
import { mounted } from "../lib/mounted.ts";
import { TextReveal } from "./text-reveal.tsx";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ALLOW_MOTION = "(prefers-reduced-motion: no-preference)";
/* While the stage rises, the reader walks into it: the call settles from a little lower, the light from closer. */
const CALL_OFFSET = "2.5rem";
const APPROACH_SCALE = 1.12;

/* The stage rises like a curtain over still content: until it reaches the top, its content is held
   in place on the screen and only uncovered. */
function riseLikeCurtain(stage: HTMLElement): void {
  gsap
    .timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: stage,
        start: "top bottom",
        end: "top top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    })
    .fromTo("[data-spotlight-content]", { y: () => -window.innerHeight }, { y: 0 }, 0)
    .from("[data-spotlight-call]", { y: CALL_OFFSET }, 0)
    .from("[data-spotlight-frame]", { scale: APPROACH_SCALE, transformOrigin: "60% 90%" }, 0);
}

interface SpotlightStageProps extends Omit<HTMLAttributes<HTMLElement>, "children" | "title"> {
  /* The figure standing in the light: a `VideoScrub` (or an image) filling its frame. */
  figure: ReactElement;
  /* The heading of the call: its words rise once the stage is well into the screen. */
  title: ReactElement;
  action: ReactNode;
}

/* A Fuji Night stage: the call (title and action) at the start side, a filmed figure in a pool of
   light at the end side from xl, below the call on smaller screens. It rises like a curtain over its still content. */
export function SpotlightStage({ figure, title, action, ...props }: SpotlightStageProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(ALLOW_MOTION, () => {
        riseLikeCurtain(mounted(root));
      });
    },
    { scope: root },
  );

  return (
    <Section scheme="dark" className="relative overflow-clip py-0 md:py-0" {...props}>
      <div ref={root} data-slot="spotlight-stage">
        <div data-spotlight-content className="relative">
          <Container className="relative grid min-h-svh content-center gap-12 py-24 xl:py-32">
            <Stack
              data-spotlight-call
              gap="2xl"
              align="start"
              className="relative z-10 xl:max-w-narrow"
            >
              <TextReveal by="words">{title}</TextReveal>
              {action}
            </Stack>
            <div className="relative aspect-3/4 md:aspect-4/3 xl:contents">
              <div
                data-spotlight-frame
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-1/2 aspect-1920/1072 h-full -translate-x-3/5 spotlight-mask saturate-85 xl:inset-y-auto xl:top-1/2 xl:left-1/12 xl:h-auto xl:w-4/3 xl:translate-x-0 xl:-translate-y-1/2"
              >
                {figure}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </Section>
  );
}
