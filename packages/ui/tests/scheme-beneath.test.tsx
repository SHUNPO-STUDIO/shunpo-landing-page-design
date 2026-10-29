import "../src/styles/globals.css";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";

import { schemeBeneath } from "../src/lib/scheme-beneath.ts";

function Page() {
  return (
    <>
      <div data-testid="overlay" className="fixed inset-x-0 top-0 z-40 h-20 scheme-light" />
      <section className="h-40 scheme-dark">
        <p>Night</p>
      </section>
      <section className="h-40">
        <p>Paper</p>
      </section>
    </>
  );
}

describe("schemeBeneath", () => {
  it("reads the scheme of the island under the overlay, not the overlay's own", async () => {
    const screen = await render(<Page />);
    const overlay = screen.getByTestId("overlay").element();

    expect(schemeBeneath(100, 40, overlay)).toBe("dark");
  });

  it("falls back to the page's light paper outside any island", async () => {
    const screen = await render(<Page />);
    const overlay = screen.getByTestId("overlay").element();

    expect(schemeBeneath(100, 240, overlay)).toBe("light");
  });
});
