import { gsap } from "gsap";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";

import { poseVars, posesOf } from "../src/motion/filing-measure.ts";

function Canvas({ stamped }: { stamped: boolean }) {
  return (
    <div data-part="canvas" style={{ position: "relative", width: 1200, height: 700 }}>
      <div
        data-part="board"
        style={{ position: "absolute", left: 500, top: 100, width: 600, height: 480 }}
      />
      <div
        data-part="plate"
        style={{ position: "absolute", left: 40, top: 60, width: 280, height: 380 }}
      >
        {stamped ? (
          <div
            data-slot="stamp"
            style={{ position: "absolute", left: 150, top: 280, width: 80, height: 60 }}
          />
        ) : null}
        <div data-part="corner" style={{ position: "absolute", right: 0, bottom: 0 }} />
      </div>
      <div
        data-part="hanko"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 80,
          height: 240,
          transformOrigin: "bottom",
        }}
      />
    </div>
  );
}

function part(container: HTMLElement, name: string): HTMLElement {
  const element = container.querySelector<HTMLElement>(
    `[data-part='${name}'], [data-slot='${name}']`,
  );
  if (element === null) {
    throw new Error(`Missing ${name}`);
  }
  return element;
}

function centreOf(element: Element) {
  const box = element.getBoundingClientRect();
  return { x: (box.left + box.right) / 2, y: (box.top + box.bottom) / 2 };
}

/* Brings the plate forward, presses the hanko on it and returns where the hanko's bottom centre lands. */
async function press(stamped: boolean) {
  const { container } = await render(<Canvas stamped={stamped} />);
  const plate = part(container, "plate");
  const hanko = part(container, "hanko");
  const poses = posesOf({
    canvas: part(container, "canvas"),
    board: part(container, "board"),
    hanko,
    plate,
    index: 0,
  });
  gsap.set(plate, poseVars(poses.front));
  gsap.set(hanko, poseVars(poses.pressed));
  const box = hanko.getBoundingClientRect();
  return { container, landing: { x: (box.left + box.right) / 2, y: box.bottom } };
}

describe("posesOf", () => {
  it("presses the hanko's bottom centre on the centre of the plate's stamp", async () => {
    const { container, landing } = await press(true);
    const stamp = centreOf(part(container, "stamp"));

    expect(landing.x).toBeCloseTo(stamp.x, 0);
    expect(landing.y).toBeCloseTo(stamp.y, 0);
  });

  it("presses the plate's bottom-right corner when the plate has no stamp", async () => {
    const { container, landing } = await press(false);
    const corner = part(container, "corner").getBoundingClientRect();

    expect(landing.x).toBeCloseTo(corner.left, 0);
    expect(landing.y).toBeCloseTo(corner.top, 0);
  });
});
