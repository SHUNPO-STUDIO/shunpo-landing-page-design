import {
  type Box,
  type Point,
  type Pose,
  frontPose,
  liftedPose,
  pilePose,
  pointOnPlate,
  pressedPose,
  tilePose,
} from "./filing-geometry.ts";

/* The elements a plate's poses are measured from. */
export interface PoseSources {
  canvas: HTMLElement;
  board: HTMLElement;
  hanko: HTMLElement;
  plate: HTMLElement;
  index: number;
}

export const STAMP = "[data-slot='stamp']";

/* The layout box of an element in the canvas's coordinates (transforms ignored). */
function boxWithin(element: HTMLElement, canvas: HTMLElement): Box {
  let x = 0;
  let y = 0;
  let node: Element | null = element;
  while (node instanceof HTMLElement && node !== canvas) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent;
  }
  return { x, y, width: element.offsetWidth, height: element.offsetHeight };
}

export function poseVars(pose: () => Pose): gsap.TweenVars {
  return {
    x: () => pose().x,
    y: () => pose().y,
    rotation: () => pose().rotation,
    scale: () => pose().scale,
  };
}

/* The centre of the plate's stamp in the plate's own coordinates (its bottom-right corner without one). */
function stampSpot(plate: HTMLElement): Point {
  const stamp = plate.querySelector(STAMP);
  if (!(stamp instanceof HTMLElement)) {
    return { x: plate.offsetWidth, y: plate.offsetHeight };
  }
  const mark = boxWithin(stamp, plate);
  return { x: mark.x + mark.width / 2, y: mark.y + mark.height / 2 };
}

/* Every pose of one step, measured whenever ScrollTrigger refreshes. */
export function posesOf({
  canvas,
  board: boardElement,
  hanko,
  plate: plateElement,
  index,
}: PoseSources) {
  function plate(): Box {
    return boxWithin(plateElement, canvas);
  }
  function board(): Box {
    return boxWithin(boardElement, canvas);
  }
  function front(): Pose {
    return frontPose(board(), plate());
  }
  function pressed(): Pose {
    const box = plate();
    const pose = front();
    const spot = pointOnPlate(box, pose, stampSpot(plateElement));
    return pressedPose(boxWithin(hanko, canvas), spot, box.width * pose.scale);
  }
  return {
    pile: () => pilePose(board(), plate(), index),
    front,
    tile: (tile: HTMLElement) => () => tilePose(boxWithin(tile, canvas), plate()),
    pressed,
    lifted: (rotation: number) => () => liftedPose(pressed(), window.innerHeight, rotation),
  };
}
