"use client";

import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "../lib/cn.ts";
import { navItemClassName } from "./nav-bar-link.tsx";

interface NavBarMenuProps {
  label: string;
  children: ReactNode;
  className?: string;
}

/* A navigation bar entry that opens a full-width panel (usually a `NavPanel`) under the bar,
   on hover or click; arrow keys, Escape and focus return are handled by Base UI. Place inside `NavBar`. */
export function NavBarMenu({ label, children, className }: NavBarMenuProps) {
  return (
    <NavigationMenu.Item data-slot="nav-bar-menu" className={cn("flex", className)}>
      <NavigationMenu.Trigger className={navItemClassName}>
        {label}
        <NavigationMenu.Icon className="flex transition-transform duration-300 ease-standard data-popup-open:rotate-180">
          <ChevronDown aria-hidden="true" className="size-4" />
        </NavigationMenu.Icon>
      </NavigationMenu.Trigger>
      <NavigationMenu.Content className="transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0">
        {children}
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}
