import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "../lib/cn.ts";
import { Shuriken } from "./shuriken.tsx";

const stampVariants = cva(
  "inline-flex -rotate-3 items-center gap-2 rounded-sm border-2 border-current ink-texture font-semibold tracking-wide whitespace-nowrap uppercase",
  {
    variants: {
      tone: {
        seal: "text-fushimi",
        ink: "text-fuji",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: { tone: "seal", size: "md" },
  },
);

interface StampProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof stampVariants> {}

/* A hanko impression: the shuriken seal and one word, printed in seal ink on paper only (never on Fuji Night or Blue Tenku). */
export function Stamp({ tone, size, className, children, ...props }: StampProps) {
  return (
    <span data-slot="stamp" className={cn(stampVariants({ tone, size }), className)} {...props}>
      <Shuriken size="sm" tone="line" />
      {children}
    </span>
  );
}
