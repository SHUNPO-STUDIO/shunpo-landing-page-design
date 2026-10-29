import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

import { mounted } from "../lib/mounted.ts";
import { duration, ease, pinFrom, stagger } from "./tokens.ts";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* The film plays over 1 450 of every 1 800 px of track (at 1 440 × 900, as in the approved prototype); its
   last frame then holds until the next section covers the stage. */
const FILM_PX = 1450;
const TRACK_PX = 1800;
/* While the next section covers it, the film recedes under a Fuji Night veil. */
const RECEDED_SCALE = 1.05;
const VEIL_OPACITY = 0.3;
/* Lines leave upwards past their masks, as far again as they rose. */
const ABOVE_LINE_PERCENT = -170;

export interface FilmMarks {
  /* Film progress (0 to 1) from which the image is light. */
  lightAt: number;
  /* Film progress (0 to 1) from which title and action leave. */
  leaveAt: number;
}

interface FilmScroll {
  /* Height of the full-screen stage. */
  stage: number;
  /* Height of the scroll track the pinned stage stays on; 0 where the stage does not pin. */
  track: number;
}

/* Scroll distance over which the film plays, from the top of the scene. Where the stage does not pin,
   it plays while the first half of the stage scrolls by, so its last frame is still seen. */
export function filmDistance({ stage, track }: FilmScroll): number {
  return track > 0 ? (track * FILM_PX) / TRACK_PX : stage / 2;
}

/* The end of the film's scroll range (a ScrollTrigger position), measured on the stage and its track. */
export function filmEnd(stage: HTMLElement | null, track: HTMLElement | null): string {
  return `+=${filmDistance({ stage: stage?.offsetHeight ?? 0, track: track?.offsetHeight ?? 0 })}`;
}

function leave(overlay: HTMLElement, gone: boolean): void {
  gsap.to(overlay.querySelectorAll("[data-reveal-line]"), {
    yPercent: gone ? ABOVE_LINE_PERCENT : 0,
    duration: duration.slow,
    ease: ease.emphasized,
    stagger: stagger.loose,
    overwrite: "auto",
  });
  gsap.to(overlay.querySelectorAll("[data-film-action]"), {
    autoAlpha: gone ? 0 : 1,
    duration: duration.fast,
    overwrite: "auto",
  });
}

/* Title and action follow the image: light scheme once the sky is light, gone once the sun needs the screen. */
export function followFilm(overlay: HTMLElement, marks: FilmMarks): (progress: number) => void {
  let light = false;
  let gone = false;
  return (progress) => {
    if (progress >= marks.lightAt !== light) {
      light = !light;
      overlay.classList.toggle("scheme-light", light);
    }
    if (progress >= marks.leaveAt !== gone) {
      gone = !gone;
      leave(overlay, gone);
    }
  };
}

/* The stage stays pinned through the scene (over its track), then recedes while the next section covers it. */
function pinAndRecede(stage: HTMLElement): void {
  const scene = stage.parentElement;
  ScrollTrigger.create({
    trigger: scene,
    start: "top top",
    end: "bottom top",
    pin: stage,
    pinSpacing: false,
  });
  gsap
    .timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: scene, start: "bottom bottom", end: "bottom top", scrub: true },
    })
    .to("[data-slot=video-scrub]", { scale: RECEDED_SCALE, transformOrigin: "50% 80%" }, 0)
    .to("[data-film-veil]", { opacity: VEIL_OPACITY }, 0);
}

export function useRecede(
  stage: RefObject<HTMLElement | null>,
  minWidth: keyof typeof pinFrom,
): void {
  useGSAP(
    () => {
      gsap.matchMedia().add(pinFrom[minWidth], () => {
        pinAndRecede(mounted(stage));
      });
    },
    { scope: stage },
  );
}
