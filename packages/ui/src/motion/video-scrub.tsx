"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactElement, useRef } from "react";

import { cn } from "../lib/cn.ts";
import { mounted } from "../lib/mounted.ts";
import { createVideoSeeker, filmProgress, type VideoSources, whenNear } from "./video-seeker.ts";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ALLOW_MOTION = "(prefers-reduced-motion: no-preference)";

interface FilmRange {
  sources: VideoSources;
  /* ScrollTrigger positions of the range that plays the film, measured on the section holding it. */
  start: string;
  end: string;
  /* Share of the range, at its end, that keeps the last frame. */
  hold: number;
  /* Follows the film's progress (0 to 1), for scenes that react to the image. */
  onProgress?: ((progress: number) => void) | undefined;
}

/* Downloads the film when idle and near, then paints the frame the scroll asks for. */
function scrubFilm(box: HTMLElement, video: HTMLVideoElement, range: FilmRange): () => void {
  const seeker = createVideoSeeker(video, range.sources);
  const stopWatching = whenNear(video, seeker.load);
  function follow(trigger: ScrollTrigger): void {
    const progress = filmProgress(trigger.progress, range.hold);
    seeker.seek(progress);
    range.onProgress?.(progress);
  }
  ScrollTrigger.create({
    trigger: box.closest("section") ?? box,
    start: range.start,
    end: range.end,
    onUpdate: follow,
    onRefresh: follow,
  });
  return () => {
    stopWatching();
    seeker.dispose();
  };
}

interface VideoScrubProps extends Partial<Omit<FilmRange, "sources">> {
  sources: VideoSources;
  /* The first frame as an image (the page's LCP when the film opens it): `<Image fill … />`. */
  poster: ReactElement;
  /* Shown instead of the film under reduced motion; the poster by default. */
  still?: ReactElement;
  className?: string;
}

/* A film whose frame follows the scroll (ADR-0025). It fills its positioned parent; its sources are
   attached and downloaded once the page is idle and the scene a screen away at most, never under
   reduced motion. */
export function VideoScrub({
  sources,
  poster,
  still,
  start = "top bottom",
  end = "bottom top",
  hold = 0,
  onProgress,
  className,
}: VideoScrubProps) {
  const root = useRef<HTMLDivElement>(null);
  const film = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      gsap
        .matchMedia()
        .add(ALLOW_MOTION, () =>
          scrubFilm(mounted(root), mounted(film), { sources, start, end, hold, onProgress }),
        );
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      data-slot="video-scrub"
      className={cn(
        "absolute inset-0 overflow-clip *:absolute *:inset-0 *:size-full [&_img]:size-full [&_img]:object-cover",
        className,
      )}
    >
      <div className={cn(still !== undefined && "motion-reduce:hidden")}>{poster}</div>
      <video
        ref={film}
        className="object-cover motion-reduce:hidden"
        muted
        playsInline
        disablePictureInPicture
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      />
      {still === undefined ? null : <div className="hidden motion-reduce:block">{still}</div>}
    </div>
  );
}
