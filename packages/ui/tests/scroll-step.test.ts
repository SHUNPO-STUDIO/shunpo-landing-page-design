import { describe, expect, it } from "vitest";

import { stepAt, stepCentre } from "../src/lib/scroll-step.ts";

const COUNT = 4;

describe("stepAt", () => {
  it("starts on the first step and ends on the last", () => {
    expect(stepAt(0, 0, COUNT)).toBe(0);
    expect(stepAt(1, 0, COUNT)).toBe(COUNT - 1);
  });

  it("moves on once the scroll is clearly past a step boundary", () => {
    expect(stepAt(0.3, 0, COUNT)).toBe(1);
    expect(stepAt(0.55, 1, COUNT)).toBe(2);
  });

  it("holds the current step inside the dead zone around a boundary", () => {
    expect(stepAt(0.255, 0, COUNT)).toBe(0);
    expect(stepAt(0.245, 1, COUNT)).toBe(1);
  });

  it("moves back once the scroll is clearly before the boundary", () => {
    expect(stepAt(0.2, 1, COUNT)).toBe(0);
  });

  it("jumps over several steps when the scroll moves fast", () => {
    expect(stepAt(0.9, 0, COUNT)).toBe(3);
    expect(stepAt(0.05, 3, COUNT)).toBe(0);
  });
});

describe("stepCentre", () => {
  it("lands in the middle of each step", () => {
    expect(stepCentre(0, COUNT)).toBe(0.125);
    expect(stepCentre(3, COUNT)).toBe(0.875);
  });

  it("is a progress that steps back to the same step", () => {
    for (let step = 0; step < COUNT; step += 1) {
      expect(stepAt(stepCentre(step, COUNT), 0, COUNT)).toBe(step);
    }
  });
});
