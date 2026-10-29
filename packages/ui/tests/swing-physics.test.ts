import { describe, expect, it } from "vitest";

import { entranceSide, pushDirection } from "../src/motion/swing-physics.ts";

const BADGE = { left: 100, width: 300 };

describe("pushDirection", () => {
  it("swings clockwise when the pointer comes from the left half", () => {
    expect(pushDirection(120, BADGE)).toBe(1);
  });

  it("swings anticlockwise when the pointer comes from the right half", () => {
    expect(pushDirection(380, BADGE)).toBe(-1);
  });
});

describe("entranceSide", () => {
  it("drops neighbouring badges in from opposite sides", () => {
    expect([0, 1, 2].map((order) => entranceSide(order))).toEqual([1, -1, 1]);
  });
});
