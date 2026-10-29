import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "../lib/cn.ts";

const cardVariants = cva("flex flex-col rounded-sm text-foreground", {
  variants: {
    variant: {
      surface: "bg-surface shadow-sm",
      muted: "bg-muted",
      outline: "border border-border",
    },
    corner: {
      none: "",
      cut: "corner-cut",
    },
    padding: {
      md: "gap-4 p-6",
      lg: "gap-6 p-8 md:p-10",
    },
  },
  defaultVariants: { variant: "surface", padding: "md", corner: "none" },
});

type CardElement = "div" | "article" | "li";

interface CardProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof cardVariants> {
  as?: CardElement;
}

export function Card({
  as: Element = "div",
  variant,
  padding,
  corner,
  className,
  ...props
}: CardProps) {
  return (
    <Element
      data-slot="card"
      className={cn(cardVariants({ variant, padding, corner }), className)}
      {...props}
    />
  );
}
