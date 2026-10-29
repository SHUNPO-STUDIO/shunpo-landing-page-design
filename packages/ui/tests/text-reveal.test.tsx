import "../src/styles/globals.css";
import { afterEach, describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";

import { TextReveal } from "../src/motion/text-reveal.tsx";
import { Heading } from "../src/typography/heading.tsx";
import { allowMotion, preferReducedMotion } from "./support/reduced-motion.ts";

const TITLE = "On construit le système qui fait tourner votre entreprise, boosté à l’IA.";

afterEach(async () => {
  await allowMotion();
});

describe("TextReveal", () => {
  it("splits the heading into masked lines that rise on load, keeping its accessible name", async () => {
    const screen = await render(
      <TextReveal play="load">
        <Heading level={1}>{TITLE}</Heading>
      </TextReveal>,
    );

    await expect.element(screen.getByRole("heading", { level: 1, name: TITLE })).toBeVisible();
    await expect
      .element(screen.container.querySelector<HTMLElement>("[data-split]"))
      .toBeInTheDocument();
    expect(screen.container.querySelectorAll("[data-reveal-line]").length).toBeGreaterThan(0);
  });

  it("splits words when asked and waits for its section to enter the screen", async () => {
    const screen = await render(
      <>
        <div className="h-svh" />
        <section>
          <TextReveal by="words">
            <Heading level={2}>Construisons le dernier logiciel dont vous aurez besoin.</Heading>
          </TextReveal>
        </section>
      </>,
    );

    await expect
      .poll(() => screen.container.querySelectorAll("[data-reveal-line]").length)
      .toBeGreaterThan(0);
    await expect.element(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("leaves the heading whole and visible when the user prefers reduced motion", async () => {
    await preferReducedMotion();
    const screen = await render(
      <TextReveal play="load">
        <Heading level={1}>{TITLE}</Heading>
      </TextReveal>,
    );

    await expect.element(screen.getByRole("heading", { level: 1, name: TITLE })).toBeVisible();
    expect(screen.container.querySelectorAll("[data-reveal-line]")).toHaveLength(0);
  });
});
