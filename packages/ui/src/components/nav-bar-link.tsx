"use client";

import { NavigationMenu } from "@base-ui/react/navigation-menu";

import { cn } from "../lib/cn.ts";

/* Top-level entries fill the bar's height so their underline sits on the bar's bottom hairline. */
export const navItemClassName =
  "relative flex cursor-pointer items-center gap-1 text-sm font-medium whitespace-nowrap text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-standard hover:after:scale-x-100 data-popup-open:after:scale-x-100";

interface NavBarLinkProps extends NavigationMenu.Link.Props {
  className?: string;
}

/* A plain link in the navigation bar. Place inside `NavBar`. */
export function NavBarLink({ className, ...props }: NavBarLinkProps) {
  return (
    <NavigationMenu.Item className="flex">
      <NavigationMenu.Link
        data-slot="nav-bar-link"
        className={cn(navItemClassName, className)}
        {...props}
      />
    </NavigationMenu.Item>
  );
}
