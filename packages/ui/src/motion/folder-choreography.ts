import { gsap } from "gsap";

import {
  type FolderStageLayout,
  filedPose,
  pulledPose,
  readingPose,
  type SheetBeat,
  type SheetPose,
  sheetBeats,
} from "../lib/folder-poses.ts";
import { pressStamp } from "./press-stamp.ts";
import { sceneLength, scrub } from "./tokens.ts";

/* The scroll story of a `FolderScene`, in beats (one beat per sheet, see `sheetBeats`): the title gives way,
   then each sheet is pulled out of its folder, rises to reading size, and is filed back as the next one
   comes out. The last sheet stays out. While a sheet is out, its `data-reveal` parts play. */

interface FolderParts {
  body: HTMLElement;
  front: HTMLElement;
  past: HTMLElement;
  active: HTMLElement;
  sheet: HTMLElement;
}

type Measure = () => FolderStageLayout;
type PoseOf = (layout: FolderStageLayout) => SheetPose;

/* One folder's part of the story: its elements, how to measure it and its beat. */
interface FolderCue {
  parts: FolderParts;
  measure: Measure;
  beat: SheetBeat;
}

const PULL = 0.12;
const RISE = 0.2;
const RETURN = 0.14;
const FILE = 0.12;
const MARK = 0.06;
const LIFT = -6;
const FRONT = 40;
const BEHIND = 20;
const REVEAL_FROM = 0.34;
const REVEAL_SPAN = 0.64;
const LAST_READ = 0.5;
const LONE_BEAT: SheetBeat = { start: 0, duration: 1, last: true };

function part(scope: ParentNode, selector: string): HTMLElement {
  const element = scope.querySelector<HTMLElement>(selector);
  if (element === null) {
    throw new Error(`FolderScene: missing ${selector}.`);
  }
  return element;
}

function foldersOf(stage: HTMLElement): FolderParts[] {
  return [...stage.querySelectorAll<HTMLElement>("[data-slot=folder]")].map((folder) => ({
    body: part(folder, "[data-slot=folder-body]"),
    front: part(folder, "[data-slot=folder-front]"),
    past: part(folder, "[data-slot=folder-drop] [data-part=past]"),
    active: part(folder, "[data-slot=folder-drop] [data-part=active]"),
    sheet: part(folder, "[data-slot=folder-sheet]"),
  }));
}

function boxOf(element: HTMLElement) {
  return {
    left: element.offsetLeft,
    top: element.offsetTop,
    width: element.offsetWidth,
    height: element.offsetHeight,
  };
}

/* Layout boxes ignore transforms, so measuring mid-scene gives the same answer as at rest. */
function measureFolder(stage: HTMLElement, opening: HTMLElement, folder: FolderParts): Measure {
  return () => ({
    stageWidth: stage.clientWidth,
    area: boxOf(opening),
    folder: boxOf(folder.body),
    sheet: { width: folder.sheet.offsetWidth, height: folder.sheet.offsetHeight },
  });
}

function poseVars(measure: Measure, poseOf: PoseOf): gsap.TweenVars {
  return {
    x: () => poseOf(measure()).x,
    y: () => poseOf(measure()).y,
    scale: () => poseOf(measure()).scale,
  };
}

function moveSheet(timeline: gsap.core.Timeline, { parts, measure, beat }: FolderCue): void {
  const { sheet } = parts;
  const { start, duration } = beat;
  const filed = poseVars(measure, filedPose);
  const pulled = poseVars(measure, pulledPose);
  timeline
    .fromTo(sheet, filed, { ...pulled, duration: PULL, ease: "power2.out" }, start)
    .set(sheet, { zIndex: FRONT }, start + PULL)
    .to(
      sheet,
      { ...poseVars(measure, readingPose), duration: RISE, ease: "power2.inOut" },
      start + PULL,
    );
  if (beat.last) {
    return;
  }
  timeline
    .to(
      sheet,
      { ...pulled, duration: RETURN, ease: "power2.inOut" },
      start + duration - RETURN - FILE,
    )
    .to(sheet, { ...filed, duration: FILE, ease: "power2.in" }, start + duration - FILE)
    .set(sheet, { zIndex: BEHIND }, start + duration);
}

/* The open folder lifts its front and shows a Fushimi drop; once passed, its drop turns Fuji Night. */
function markFolder(timeline: gsap.core.Timeline, { parts, beat }: FolderCue): void {
  const { front, past, active } = parts;
  const { start, duration } = beat;
  timeline
    .fromTo(active, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: MARK }, start)
    .to(front, { y: LIFT, duration: MARK }, start);
  if (beat.last) {
    return;
  }
  timeline
    .to(active, { opacity: 0, scale: 0.5, duration: MARK }, start + duration)
    .to(past, { opacity: 1, duration: MARK }, start + duration)
    .to(front, { y: 0, duration: MARK }, start + duration);
}

/* Brush strokes paint one after another, then each brick washes in and is stamped. */
function revealParts(sheet: HTMLElement): gsap.core.Timeline | undefined {
  const strokes = sheet.querySelectorAll("[data-reveal=paint]");
  const fills = [...sheet.querySelectorAll<HTMLElement>("[data-reveal=fill]")];
  if (strokes.length === 0 && fills.length === 0) {
    return undefined;
  }
  const reveal = gsap.timeline();
  reveal.fromTo(
    strokes,
    { strokeDashoffset: 1 },
    { strokeDashoffset: 0, duration: 1.4, stagger: 0.28, ease: "power2.inOut" },
  );
  fills.forEach((fill, index) => {
    const at = 3.1 + index * 0.87;
    reveal.fromTo(fill, { opacity: 0 }, { opacity: 1, duration: 0.4 }, at);
    const stamp = fill.querySelector("[data-reveal=stamp]");
    if (stamp !== null) {
      pressStamp(reveal, stamp, at + 0.33);
    }
  });
  return reveal;
}

export function stageFolders(stage: HTMLElement): gsap.core.Timeline {
  const opening = part(stage, "[data-slot=folder-scene-opening]");
  const folders = foldersOf(stage);
  const beats = sheetBeats(
    folders.map(({ sheet }) => sheet.querySelector("[data-reveal]") !== null),
  );
  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: stage,
      start: "top top",
      end: `+=${sceneLength.long * 100}%`,
      pin: true,
      scrub,
      invalidateOnRefresh: true,
    },
  });
  timeline.to(opening, { opacity: 0, y: -36, duration: 0.18 }, 0.04);
  folders.forEach((parts, index) => {
    const cue = {
      parts,
      measure: measureFolder(stage, opening, parts),
      beat: beats[index] ?? LONE_BEAT,
    };
    moveSheet(timeline, cue);
    markFolder(timeline, cue);
    const reveal = revealParts(parts.sheet);
    if (reveal !== undefined) {
      timeline.add(reveal.duration(REVEAL_SPAN), cue.beat.start + REVEAL_FROM);
    }
  });
  const last = beats.at(-1);
  return timeline.set({}, {}, (last?.start ?? 0) + PULL + RISE + LAST_READ);
}
