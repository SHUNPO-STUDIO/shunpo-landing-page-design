import "../src/styles/globals.css";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { PaperPlate } from "../src/components/paper-plate.tsx";
import { Stamp } from "../src/components/stamp.tsx";
import { SystemDashboard } from "../src/components/system-dashboard.tsx";
import { FilingScene } from "../src/motion/filing-scene.tsx";
import { dashboardSample } from "../stories/support/dashboard-sample.ts";
import { allowMotion, preferReducedMotion } from "./support/reduced-motion.ts";

const PHONE = { width: 390, height: 844 };
const DESKTOP = { width: 1280, height: 800 };
const PICTURE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'/%3E";

const steps = [
  { id: "ressaisie", stamp: "Saisi une fois", targets: ["files", "cases"] },
  { id: "recherche", stamp: "Classé", targets: ["mails"] },
].map((step, index) => ({
  id: step.id,
  targets: step.targets,
  plate: (
    <PaperPlate
      image={<img src={PICTURE} alt={step.id} width={400} height={500} />}
      number={`0${index + 1}`}
      caption={step.id}
      stamp={<Stamp>{step.stamp}</Stamp>}
    />
  ),
  card: <p>Carte {step.id}</p>,
}));

function renderScene() {
  return render(
    <>
      <FilingScene
        heading={<h2>Votre entreprise tourne.</h2>}
        steps={steps}
        outro={<p>Avec SHUNPO</p>}
        board={<SystemDashboard {...dashboardSample} />}
        hanko={<img src={PICTURE} alt="" width={80} height={240} />}
      />
      <div style={{ height: "500vh" }} />
    </>,
  );
}

function opacityOf(element: Element): number {
  return Number(getComputedStyle(element).opacity);
}

function settle(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });
}

beforeEach(async () => {
  await page.viewport(DESKTOP.width, DESKTOP.height);
});

afterEach(async () => {
  window.scrollTo(0, 0);
  await allowMotion();
});

describe("FilingScene", () => {
  it("pins the stage from the tablet breakpoint, plates piled and stamps not yet printed", async () => {
    const screen = await renderScene();

    await expect.element(screen.getByText("Votre entreprise tourne.")).toBeVisible();
    expect(screen.container.querySelector(".pin-spacer")).not.toBeNull();
    const stamp = screen.getByText("Saisi une fois").element();
    expect(opacityOf(stamp)).toBe(0);
    const tile = screen.container.querySelector<HTMLElement>("[data-tile='assistant']");
    expect(tile).not.toBeNull();
    expect(Number(tile?.style.opacity)).toBeLessThan(0.5);
  });

  it("ends on the outro with every plate filed and the whole board alive", async () => {
    const screen = await renderScene();
    window.scrollTo(0, DESKTOP.height * 4);
    await settle();

    await expect.element(screen.getByText("Avec SHUNPO")).toBeVisible();
    for (const tile of screen.container.querySelectorAll("[data-tile]")) {
      expect(opacityOf(tile)).toBe(1);
    }
    for (const plate of screen.container.querySelectorAll("[data-filing^='plate']")) {
      expect(opacityOf(plate)).toBe(0);
    }
    expect(opacityOf(screen.getByText("Classé").element())).toBe(1);
  });

  it("shows the complete story stacked and still when the user prefers reduced motion", async () => {
    await preferReducedMotion();
    const screen = await renderScene();

    await expect.element(screen.getByText("Carte recherche")).toBeVisible();
    expect(screen.container.querySelector(".pin-spacer")).toBeNull();
    expect(opacityOf(screen.getByText("Classé").element())).toBe(1);
  });

  it("stacks the story on phones and prints each stamp as its plate arrives", async () => {
    await page.viewport(PHONE.width, PHONE.height);
    const screen = await renderScene();
    const stamp = screen.getByText("Classé").element();

    expect(screen.container.querySelector(".pin-spacer")).toBeNull();
    expect(opacityOf(stamp)).toBe(0);
    stamp.scrollIntoView({ block: "center" });
    await settle();
    expect(opacityOf(stamp)).toBe(1);
  });
});
