"use client";

import { Accordion as BaseAccordion } from "@base-ui/react/accordion";

import { cn } from "../lib/cn.ts";

interface AccordionProps extends Omit<BaseAccordion.Root.Props<number>, "className"> {
  className?: string;
}

/* A list of questions between hairlines, one answer open at a time. Closed answers stay findable
   with the browser's page search. Holds `AccordionItem`s. */
export function Accordion({ className, ...props }: AccordionProps) {
  return (
    <BaseAccordion.Root<number>
      data-slot="accordion"
      hiddenUntilFound
      className={cn("flex flex-col border-t border-border", className)}
      {...props}
    />
  );
}
