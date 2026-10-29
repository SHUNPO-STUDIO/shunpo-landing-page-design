import { gsap } from "gsap";

import { STAMP, poseVars, posesOf } from "./filing-measure.ts";
import { pressStamp } from "./press-stamp.ts";
import { duration, ease, stagger } from "./tokens.ts";

export interface FilingStepParts {
  plate: HTMLElement;
  card: HTMLElement;
  tick: HTMLElement;
  /* The board tiles this plate files into; the first one receives it. */
  tiles: HTMLElement[];
}

export interface FilingParts {
  canvas: HTMLElement;
  board: HTMLElement;
  hanko: HTMLElement;
  steps: FilingStepParts[];
  outro: HTMLElement;
  /* Board tiles no plate files into: they light up with the outro. */
  rest: HTMLElement[];
}

interface StepContext {
  parts: FilingParts;
  step: FilingStepParts;
  index: number;
  previous: HTMLElement;
}

const DIM = 0.16;
const PILE_DEPTH = 20;
const FRONT_DEPTH = 30;
const SQUASH = 0.95;
const BUMP = 3;
const SHIFT = 14;
const TILT = { before: -9, after: 7 } as const;
const LIFE = {
  count: { textContent: 0, snap: { textContent: 1 } },
  rise: { scaleY: 0 },
  fill: { scaleX: 0 },
  appear: { autoAlpha: 0, scale: 0.6 },
} as const;

function posesFor({ parts, step, index }: StepContext): ReturnType<typeof posesOf> {
  return posesOf({ ...parts, plate: step.plate, index });
}

function bringToLife(timeline: gsap.core.Timeline, tiles: HTMLElement[], position: string): void {
  for (const [kind, from] of Object.entries(LIFE)) {
    const parts = tiles.flatMap((tile) => [
      ...tile.querySelectorAll<HTMLElement>(`[data-live='${kind}']`),
    ]);
    if (parts.length > 0) {
      timeline.from(
        parts,
        { ...from, duration: duration.slow, stagger: stagger.tight, immediateRender: true },
        position,
      );
    }
  }
}

function lightUp(timeline: gsap.core.Timeline, tiles: HTMLElement[], position: string): void {
  if (tiles.length === 0) {
    return;
  }
  timeline.fromTo(
    tiles,
    { opacity: DIM },
    { opacity: 1, duration: duration.base, immediateRender: true },
    position,
  );
  bringToLife(timeline, tiles, position);
}

function swapCard(timeline: gsap.core.Timeline, cards: [HTMLElement, HTMLElement], at: string) {
  const [previous, next] = cards;
  timeline
    .to(previous, { autoAlpha: 0, y: -SHIFT, duration: duration.base }, at)
    .fromTo(
      next,
      { autoAlpha: 0, y: SHIFT },
      { autoAlpha: 1, y: 0, duration: duration.base, immediateRender: true },
      at,
    );
}

/* The hanko drops on the plate's stamp, presses (the stamp prints) and lifts away. */
function pressHanko(timeline: gsap.core.Timeline, context: StepContext, at: string): void {
  const { parts, step, index } = context;
  const poses = posesFor(context);
  const press = `press${index}`;
  timeline
    .fromTo(
      parts.hanko,
      poseVars(poses.lifted(TILT.before)),
      {
        ...poseVars(poses.pressed),
        duration: duration.slow,
        ease: ease.inOut,
        immediateRender: index === 0,
      },
      `${at}+=${duration.base}`,
    )
    .addLabel(press)
    .to(
      parts.hanko,
      {
        scaleY: () => poses.pressed().scale * SQUASH,
        duration: duration.fast / 2,
        repeat: 1,
        yoyo: true,
      },
      press,
    )
    .to(step.plate, { y: `+=${BUMP}`, duration: duration.fast / 2, repeat: 1, yoyo: true }, press);
  const stamp = step.plate.querySelector<HTMLElement>(STAMP);
  if (stamp !== null) {
    pressStamp(timeline, stamp, `${press}-=${duration.fast}`);
  }
  timeline.to(
    parts.hanko,
    { ...poseVars(poses.lifted(TILT.after)), duration: duration.slow, ease: "power2.in" },
    `${press}+=${duration.fast}`,
  );
}

/* After a beat, the plate flies into its tile, which comes alive as the plate fades into it. */
function fileAway(timeline: gsap.core.Timeline, context: StepContext): void {
  const { step, index } = context;
  const poses = posesFor(context);
  const file = `file${index}`;
  const [landing] = step.tiles;
  timeline.addLabel(file, `+=${duration.base}`);
  if (landing !== undefined) {
    timeline.fromTo(
      step.plate,
      poseVars(poses.front),
      {
        ...poseVars(poses.tile(landing)),
        duration: duration.slow,
        ease: ease.inOut,
        immediateRender: false,
      },
      file,
    );
  }
  timeline.to(
    step.plate,
    { autoAlpha: 0, duration: duration.base },
    `${file}+=${duration.slow - duration.base / 2}`,
  );
  lightUp(timeline, step.tiles, `${file}+=${duration.slow * 0.75}`);
}

function fileStep(timeline: gsap.core.Timeline, context: StepContext): void {
  const { step, index, previous } = context;
  const at = `step${index}`;
  timeline.addLabel(at);
  if (index > 0) {
    swapCard(timeline, [previous, step.card], at);
    timeline.fromTo(
      step.tick,
      { scaleX: 0 },
      { scaleX: 1, duration: duration.base, immediateRender: true },
      at,
    );
  }
  const poses = posesFor(context);
  timeline.set(step.plate, { zIndex: FRONT_DEPTH }, at).fromTo(
    step.plate,
    poseVars(poses.pile),
    {
      ...poseVars(poses.front),
      duration: duration.slow,
      ease: ease.inOut,
      immediateRender: true,
    },
    at,
  );
  pressHanko(timeline, context, at);
  fileAway(timeline, context);
}

/* The pinned story: each pain's plate comes forward, is stamped by the hanko, then files into its
   tile of the board; at the end the outro card shows and the whole board comes alive. */
export function fileIntoBoard(timeline: gsap.core.Timeline, parts: FilingParts): void {
  const plates = parts.steps.map((step) => step.plate);
  gsap.set(plates, { zIndex: (index: number) => PILE_DEPTH - index });
  gsap.set(
    plates.flatMap((plate) => Array.from(plate.querySelectorAll(STAMP))),
    { opacity: 0 },
  );
  timeline.to({}, { duration: duration.base });
  let previous = parts.steps[0]?.card ?? parts.outro;
  parts.steps.forEach((step, index) => {
    fileStep(timeline, { parts, step, index, previous });
    previous = step.card;
  });
  timeline.addLabel("outro", `+=${duration.base}`);
  swapCard(timeline, [previous, parts.outro], "outro");
  lightUp(timeline, parts.rest, "outro");
  timeline.to({}, { duration: duration.slow });
}

/* Stacked version (phones): each plate's stamp prints as the plate scrolls into view. */
export function stampOnArrival(plates: HTMLElement[]): void {
  for (const plate of plates) {
    const stamp = plate.querySelector<HTMLElement>(STAMP);
    if (stamp !== null) {
      pressStamp(
        gsap.timeline({
          scrollTrigger: { trigger: plate, start: "top 60%", toggleActions: "play none none none" },
        }),
        stamp,
        duration.fast,
      );
    }
  }
}
