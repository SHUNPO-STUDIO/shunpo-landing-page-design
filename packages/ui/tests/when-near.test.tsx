import { afterEach, describe, expect, it, vi } from "vitest";

import { whenNear } from "../src/motion/video-seeker.ts";

function stageOnScreen(): HTMLElement {
  const stage = document.createElement("div");
  stage.style.height = "200px";
  document.body.append(stage);
  return stage;
}

afterEach(() => {
  document.body.replaceChildren();
});

describe("whenNear", () => {
  it("waits for the visitor's first move before loading, even with the film on screen", async () => {
    const load = vi.fn<() => void>();
    whenNear(stageOnScreen(), load);

    await new Promise((resolve) => {
      window.setTimeout(resolve, 300);
    });

    expect(load).not.toHaveBeenCalled();
  });

  it("loads once the visitor scrolls while the film is near", async () => {
    const load = vi.fn<() => void>();
    whenNear(stageOnScreen(), load);

    window.dispatchEvent(new Event("scroll"));

    await expect.poll(() => load.mock.calls.length, { timeout: 5000 }).toBe(1);
  });

  it("never loads after being cancelled", async () => {
    const load = vi.fn<() => void>();
    const cancel = whenNear(stageOnScreen(), load);

    cancel();
    window.dispatchEvent(new Event("scroll"));
    await new Promise((resolve) => {
      window.setTimeout(resolve, 300);
    });

    expect(load).not.toHaveBeenCalled();
  });
});
