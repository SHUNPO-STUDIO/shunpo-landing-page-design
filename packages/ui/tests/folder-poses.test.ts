import { describe, expect, it } from "vitest";

import {
  type FolderStageLayout,
  filedPose,
  pulledPose,
  readingPose,
  sheetBeats,
} from "../src/lib/folder-poses.ts";

/* A 1120 px stage: the reading area above, the middle folder of three below, a 1056 × 500 sheet. */
const LAYOUT: FolderStageLayout = {
  stageWidth: 1120,
  area: { left: 0, top: 32, width: 1120, height: 560 },
  folder: { left: 389, top: 624, width: 341, height: 237 },
  sheet: { width: 1056, height: 500 },
};

describe("filedPose", () => {
  it("shrinks the sheet to the folder's width, inside its margins", () => {
    expect(filedPose(LAYOUT).scale).toBeCloseTo((341 - 32) / 1056);
  });

  it("centres the sheet on its folder and tucks it just under the folder's top", () => {
    const pose = filedPose(LAYOUT);

    expect(pose.x).toBeCloseTo(389 + 341 / 2 - 1120 / 2);
    expect(pose.y).toBeCloseTo(628);
  });
});

describe("pulledPose", () => {
  it("lifts the filed sheet by half the folder's height", () => {
    const filed = filedPose(LAYOUT);
    const pulled = pulledPose(LAYOUT);

    expect(pulled).toEqual({ ...filed, y: filed.y - 237 / 2 });
  });
});

describe("readingPose", () => {
  it("shows the sheet at full size, centred in the reading area, when it fits", () => {
    expect(readingPose(LAYOUT)).toEqual({ x: 0, y: 32 + (560 - 500) / 2, scale: 1 });
  });

  it("scales a sheet taller than the reading area down, keeping a margin above and below", () => {
    const pose = readingPose({ ...LAYOUT, sheet: { width: 1056, height: 700 } });

    expect(pose.scale).toBeCloseTo((560 - 48) / 700);
    expect(pose.y).toBeCloseTo(32 + 24);
  });

  it("scales a sheet wider than the reading area down to fit", () => {
    const pose = readingPose({ ...LAYOUT, area: { ...LAYOUT.area, width: 800 } });

    expect(pose.scale).toBeCloseTo(800 / 1056);
  });
});

describe("sheetBeats", () => {
  it("gives each sheet one beat of scroll, back to back", () => {
    expect(sheetBeats([false, false, false])).toEqual([
      { start: 0, duration: 1, last: false },
      { start: 1, duration: 1, last: false },
      { start: 2, duration: 1, last: true },
    ]);
  });

  it("gives a sheet that reveals a figure half a beat more", () => {
    expect(sheetBeats([false, true, false]).map((beat) => beat.start)).toEqual([0, 1, 2.5]);
  });
});
