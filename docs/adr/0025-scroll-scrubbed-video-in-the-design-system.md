---
status: proposed
date: 2026-10-29
decision-makers: [project owner]
---

# 0025. Scroll-scrubbed video in the design system

## Context and problem statement

The SHUNPO page tells its story with filmed scenes read by the scroll: the hero's sunrise (night, red sun, peach dawn) and the paper samurai's bow at the close. ADR-0022 covers images only and asks for an ADR when a page needs video. How does a page play a video in step with the scroll without hurting performance, accessibility or the "apps never style" rule?

## Decision drivers

- Smooth scrubbing on desktop and mobile: every frame reachable when the scroll moves backwards.
- Lighthouse performance ≥ 0.95: the largest contentful paint is a still, not a video.
- Reduced motion shows a complete, still page.
- GSAP stays the only animation engine (ADR-0011).

## Considered options

- A `VideoScrub` motion component in `@repo/ui` driving `currentTime` from a GSAP ScrollTrigger
- Image sequences drawn on a canvas
- Autoplaying loops

## Decision outcome

Chosen option: "A `VideoScrub` motion component", because one encoded file per scene is far lighter than an image sequence and keeps the frame-accurate, reversible control an autoplaying loop cannot give.

- Files live in `apps/web/public/media/<feature>/<slot>.{webm,mp4}` with a poster rendered through `next/image`. They are encoded with a short keyframe interval so seeking backwards stays fluid, without audio, with `+faststart`.
- The poster is the LCP; the video loads with `preload="none"` and is attached once the page is idle.
- Under reduced motion the component shows the poster (or the final frame) and never pins.
- `public/` files referenced by string go through `NEXT_PUBLIC_BASE_PATH` (ADR-0023).

### Consequences

- Good, because scenes stay faithful to the filmed material and seek in both directions.
- Bad, because video files are heavy; each scene is budgeted and checked with Lighthouse.
- Bad, because Safari seeks less precisely on WebM: MP4 (H.264) is listed first for it.

## More information

- Related: ADR-0011, ADR-0022, ADR-0023.
- Revisit when the scenes are rebuilt as WebGL or when a lighter codec gains universal support.
