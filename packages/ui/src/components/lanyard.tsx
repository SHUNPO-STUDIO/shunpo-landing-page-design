import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "../lib/cn.ts";
import { Swing } from "../motion/swing.tsx";

const lanyardVariants = cva("flex origin-top flex-col items-center gap-2", {
  variants: {
    tilt: {
      none: "",
      left: "-rotate-1 md:-rotate-2",
      right: "rotate-1 md:rotate-2",
      slight: "-rotate-1",
    },
  },
  defaultVariants: { tilt: "none" },
});

type LanyardElement = "div" | "li";

interface LanyardProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof lanyardVariants> {
  as?: LanyardElement;
  /* Position in its row: neighbours drop in one after another, from opposite sides. */
  order?: number;
}

/* A Fuji Night strap and its metal clip, from which the child hangs at a slight tilt. One of up to three
   per row in a centred, wrapping rack (`Inline justify="center" gap="none"`): stacked on phones, two per
   row on tablets, three on desktops. */
export function Lanyard({
  as: Element = "div",
  tilt,
  order = 0,
  className,
  children,
  ...props
}: LanyardProps) {
  return (
    <Element
      data-slot="lanyard"
      className={cn("w-full p-3 md:w-1/2 md:p-6 lg:w-1/3", className)}
      {...props}
    >
      <Swing order={order}>
        <div className={lanyardVariants({ tilt })}>
          <span aria-hidden="true" className="relative z-10 flex">
            <span className="h-24 w-5 lanyard-strap md:h-32" />
            <span className="absolute -bottom-4 left-1/2 h-4 w-8 -translate-x-1/2 rounded-md bg-linear-to-b from-kome to-hikari shadow-xs" />
          </span>
          {children}
        </div>
      </Swing>
    </Element>
  );
}
