/* Where the plates of a filing scene stand, in pixels of the scene's canvas. A pose is the GSAP
   transform of an element: a translation from its layout box, a rotation and a scale. Plates turn
   and scale around their centre, the hanko around its bottom centre (`origin-bottom`). */

export interface Point {
  x: number;
  y: number;
}

export interface Box extends Point {
  width: number;
  height: number;
}

export interface Pose extends Point {
  rotation: number;
  scale: number;
}

/* The composition of proposal G, in shares of the board's width (a 680 px board there); the pile
   stays inside the board's right edge, tilt included, so it never overflows the page. */
const PLATE_SHARE = 0.42;
const PILE = [
  { right: -0.035, top: 0.079, rotation: -4 },
  { right: -0.025, top: 0.109, rotation: 5 },
  { right: -0.06, top: 0.144, rotation: -7 },
  { right: -0.015, top: 0.168, rotation: 3 },
] as const;
const FRONT = { left: 0.097, top: -0.074, rotation: -2, grow: 1.06 } as const;
const TILE_FIT = 0.94;
const HANKO_SHARE = 0.27;

/* The pose that puts the plate's top-left corner (as if upright) at `corner.x, corner.y`. */
function placed(plate: Box, corner: Pose): Pose {
  return {
    ...corner,
    x: corner.x + (plate.width * corner.scale) / 2 - (plate.x + plate.width / 2),
    y: corner.y + (plate.height * corner.scale) / 2 - (plate.y + plate.height / 2),
  };
}

function pileScale(board: Box, plate: Box): number {
  return (board.width * PLATE_SHARE) / plate.width;
}

/* A plate waiting in the pile, on the right of the board. */
export function pilePose(board: Box, plate: Box, index: number): Pose {
  const spot = PILE[index % PILE.length] ?? PILE[0];
  const scale = pileScale(board, plate);
  return placed(plate, {
    x: board.x + board.width * (1 + spot.right) - plate.width * scale,
    y: board.y + board.width * spot.top,
    rotation: spot.rotation,
    scale,
  });
}

/* The plate being read and stamped, brought forward on the left of the board. */
export function frontPose(board: Box, plate: Box): Pose {
  return placed(plate, {
    x: board.x + board.width * FRONT.left,
    y: board.y + board.width * FRONT.top,
    rotation: FRONT.rotation,
    scale: pileScale(board, plate) * FRONT.grow,
  });
}

/* The plate filed into a tile of the board: upright, centred and fitted inside it. */
export function tilePose(tile: Box, plate: Box): Pose {
  return {
    x: tile.x + tile.width / 2 - (plate.x + plate.width / 2),
    y: tile.y + tile.height / 2 - (plate.y + plate.height / 2),
    rotation: 0,
    scale: Math.min(tile.width / plate.width, tile.height / plate.height) * TILE_FIT,
  };
}

/* Where a point of the plate (in its own layout coordinates) lands once the plate is posed. */
export function pointOnPlate(plate: Box, pose: Pose, local: Point): Point {
  const angle = (pose.rotation * Math.PI) / 180;
  const dx = (local.x - plate.width / 2) * pose.scale;
  const dy = (local.y - plate.height / 2) * pose.scale;
  return {
    x: plate.x + plate.width / 2 + pose.x + dx * Math.cos(angle) - dy * Math.sin(angle),
    y: plate.y + plate.height / 2 + pose.y + dx * Math.sin(angle) + dy * Math.cos(angle),
  };
}

/* The hanko pressing on a spot: bottom centre on the spot, sized to the plate it stamps. */
export function pressedPose(hanko: Box, spot: Point, plateWidth: number): Pose {
  return {
    x: spot.x - (hanko.x + hanko.width / 2),
    y: spot.y - (hanko.y + hanko.height),
    rotation: 0,
    scale: (plateWidth * HANKO_SHARE) / hanko.width,
  };
}

/* The hanko held above its spot, out of the frame, at an angle. */
export function liftedPose(pressed: Pose, height: number, rotation: number): Pose {
  return { ...pressed, y: pressed.y - height, rotation };
}
