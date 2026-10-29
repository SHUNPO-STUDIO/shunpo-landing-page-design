import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "../lib/cn.ts";

const ratingVariants = cva(
  "flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground",
  {
    variants: {
      align: {
        start: "justify-start",
        center: "justify-center",
      },
    },
    defaultVariants: { align: "center" },
  },
);

interface RatingProps
  extends HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof ratingVariants> {
  /* The score, e.g. 4.6: that many stars are filled, the last one in part. */
  value: number;
  /* The scale: how many stars are drawn. */
  stars?: number;
  /* Read instead of the stars, e.g. « Note de 4,6 sur 5 ». */
  starsLabel: string;
}

function filledShare(value: number, stars: number): string {
  return `${Math.min(1, Math.max(0, value / stars)) * 100}%`;
}

/* A review score in words followed by its stars in seal ink, e.g. « 4,6/5 sur Trustpilot ★★★★★ »:
   the stars are filled up to the score over faint ones. */
export function Rating({
  value,
  stars = 5,
  starsLabel,
  align,
  className,
  children,
  ...props
}: RatingProps) {
  const row = "★".repeat(stars);
  return (
    <p data-slot="rating" className={cn(ratingVariants({ align }), className)} {...props}>
      <span>{children}</span>
      <span aria-hidden="true" className="relative tracking-wide text-accent">
        <span data-rating-stars className="opacity-40">
          {row}
        </span>
        <span
          data-rating-fill
          className="absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap"
          style={{ width: filledShare(value, stars) }}
        >
          {row}
        </span>
      </span>
      <span className="sr-only">{starsLabel}</span>
    </p>
  );
}
