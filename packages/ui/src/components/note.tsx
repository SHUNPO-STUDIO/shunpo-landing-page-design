import type { HTMLAttributes } from "react";

import { cn } from "../lib/cn.ts";

/* A quiet Kome box for a condition beside the main text, such as a price and what it covers. */
export function Note({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="note"
      className={cn("bg-kome p-4 text-sm text-foreground", className)}
      {...props}
    />
  );
}
