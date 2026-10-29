interface HorizontalBox {
  left: number;
  width: number;
}

/* A badge pushed from its left half swings clockwise, from its right half anticlockwise. */
export function pushDirection(pointerX: number, box: HorizontalBox): 1 | -1 {
  return pointerX < box.left + box.width / 2 ? 1 : -1;
}

/* Neighbours drop in from opposite sides, so a row settles like a real rack of badges. */
export function entranceSide(order: number): 1 | -1 {
  return order % 2 === 0 ? 1 : -1;
}
