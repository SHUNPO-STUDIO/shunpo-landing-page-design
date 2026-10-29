"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { type HTMLAttributes, type ReactElement, useRef } from "react";

import { cn } from "../lib/cn.ts";
import { duration, ease, stagger } from "../motion/tokens.ts";

gsap.registerPlugin(useGSAP);

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/* Each print keeps its own pose once laid down; the ones underneath peek out by a different corner. */
const poses = [
  "translate-x-1 -translate-y-1 -rotate-4",
  "-translate-x-2 -translate-y-1 rotate-4",
  "-translate-x-1 translate-y-1 -rotate-1",
  "translate-x-1 rotate-1",
] as const;

/* Prints sink into the pile under a Fuji Night veil, deeper ones darker. */
const veils = ["opacity-0", "opacity-10", "opacity-15", "opacity-20"] as const;

function veilFor(depth: number): string {
  return veils[Math.min(Math.max(depth, 0), veils.length - 1)] ?? "opacity-0";
}

/* New prints drop onto the pile from just above it, one after the other. */
function lay(cards: HTMLElement[], still: boolean): void {
  if (cards.length === 0) {
    return;
  }
  if (still) {
    gsap.set(cards, { autoAlpha: 1 });
    return;
  }
  gsap.fromTo(
    cards,
    { autoAlpha: 0, y: -56, scale: 1.04 },
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: duration.fast,
      ease: ease.inOut,
      stagger: stagger.loose,
    },
  );
}

/* Prints above the active one are lifted off: they rise and their lower edge wipes them away. */
function lift(cards: HTMLElement[], still: boolean): void {
  if (cards.length === 0) {
    return;
  }
  if (still) {
    gsap.set(cards, { autoAlpha: 0 });
    return;
  }
  gsap.fromTo(
    cards,
    { autoAlpha: 1, y: 0, clipPath: "inset(-10% -10% -10% -10%)" },
    {
      y: -32,
      clipPath: "inset(-10% -10% 100% -10%)",
      duration: duration.fast,
      ease: ease.inOut,
      onComplete: () => {
        gsap.set(cards, { autoAlpha: 0, clearProps: "y,clipPath" });
      },
    },
  );
}

function restack(cards: HTMLElement[], previous: number, active: number): void {
  const still = window.matchMedia(REDUCED_MOTION).matches;
  lay(cards.slice(previous + 1, active + 1), still);
  lift(cards.slice(active + 1, previous + 1), still);
}

interface PhotoStackProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  photos: ReactElement[];
  active: number;
  paper?: ReactElement | undefined;
}

/* A pile of prints on a sheet of paper: every print up to `active` lies on the pile, the active one on top. */
export function PhotoStack({ photos, active, paper, className, ...props }: PhotoStackProps) {
  const root = useRef<HTMLDivElement>(null);
  const shown = useRef(active);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-photo]");
      restack(cards, shown.current, active);
      shown.current = active;
    },
    { scope: root, dependencies: [active] },
  );

  return (
    <div
      ref={root}
      data-slot="photo-stack"
      className={cn("relative isolate aspect-4/5 w-full", className)}
      {...props}
    >
      {paper === undefined ? null : (
        <div
          aria-hidden="true"
          className="absolute -inset-x-4 -inset-y-8 -z-10 rotate-3 opacity-25 mix-blend-multiply [&_img]:size-full [&_img]:object-fill"
        >
          {paper}
        </div>
      )}
      {photos.map((photo, index) => (
        <div
          key={photo.key ?? index}
          data-photo={index}
          className={cn(
            "absolute inset-0 overflow-hidden bg-fuji shadow-md [&_img]:size-full [&_img]:object-cover",
            poses[index % poses.length],
            index > active && "invisible",
          )}
        >
          {photo}
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-0 bg-fuji transition-opacity duration-200",
              veilFor(active - index),
            )}
          />
        </div>
      ))}
    </div>
  );
}
