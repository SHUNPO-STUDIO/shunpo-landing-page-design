import type { HTMLAttributes, ReactElement, ReactNode } from "react";

import { cn } from "../lib/cn.ts";

interface PaperPlateProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /* `<Image src={…} alt="…" sizes="…" />` from next/image (ADR-0022). */
  image: ReactElement;
  number: string;
  caption: string;
  /* A `Stamp` printed on the plate's paper margin. */
  stamp?: ReactNode;
}

/* A photographic print on white paper: the picture, then its number and title in the margin,
   where a hanko can approve it. */
export function PaperPlate({
  image,
  number,
  caption,
  stamp,
  className,
  ...props
}: PaperPlateProps) {
  return (
    <figure
      data-slot="paper-plate"
      className={cn("flex flex-col bg-surface p-3 shadow-md", className)}
      {...props}
    >
      <div className="overflow-clip bg-muted-foreground [&_img]:block [&_img]:h-auto [&_img]:w-full">
        {image}
      </div>
      <figcaption className="flex min-h-12 items-center justify-between gap-2 text-sm">
        <span className="flex gap-2 font-medium">
          <span className="text-muted-foreground tabular-nums">{number}</span>
          {caption}
        </span>
        {stamp}
      </figcaption>
    </figure>
  );
}
