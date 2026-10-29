import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../lib/cn.ts";
import { RollingNumber } from "./rolling-number.tsx";

interface ReadoutProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  label: ReactNode;
  hint: ReactNode;
  /* Hidden until there is a figure to show. */
  value: number | undefined;
  unit: ReactNode;
  /* Read out politely to screen readers each time it changes. */
  announcement: string;
}

/* A live result row under a hairline: what the figure is and a hint on one side,
   the figure rolling on soroban rods on the other. */
export function Readout({
  label,
  hint,
  value,
  unit,
  announcement,
  className,
  ...props
}: ReadoutProps) {
  return (
    <div
      data-slot="readout"
      className={cn(
        "relative flex flex-col gap-3 border-t border-border py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-1">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{hint}</p>
      </div>
      <p className={cn("flex shrink-0 items-baseline gap-2", value === undefined && "invisible")}>
        <RollingNumber
          value={value ?? 0}
          className="font-display text-4xl font-medium lg:text-3xl"
        />
        <span className="text-sm font-medium text-muted-foreground">{unit}</span>
      </p>
      <output className="sr-only">{announcement}</output>
    </div>
  );
}
