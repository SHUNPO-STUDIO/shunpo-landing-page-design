"use client";

import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { type ReactNode, useRef } from "react";

import { Container } from "../layout/container.tsx";
import { cn } from "../lib/cn.ts";

interface NavBarProps {
  label: string;
  brand: ReactNode;
  /* The call to action, shown from the `sm` breakpoint. */
  action: ReactNode;
  /* The small-screen menu (`MobileNav`), shown below the `lg` breakpoint. */
  menu: ReactNode;
  /* `NavBarLink` and `NavBarMenu` entries, shown from the `lg` breakpoint, centred in the bar. */
  children: ReactNode;
  className?: string;
}

/* The site's navigation bar: brand on the left, entries centred, call to action on the right.
   Menu panels open as one paper sheet spanning the bar's full width. Controls a breakpoint hides
   are hidden themselves, not only their wrapper, so no invisible target stays in the layout. */
export function NavBar({ label, brand, action, menu, children, className }: NavBarProps) {
  const bar = useRef<HTMLElement>(null);

  return (
    <NavigationMenu.Root ref={bar} aria-label={label} data-slot="nav-bar" className={cn(className)}>
      <Container className="flex h-16 items-center gap-6 lg:h-20">
        <div className="flex flex-1 items-center">{brand}</div>
        <NavigationMenu.List className="hidden self-stretch max-lg:**:hidden lg:flex lg:gap-6 xl:gap-8">
          {children}
        </NavigationMenu.List>
        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="contents max-sm:*:hidden">{action}</div>
          <div className="contents lg:*:hidden">{menu}</div>
        </div>
      </Container>
      <NavigationMenu.Portal>
        <NavigationMenu.Positioner
          anchor={bar}
          side="bottom"
          align="start"
          positionMethod="fixed"
          collisionPadding={0}
          collisionAvoidance={{ side: "none", align: "none" }}
          className="z-40 w-anchor"
        >
          <NavigationMenu.Popup className="border-b border-foreground/15 bg-background text-foreground scheme-light transition-opacity duration-200 corner-cut-bottom-lg data-ending-style:opacity-0 data-starting-style:opacity-0">
            <NavigationMenu.Viewport />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}
