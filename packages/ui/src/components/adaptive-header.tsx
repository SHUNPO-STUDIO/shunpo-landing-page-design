"use client";

import { cva } from "class-variance-authority";
import { type HTMLAttributes, useEffect, useEffectEvent, useRef, useState } from "react";

import { cn } from "../lib/cn.ts";
import { type Scheme, schemeBeneath } from "../lib/scheme-beneath.ts";
import { hiddenAfterScroll } from "../lib/scroll-reveal.ts";
import { useScrollFrame } from "../lib/use-scroll-frame.ts";

const headerVariants = cva(
  "fixed inset-x-0 top-0 z-40 border-b border-foreground/15 text-foreground transition duration-200 ease-standard",
  {
    variants: {
      scheme: { light: "scheme-light", dark: "scheme-dark" },
      surface: { clear: "bg-transparent", solid: "bg-background" },
      retracted: { true: "-translate-y-full", false: "translate-y-0" },
    },
  },
);

/* Any open menu or dialog trigger inside the header (Base UI marks it). */
const OPEN_POPUP = "[data-popup-open]";

function openingBottom(): number {
  return document.querySelector("main")?.firstElementChild?.getBoundingClientRect().bottom ?? 0;
}

type AdaptiveHeaderProps = HTMLAttributes<HTMLElement>;

/* The site's fixed header. It takes the colours of the section beneath it (Kome on Fuji Night
   islands, ink on paper), stays clear over the page's opening section (the first child of `main`),
   then turns into a solid bar that hides while the reader scrolls down and returns on the way up.
   An open menu turns it into paper and keeps it in view. */
export function AdaptiveHeader({ className, onFocus, ...props }: AdaptiveHeaderProps) {
  const header = useRef<HTMLElement>(null);
  const previousScroll = useRef(0);
  const [scheme, setScheme] = useState<Scheme>("dark");
  const [clear, setClear] = useState(true);
  const [retracted, setRetracted] = useState(false);

  function update(): void {
    const element = header.current;
    if (element === null) {
      return;
    }
    const open = element.querySelector(OPEN_POPUP) !== null;
    const height = element.offsetHeight;
    const overOpening = openingBottom() > height;
    const delta = window.scrollY - previousScroll.current;
    previousScroll.current = window.scrollY;

    setScheme(open ? "light" : schemeBeneath(window.innerWidth / 2, height / 2, element));
    setClear(overOpening && !open);
    setRetracted(
      (current) =>
        !open &&
        !overOpening &&
        !element.contains(document.activeElement) &&
        hiddenAfterScroll(current, delta),
    );
  }

  useScrollFrame(update);

  const onPopupToggle = useEffectEvent(update);
  useEffect(() => {
    const observer = new MutationObserver(() => {
      onPopupToggle();
    });
    if (header.current !== null) {
      observer.observe(header.current, { subtree: true, attributeFilter: ["data-popup-open"] });
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <header
      ref={header}
      data-slot="adaptive-header"
      data-scheme={scheme}
      className={cn(
        headerVariants({ scheme, surface: clear ? "clear" : "solid", retracted }),
        className,
      )}
      onFocus={(event) => {
        setRetracted(false);
        onFocus?.(event);
      }}
      {...props}
    />
  );
}
