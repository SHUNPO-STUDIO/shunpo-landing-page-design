import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";

import { useScrollFrame } from "../src/lib/use-scroll-frame.ts";

function Probe({ onFrame }: { onFrame: () => void }) {
  useScrollFrame(onFrame);
  return null;
}

function nextFrame(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      resolve();
    });
  });
}

describe("useScrollFrame", () => {
  it("runs on mount, then once per animation frame however many scrolls and resizes arrive", async () => {
    const onFrame = vi.fn<() => void>();
    await render(<Probe onFrame={onFrame} />);
    expect(onFrame).toHaveBeenCalledTimes(1);

    window.dispatchEvent(new Event("scroll"));
    window.dispatchEvent(new Event("scroll"));
    window.dispatchEvent(new Event("resize"));
    await nextFrame();

    expect(onFrame).toHaveBeenCalledTimes(2);
  });
});
