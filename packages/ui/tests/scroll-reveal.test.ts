import { describe, expect, it } from "vitest";

import { hiddenAfterScroll } from "../src/lib/scroll-reveal.ts";

describe("hiddenAfterScroll", () => {
  it("hides the bar when the reader scrolls down", () => {
    expect(hiddenAfterScroll(false, 24)).toBe(true);
  });

  it("brings the bar back as soon as the reader scrolls up", () => {
    expect(hiddenAfterScroll(true, -24)).toBe(false);
  });

  it("keeps the current state on a jitter of a few pixels", () => {
    expect(hiddenAfterScroll(true, -2)).toBe(true);
    expect(hiddenAfterScroll(false, 3)).toBe(false);
  });
});
