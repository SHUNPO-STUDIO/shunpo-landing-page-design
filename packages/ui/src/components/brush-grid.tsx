import { type HTMLAttributes, type ReactNode, useId } from "react";

import { inkImage } from "../lib/brush-ink.ts";
import type { Point } from "../lib/brush-path.ts";
import { paintBrushStroke } from "../lib/brush-stroke.ts";
import { cn } from "../lib/cn.ts";
import { BrushGridBrick, type BrushGridCell } from "./brush-grid-brick.tsx";

const VIEW = { width: 640, height: 460 };
const BRUSH_WIDTH = 13;
const REVEAL_MARGIN = 0.1;

/* Six strokes in painting order: left post, top beam, middle post, middle beam, right post, bottom beam. */
const LINES: ReadonlyArray<readonly Point[]> = [
  [
    [69.5, 18],
    [75.7, 230],
    [70.1, 444],
  ],
  [
    [18, 36.5],
    [320, 25.6],
    [624, 33.2],
  ],
  [
    [320, 14],
    [316.3, 230],
    [322.1, 446],
  ],
  [
    [22, 227.8],
    [320, 228.9],
    [620, 232.8],
  ],
  [
    [568.4, 20],
    [567.5, 230],
    [569.4, 440],
  ],
  [
    [16, 429.4],
    [320, 426],
    [626, 427.8],
  ],
];

const CELLS: readonly BrushGridCell[] = [
  { x: 96, y: 58, width: 198, height: 150 },
  { x: 346, y: 58, width: 198, height: 150 },
  { x: 96, y: 256, width: 198, height: 150 },
  { x: 346, y: 256, width: 198, height: 150 },
];

const STROKES = LINES.map((points, index) =>
  paintBrushStroke({ points, width: BRUSH_WIDTH, seed: 300 + index }),
);

/* One ink image per stroke, so painting a post never uncovers the beams it crosses. */
const INKS = STROKES.map((stroke) => inkImage([stroke], VIEW));

export interface BrushGridBrickContent {
  kicker: ReactNode;
  label: ReactNode;
}

interface BrushGridProps extends HTMLAttributes<HTMLElement> {
  /* Up to four bricks, filled left to right and top to bottom. */
  bricks: readonly BrushGridBrickContent[];
  /* The word stamped on each brick once delivered. */
  stamp: ReactNode;
  caption: ReactNode;
}

const MASK_BOX = {
  x: -VIEW.width * REVEAL_MARGIN,
  y: -VIEW.height * REVEAL_MARGIN,
  width: VIEW.width * (1 + 2 * REVEAL_MARGIN),
  height: VIEW.height * (1 + 2 * REVEAL_MARGIN),
};

/* The six strokes: each stroke's ink shows where its centre line has been drawn (`data-reveal="paint"`). */
function BrushStrokes({ id }: { id: string }) {
  return (
    <svg
      viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
      aria-hidden="true"
      focusable="false"
      className="absolute inset-0 size-full overflow-visible"
    >
      <defs>
        {STROKES.map((stroke, index) => (
          <mask
            key={stroke.centre}
            id={`${id}-reveal-${index}`}
            maskUnits="userSpaceOnUse"
            {...MASK_BOX}
          >
            <path
              data-reveal="paint"
              d={stroke.centre}
              fill="none"
              stroke="white"
              strokeWidth={stroke.revealWidth}
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray="1 1"
              strokeDashoffset={0}
            />
          </mask>
        ))}
        <mask id={`${id}-ink`} maskUnits="userSpaceOnUse" {...MASK_BOX}>
          {INKS.map((ink, index) => (
            <image
              key={ink}
              href={ink}
              width={VIEW.width}
              height={VIEW.height}
              mask={`url(#${id}-reveal-${index})`}
            />
          ))}
        </mask>
      </defs>
      <rect {...MASK_BOX} className="fill-fuji" mask={`url(#${id}-ink)`} />
    </svg>
  );
}

/* A system built brick by brick: a grid painted with six sumi brush strokes, then four bricks washed in
   and stamped. Still, it shows the finished grid; inside a running `FolderScene` it paints itself
   (`data-reveal`: the strokes, then each brick and its stamp). */
export function BrushGrid({ bricks, stamp, caption, className, ...props }: BrushGridProps) {
  const id = useId().replaceAll(/[^\w-]/gu, "");
  return (
    <figure data-slot="brush-grid" className={cn("flex flex-col gap-2", className)} {...props}>
      <div className="relative aspect-32/23 w-full">
        <BrushStrokes id={id} />
        {CELLS.slice(0, bricks.length).map((cell, index) => (
          <BrushGridBrick
            key={`${cell.x}-${cell.y}`}
            cell={cell}
            view={VIEW}
            kicker={bricks[index]?.kicker}
            label={bricks[index]?.label}
            stamp={stamp}
          />
        ))}
      </div>
      <figcaption className="self-end text-xs text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}
