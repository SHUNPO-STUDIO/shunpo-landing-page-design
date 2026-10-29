"use client";

import { cva } from "class-variance-authority";
import { useRef, useState } from "react";

import { cn } from "../lib/cn.ts";
import { type Scheme, schemeBeneath } from "../lib/scheme-beneath.ts";
import { currentSectionIndex } from "../lib/scroll-spy.ts";
import { useScrollFrame } from "../lib/use-scroll-frame.ts";

const railVariants = cva(
  "fixed top-1/2 left-6 z-30 hidden -translate-y-1/2 transition-opacity duration-200 xl:block",
  {
    variants: {
      shown: { true: "opacity-100", false: "invisible opacity-0" },
    },
  },
);

const itemVariants = cva("", {
  variants: {
    scheme: { light: "scheme-light", dark: "scheme-dark" },
  },
});

interface SectionRailItem {
  /* The anchor of the section, `#id`. */
  href: string;
  /* The section's name, read by screen readers after its number. */
  label: string;
}

interface SectionRailProps {
  label: string;
  items: SectionRailItem[];
  className?: string;
}

function sectionTop(href: string): number {
  return document.querySelector(href)?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
}

/* Each number reads the section under itself, so a rail straddling paper and night stays legible. */
function schemesUnder(rail: HTMLElement): Scheme[] {
  return [...rail.querySelectorAll("a")].map((link) => {
    const box = link.getBoundingClientRect();
    return schemeBeneath(box.left + box.width / 2, box.top + box.height / 2, rail);
  });
}

/* The page's table of contents on the left edge (01, 02…), from the `xl` breakpoint so it never
   meets centred content. It marks the section being read, each number takes the colours of the
   section beneath it, and the rail stays out of sight until the first listed section reaches the
   middle of the screen. */
export function SectionRail({ label, items, className }: SectionRailProps) {
  const rail = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(-1);
  const [schemes, setSchemes] = useState<Scheme[]>([]);

  useScrollFrame(() => {
    const element = rail.current;
    if (element === null) {
      return;
    }
    const next = schemesUnder(element);
    setCurrent(
      currentSectionIndex(
        items.map((item) => sectionTop(item.href)),
        window.innerHeight / 2,
      ),
    );
    setSchemes((previous) => (previous.join() === next.join() ? previous : next));
  });

  return (
    <nav
      ref={rail}
      aria-label={label}
      data-slot="section-rail"
      className={cn(railVariants({ shown: current >= 0 }), className)}
    >
      <ol className="flex flex-col gap-2">
        {items.map((item, index) => (
          <li key={item.href} className={itemVariants({ scheme: schemes[index] ?? "light" })}>
            <a
              href={item.href}
              aria-current={index === current ? "location" : undefined}
              className="group/rail flex min-h-6 items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground aria-[current=location]:text-foreground"
            >
              <span
                aria-hidden="true"
                className="h-px w-2 bg-current opacity-0 transition-opacity group-aria-[current=location]/rail:opacity-100"
              />
              {String(index + 1).padStart(2, "0")}
              <span className="sr-only">{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
