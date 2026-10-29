"use client";

import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import type { ReactNode } from "react";

import { cn } from "../lib/cn.ts";

interface AccordionItemProps extends Omit<BaseAccordion.Item.Props, "className"> {
  question: ReactNode;
  /* The answer. */
  children: ReactNode;
  className?: string;
}

/* One question of an `Accordion`: the question is the trigger (an `h3`), the answer slides open below it. */
export function AccordionItem({ question, children, className, ...props }: AccordionItemProps) {
  return (
    <BaseAccordion.Item
      data-slot="accordion-item"
      className={cn("border-b border-border", className)}
      {...props}
    >
      <BaseAccordion.Header>
        <BaseAccordion.Trigger className="group flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-start font-display text-xl text-foreground">
          {question}
          {/* « La garde »: a plus whose upright stroke retracts upwards as the answer opens, leaving a dash. */}
          <span aria-hidden="true" className="flex h-lh shrink-0 items-center">
            <svg
              viewBox="0 0 16 16"
              className="size-4 stroke-current"
              fill="none"
              strokeWidth={1.5}
            >
              <path d="M0 8h16" />
              <path
                d="M8 0v16"
                className="origin-top transition-transform duration-200 ease-standard transform-fill group-data-panel-open:scale-y-0 motion-reduce:transition-none"
              />
            </svg>
          </span>
        </BaseAccordion.Trigger>
      </BaseAccordion.Header>
      <BaseAccordion.Panel className="h-accordion-panel overflow-hidden transition-all duration-200 ease-standard after:block after:h-6 data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none">
        <div className="max-w-prose text-md text-muted-foreground">{children}</div>
      </BaseAccordion.Panel>
    </BaseAccordion.Item>
  );
}
