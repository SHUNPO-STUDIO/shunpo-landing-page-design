import { cva, type VariantProps } from "class-variance-authority";
import type { SVGAttributes } from "react";

import { cn } from "../lib/cn.ts";

const shurikenVariants = cva("block shrink-0", {
  variants: {
    size: {
      sm: "size-4",
      md: "size-6",
      lg: "size-10",
      xl: "size-16",
    },
    tone: {
      seal: "fill-fushimi **:data-[part=star]:fill-kome",
      night: "fill-kome **:data-[part=star]:fill-fuji",
      line: "fill-none stroke-current **:data-[part=dot]:fill-current",
    },
  },
  defaultVariants: { size: "md", tone: "seal" },
});

interface ShurikenProps
  extends Omit<SVGAttributes<SVGSVGElement>, "children">, VariantProps<typeof shurikenVariants> {}

/* The SHUNPO shuriken: a four-point star with concave sides in a circle. Decorative: pair it with text. */
export function Shuriken({ size, tone, className, ...props }: ShurikenProps) {
  return (
    <svg
      data-slot="shuriken"
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={cn(shurikenVariants({ size, tone }), className)}
      {...props}
    >
      <circle cx="50" cy="50" r="48" strokeWidth="4" />
      <path
        data-part="star"
        d="M50 12 Q57 43 88 50 Q57 57 50 88 Q43 57 12 50 Q43 43 50 12 Z"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle data-part="dot" cx="50" cy="50" r="6" />
    </svg>
  );
}
