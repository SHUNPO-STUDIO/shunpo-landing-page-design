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
  /* Accessible name of the stars, e.g. « 5 étoiles sur 5 ». */
  starsLabel: string;
  stars?: number;
}

/* A review score in words followed by its stars in seal ink, e.g. « 4,6/5 sur Trustpilot ★★★★★ ». */
export function Rating({
  starsLabel,
  stars = 5,
  align,
  className,
  children,
  ...props
}: RatingProps) {
  return (
    <p data-slot="rating" className={cn(ratingVariants({ align }), className)} {...props}>
      <span>{children}</span>
      <span aria-hidden="true" className="tracking-wide text-accent">
        {"★".repeat(stars)}
      </span>
      <span className="sr-only">{starsLabel}</span>
    </p>
  );
}
