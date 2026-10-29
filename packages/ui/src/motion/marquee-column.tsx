import { Children, type ReactNode } from "react";

import { cn } from "../lib/cn.ts";

const listClassName = "flex shrink-0 flex-row md:flex-col motion-reduce:flex-col";

const itemClassName =
  "w-quote shrink-0 px-3 md:w-full md:px-0 md:py-3 motion-reduce:w-full motion-reduce:px-0 motion-reduce:py-3";

/* `Children.map` keys each item from its child's own key. */
function columnItems(children: ReactNode): ReactNode {
  return Children.map(children, (item) => <li className={itemClassName}>{item}</li>);
}

interface MarqueeColumnProps {
  /* One keyed element per item, e.g. a testimonial card. */
  children: ReactNode;
}

/* One column of a `MarqueeWall`: its items twice in a row (the copy hidden from assistive technology),
   so the wall can loop them without a seam. A horizontal row on phones. A plain list under reduced motion. */
export function MarqueeColumn({ children }: MarqueeColumnProps) {
  const items = columnItems(children);
  return (
    <div
      data-slot="marquee-column"
      className="overflow-clip motion-reduce:overflow-visible max-md:motion-safe:mask-x-from-85%"
    >
      <div
        data-marquee-track=""
        className="flex w-max flex-row motion-reduce:w-full motion-reduce:flex-col md:w-full md:flex-col"
      >
        <ul className={listClassName}>{items}</ul>
        <ul aria-hidden="true" inert className={cn(listClassName, "motion-reduce:hidden")}>
          {items}
        </ul>
      </div>
    </div>
  );
}
