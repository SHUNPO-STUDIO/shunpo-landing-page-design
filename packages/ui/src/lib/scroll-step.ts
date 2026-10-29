/* Share of a step the scroll must pass beyond a boundary before the step changes, so it never flickers. */
const DEAD_ZONE = 0.04;

/* The step a pinned scroll lands on, from its progress (0 to 1) and the step shown now. */
export function stepAt(progress: number, current: number, count: number): number {
  const position = progress * count;
  let step = current;
  while (step < count - 1 && position >= step + 1 + DEAD_ZONE) {
    step += 1;
  }
  while (step > 0 && position < step - DEAD_ZONE) {
    step -= 1;
  }
  return step;
}

/* The progress at the middle of a step: where a jump to that step lands. */
export function stepCentre(step: number, count: number): number {
  return (step + 0.5) / count;
}
