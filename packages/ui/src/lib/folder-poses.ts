/* Where a folder sheet sits during a `FolderScene`. Every pose is a transform of the sheet from its place
   on stage (top of the stage, centred, origin at its top centre), in pixels relative to the stage. */

export interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface FolderStageLayout {
  stageWidth: number;
  /* Above the folders: where the title opens the scene and where a pulled sheet is read. */
  area: Box;
  /* The folder's body (back and front), without its tab. */
  folder: Box;
  sheet: { width: number; height: number };
}

export interface SheetPose {
  x: number;
  y: number;
  scale: number;
}

export interface SheetBeat {
  start: number;
  duration: number;
  last: boolean;
}

/* The sheet inside its folder: inset from the folder's sides, tucked just under its top edge. */
const FILED_INSET = { x: 16, y: 4 } as const;
const PULL_SHARE = 0.5;
const READING_MARGIN = 24;
const BEAT = 1;
const REVEAL_BEAT = 1.5;

function offsetToCentre(stageWidth: number, box: Pick<Box, "left" | "width">): number {
  return box.left + box.width / 2 - stageWidth / 2;
}

export function filedPose({ stageWidth, folder, sheet }: FolderStageLayout): SheetPose {
  return {
    x: offsetToCentre(stageWidth, folder),
    y: folder.top + FILED_INSET.y,
    scale: (folder.width - 2 * FILED_INSET.x) / sheet.width,
  };
}

/* Half out of its folder, before it rises to reading size. */
export function pulledPose(layout: FolderStageLayout): SheetPose {
  const filed = filedPose(layout);
  return { ...filed, y: filed.y - layout.folder.height * PULL_SHARE };
}

/* As large as the reading area allows (keeping a margin from the title's top and the folders' tabs),
   never above full size, centred in it. */
export function readingPose({ stageWidth, area, sheet }: FolderStageLayout): SheetPose {
  const scale = Math.min(
    1,
    (area.height - 2 * READING_MARGIN) / sheet.height,
    area.width / sheet.width,
  );
  return {
    x: offsetToCentre(stageWidth, area),
    y: area.top + (area.height - sheet.height * scale) / 2,
    scale,
  };
}

/* One beat of scroll per sheet, back to back; a sheet that reveals a figure stays out half a beat longer. */
export function sheetBeats(revealing: readonly boolean[]): SheetBeat[] {
  let start = 0;
  return revealing.map((reveals, index) => {
    const duration = reveals ? REVEAL_BEAT : BEAT;
    const beat = { start, duration, last: index === revealing.length - 1 };
    start += duration;
    return beat;
  });
}
