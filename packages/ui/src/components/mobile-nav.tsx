"use client";

import { Dialog } from "@base-ui/react/dialog";
import { ArrowRight, Menu, X } from "lucide-react";
import { type MouseEvent, type ReactNode, useState } from "react";

import { Container } from "../layout/container.tsx";
import { cn } from "../lib/cn.ts";

interface MobileNavLink {
  label: string;
  href: string;
}

interface MobileNavProps {
  /* The dialog's accessible title, also used to name its trigger. */
  label: string;
  openLabel: string;
  closeLabel: string;
  brand: ReactNode;
  action: ReactNode;
  links: MobileNavLink[];
  className?: string;
}

const iconButtonClassName =
  "inline-flex size-10 cursor-pointer items-center justify-center rounded-sm text-foreground transition-colors hover:bg-foreground/5";

/* The small-screen menu: a full-screen paper sheet with the page's destinations and the call to action.
   Following any link inside closes it, so the page scrolls to the anchor. */
export function MobileNav({
  label,
  openLabel,
  closeLabel,
  brand,
  action,
  links,
  className,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);

  function closeOnLink(event: MouseEvent<HTMLDivElement>): void {
    if (event.target instanceof Element && event.target.closest("a") !== null) {
      setOpen(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label={openLabel}
        data-slot="mobile-nav"
        className={cn(iconButtonClassName, className)}
      >
        <Menu aria-hidden="true" className="size-6" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Popup
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background text-foreground scheme-light transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0"
          onClick={closeOnLink}
        >
          <Dialog.Title className="sr-only">{label}</Dialog.Title>
          <Container className="flex h-16 shrink-0 items-center justify-between gap-6 border-b border-border">
            {brand}
            <Dialog.Close aria-label={closeLabel} className={iconButtonClassName}>
              <X aria-hidden="true" className="size-6" />
            </Dialog.Close>
          </Container>
          <Container as="nav" aria-label={label} className="flex flex-1 flex-col gap-10 py-8">
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.href} className="border-b border-border">
                  <a
                    href={link.href}
                    className="flex items-center justify-between gap-4 py-4 font-display text-3xl tracking-tight"
                  >
                    {link.label}
                    <ArrowRight aria-hidden="true" className="size-5 text-muted-foreground" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex">{action}</div>
          </Container>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
