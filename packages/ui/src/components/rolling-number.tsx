"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { type HTMLAttributes, useRef } from "react";

import { cn } from "../lib/cn.ts";
import { duration, ease, stagger } from "../motion/tokens.ts";

gsap.registerPlugin(useGSAP);

const BEADS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

interface Rod {
  place: number;
  digit: number;
}

/* Units first: place 0 is the units rod, place 1 the tens rod… */
function rodsOf(value: number): Rod[] {
  const rods: Rod[] = [];
  let rest = value;
  do {
    rods.push({ place: rods.length, digit: rest % 10 });
    rest = Math.floor(rest / 10);
  } while (rest > 0);
  return rods;
}

interface RollingNumberProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /* A whole, non-negative number. */
  value: number;
}

/* A figure on soroban rods: each digit is a column of beads 0–9, and a new value rolls every rod
   from the digit it showed to the new one, units first. Rods start on 0. */
export function RollingNumber({ value, className, ...props }: RollingNumberProps) {
  const root = useRef<HTMLSpanElement>(null);
  const shown = useRef<Rod[]>([]);
  const rods = rodsOf(value);

  useGSAP(
    () => {
      const previous = shown.current;
      shown.current = rods;
      if (window.matchMedia(REDUCED_MOTION).matches) {
        return;
      }
      for (const { place, digit } of rods) {
        const offset = digit - (previous[place]?.digit ?? 0);
        const strip = root.current?.querySelector(`[data-place="${place}"]`);
        if (offset !== 0 && strip) {
          /* Starts where the rod is now, even mid-roll, and always lands on the new digit. */
          const rolling = Number(gsap.getProperty(strip, "yPercent"));
          gsap.fromTo(
            strip,
            { yPercent: offset * 10 + rolling },
            {
              yPercent: 0,
              duration: duration.fast,
              ease: ease.emphasized,
              delay: place * stagger.tight,
              overwrite: true,
            },
          );
        }
      }
    },
    { dependencies: [value], scope: root },
  );

  return (
    <span ref={root} data-slot="rolling-number" className={cn("inline-flex", className)} {...props}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="inline-flex flex-row-reverse leading-none tabular-nums">
        {rods.map(({ place, digit }) => (
          <span key={place} className="h-lh overflow-hidden">
            {/* GSAP rolls this wrapper by an offset; the strip inside holds the digit in markup. */}
            <span data-place={place} className="block">
              <span className="flex flex-col" style={{ translate: `0 ${-digit * 10}%` }}>
                {BEADS.map((bead) => (
                  <span key={bead} className="h-lh">
                    {bead}
                  </span>
                ))}
              </span>
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
