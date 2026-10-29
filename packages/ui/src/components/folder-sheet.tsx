import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../lib/cn.ts";
import { Kanji } from "../typography/kanji.tsx";

const layoutVariants = cva("relative grid gap-8", {
  variants: {
    layout: {
      split: "md:grid-cols-2 md:gap-12",
      feature: "lg:grid-cols-5 lg:gap-10 lg:*:first:col-span-2 lg:*:last:col-span-3",
    },
  },
  defaultVariants: { layout: "split" },
});

const watermarkVariants = cva(
  "pointer-events-none absolute -bottom-12 text-7xl leading-none text-shiro/60 select-none",
  {
    variants: {
      layout: {
        split: "right-8",
        feature: "left-8",
      },
    },
    defaultVariants: { layout: "split" },
  },
);

const sheetVariants = cva(
  "relative overflow-hidden bg-washi washi-fibre text-foreground scheme-light corner-cut staged:absolute staged:inset-x-0 staged:top-0 staged:z-20 staged:mx-auto staged:w-full staged:max-w-sheet staged:origin-top",
  {
    variants: {
      layout: {
        split: "p-6 md:p-12",
        feature: "p-6 md:p-10",
      },
    },
    defaultVariants: { layout: "split" },
  },
);

interface FolderSheetProps
  extends HTMLAttributes<HTMLElement>, VariantProps<typeof layoutVariants> {
  /* The folder's kanji, printed as a faint watermark in a corner of the sheet. */
  kanji: string;
  /* Two columns: `split` gives them equal room, `feature` gives the second one (a figure) the larger share. */
  children: ReactNode;
}

/* A sheet of washi paper with a cut corner, filed in a `Folder`. */
export function FolderSheet({ kanji, layout, className, children, ...props }: FolderSheetProps) {
  return (
    <article
      data-slot="folder-sheet"
      className={cn(sheetVariants({ layout }), className)}
      {...props}
    >
      <Kanji aria-hidden="true" className={watermarkVariants({ layout })}>
        {kanji}
      </Kanji>
      <div className={layoutVariants({ layout })}>{children}</div>
    </article>
  );
}
