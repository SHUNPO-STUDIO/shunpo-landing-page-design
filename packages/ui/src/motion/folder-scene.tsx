"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type HTMLAttributes, useRef } from "react";

import { cn } from "../lib/cn.ts";
import { stageFolders } from "./folder-choreography.ts";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* The stage needs the room of a tablet, and motion. */
const STAGE_QUERY = "(min-width: 48rem) and (prefers-reduced-motion: no-preference)";

/* A pinned scene of paper folders (`FolderSceneOpening`, then a `FolderList` of `Folder`s, each with its
   `FolderSheet`). From the tablet up with motion allowed, it marks itself `data-staged`: the folders line
   up at the bottom of the screen and, as the reader scrolls, each sheet comes out of its folder to reading
   size, then goes back. On phones and with reduced motion, folders and sheets stay stacked and complete. */
export function FolderScene({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(STAGE_QUERY, () => {
        const element = stage.current;
        if (element !== null) {
          element.toggleAttribute("data-staged", true);
          stageFolders(element);
        }
        return () => {
          element?.toggleAttribute("data-staged", false);
        };
      });
    },
    { scope: stage },
  );

  return (
    <div
      ref={stage}
      data-slot="folder-scene"
      className={cn(
        "relative flex flex-col gap-16 py-24 md:gap-20 staged:h-dvh staged:gap-0 staged:py-8",
        className,
      )}
      {...props}
    />
  );
}
