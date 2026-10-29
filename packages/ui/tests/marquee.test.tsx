import "../src/styles/globals.css";
import { afterEach, describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";

import { Marquee } from "../src/motion/marquee.tsx";
import { allowMotion, preferReducedMotion } from "./support/reduced-motion.ts";

function Band() {
  return (
    <Marquee pauseLabel="Mettre en pause le défilement des logos">
      <span>lemlist</span>
      <span>Carte Noire</span>
      <span>Ops Clean</span>
    </Marquee>
  );
}

function trackOffset(container: HTMLElement): number {
  const track = container.querySelector("[data-slot=marquee] ul")?.parentElement;
  return track?.getBoundingClientRect().left ?? Number.NaN;
}

afterEach(async () => {
  await allowMotion();
});

describe("Marquee", () => {
  it("lists every item once for screen readers, the seamless copy being hidden", async () => {
    const screen = await render(<Band />);

    await expect.element(screen.getByRole("list")).toBeVisible();
    await expect.element(screen.getByText("lemlist").first()).toBeVisible();
    expect(screen.getByRole("listitem").all()).toHaveLength(3);
  });

  it("drifts, then holds still once paused with its toggle", async () => {
    const screen = await render(<Band />);
    const start = trackOffset(screen.container);

    await expect.poll(() => trackOffset(screen.container)).toBeLessThan(start);

    const toggle = screen.getByRole("button", { name: "Mettre en pause le défilement des logos" });
    await toggle.click();
    await expect.element(toggle).toHaveAttribute("aria-pressed", "true");

    await expect
      .poll(
        async () => {
          const before = trackOffset(screen.container);
          await new Promise((resolve) => {
            setTimeout(resolve, 200);
          });
          return trackOffset(screen.container) - before;
        },
        { timeout: 3000 },
      )
      .toBe(0);
  });

  it("is a still, wrapped row without its toggle under reduced motion", async () => {
    await preferReducedMotion();
    const screen = await render(<Band />);
    const start = trackOffset(screen.container);

    await expect
      .element(screen.getByRole("button", { name: "Mettre en pause le défilement des logos" }))
      .not.toBeInTheDocument();
    await new Promise((resolve) => {
      setTimeout(resolve, 300);
    });
    expect(trackOffset(screen.container)).toBe(start);
  });
});
