import { duration } from "./tokens.ts";

/* Adds a hanko press to a scroll timeline: the stamp drops from above, lands with a short squash and stays printed.
   Rotation is relative to the stamp's own tilt, so a pressed stamp settles exactly like a still one. */
export function pressStamp(
  timeline: gsap.core.Timeline,
  target: gsap.TweenTarget,
  position?: gsap.Position,
): gsap.core.Timeline {
  return timeline
    .fromTo(
      target,
      { opacity: 0, scale: 1.8, rotate: -9 },
      { opacity: 1, scale: 0.94, rotate: 0, duration: duration.fast, ease: "power4.in" },
      position,
    )
    .to(target, { scale: 1, duration: duration.fast, ease: "back.out(3)" });
}
