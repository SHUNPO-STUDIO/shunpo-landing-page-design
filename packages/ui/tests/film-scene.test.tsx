import "../src/styles/globals.css";
import { afterEach, describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { filmDistance, followFilm } from "../src/motion/film-choreography.ts";
import { FilmScene } from "../src/motion/film-scene.tsx";
import { Heading } from "../src/typography/heading.tsx";
import mp4 from "../stories/support/rising-sun.mp4?url";
import webm from "../stories/support/rising-sun.webm?url";
import { allowMotion, preferReducedMotion } from "./support/reduced-motion.ts";

const FRAME = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'/%3E";
const PHONE = { width: 390, height: 844 };
/* A screen of scroll on a phone: 62.5 % of its width, as the prototype's 1 440 × 900 frame. */
const PHONE_SCROLL_SCREEN = 0.625 * PHONE.width;

function overlay(): HTMLElement {
  const element = document.createElement("div");
  element.innerHTML = "<p><span data-reveal-line>Line</span></p><div data-film-action>Action</div>";
  document.body.append(element);
  return element;
}

function Scene({ minWidth }: { minWidth?: "all" | "md" }) {
  return (
    <FilmScene
      {...(minWidth === undefined ? {} : { minWidth })}
      sources={{ mp4, webm }}
      poster={<img src={FRAME} alt="" />}
      title={<Heading level={1}>On construit le système</Heading>}
      action={<a href="#contact">Réserver une immersion</a>}
      lightAt={0.6}
      leaveAt={0.75}
    />
  );
}

afterEach(async () => {
  await allowMotion();
  await page.viewport(1280, 800);
  window.scrollTo(0, 0);
});

function sceneSection(container: HTMLElement): HTMLElement {
  const section = container.querySelector("section");
  if (section === null) {
    throw new Error("No scene rendered");
  }
  return section;
}

function headlineLit(container: HTMLElement): boolean {
  return container.querySelector(".scheme-light h1") !== null;
}

describe("filmDistance", () => {
  it("plays the film over 1 450 of every 1 800 px of track, as in the prototype", () => {
    expect(filmDistance({ stage: 900, track: 1800 })).toBeCloseTo(1450);
    expect(filmDistance({ stage: 844, track: 487.5 })).toBeCloseTo((1450 / 1800) * 487.5);
  });

  it("plays it over the first half of the stage when nothing pins it", () => {
    expect(filmDistance({ stage: 844, track: 0 })).toBe(422);
  });
});

describe("followFilm", () => {
  it("switches title and action to the light scheme once the image is light, and back", () => {
    const element = overlay();
    const follow = followFilm(element, { lightAt: 0.6, leaveAt: 0.9 });

    follow(0.5);
    expect(element.classList.contains("scheme-light")).toBe(false);
    follow(0.7);
    expect(element.classList.contains("scheme-light")).toBe(true);
    follow(0.2);
    expect(element.classList.contains("scheme-light")).toBe(false);
  });

  it("sends the action away once the sun needs the screen, and brings it back", async () => {
    const element = overlay();
    const action = element.querySelector<HTMLElement>("[data-film-action]");
    const follow = followFilm(element, { lightAt: 2, leaveAt: 0.75 });

    follow(0.8);
    await expect.poll(() => action?.style.visibility).toBe("hidden");
    follow(0.1);
    await expect.poll(() => action?.style.visibility).toBe("inherit");
  });
});

describe("FilmScene", () => {
  it("pins the stage with a scroll track behind it", async () => {
    const screen = await render(<Scene />);

    await expect.element(screen.getByRole("heading", { level: 1 })).toBeVisible();
    await expect
      .element(screen.getByRole("link", { name: "Réserver une immersion" }))
      .toBeVisible();
    expect(screen.container.querySelector(".pin-spacer")).not.toBeNull();
  });

  it("pins on phones too, over a track as long as the prototype's at the phone's width", async () => {
    await page.viewport(PHONE.width, PHONE.height);
    const screen = await render(<Scene />);

    await expect.element(screen.getByRole("heading", { level: 1 })).toBeVisible();
    expect(screen.container.querySelector(".pin-spacer")).not.toBeNull();
    expect(sceneSection(screen.container).getBoundingClientRect().height).toBeCloseTo(
      PHONE.height + 2 * PHONE_SCROLL_SCREEN,
    );
  });

  it("plays the film over 1 450 of every 1 800 px of track", async () => {
    await page.viewport(PHONE.width, PHONE.height);
    const screen = await render(<Scene />);
    const sceneTop = sceneSection(screen.container).getBoundingClientRect().top + window.scrollY;
    const lightFrom = sceneTop + 0.6 * (1450 / 1800) * 2 * PHONE_SCROLL_SCREEN;

    window.scrollTo(0, lightFrom - 20);
    await expect.poll(() => headlineLit(screen.container)).toBe(false);
    window.scrollTo(0, lightFrom + 20);
    await expect.poll(() => headlineLit(screen.container)).toBe(true);
  });

  it("lets the stage scroll by on phones when it pins from the tablet breakpoint", async () => {
    await page.viewport(PHONE.width, PHONE.height);
    const screen = await render(<Scene minWidth="md" />);

    await expect.element(screen.getByRole("heading", { level: 1 })).toBeVisible();
    expect(screen.container.querySelector(".pin-spacer")).toBeNull();
    expect(sceneSection(screen.container).offsetHeight).toBe(PHONE.height);
  });

  it("shows a still, complete scene without pin when the user prefers reduced motion", async () => {
    await preferReducedMotion();
    const screen = await render(<Scene />);

    await expect.element(screen.getByRole("heading", { level: 1 })).toBeVisible();
    await expect
      .element(screen.getByRole("link", { name: "Réserver une immersion" }))
      .toBeVisible();
    expect(screen.container.querySelector(".pin-spacer")).toBeNull();
  });
});
