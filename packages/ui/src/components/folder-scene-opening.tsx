import type { HTMLAttributes } from "react";

import { cn } from "../lib/cn.ts";

/* The title and introduction of a `FolderScene`. On stage it fills the space above the folders,
   where it opens the scene before the first sheet rises over it. */
export function FolderSceneOpening({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="folder-scene-opening"
      className={cn(
        "flex flex-col items-center gap-6 text-center staged:flex-1 staged:justify-center staged:py-4",
        className,
      )}
      {...props}
    />
  );
}
