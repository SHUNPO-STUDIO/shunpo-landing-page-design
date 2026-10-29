/* Scroll jitter (trackpads, Lenis easing) smaller than this never toggles a bar. */
const TOLERANCE_PX = 4;

/* A fixed bar hides while the reader scrolls down and comes back as soon as they scroll up. */
export function hiddenAfterScroll(hidden: boolean, delta: number): boolean {
  if (delta > TOLERANCE_PX) {
    return true;
  }
  if (delta < -TOLERANCE_PX) {
    return false;
  }
  return hidden;
}
