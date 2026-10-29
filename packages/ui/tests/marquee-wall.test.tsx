import "../src/styles/globals.css";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { MarqueeColumn } from "../src/motion/marquee-column.tsx";
import { MarqueeWall } from "../src/motion/marquee-wall.tsx";
import { allowMotion, preferReducedMotion } from "./support/reduced-motion.ts";

const PAUSE = "Mettre en pause";

function Wall() {
  return (
    <MarqueeWall pauseLabel={PAUSE}>
      <MarqueeColumn>
        <figure key="a">Avis A</figure>
        <figure key="b">Avis B</figure>
      </MarqueeColumn>
      <MarqueeColumn>
        <figure key="c">Avis C</figure>
        <figure key="d">Avis D</figure>
      </MarqueeColumn>
    </MarqueeWall>
  );
}

function translations(container: HTMLElement): DOMMatrix[] {
  return [...container.querySelectorAll("[data-marquee-track]")].map(
    (track) => new DOMMatrix(getComputedStyle(track).transform),
  );
}

function offsets(container: HTMLElement): number[] {
  return translations(container).map((matrix) => matrix.m42);
}

function rowOffsets(container: HTMLElement): number[] {
  return translations(container).map((matrix) => matrix.m41);
}

beforeEach(async () => {
  await page.viewport(1280, 800);
});

afterEach(async () => {
  await allowMotion();
});

describe("MarqueeWall", () => {
  it("shows each item once to assistive technology, the loop copy being hidden", async () => {
    const screen = await render(<Wall />);

    expect(screen.getByRole("figure").all()).toHaveLength(4);
    expect(screen.container.querySelectorAll("figure")).toHaveLength(8);
  });

  it("stands still and shows each item once under reduced motion", async () => {
    await preferReducedMotion();
    const screen = await render(<Wall />);

    await expect.element(screen.getByText("Avis D").first()).toBeVisible();
    await expect.element(screen.getByText("Avis D").last()).not.toBeVisible();
    await expect
      .element(screen.getByRole("button", { name: PAUSE, includeHidden: true }))
      .not.toBeVisible();
    expect(offsets(screen.container)).toEqual([0, 0]);
  });

  it("runs its columns as rows on a phone", async () => {
    await page.viewport(390, 844);
    const screen = await render(<Wall />);

    await expect.poll(() => rowOffsets(screen.container)[0], { timeout: 3000 }).toBeLessThan(-1);
  });

  it("runs its columns in opposite directions", async () => {
    const screen = await render(<Wall />);
    await expect.poll(() => offsets(screen.container)[0], { timeout: 3000 }).toBeLessThan(-1);
    const [firstBefore = 0, secondBefore = 0] = offsets(screen.container);

    await expect.poll(() => offsets(screen.container)[0]).toBeLessThan(firstBefore);
    expect(offsets(screen.container)[1]).toBeGreaterThan(secondBefore);
  });

  it("eases to a stop under the pointer and runs again when it leaves", async () => {
    const screen = await render(<Wall />);
    await expect.poll(() => offsets(screen.container)[0], { timeout: 3000 }).toBeLessThan(-1);

    await screen.getByText("Avis A").first().hover({ force: true });
    await new Promise((resolve) => {
      setTimeout(resolve, 800);
    });
    const stopped = offsets(screen.container);
    const [firstStopped = 0] = stopped;
    await new Promise((resolve) => {
      setTimeout(resolve, 300);
    });
    expect(offsets(screen.container)).toEqual(stopped);

    await screen.getByRole("button", { name: PAUSE }).hover();
    await expect.poll(() => offsets(screen.container)[0]).toBeLessThan(firstStopped);
  });

  it("eases to a stop when the visitor presses pause", async () => {
    const screen = await render(<Wall />);
    const pause = screen.getByRole("button", { name: PAUSE });

    await pause.click();

    await expect.element(pause).toHaveAttribute("aria-pressed", "true");
    await new Promise((resolve) => {
      setTimeout(resolve, 800);
    });
    const stopped = offsets(screen.container);
    await new Promise((resolve) => {
      setTimeout(resolve, 300);
    });
    expect(offsets(screen.container)).toEqual(stopped);
  });
});
