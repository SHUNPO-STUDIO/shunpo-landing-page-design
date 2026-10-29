import { describe, expect, it } from "vitest";

import { filmProgress, frameTime } from "../src/motion/video-seeker.ts";

describe("frameTime", () => {
  it("maps the progress of the film onto its duration", () => {
    expect(frameTime(0.5, 8)).toBe(4);
  });

  it("starts on the first frame before the range", () => {
    expect(frameTime(-0.2, 8)).toBe(0);
  });

  it("stops just before the end so the last frame stays painted", () => {
    expect(frameTime(1.4, 8)).toBeCloseTo(7.97);
  });

  it("stays on the first frame while the duration is still unknown", () => {
    expect(frameTime(0.5, Number.NaN)).toBe(0);
    expect(frameTime(0.5, 0)).toBe(0);
  });
});

describe("filmProgress", () => {
  it("follows the scroll range when nothing holds", () => {
    expect(filmProgress(0.25, 0)).toBe(0.25);
  });

  it("plays the film faster and holds the last frame over the end of the range", () => {
    expect(filmProgress(0.25, 0.5)).toBe(0.5);
    expect(filmProgress(0.75, 0.5)).toBe(1);
  });

  it("stays between the first and the last frame", () => {
    expect(filmProgress(-0.1, 0)).toBe(0);
    expect(filmProgress(1.3, 0)).toBe(1);
  });

  it("shows the last frame when the whole range holds", () => {
    expect(filmProgress(0, 1)).toBe(1);
  });
});
