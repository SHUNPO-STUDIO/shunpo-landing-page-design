import { describe, expect, it } from "vitest";

import {
  type Box,
  frontPose,
  liftedPose,
  pilePose,
  pointOnPlate,
  pressedPose,
  tilePose,
} from "../src/motion/filing-geometry.ts";

const board: Box = { x: 500, y: 100, width: 600, height: 480 };
const plate: Box = { x: 0, y: 0, width: 280, height: 380 };
const hanko: Box = { x: 0, y: 0, width: 80, height: 240 };

function corners(pose: ReturnType<typeof pilePose>) {
  const width = plate.width * pose.scale;
  const height = plate.height * pose.scale;
  const left = plate.x + plate.width / 2 + pose.x - width / 2;
  const top = plate.y + plate.height / 2 + pose.y - height / 2;
  return { left, top, right: left + width, bottom: top + height };
}

describe("pilePose", () => {
  it("piles the plates on the right half of the board, each at its own angle", () => {
    const poses = [0, 1, 2, 3].map((index) => pilePose(board, plate, index));

    for (const pose of poses) {
      const { left, right } = corners(pose);
      expect(left).toBeGreaterThan(board.x + board.width / 2);
      expect(right).toBeLessThanOrEqual(board.x + board.width);
    }
    expect(new Set(poses.map((pose) => pose.rotation)).size).toBe(4);
  });

  it("sizes a plate to a share of the board's width", () => {
    const pose = pilePose(board, plate, 0);

    expect(plate.width * pose.scale).toBeCloseTo(board.width * 0.42);
  });

  it("starts again from the first angle after four plates", () => {
    expect(pilePose(board, plate, 4)).toEqual(pilePose(board, plate, 0));
  });
});

describe("frontPose", () => {
  it("brings the plate forward on the left of the board, slightly larger than in the pile", () => {
    const front = frontPose(board, plate);
    const { left } = corners(front);

    expect(left).toBeLessThan(board.x + board.width / 4);
    expect(front.scale).toBeGreaterThan(pilePose(board, plate, 0).scale);
  });
});

describe("tilePose", () => {
  it("centres the plate on the tile, upright and fitted inside it", () => {
    const tile: Box = { x: 700, y: 300, width: 120, height: 90 };
    const pose = tilePose(tile, plate);
    const { left, top, right, bottom } = corners(pose);

    expect(pose.rotation).toBe(0);
    expect((left + right) / 2).toBeCloseTo(tile.x + tile.width / 2);
    expect((top + bottom) / 2).toBeCloseTo(tile.y + tile.height / 2);
    expect(bottom - top).toBeLessThanOrEqual(tile.height);
    expect(right - left).toBeLessThanOrEqual(tile.width);
  });
});

describe("pointOnPlate", () => {
  it("follows a point of the plate through translation, rotation and scale", () => {
    const centre = { x: plate.width / 2, y: plate.height / 2 };
    const corner = { x: plate.width, y: plate.height / 2 };
    const pose = { x: 10, y: 20, rotation: 90, scale: 2 };

    expect(pointOnPlate(plate, pose, centre)).toEqual({ x: 150, y: 210 });
    const moved = pointOnPlate(plate, pose, corner);
    expect(moved.x).toBeCloseTo(150);
    expect(moved.y).toBeCloseTo(210 + plate.width);
  });
});

describe("pressedPose and liftedPose", () => {
  const spot = { x: 300, y: 400 };

  it("presses the hanko's bottom centre on the spot, sized to the plate", () => {
    const pose = pressedPose(hanko, spot, 300);

    expect(hanko.x + hanko.width / 2 + pose.x).toBe(spot.x);
    expect(hanko.y + hanko.height + pose.y).toBe(spot.y);
    expect(hanko.width * pose.scale).toBeCloseTo(300 * 0.27);
  });

  it("holds the hanko a full height above the spot, tilted", () => {
    const pressed = pressedPose(hanko, spot, 300);
    const lifted = liftedPose(pressed, 900, -9);

    expect(lifted.y).toBe(pressed.y - 900);
    expect(lifted.rotation).toBe(-9);
    expect(lifted.scale).toBe(pressed.scale);
  });
});
