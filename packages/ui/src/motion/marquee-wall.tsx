"use client";

import { Toggle } from "@base-ui/react/toggle";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Pause, Play } from "lucide-react";
import { type ReactNode, useRef, useState } from "react";

import { cn } from "../lib/cn.ts";
import { duration, ease } from "./tokens.ts";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ALLOW_MOTION = "(prefers-reduced-motion: no-preference)";

/* One loop per column, at slightly different paces so the columns never line up. */
const firstLoopSeconds = 64;
const loopSeconds = [firstLoopSeconds, 72, 58];

/* Columns run up, down, up: the even ones from their first copy to their second, the odd ones back. */
function loopColumn(track: HTMLElement, index: number, vertical: boolean): gsap.core.Tween {
  const property = vertical ? "yPercent" : "xPercent";
  const [from, to] = index % 2 === 0 ? [0, -50] : [-50, 0];
  return gsap.fromTo(
    track,
    { [property]: from },
    {
      [property]: to,
      ease: "none",
      repeat: -1,
      duration: loopSeconds[index % loopSeconds.length] ?? firstLoopSeconds,
    },
  );
}

/* Every reason the wall stands still: the loop runs only when none holds. */
interface Pauses {
  hover: boolean;
  user: boolean;
  offscreen: boolean;
}

function useWallLoop() {
  const wall = useRef<HTMLDivElement>(null);
  const loops = useRef<gsap.core.Tween[]>([]);
  const pauses = useRef<Pauses>({ hover: false, user: false, offscreen: true });

  function glide(change: Partial<Pauses>): void {
    pauses.current = { ...pauses.current, ...change };
    const running = !Object.values(pauses.current).includes(true);
    gsap.to(loops.current, {
      timeScale: running ? 1 : 0,
      duration: duration.base,
      ease: ease.standard,
      overwrite: true,
    });
  }

  useGSAP(
    () => {
      gsap.matchMedia().add(
        {
          vertical: `(min-width: 48rem) and ${ALLOW_MOTION}`,
          horizontal: `(max-width: 47.98rem) and ${ALLOW_MOTION}`,
        },
        ({ conditions }) => {
          const tracks = gsap.utils.toArray<HTMLElement>("[data-marquee-track]", wall.current);
          loops.current = tracks.map((track, index) =>
            loopColumn(track, index, conditions?.["vertical"] === true),
          );
          gsap.set(loops.current, { timeScale: 0 });
          ScrollTrigger.create({
            trigger: wall.current,
            start: "top bottom",
            end: "bottom top",
            onToggle: ({ isActive }) => {
              glide({ offscreen: !isActive });
            },
          });
          return () => {
            loops.current = [];
          };
        },
      );
    },
    { scope: wall },
  );

  return { wall, glide };
}

interface MarqueeWallProps {
  /* Name of the pause toggle, for screen readers. */
  pauseLabel: string;
  /* `MarqueeColumn` elements. */
  children: ReactNode;
  className?: string;
}

/* A wall of columns looping without a seam, in alternating directions, faded at its edges. It eases to a
   stop under the pointer, off screen and with its pause toggle (WCAG 2.2.2). Rows on phones. Under reduced
   motion every item stands still, once, in plain columns. */
export function MarqueeWall({ pauseLabel, children, className }: MarqueeWallProps) {
  const [paused, setPaused] = useState(false);
  const { wall, glide } = useWallLoop();

  return (
    <div data-slot="marquee-wall" className={cn("flex flex-col items-end gap-4", className)}>
      <div
        ref={wall}
        className="grid w-full grid-cols-1 gap-6 motion-reduce:gap-0 md:grid-cols-3 md:gap-6 md:motion-safe:h-svh md:motion-safe:mask-y-from-80%"
        onPointerEnter={() => {
          glide({ hover: true });
        }}
        onPointerLeave={() => {
          glide({ hover: false });
        }}
      >
        {children}
      </div>
      <Toggle
        pressed={paused}
        onPressedChange={(pressed) => {
          setPaused(pressed);
          glide({ user: pressed });
        }}
        aria-label={pauseLabel}
        className="inline-flex size-8 cursor-pointer items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground motion-reduce:hidden"
      >
        {paused ? (
          <Play aria-hidden="true" className="size-4" />
        ) : (
          <Pause aria-hidden="true" className="size-4" />
        )}
      </Toggle>
    </div>
  );
}
