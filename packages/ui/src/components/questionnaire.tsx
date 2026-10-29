"use client";

import { type FormHTMLAttributes, type ReactNode, useState } from "react";
import { flushSync } from "react-dom";

import { cn } from "../lib/cn.ts";
import { Button } from "./button.tsx";
import { ChoiceGroup, type ChoiceOption } from "./choice-group.tsx";

export interface QuestionnaireStep {
  id: string;
  legend: string;
  options: readonly ChoiceOption[];
}

export interface QuestionnaireLabels {
  /* (2, 11) => "Question 2 sur 11" */
  progress: (current: number, total: number) => string;
  next: string;
  previous: string;
}

interface QuestionnaireProps extends Omit<
  FormHTMLAttributes<HTMLFormElement>,
  "children" | "onSubmit"
> {
  steps: readonly QuestionnaireStep[];
  answers: Readonly<Partial<Record<string, string>>>;
  onAnswer: (stepId: string, value: string) => void;
  labels: QuestionnaireLabels;
  kicker?: ReactNode;
  /* Shown under the question, e.g. a live `Readout` of the answers so far. */
  result?: ReactNode;
}

/* Where a keyboard or screen reader user picks up after changing question: the chosen answer, else the first. */
function focusAnswer(form: HTMLFormElement | null): void {
  const answer =
    form?.querySelector<HTMLElement>('[role="radio"][data-checked]') ??
    form?.querySelector<HTMLElement>('[role="radio"]');
  answer?.focus();
}

interface StepControlsProps {
  current: number;
  total: number;
  answered: boolean;
  labels: QuestionnaireLabels;
  goTo: (index: number, form: HTMLFormElement | null) => void;
}

/* The progress line, then « previous » and « next » (next waits for an answer, and the last question has none). */
function stepControls({ current, total, answered, labels, goTo }: StepControlsProps): ReactNode {
  return (
    <>
      <div aria-hidden="true" className="h-0.5 bg-foreground/10">
        <div
          className="h-full origin-left bg-tenku transition-transform duration-300 ease-emphasized"
          style={{ scale: `${(current + 1) / total} 1` }}
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {current > 0 ? (
          <Button
            variant="ghost"
            onClick={(event) => {
              goTo(current - 1, event.currentTarget.form);
            }}
          >
            {labels.previous}
          </Button>
        ) : null}
        {current < total - 1 ? (
          <Button
            corner="cut"
            className="ms-auto"
            disabled={!answered}
            onClick={(event) => {
              goTo(current + 1, event.currentTarget.form);
            }}
          >
            {labels.next}
          </Button>
        ) : null}
      </div>
    </>
  );
}

/* One question at a time on a paper card. With several questions it shows where the reader is
   ("Question 2 sur 11" and a progress line) and moves on once the question is answered. */
export function Questionnaire({
  steps,
  answers,
  onAnswer,
  labels,
  kicker,
  result,
  className,
  ...props
}: QuestionnaireProps) {
  const [current, setCurrent] = useState(0);
  const step = steps[current];
  if (step === undefined) {
    return null;
  }
  const stepped = steps.length > 1;

  function goTo(index: number, form: HTMLFormElement | null): void {
    flushSync(() => {
      setCurrent(index);
    });
    focusAnswer(form);
  }

  return (
    <form
      data-slot="questionnaire"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
      }}
      className={cn("flex flex-col gap-6 border border-border bg-surface p-6 md:p-10", className)}
      {...props}
    >
      {kicker === undefined ? null : <p className="text-sm font-medium">{kicker}</p>}
      <ChoiceGroup
        key={step.id}
        name={step.id}
        legend={step.legend}
        description={stepped ? labels.progress(current + 1, steps.length) : undefined}
        options={step.options}
        value={answers[step.id]}
        onValueChange={(value) => {
          onAnswer(step.id, value);
        }}
      />
      {result}
      {stepped
        ? stepControls({
            current,
            total: steps.length,
            answered: answers[step.id] !== undefined,
            labels,
            goTo,
          })
        : null}
    </form>
  );
}
