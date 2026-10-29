import { describe, expect, it } from "vitest";

import { calculatorQuestions } from "../src/features/home/calculator-content";
import { estimateMonthlyLostHours } from "../src/features/home/lost-hours";

const [headcountQuestion] = calculatorQuestions;

function estimateForHeadcount(label: string): number | undefined {
  const option = headcountQuestion.options.find((candidate) => candidate.label === label);
  return estimateMonthlyLostHours({ [headcountQuestion.id]: option?.value });
}

describe("estimateMonthlyLostHours", () => {
  it("has no estimate before the production headcount is answered", () => {
    expect(estimateMonthlyLostHours({})).toBeUndefined();
  });

  it.each([
    ["1 à 5", 38],
    ["6 à 15", 124],
    ["16 à 30", 296],
    ["31 à 60", 612],
    ["Plus de 60", 940],
  ])("estimates %s production staff at %i lost hours a month", (label, hours) => {
    expect(estimateForHeadcount(label)).toBe(hours);
  });

  it("ignores an answer that is not one of the headcount bands", () => {
    expect(estimateMonthlyLostHours({ [headcountQuestion.id]: "200" })).toBeUndefined();
  });
});
