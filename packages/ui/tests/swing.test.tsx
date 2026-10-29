import "../src/styles/globals.css";
import { gsap } from "gsap";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";

import { Swing } from "../src/motion/swing.tsx";
import { allowMotion, preferReducedMotion } from "./support/reduced-motion.ts";

const FAST_FORWARD = 20;

function swingOf(element: Element): HTMLElement {
  const swing = element.closest<HTMLElement>("[data-slot=swing]");
  if (swing === null) {
    throw new Error("No swing around the content");
  }
  return swing;
}

beforeEach(async () => {
  await page.viewport(1280, 800);
  gsap.globalTimeline.timeScale(FAST_FORWARD);
});

afterEach(async () => {
  gsap.globalTimeline.timeScale(1);
  await allowMotion();
});

describe("Swing", () => {
  it("leaves its content still and in place when the user prefers reduced motion", async () => {
    await preferReducedMotion();
    const screen = await render(<Swing>Badge</Swing>);

    const swing = swingOf(screen.getByText("Badge").element());

    await expect.element(screen.getByText("Badge")).toBeVisible();
    expect(swing.style.transform).toBe("");
    expect(swing.style.opacity).toBe("");
  });

  it("drops in when it scrolls into view and settles at rest", async () => {
    const screen = await render(<Swing order={1}>Badge</Swing>);
    const swing = swingOf(screen.getByText("Badge").element());

    await expect.poll(() => getComputedStyle(swing).opacity, { timeout: 2000 }).toBe("1");
    await expect.poll(() => gsap.getProperty(swing, "rotation"), { timeout: 2000 }).toBe(0);
  });

  it("drops in on a phone too", async () => {
    await page.viewport(390, 844);
    const screen = await render(<Swing>Badge</Swing>);
    const swing = swingOf(screen.getByText("Badge").element());

    await expect.poll(() => getComputedStyle(swing).opacity, { timeout: 2000 }).toBe("1");
  });

  it("sways when a pointer brushes it", async () => {
    const screen = await render(<Swing>Badge</Swing>);
    const swing = swingOf(screen.getByText("Badge").element());
    await expect.poll(() => gsap.isTweening(swing), { timeout: 2000 }).toBe(false);
    gsap.globalTimeline.timeScale(1);

    await userEvent.hover(screen.getByText("Badge"));

    await expect.poll(() => gsap.getProperty(swing, "rotation")).not.toBe(0);
  });
});
