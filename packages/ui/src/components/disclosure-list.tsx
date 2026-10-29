"use client";

import { Accordion } from "@base-ui/react/accordion";

import { cn } from "../lib/cn.ts";

interface DisclosureItem {
  title: string;
  body: string;
}

interface DisclosureListProps {
  items: DisclosureItem[];
  open: number;
  onOpenChange: (index: number) => void;
  className?: string;
}

/* A list of named items where exactly one is open at a time; the open one is framed by accent hairlines. */
export function DisclosureList({ items, open, onOpenChange, className }: DisclosureListProps) {
  return (
    <Accordion.Root
      data-slot="disclosure-list"
      value={[open]}
      onValueChange={([next]) => {
        if (typeof next === "number") {
          onOpenChange(next);
        }
      }}
      hiddenUntilFound
      className={cn("flex flex-col", className)}
    >
      {items.map((item, index) => (
        <Accordion.Item
          key={item.title}
          value={index}
          className="border-t border-border transition-colors last:border-b data-open:border-accent [[data-open]+&]:border-t-accent"
        >
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full cursor-pointer py-6 text-start font-display text-3xl tracking-tight text-muted-foreground transition-colors hover:text-foreground data-panel-open:cursor-default data-panel-open:text-foreground">
              {item.title}
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="h-accordion-panel overflow-hidden transition-all duration-200 ease-standard after:block after:h-6 data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none">
            <p className="max-w-prose text-md text-foreground">{item.body}</p>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
