import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "../lib/cn.ts";

const sectionVariants = cva("text-foreground", {
  variants: {
    spacing: {
      xs: "py-4",
      sm: "py-12 md:py-16",
      md: "py-16 md:py-24",
      lg: "py-24 md:py-32",
      xl: "py-32 md:py-48",
    },
    tone: {
      default: "",
      muted: "bg-muted",
      surface: "bg-surface",
    },
    scheme: {
      inherit: "",
      light: "bg-background scheme-light",
      dark: "bg-background scheme-dark",
    },
  },
  defaultVariants: { spacing: "md", tone: "default", scheme: "inherit" },
});

type SectionElement = "section" | "header" | "footer" | "aside";
type SectionVariants = VariantProps<typeof sectionVariants>;

/* The colour scheme a section shows, whatever the page's: only islands set it. */
function shownScheme({ scheme }: SectionVariants): "light" | "dark" | undefined {
  return scheme === "light" || scheme === "dark" ? scheme : undefined;
}

interface SectionProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof sectionVariants> {
  as?: SectionElement;
}

export function Section({
  as: Element = "section",
  spacing,
  tone,
  scheme,
  className,
  ...props
}: SectionProps) {
  return (
    <Element
      data-slot="section"
      data-scheme={shownScheme({ scheme })}
      className={cn(sectionVariants({ spacing, tone, scheme }), className)}
      {...props}
    />
  );
}
