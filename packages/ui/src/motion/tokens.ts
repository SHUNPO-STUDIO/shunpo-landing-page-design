export const duration = {
  fast: 0.2,
  base: 0.45,
  slow: 0.8,
} as const;

export const ease = {
  standard: "power2.out",
  emphasized: "expo.out",
  inOut: "power3.inOut",
} as const;

export const stagger = {
  tight: 0.04,
  base: 0.08,
  loose: 0.14,
} as const;

export const sceneLength = {
  short: 1,
  medium: 2,
  long: 3,
} as const;

export const scrub = 0.6;

/* Where a scene may pin: at every width, or from the tablet breakpoint (md); never under reduced motion. */
export const pinFrom = {
  all: "(prefers-reduced-motion: no-preference)",
  md: "(min-width: 48rem) and (prefers-reduced-motion: no-preference)",
} as const;

/* Speed of a looping band (logo marquee), in pixels per second: slow enough to read every name. */
export const drift = 28;

/* Screens a still frame stays pinned before the page moves on: a breath, not a scene. */
export const holdLength = 0.5;
