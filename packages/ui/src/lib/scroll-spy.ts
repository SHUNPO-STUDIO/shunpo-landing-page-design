/* The section being read: the last one whose top has crossed the reading line, or -1 before the first.
   A section missing from the page has an infinite top, so it never becomes current. */
export function currentSectionIndex(tops: readonly number[], line: number): number {
  return tops.findLastIndex((top) => top <= line);
}
