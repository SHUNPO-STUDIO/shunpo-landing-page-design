"use client";

import { type HTMLAttributes, type ReactElement, type ReactNode, useRef } from "react";

import { Container } from "../layout/container.tsx";
import { Section } from "../layout/section.tsx";
import { Stack } from "../layout/stack.tsx";
import { type FilmMarks, filmHold, followFilm, useRecede } from "./film-choreography.ts";
import { TextReveal } from "./text-reveal.tsx";
import { sceneLength } from "./tokens.ts";
import { VideoScrub } from "./video-scrub.tsx";
import type { VideoSources } from "./video-seeker.ts";

/* One screen of scroll per screen the stage stays pinned (tablet up, motion allowed). */
function ScrollTrack({ screens }: { screens: number }) {
  return (
    <div aria-hidden="true" className="hidden md:motion-safe:block">
      {Array.from({ length: screens }, (_, screen) => (
        <div key={screen} className="h-svh" />
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
  /* Screens of scroll the stage stays pinned (tablet up) while the film plays. */
  length?: keyof typeof sceneLength;
}

/* A full-screen film behind a centred headline, scrubbed by the scroll (ADR-0025). Pinned from md,
   then covered by the next section; on phones it plays while the stage scrolls by. */
export function FilmScene({
  sources,
  poster,
  still,
  title,
  action,
  length = "medium",
  lightAt = Number.POSITIVE_INFINITY,
  leaveAt = Number.POSITIVE_INFINITY,
  ...props
}: FilmSceneProps) {
  const stage = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const following = useRef<(progress: number) => void>(null);
  const screens = sceneLength[length];
  useRecede(stage, screens);

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
            end="bottom top"
            hold={filmHold(screens)}
            onProgress={onFilmProgress}
          />
          <div data-film-veil aria-hidden="true" className="absolute inset-0 bg-fuji opacity-0" />
          <div
            ref={overlay}
            className="absolute inset-0 grid place-items-center **:transition-colors"
          >
            <Container className="md:-translate-y-24">
              <Stack gap="xl" align="center">
                <TextReveal play="load">{title}</TextReveal>
                <div data-film-action>{action}</div>
              </Stack>
            </Container>
          </div>
        </div>
        <ScrollTrack screens={screens} />
      </div>
    </Section>
  );
}
