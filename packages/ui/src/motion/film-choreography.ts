import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

import { mounted } from "../lib/mounted.ts";
import { duration, ease, stagger } from "./tokens.ts";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PIN_FROM_MD = "(min-width: 48rem) and (prefers-reduced-motion: no-preference)";

/* The film plays over 1 450 of the pin's 1 800 px at 900 px high, as in the approved prototype; its last
   frame then holds until the next section covers the stage. */
const FILM_SHARE = 1450 / 1800;
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

/* Share of the scene's scroll (stage, pinned screens, then the screen the next section covers it in)
   that keeps the film's last frame. */
export function filmHold(screens: number): number {
  return 1 - (FILM_SHARE * screens) / (screens + 1);
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

function recede(stage: HTMLElement, screens: number): void {
  const covered = screens / (screens + 1);
  gsap
    .timeline({
      defaults: { ease: "none", duration: 1 - covered },
      scrollTrigger: {
        trigger: stage.parentElement,
        start: "top top",
        end: "bottom top",
        pin: stage,
        pinSpacing: false,
        scrub: true,
      },
    })
    .to("[data-slot=video-scrub]", { scale: RECEDED_SCALE, transformOrigin: "50% 80%" }, covered)
    .to("[data-film-veil]", { opacity: VEIL_OPACITY }, covered);
}

/* From md, the stage stays pinned through the scene and recedes while the next section covers it. */
export function useRecede(stage: RefObject<HTMLElement | null>, screens: number): void {
  useGSAP(
    () => {
      gsap.matchMedia().add(PIN_FROM_MD, () => {
        recede(mounted(stage), screens);
      });
    },
    { scope: stage },
  );
}
