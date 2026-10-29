"use client";

import { cva } from "class-variance-authority";
import {
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type RefObject,
  useRef,
} from "react";

import { Container } from "../layout/container.tsx";
import { Section } from "../layout/section.tsx";
import { Stack } from "../layout/stack.tsx";
import { type FilmMarks, filmEnd, followFilm, useRecede } from "./film-choreography.ts";
import { TextReveal } from "./text-reveal.tsx";
import { type pinFrom, sceneLength } from "./tokens.ts";
import { VideoScrub } from "./video-scrub.tsx";
import type { VideoSources } from "./video-seeker.ts";

const trackVariants = cva("hidden", {
  variants: {
    minWidth: {
      all: "motion-safe:block",
      md: "md:motion-safe:block",
    },
  },
});

interface ScrollTrackProps {
  ref: RefObject<HTMLDivElement | null>;
  screens: number;
  minWidth: keyof typeof pinFrom;
}

/* One screen of scroll (`h-scroll-screen`, scaled on the width like the prototype) per screen the
   stage stays pinned. */
function ScrollTrack({ ref, screens, minWidth }: ScrollTrackProps) {
  return (
    <div ref={ref} aria-hidden="true" className={trackVariants({ minWidth })}>
      {Array.from({ length: screens }, (_, screen) => (
        <div key={screen} className="h-scroll-screen" />
      ))}
    </div>
  );
}

interface FilmSceneProps
  extends Omit<HTMLAttributes<HTMLElement>, "children" | "title">, Partial<FilmMarks> {
  sources: VideoSources;
  /* First frame of the film, the page's LCP: `<Image fill … />`. */
  poster: ReactElement;
  /* Shown instead of the film under reduced motion. */
  still?: ReactElement;
  /* The headline: its lines rise on load. */
  title: ReactElement;
  action: ReactNode;
  /* Screens of scroll the stage stays pinned while the film plays. */
  length?: keyof typeof sceneLength;
  /* Where the stage pins: at every width, or from the tablet breakpoint (it scrolls by below). */
  minWidth?: keyof typeof pinFrom;
}

/* A full-screen film behind a centred headline, scrubbed by the scroll (ADR-0025). The stage stays pinned
   while the film plays, then the next section covers it. */
export function FilmScene({
  sources,
  poster,
  still,
  title,
  action,
  length = "medium",
  minWidth = "all",
  lightAt = Number.POSITIVE_INFINITY,
  leaveAt = Number.POSITIVE_INFINITY,
  ...props
}: FilmSceneProps) {
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const following = useRef<(progress: number) => void>(null);
  useRecede(stage, minWidth);

  function onFilmProgress(progress: number): void {
    if (overlay.current === null) {
      return;
    }
    following.current ??= followFilm(overlay.current, { lightAt, leaveAt });
    following.current(progress);
  }

  return (
    <Section scheme="dark" className="relative py-0 md:py-0" {...props}>
      <div data-slot="film-scene">
        <div ref={stage} className="relative h-svh overflow-clip">
          <VideoScrub
            sources={sources}
            poster={poster}
            {...(still === undefined ? {} : { still })}
            start="top top"
            end={() => filmEnd(stage.current, track.current)}
            onProgress={onFilmProgress}
          />
          <div data-film-veil aria-hidden="true" className="absolute inset-0 bg-fuji opacity-0" />
          <div
            ref={overlay}
            className="absolute inset-0 grid place-items-center **:transition-colors"
          >
            <Container className="md:tall:-translate-y-24">
              <Stack gap="xl" align="center">
                <TextReveal play="load">{title}</TextReveal>
                <div data-film-action>{action}</div>
              </Stack>
            </Container>
          </div>
        </div>
        <ScrollTrack ref={track} screens={sceneLength[length]} minWidth={minWidth} />
      </div>
    </Section>
  );
}
