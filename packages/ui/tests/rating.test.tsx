import "../src/styles/globals.css";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";

import { Rating } from "../src/components/rating.tsx";

function starRows(container: HTMLElement): { drawn: DOMRect; filled: DOMRect } {
  const drawn = container.querySelector("[data-rating-stars]");
  const filled = container.querySelector("[data-rating-fill]");
  if (drawn === null || filled === null) {
    throw new Error("Rating stars not rendered");
  }
  return { drawn: drawn.getBoundingClientRect(), filled: filled.getBoundingClientRect() };
}

describe("Rating", () => {
  it("fills as many stars as the score, the last one in part", async () => {
    const screen = await render(
      <Rating value={4.6} starsLabel="Note de 4,6 sur 5">
        4,6/5 sur Trustpilot
      </Rating>,
    );

    const { drawn, filled } = starRows(screen.container);
    expect(filled.width / drawn.width).toBeCloseTo(4.6 / 5, 2);
  });

  it("counts the stars out of the given scale", async () => {
    const screen = await render(
      <Rating value={3} stars={4} starsLabel="Note de 3 sur 4">
        3/4
      </Rating>,
    );

    const { drawn, filled } = starRows(screen.container);
    expect(filled.width / drawn.width).toBeCloseTo(3 / 4, 2);
  });

  it("never fills beyond the scale", async () => {
    const screen = await render(
      <Rating value={7} starsLabel="Note de 7 sur 5">
        7/5
      </Rating>,
    );

    const { drawn, filled } = starRows(screen.container);
    expect(filled.width).toBeCloseTo(drawn.width, 0);
  });

  it("reads the score instead of the stars", async () => {
    const screen = await render(
      <Rating value={4.6} starsLabel="Note de 4,6 sur 5">
        4,6/5 sur Trustpilot
      </Rating>,
    );

    await expect.element(screen.getByText("Note de 4,6 sur 5")).toBeInTheDocument();
    expect(screen.container.querySelector("[aria-hidden=true] [data-rating-stars]")).toBeInstanceOf(
      HTMLElement,
    );
  });
});
