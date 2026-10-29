"use client";

import { Questionnaire } from "@repo/ui/components/questionnaire";
import { Readout } from "@repo/ui/components/readout";
import { useState } from "react";

import {
  calculatorCopy,
  calculatorLabels,
  calculatorQuestions,
  estimateAnnouncement,
} from "./calculator-content";
import { type CalculatorAnswers, estimateMonthlyLostHours } from "./lost-hours";

/* The lost-hours calculator: the estimate updates with every answer, on the page, without an email. */
export function LostHoursCalculator() {
  const [answers, setAnswers] = useState<CalculatorAnswers>({});
  const hours = estimateMonthlyLostHours(answers);
  return (
    <Questionnaire
      aria-label={calculatorCopy.name}
      steps={calculatorQuestions}
      answers={answers}
      onAnswer={(stepId, value) => {
        setAnswers((previous) => ({ ...previous, [stepId]: value }));
      }}
      labels={calculatorLabels}
      kicker={calculatorCopy.trade}
      result={
        <Readout
          label={calculatorCopy.estimateLabel}
          hint={hours === undefined ? calculatorCopy.estimatePending : calculatorCopy.estimateReady}
          value={hours}
          unit={calculatorCopy.estimateUnit}
          announcement={hours === undefined ? "" : estimateAnnouncement(hours)}
        />
      }
    />
  );
}
