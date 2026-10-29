"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type HTMLAttributes, useRef } from "react";

import { cn } from "../lib/cn.ts";
import { entranceSide, pushDirection } from "./swing-physics.ts";
import { duration, ease, stagger } from "./tokens.ts";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ALLOW_MOTION = "(prefers-reduced-motion: no-preference)";

/* Degrees: the drop-in kick and the push of a passing pointer. Narrow screens swing less so nothing leaves the page. */
const amplitude = {
  wide: { kick: 10, push: 3.6 },
  narrow: { kick: 3, push: 1.5 },
} as const;

/* A damped pendulum: a long elastic settle, slower after the drop than after a push. */
const settle = {
  drop: { duration: 2.6, ease: "elastic.out(1, 0.26)" },
  push: { duration: 1.8, ease: "elastic.out(1, 0.3)" },
} as const;

type Amplitude = (typeof amplitude)[keyof typeof amplitude];

function hide(element: HTMLElement, kick: number): void {
  gsap.set(element, { rotation: kick, yPercent: -6, opacity: 0 });
}

function dropIn(element: HTMLElement, order: number): void {
  const delay = order * stagger.loose;
  gsap.to(element, {
    opacity: 1,
    yPercent: 0,
    duration: duration.slow,
    ease: ease.standard,
    delay,
  });
  gsap.to(element, { rotation: 0, delay, ...settle.drop });
}

function sway(element: HTMLElement, push: number, event: PointerEvent): void {
  if (gsap.isTweening(element)) {
    return;
  }
  const rotation = push * pushDirection(event.clientX, element.getBoundingClientRect());
  gsap.fromTo(element, { rotation }, { rotation: 0, ...settle.push });
}

interface Hanging {
  element: HTMLElement;
  order: number;
  amplitude: Amplitude;
}

/* Late tweens (on enter, on push) join the media query's context, so they revert with it. */
function hang(
  { element, order, amplitude: { kick, push } }: Hanging,
  context: gsap.Context,
): () => void {
  hide(element, kick * entranceSide(order));
  ScrollTrigger.create({
    trigger: element,
    start: "top 85%",
    once: true,
    onEnter: () => {
      context.add(() => {
        dropIn(element, order);
      });
    },
  });
  function onPointerEnter(event: PointerEvent): void {
    context.add(() => {
      sway(element, push, event);
    });
  }
  element.addEventListener("pointerenter", onPointerEnter);
  return () => {
    element.removeEventListener("pointerenter", onPointerEnter);
  };
}

interface SwingProps extends HTMLAttributes<HTMLDivElement> {
  /* Position in its row: neighbours drop in one after another, from opposite sides. */
  order?: number;
}

/* Hangs its content from the top centre. It drops in with a damped swing when it scrolls into view and
   sways when a pointer brushes it. Still under reduced motion. */
export function Swing({ order = 0, className, ...props }: SwingProps) {
  const item = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = item.current;
      if (element === null) {
        return;
      }
      gsap.matchMedia().add(
        {
          wide: `(min-width: 64rem) and ${ALLOW_MOTION}`,
          narrow: `(max-width: 63.98rem) and ${ALLOW_MOTION}`,
        },
        (context) =>
          hang(
            {
              element,
              order,
              amplitude: context.conditions?.["wide"] === true ? amplitude.wide : amplitude.narrow,
            },
            context,
          ),
      );
    },
    { scope: item },
  );

  return <div ref={item} data-slot="swing" className={cn("origin-top", className)} {...props} />;
}
