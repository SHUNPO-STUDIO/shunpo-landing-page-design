"use client";

import { type ReactElement, type ReactNode, useRef } from "react";

import { DisclosureList } from "../components/disclosure-list.tsx";
import { PhotoStack } from "../components/photo-stack.tsx";
import { Container } from "../layout/container.tsx";
import { useScrollSteps } from "./use-scroll-steps.ts";

interface ShowcaseItem {
  title: string;
  body: string;
  photo: ReactElement;
}

interface ScrollShowcaseProps {
  intro: ReactNode;
  outro: ReactNode;
  items: ShowcaseItem[];
  paper?: ReactElement;
}

/* A titled list of items, each with its photo laid on a pile. On large screens the stage is pinned and
   the scroll opens the items one by one; choosing an item scrolls to it. Elsewhere choosing opens it. */
export function ScrollShowcase({ intro, outro, items, paper }: ScrollShowcaseProps) {
  const stage = useRef<HTMLDivElement>(null);
  const { step, goTo } = useScrollSteps(stage, items.length);

  return (
    <div
      ref={stage}
      data-slot="scroll-showcase"
      className="flex w-full items-center lg:motion-safe:min-h-dvh"
    >
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:gap-x-10 lg:grid-cols-3 lg:gap-x-5">
          <div className="contents lg:flex lg:flex-col lg:justify-between lg:gap-10">
            <div className="order-1 md:col-span-2">{intro}</div>
            <div className="order-4 md:col-span-2">{outro}</div>
          </div>
          <div className="order-2 flex items-end justify-center px-6 py-8 md:px-4 lg:px-8">
            <PhotoStack
              photos={items.map((item) => item.photo)}
              active={step}
              paper={paper}
              className="w-3/4 sm:w-1/2 md:w-full"
            />
          </div>
          <DisclosureList className="order-3" items={items} open={step} onOpenChange={goTo} />
        </div>
      </Container>
    </div>
  );
}
