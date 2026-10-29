import type { HTMLAttributes } from "react";

import { cn } from "../lib/cn.ts";

/* A list ruled with hairlines, each item led by an ink dot: what a sheet delivers. Items are plain `li`. */
export function RuledList({ className, ...props }: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      data-slot="ruled-list"
      className={cn(
        "flex flex-col border-t border-foreground/15 *:flex *:items-center *:gap-3 *:border-b *:border-foreground/15 *:py-3 *:text-md *:font-medium *:before:size-2 *:before:shrink-0 *:before:rounded-full *:before:bg-foreground",
        className,
      )}
      {...props}
    />
  );
}
