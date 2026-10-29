import "../src/styles/globals.css";
import { afterEach, describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { filmHold, followFilm } from "../src/motion/film-choreography.ts";
import { FilmScene } from "../src/motion/film-scene.tsx";
import { Heading } from "../src/typography/heading.tsx";
import mp4 from "../stories/support/rising-sun.mp4?url";
import webm from "../stories/support/rising-sun.webm?url";
import { allowMotion, preferReducedMotion } from "./support/reduced-motion.ts";

const FRAME = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'/%3E";

function overlay(): HTMLElement {
  const element = document.createElement("div");
  element.innerHTML = "<p><span data-reveal-line>Line</span></p><div data-film-action>Action</div>";
  document.body.append(element);
  return element;
}

function Scene() {
  return (
    <FilmScene
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

describe("filmHold", () => {
  it("keeps the last frame over the rest of the pin and the screen the next section covers", () => {
    expect(filmHold(2)).toBeCloseTo(1 - (2 * 1450) / 1800 / 3);
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
  it("pins the stage from the tablet breakpoint, with a scroll track behind it", async () => {
    const screen = await render(<Scene />);

    await expect.element(screen.getByRole("heading", { level: 1 })).toBeVisible();
    await expect
      .element(screen.getByRole("link", { name: "Réserver une immersion" }))
      .toBeVisible();
    expect(screen.container.querySelector(".pin-spacer")).not.toBeNull();
  });

  it("lets the stage scroll by on phones", async () => {
    await page.viewport(390, 844);
    const screen = await render(<Scene />);

    await expect.element(screen.getByRole("heading", { level: 1 })).toBeVisible();
    expect(screen.container.querySelector(".pin-spacer")).toBeNull();
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
