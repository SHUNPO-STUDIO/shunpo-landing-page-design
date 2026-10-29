import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "../lib/cn.ts";

const kanjiVariants = cva("font-kanji font-medium", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-xl",
      lg: "text-4xl",
      xl: "text-7xl",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      watermark: "text-shiro",
      accent: "text-accent",
    },
  },
  defaultVariants: { size: "md", tone: "default" },
});

interface KanjiProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof kanjiVariants> {}

/* Japanese accent (brand guide): a short graphic word such as 見, 築, 進 or 瞬歩, never a paragraph. */
export function Kanji({ size, tone, className, ...props }: KanjiProps) {
  return (
    <span
      data-slot="kanji"
      lang="ja"
      className={cn(kanjiVariants({ size, tone }), className)}
      {...props}
    />
  );
}
