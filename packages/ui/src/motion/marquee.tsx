"use client";

import { Toggle } from "@base-ui/react/toggle";
import { Pause, Play } from "lucide-react";
import { Children, isValidElement, type ReactNode, useState } from "react";

import { cn } from "../lib/cn.ts";
import { useDriftLoop } from "./use-drift-loop.ts";

/* Side padding is half the gap, so the seam between the two copies looks like any other gap. */
const listClassName =
  "flex shrink-0 items-center gap-x-10 gap-y-6 px-5 sm:gap-x-16 sm:px-8 motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center";

/* `Children.toArray` gives every element a stable key, reused for its list item. */
function bandItems(children: ReactNode): ReactNode[] {
  return Children.toArray(children)
    .filter((item) => isValidElement(item))
    .map((item) => (
      <li key={item.key} className="flex shrink-0 items-center">
        {item}
      </li>
    ));
}

interface MarqueeProps {
  /* Name of the pause toggle, for screen readers. */
  pauseLabel: string;
  /* One element per item, e.g. a logo image. */
  children: ReactNode;
  className?: string;
}

/* A band of items drifting slowly to the left, looping without a seam. It eases to a stop under the
   pointer and has a pause toggle (WCAG 2.2.2). Under reduced motion it is a still, centred, wrapped row. */
export function Marquee({ pauseLabel, children, className }: MarqueeProps) {
  const { root, track, glide } = useDriftLoop();
  const [paused, setPaused] = useState(false);
  const items = bandItems(children);

  return (
    <div ref={root} data-slot="marquee" className={cn("flex flex-col items-end gap-4", className)}>
      <div
        className="w-full overflow-clip motion-safe:mask-x-from-85%"
        onPointerEnter={() => {
          glide(false);
        }}
        onPointerLeave={() => {
          glide(!paused);
        }}
      >
        <div ref={track} className="flex w-max motion-reduce:w-full">
          <ul className={listClassName}>{items}</ul>
          <ul aria-hidden="true" className={cn(listClassName, "motion-reduce:hidden")}>
            {items}
          </ul>
        </div>
      </div>
      <Toggle
        pressed={paused}
        onPressedChange={(pressed) => {
          setPaused(pressed);
          glide(!pressed);
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
