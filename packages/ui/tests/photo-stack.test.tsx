import "../src/styles/globals.css";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";

import { PhotoStack } from "../src/components/photo-stack.tsx";
import { allowMotion, preferReducedMotion } from "./support/reduced-motion.ts";

afterEach(async () => {
  await allowMotion();
});

const PIXEL = "data:image/gif;base64,R0lGODlhAQABAAAAACw=";

const photos = ["Accounting", "Property", "Construction"].map((name) => (
  <img key={name} alt={name} src={PIXEL} />
));

function shown(container: HTMLElement): string[] {
  return [...container.querySelectorAll<HTMLElement>("[data-photo]")]
    .filter((card) => getComputedStyle(card).visibility === "visible")
    .map((card) => card.querySelector("img")?.alt ?? "");
}

describe("PhotoStack", () => {
  it("lays every print up to the active one on the pile", async () => {
    const screen = await render(<PhotoStack photos={photos} active={1} />);

    expect(shown(screen.container)).toEqual(["Accounting", "Property"]);
  });

  it("drops the next prints on the pile and lifts them off again", async () => {
    const screen = await render(<PhotoStack photos={photos} active={0} />);

    await screen.rerender(<PhotoStack photos={photos} active={2} />);
    await vi.waitFor(() => {
      expect(shown(screen.container)).toEqual(["Accounting", "Property", "Construction"]);
    });

    await screen.rerender(<PhotoStack photos={photos} active={0} />);
    await vi.waitFor(() => {
      expect(shown(screen.container)).toEqual(["Accounting"]);
    });
  });

  it("swaps prints at once when the user prefers reduced motion", async () => {
    await preferReducedMotion();
    const screen = await render(<PhotoStack photos={photos} active={0} />);

    await screen.rerender(<PhotoStack photos={photos} active={1} />);
    await vi.waitFor(() => {
      expect(shown(screen.container)).toEqual(["Accounting", "Property"]);
    });

    await screen.rerender(<PhotoStack photos={photos} active={0} />);
    await vi.waitFor(() => {
      expect(shown(screen.container)).toEqual(["Accounting"]);
    });
  });

  it("lays the paper sheet under the prints, hidden from assistive technology", async () => {
    const screen = await render(
      <PhotoStack photos={photos} active={0} paper={<img alt="" src={PIXEL} />} />,
    );

    expect(screen.container.querySelector("[aria-hidden='true'] img")).not.toBeNull();
  });
});
