import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../lib/cn.ts";
import { Stamp } from "./stamp.tsx";

/* A cell of the brush grid, in the grid's viewBox units. */
export interface BrushGridCell {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface BrushGridBrickProps extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
  cell: BrushGridCell;
  /* The grid's viewBox, to place the cell as a share of the figure. */
  view: { width: number; height: number };
  kicker: ReactNode;
  label: ReactNode;
  stamp: ReactNode;
}

function share(value: number, total: number): string {
  return `${(value / total) * 100}%`;
}

/* One brick of the brush grid: a watercolour wash, its name and the stamp printed once it is delivered.
   `data-reveal` marks what a `FolderScene` fills and stamps while its sheet is open. */
export function BrushGridBrick({
  cell,
  view,
  kicker,
  label,
  stamp,
  className,
  ...props
}: BrushGridBrickProps) {
  return (
    <div
      data-slot="brush-grid-brick"
      data-reveal="fill"
      className={cn(
        "absolute flex flex-col gap-0.5 p-2 text-xs text-fuji sm:p-3 sm:text-md",
        className,
      )}
      style={{
        left: share(cell.x, view.width),
        top: share(cell.y, view.height),
        width: share(cell.width, view.width),
        height: share(cell.height, view.height),
      }}
      {...props}
    >
      <span aria-hidden="true" className="absolute inset-0 bg-hikari/60 wash-edge" />
      <span className="relative hidden text-xs font-medium text-ink-shadow sm:block">{kicker}</span>
      <span className="relative font-medium">{label}</span>
      <Stamp
        size="sm"
        data-reveal="stamp"
        className="absolute -right-1 -bottom-2 sm:right-2 sm:bottom-2"
      >
        <span className="max-sm:sr-only">{stamp}</span>
      </Stamp>
    </div>
  );
}
