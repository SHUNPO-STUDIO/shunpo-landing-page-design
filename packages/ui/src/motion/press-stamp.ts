import { duration } from "./tokens.ts";

/* Adds a hanko press to a scroll timeline: the stamp drops from above, lands with a short squash and stays printed. */
export function pressStamp(
  timeline: gsap.core.Timeline,
  target: gsap.TweenTarget,
  position?: gsap.Position,
): gsap.core.Timeline {
  return timeline
    .fromTo(
      target,
      { opacity: 0, scale: 1.8, rotate: -12 },
      { opacity: 1, scale: 0.94, rotate: -3, duration: duration.fast, ease: "power4.in" },
      position,
    )
    .to(target, { scale: 1, duration: duration.fast, ease: "back.out(3)" });
}
