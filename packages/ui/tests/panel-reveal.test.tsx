import "../src/styles/globals.css";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { CasePanel } from "../src/components/case-panel.tsx";
import { PanelReveal } from "../src/motion/panel-reveal.tsx";
import { allowMotion, preferReducedMotion } from "./support/reduced-motion.ts";

beforeEach(async () => {
  await page.viewport(1280, 800);
});

afterEach(async () => {
  await allowMotion();
});

async function renderPanel() {
  const screen = await render(
    <>
      <div className="h-dvh" />
      <PanelReveal>
        <CasePanel
          as="li"
          backdrop={<span />}
          logo={<span>TF1</span>}
          client="TF1"
          sector="Médias"
          figure="+1,4 M"
          figureLabel="Téléspectateurs et joueurs"
        >
          Une application de jeu synchronisée avec le direct.
        </CasePanel>
      </PanelReveal>
    </>,
  );
  const panel = screen.container.querySelector<HTMLElement>("[data-slot='case-panel']");
  if (panel === null) {
    throw new Error("The panel is missing");
  }
  return panel;
}

describe("PanelReveal", () => {
  it("keeps a panel below the fold folded inside a smaller frame", async () => {
    const panel = await renderPanel();

    expect(panel.style.clipPath).toContain("12%");
  });

  it("shows the panel open when the user prefers reduced motion", async () => {
    await preferReducedMotion();
    const panel = await renderPanel();

    expect(panel.style.clipPath).toBe("");
  });
});
