import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../lib/cn.ts";

type SplitElement = "div" | "section";

interface SplitProps extends HTMLAttributes<HTMLElement> {
  /* The narrow column: a title and its note. */
  aside: ReactNode;
  as?: SplitElement;
}

/* Two columns from desktops: two fifths for the aside, three fifths for the content. Stacked below. */
export function Split({ aside, as: Element = "div", className, children, ...props }: SplitProps) {
  return (
    <Element
      data-slot="split"
      className={cn("grid grid-cols-1 items-start gap-12 lg:grid-cols-5 lg:gap-20", className)}
      {...props}
    >
      <div className="lg:col-span-2">{aside}</div>
      <div className="lg:col-span-3">{children}</div>
    </Element>
  );
}
