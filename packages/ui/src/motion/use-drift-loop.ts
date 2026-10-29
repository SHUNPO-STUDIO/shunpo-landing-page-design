import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { type RefObject, useRef } from "react";

import { drift, duration, ease } from "./tokens.ts";

gsap.registerPlugin(useGSAP);

const ALLOW_MOTION = "(prefers-reduced-motion: no-preference)";

interface DriftLoop {
  root: RefObject<HTMLDivElement | null>;
  track: RefObject<HTMLDivElement | null>;
  /* Eases the loop to a stop (`false`) or back to its speed (`true`). */
  glide: (running: boolean) => void;
}

/* Slides a track holding two identical copies of a band by half its width, forever, at `drift`
   pixels per second, so the band loops without a seam. Nothing moves under reduced motion. */
export function useDriftLoop(): DriftLoop {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const loop = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(ALLOW_MOTION, () => {
        const element = track.current;
        if (element !== null) {
          loop.current = gsap.to(element, {
            xPercent: -50,
            ease: "none",
            repeat: -1,
            duration: element.scrollWidth / 2 / drift,
          });
        }
        return () => {
          loop.current = null;
        };
      });
    },
    { scope: root },
  );

  function glide(running: boolean): void {
    if (loop.current !== null) {
      gsap.to(loop.current, {
        timeScale: running ? 1 : 0,
        duration: duration.base,
        ease: ease.standard,
        overwrite: true,
      });
    }
  }

  return { root, track, glide };
}
