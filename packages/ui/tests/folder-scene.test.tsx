import "../src/styles/globals.css";
import { afterEach, describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { BrushGrid } from "../src/components/brush-grid.tsx";
import { FolderList } from "../src/components/folder-list.tsx";
import { FolderSceneOpening } from "../src/components/folder-scene-opening.tsx";
import { FolderSheet } from "../src/components/folder-sheet.tsx";
import { Folder } from "../src/components/folder.tsx";
import { FolderScene } from "../src/motion/folder-scene.tsx";
import { allowMotion, preferReducedMotion } from "./support/reduced-motion.ts";

const DESKTOP = { width: 1280, height: 800 };
const PHONE = { width: 390, height: 844 };

const bricks = ["Relances", "Pièces comptables", "Planning", "Tableau de bord"].map(
  (label, index) => ({ kicker: `Brique ${index + 1}`, label }),
);

afterEach(async () => {
  await allowMotion();
  await page.viewport(DESKTOP.width, DESKTOP.height);
  window.scrollTo(0, 0);
});

function renderScene() {
  return render(
    <>
      <FolderScene>
        <FolderSceneOpening>
          <h2>Méthode</h2>
        </FolderSceneOpening>
        <FolderList>
          <Folder tab="Étape 1" kanji="見" title="Immersion" caption="5 jours">
            <FolderSheet kanji="見">
              <p>Immersion</p>
            </FolderSheet>
          </Folder>
          <Folder tab="Étape 2" kanji="築" title="Construction" caption="Brique par brique">
            <FolderSheet kanji="築" layout="feature">
              <p>Construction</p>
              <BrushGrid bricks={bricks} stamp="Livré" caption="Exemple" />
            </FolderSheet>
          </Folder>
        </FolderList>
      </FolderScene>
      <div className="h-dvh" />
    </>,
  );
}

function scene(container: HTMLElement): HTMLElement {
  const element = container.querySelector<HTMLElement>("[data-slot=folder-scene]");
  if (element === null) {
    throw new Error("FolderScene did not render.");
  }
  return element;
}

function opacityOf(container: HTMLElement, selector: string): string {
  const element = container.querySelector(selector);
  return element === null ? "missing" : getComputedStyle(element).opacity;
}

function sheetScale(container: HTMLElement): number {
  const sheet = container.querySelector("[data-slot=folder-sheet]");
  return sheet === null ? 1 : new DOMMatrix(getComputedStyle(sheet).transform).a;
}

describe("FolderScene", () => {
  it("keeps folders and sheets stacked and complete on phones, without pinning", async () => {
    await page.viewport(PHONE.width, PHONE.height);
    const screen = await renderScene();

    expect(scene(screen.container).dataset["staged"]).toBeUndefined();
    expect(screen.container.querySelector(".pin-spacer")).toBeNull();
    expect(opacityOf(screen.container, "[data-reveal=fill]")).toBe("1");
  });

  it("keeps the finished grid still when the reader prefers reduced motion", async () => {
    await preferReducedMotion();
    const screen = await renderScene();

    expect(scene(screen.container).dataset["staged"]).toBeUndefined();
    expect(screen.container.querySelector(".pin-spacer")).toBeNull();
    expect(opacityOf(screen.container, "[data-reveal=stamp]")).toBe("1");
  });

  it("stages the folders from the tablet up, each sheet filed in its folder", async () => {
    const screen = await renderScene();

    expect(scene(screen.container).dataset["staged"]).toBe("");
    expect(screen.container.querySelector(".pin-spacer")).not.toBeNull();
    expect(sheetScale(screen.container)).toBeLessThan(0.5);
  });

  it("pins a scene that only has its opening and fades the opening out on scroll", async () => {
    const screen = await render(
      <>
        <FolderScene>
          <FolderSceneOpening>
            <h2>Méthode</h2>
          </FolderSceneOpening>
        </FolderScene>
        <div className="h-dvh" />
      </>,
    );

    expect(screen.container.querySelector(".pin-spacer")).not.toBeNull();
    expect(opacityOf(screen.container, "[data-slot=folder-scene-opening]")).toBe("1");
    window.scrollTo(0, DESKTOP.height * 1.5);

    await expect
      .poll(() => opacityOf(screen.container, "[data-slot=folder-scene-opening]"))
      .toBe("0");
  });

  it("leaves the grid to paint while its sheet is out", async () => {
    const screen = await renderScene();

    expect(opacityOf(screen.container, "[data-reveal=fill]")).toBe("0");
    expect(screen.container.querySelector("[data-reveal=paint]")?.getAttribute("style")).toContain(
      "stroke-dashoffset: 1",
    );
  });
});
