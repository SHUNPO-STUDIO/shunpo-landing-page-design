"use client";

import { useGSAP } from "@gsap/react";
import { cva } from "class-variance-authority";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { type ReactElement, useRef } from "react";

import { mounted } from "../lib/mounted.ts";
import { duration, ease, stagger } from "./tokens.ts";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const ALLOW_MOTION = "(prefers-reduced-motion: no-preference)";

/* A part waits this far below its line, out of sight under the mask, and the mask lets accents and
   descenders through: Piazzolla's glyphs overflow a line height of 1. */
const BELOW_LINE_PERCENT = 140;
const MASK_REACH = "inset(-0.25em -0.1em -0.3em)";

type RevealPart = "lines" | "words";
type RevealCue = "load" | "enter";

/* On load, the text stays hidden until it is split, so the server-rendered heading never flashes before rising. */
const revealVariants = cva("", {
  variants: {
    play: {
      load: "motion-safe:invisible motion-safe:data-split:visible",
      enter: "",
    },
  },
});

function cueOf(root: HTMLElement, play: RevealCue): gsap.TweenVars {
  if (play === "load") {
    return { delay: duration.fast };
  }
  return {
    scrollTrigger: { trigger: root.closest("section") ?? root, start: "top 60%", once: true },
  };
}

interface Reveal {
  onSplit: (split: SplitText) => void;
  stop: () => void;
}

/* Splitting again (resize, late font) replaces the rise and keeps its progress. */
function revealOf(root: HTMLElement, by: RevealPart, play: RevealCue): Reveal {
  let rise: gsap.core.Tween | undefined;
  function onSplit(split: SplitText): void {
    const progress = rise?.progress() ?? 0;
    rise?.kill();
    gsap.set(split.masks, { overflow: "visible", clipPath: MASK_REACH });
    for (const line of split.lines) {
      line.toggleAttribute("data-reveal-line", true);
    }
    rise = gsap.from(by === "words" ? split.words : split.lines, {
      yPercent: BELOW_LINE_PERCENT,
      duration: duration.slow,
      ease: ease.emphasized,
      stagger: by === "words" ? stagger.base : stagger.loose,
      ...cueOf(root, play),
    });
    rise.progress(progress);
    root.toggleAttribute("data-split", true);
  }
  function stop(): void {
    rise?.kill();
  }
  return { onSplit, stop };
}

interface TextRevealProps {
  /* One heading or paragraph. */
  children: ReactElement;
  by?: RevealPart;
  /* On page load, or once its section is well into the screen. */
  play?: RevealCue;
}

/* Splits its text into masked lines (or words) that rise into place. The lines carry
   `data-reveal-line`, so a scene can send them out the same way. Reduced motion: plain text. */
export function TextReveal({ children, by = "lines", play = "enter" }: TextRevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(ALLOW_MOTION, () => {
        const box = mounted(root);
        const reveal = revealOf(box, by, play);
        SplitText.create(box.firstElementChild ?? box, {
          type: by === "words" ? "lines,words" : "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: reveal.onSplit,
        });
        return reveal.stop;
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} data-slot="text-reveal" className={revealVariants({ play })}>
      {children}
    </div>
  );
}
