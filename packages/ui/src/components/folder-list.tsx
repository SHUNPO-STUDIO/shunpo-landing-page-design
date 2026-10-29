import type { OlHTMLAttributes } from "react";

import { cn } from "../lib/cn.ts";

/* The folders of a `FolderScene`, in order: stacked with their sheets, or a row of three on stage. */
export function FolderList({ className, ...props }: OlHTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      data-slot="folder-list"
      className={cn(
        "flex flex-col gap-12 staged:grid staged:grid-cols-3 staged:gap-8 staged:xl:gap-12",
        className,
      )}
      {...props}
    />
  );
}
