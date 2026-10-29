import { describe, expect, it } from "vitest";

import { mounted } from "../src/lib/mounted.ts";

describe("mounted", () => {
  it("returns the element React attached to the ref", () => {
    const element = { tagName: "DIV" };
    expect(mounted({ current: element })).toBe(element);
  });

  it("fails loudly when read before React attached the element", () => {
    expect(() => mounted({ current: null })).toThrow("not mounted");
  });
});
