"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactElement, type ReactNode, useRef } from "react";

import { cn } from "../lib/cn.ts";
import { type FilingParts, fileIntoBoard, stampOnArrival } from "./filing-timeline.ts";
import { ease, sceneLength, scrub } from "./tokens.ts";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PINNED = "(min-width: 48rem) and (prefers-reduced-motion: no-preference)";
const STACKED = "(max-width: 47.99rem) and (prefers-reduced-motion: no-preference)";

/* Stacked plates lean one way then the other, like prints laid on a desk; square when motion is
   reduced, where the page is a still, audited layout. */
const TILTS = [
  "motion-safe:-rotate-3",
  "motion-safe:rotate-3",
  "motion-safe:-rotate-6",
  "motion-safe:rotate-2",
] as const;

/* Base classes are the stacked story (phones, reduced motion); `md:motion-safe:` is the pinned
   stage (copy on top of the board on tablets, side by side from `lg`). */
const layout = {
  scene: "w-full md:motion-safe:h-dvh md:motion-safe:overflow-clip",
  canvas:
    "relative grid gap-12 md:motion-safe:h-full md:motion-safe:content-center md:motion-safe:gap-6",
  heading: "md:motion-safe:row-start-1 lg:motion-safe:w-3/8",
  progress: "hidden gap-2 md:motion-safe:row-start-2 md:motion-safe:flex lg:motion-safe:w-3/8",
  step: "grid gap-6 md:motion-reduce:grid-cols-3 md:motion-reduce:items-center md:motion-reduce:gap-12 md:motion-safe:contents",
  plate:
    "w-4/5 justify-self-center sm:w-1/2 md:motion-reduce:w-full md:motion-safe:absolute md:motion-safe:top-0 md:motion-safe:left-0 md:motion-safe:z-10 md:motion-safe:w-2/5 md:motion-safe:rotate-0 md:motion-safe:justify-self-start lg:motion-safe:w-1/4",
  card: "md:motion-reduce:col-span-2 md:motion-safe:col-start-1 md:motion-safe:row-start-3 md:motion-safe:self-start lg:motion-safe:w-3/8",
  outro:
    "md:motion-safe:col-start-1 md:motion-safe:row-start-3 md:motion-safe:self-start lg:motion-safe:w-3/8",
  board:
    "md:motion-safe:row-start-4 lg:motion-safe:absolute lg:motion-safe:row-start-auto lg:motion-safe:inset-y-0 lg:motion-safe:right-0 lg:motion-safe:left-5/12 lg:motion-safe:my-auto lg:motion-safe:h-fit",
  hanko:
    "pointer-events-none hidden origin-bottom md:motion-safe:absolute md:motion-safe:top-0 md:motion-safe:left-0 md:motion-safe:z-40 md:motion-safe:block md:motion-safe:w-20 [&_img]:block [&_img]:h-auto [&_img]:w-full",
} as const;

export interface FilingStep {
  id: string;
  /* A `PaperPlate` carrying the `Stamp` the hanko prints. */
  plate: ReactNode;
  card: ReactNode;
  /* Board tiles (`data-tile`) the plate files into; the first one receives it. */
  targets: string[];
}

interface FilingSceneProps {
  heading: ReactNode;
  steps: FilingStep[];
  /* The card that closes the story, shown with the board fully alive. */
  outro: ReactNode;
  /* A board whose parts carry `data-tile` (e.g. `SystemDashboard`). */
  board: ReactNode;
  /* `<Image src={…} alt="" />` of the hanko (decorative). */
  hanko: ReactElement;
}

function part(scene: HTMLElement, name: string): HTMLElement {
  const element = scene.querySelector<HTMLElement>(`[data-filing='${name}']`);
  if (element === null) {
    throw new Error(`FilingScene is missing its ${name}`);
  }
  return element;
}

function tilesNamed(board: HTMLElement, names: string[]): HTMLElement[] {
  return names.flatMap((name) => [...board.querySelectorAll<HTMLElement>(`[data-tile='${name}']`)]);
}

function collectParts(scene: HTMLElement, steps: FilingStep[]): FilingParts {
  const board = part(scene, "board");
  const filed = new Set(
    tilesNamed(
      board,
      steps.flatMap((step) => step.targets),
    ),
  );
  return {
    canvas: part(scene, "canvas"),
    board,
    hanko: part(scene, "hanko"),
    steps: steps.map((step, index) => ({
      plate: part(scene, `plate-${index}`),
      card: part(scene, `card-${index}`),
      tick: part(scene, `tick-${index}`),
      tiles: tilesNamed(board, step.targets),
    })),
    outro: part(scene, "outro"),
    rest: [...board.querySelectorAll<HTMLElement>("[data-tile]")].filter(
      (tile) => !filed.has(tile),
    ),
  };
}

function pinnedTimeline(scene: HTMLElement): gsap.core.Timeline {
  return gsap.timeline({
    defaults: { ease: ease.standard },
    scrollTrigger: {
      trigger: scene,
      start: "top top",
      end: `+=${sceneLength.long * 100}%`,
      pin: true,
      scrub,
      invalidateOnRefresh: true,
    },
  });
}

/* A pinned scroll story (from the tablet breakpoint): each step's plate comes forward, is stamped by
   the hanko and files into its tile of the board, which comes alive; the outro closes on the full
   board. Phones and reduced motion get the same story stacked, every plate already stamped. */
export function FilingScene({ heading, steps, outro, board, hanko }: FilingSceneProps) {
  const scene = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scene.current;
      if (root === null) {
        return;
      }
      const media = gsap.matchMedia();
      media.add(PINNED, () => {
        fileIntoBoard(pinnedTimeline(root), collectParts(root, steps));
      });
      media.add(STACKED, () => {
        stampOnArrival(steps.map((_, index) => part(root, `plate-${index}`)));
      });
    },
    { scope: scene },
  );

  return (
    <div ref={scene} data-slot="filing-scene" className={layout.scene}>
      <div data-filing="canvas" className={layout.canvas}>
        <div className={layout.heading}>{heading}</div>
        <div aria-hidden="true" className={layout.progress}>
          {steps.map((step, index) => (
            <span key={step.id} className="h-0.5 w-8 bg-border">
              <span
                data-filing={`tick-${index}`}
                className="block size-full origin-left bg-foreground"
              />
            </span>
          ))}
        </div>
        {steps.map((step, index) => (
          <div key={step.id} className={layout.step}>
            <div
              data-filing={`plate-${index}`}
              className={cn(layout.plate, TILTS[index % TILTS.length])}
            >
              {step.plate}
            </div>
            <div data-filing={`card-${index}`} className={layout.card}>
              {step.card}
            </div>
          </div>
        ))}
        <div data-filing="outro" className={layout.outro}>
          {outro}
        </div>
        <div data-filing="board" className={layout.board}>
          {board}
        </div>
        <div data-filing="hanko" aria-hidden="true" className={layout.hanko}>
          {hanko}
        </div>
      </div>
    </div>
  );
}
