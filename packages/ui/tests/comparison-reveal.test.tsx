import "../src/styles/globals.css";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { ComparisonReveal } from "../src/motion/comparison-reveal.tsx";
import { allowMotion, preferReducedMotion } from "./support/reduced-motion.ts";

const DESKTOP = { width: 1280, height: 800 };
const PHONE = { width: 390, height: 844 };

beforeEach(async () => {
  await page.viewport(DESKTOP.width, DESKTOP.height);
});

afterEach(async () => {
  await allowMotion();
  window.scrollTo(0, 0);
});

function offsetOf(element: Element): number {
  return new DOMMatrixReadOnly(getComputedStyle(element).transform).m41;
}

async function renderBelowTheFold() {
  const screen = await render(
    <>
      <div className="h-dvh" />
      <ComparisonReveal standard={<p>Standard</p>} custom={<p>Custom</p>} note={<p>Sources</p>} />
      <div className="h-dvh" />
    </>,
  );
  const standard = screen.container.querySelector("[data-reveal='standard']");
  if (standard === null) {
    throw new Error("The standard side is missing");
  }
  return standard;
}

describe("ComparisonReveal", () => {
  it("starts with the standard side alone in the centre on wide screens", async () => {
    const standard = await renderBelowTheFold();

    expect(offsetOf(standard)).toBeGreaterThan(0);
  });

  it("slides both sides into place once the cards rise into view, and back when scrolled up", async () => {
    const standard = await renderBelowTheFold();

    window.scrollTo(0, window.innerHeight);
    await vi.waitFor(() => {
      expect(offsetOf(standard)).toBe(0);
    });

    window.scrollTo(0, 0);
    await vi.waitFor(() => {
      expect(offsetOf(standard)).toBeGreaterThan(0);
    });
  });

  it("shows both sides in place when the user prefers reduced motion", async () => {
    await preferReducedMotion();
    const standard = await renderBelowTheFold();

    expect(offsetOf(standard)).toBe(0);
  });

  it("stacks both sides in place on phones", async () => {
    await page.viewport(PHONE.width, PHONE.height);
    const standard = await renderBelowTheFold();

    expect(offsetOf(standard)).toBe(0);
  });
});
