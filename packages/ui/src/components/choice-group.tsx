"use client";

import { Fieldset } from "@base-ui/react/fieldset";
import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import { type ReactNode, useId } from "react";

import { cn } from "../lib/cn.ts";

export interface ChoiceOption {
  value: string;
  label: string;
}

interface ChoiceGroupProps {
  legend: ReactNode;
  /* Read with the legend, e.g. where the question sits in a questionnaire. */
  description?: ReactNode;
  options: readonly ChoiceOption[];
  name?: string;
  /* The chosen answer, undefined while there is none. */
  value: string | undefined;
  onValueChange: (value: string) => void;
  className?: string;
}

/* A single-choice question: its legend and its answers as square pills. Arrow keys move between answers. */
export function ChoiceGroup({
  legend,
  description,
  options,
  name,
  value,
  onValueChange,
  className,
}: ChoiceGroupProps) {
  const descriptionId = useId();
  return (
    <Fieldset.Root
      data-slot="choice-group"
      className={cn("flex flex-col gap-4", className)}
      render={
        <RadioGroup
          name={name}
          value={value ?? null}
          onValueChange={(chosen: string | null) => {
            if (chosen !== null) {
              onValueChange(chosen);
            }
          }}
          aria-describedby={description === undefined ? undefined : descriptionId}
        />
      }
    >
      <Fieldset.Legend className="font-display text-xl font-medium tracking-tight md:text-2xl">
        {legend}
      </Fieldset.Legend>
      {description === undefined ? null : (
        <p id={descriptionId} className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Radio.Root
            key={option.value}
            value={option.value}
            className="inline-flex h-12 cursor-pointer items-center border border-foreground/40 px-4 text-sm whitespace-nowrap transition-colors select-none data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground data-unchecked:hover:bg-foreground/5"
          >
            {option.label}
          </Radio.Root>
        ))}
      </div>
    </Fieldset.Root>
  );
}
