import { describe, expect, it } from "vitest";

import { currentSectionIndex } from "../src/lib/scroll-spy.ts";

describe("currentSectionIndex", () => {
  it("marks no section while the first one is still below the reading line", () => {
    expect(currentSectionIndex([500, 1200, 2000], 450)).toBe(-1);
  });

  it("marks the last section whose top has crossed the reading line", () => {
    expect(currentSectionIndex([-900, -100, 300, 1400], 450)).toBe(2);
  });

  it("marks a section as soon as its top reaches the line", () => {
    expect(currentSectionIndex([-200, 450], 450)).toBe(1);
  });

  it("ignores sections missing from the page", () => {
    expect(currentSectionIndex([-300, Number.POSITIVE_INFINITY, 1000], 450)).toBe(0);
  });
});
