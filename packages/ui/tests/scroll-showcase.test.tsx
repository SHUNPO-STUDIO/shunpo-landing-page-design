import "../src/styles/globals.css";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { ScrollShowcase } from "../src/motion/scroll-showcase.tsx";
import { allowMotion, preferReducedMotion } from "./support/reduced-motion.ts";

const DESKTOP = { width: 1280, height: 800 };
const PHONE = { width: 390, height: 844 };
const PIXEL = "data:image/gif;base64,R0lGODlhAQABAAAAACw=";

afterEach(async () => {
  await allowMotion();
  await page.viewport(DESKTOP.width, DESKTOP.height);
  window.scrollTo(0, 0);
});

const items = ["Cabinets comptables", "Gestion immobilière", "BTP"].map((title) => ({
  title,
  body: `Ce qui change pour ${title}.`,
  photo: <img key={title} alt={title} src={PIXEL} />,
}));

function renderShowcase() {
  return render(
    <>
      <ScrollShowcase intro={<h2>Secteurs</h2>} outro={<p>Parlons-en</p>} items={items} />
      <div className="h-dvh" />
    </>,
  );
}

describe("ScrollShowcase", () => {
  it("opens the chosen item on phones without pinning anything", async () => {
    await page.viewport(PHONE.width, PHONE.height);
    const screen = await renderShowcase();

    await screen.getByRole("button", { name: "BTP" }).click();

    await expect
      .element(screen.getByRole("button", { name: "BTP" }))
      .toHaveAttribute("aria-expanded", "true");
    expect(screen.container.querySelector(".pin-spacer")).toBeNull();
  });

  it("pins the stage on large screens and scrolls to the chosen item", async () => {
    const screen = await renderShowcase();
    expect(screen.container.querySelector(".pin-spacer")).not.toBeNull();

    await screen.getByRole("button", { name: "BTP" }).click();

    await vi.waitFor(
      async () => {
        await expect
          .element(screen.getByRole("button", { name: "BTP" }))
          .toHaveAttribute("aria-expanded", "true");
      },
      { timeout: 4000 },
    );
    expect(window.scrollY).toBeGreaterThan(0);
  });

  it("opens the chosen item in place when the user prefers reduced motion", async () => {
    await preferReducedMotion();
    const screen = await renderShowcase();

    await screen.getByRole("button", { name: "Gestion immobilière" }).click();

    await expect
      .element(screen.getByRole("button", { name: "Gestion immobilière" }))
      .toHaveAttribute("aria-expanded", "true");
    expect(screen.container.querySelector(".pin-spacer")).toBeNull();
  });
});
