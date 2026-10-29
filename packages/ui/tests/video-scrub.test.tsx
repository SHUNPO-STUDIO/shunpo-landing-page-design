import "../src/styles/globals.css";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";

import { VideoScrub } from "../src/motion/video-scrub.tsx";
import mp4 from "../stories/support/rising-sun.mp4?url";
import webm from "../stories/support/rising-sun.webm?url";
import { allowMotion, preferReducedMotion } from "./support/reduced-motion.ts";

const FRAME = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'/%3E";

function Film({ onProgress }: { onProgress?: (progress: number) => void }) {
  return (
    <>
      <section className="relative h-svh">
        <VideoScrub
          sources={{ mp4, webm }}
          poster={<img src={FRAME} alt="Night over the mountains" />}
          still={<img src={FRAME} alt="The sun has risen" />}
          start="top top"
          end="bottom top"
          hold={0.5}
          {...(onProgress === undefined ? {} : { onProgress })}
        />
      </section>
      <div className="h-svh" />
    </>
  );
}

function filmOf(container: HTMLElement): HTMLVideoElement {
  const video = container.querySelector("video");
  if (video === null) {
    throw new Error("No film rendered");
  }
  return video;
}

afterEach(async () => {
  await allowMotion();
  window.scrollTo(0, 0);
});

describe("VideoScrub", () => {
  it("shows the poster and attaches no source before the visitor engages", async () => {
    const screen = await render(<Film />);
    const video = filmOf(screen.container);

    await expect
      .element(screen.getByRole("img", { name: "Night over the mountains" }))
      .toBeVisible();
    expect(video.querySelectorAll("source")).toHaveLength(0);
  });

  it("attaches the film's sources, MP4 first, once the visitor engages", async () => {
    const screen = await render(<Film />);
    const video = filmOf(screen.container);

    window.dispatchEvent(new Event("scroll"));

    await expect
      .poll(() => [...video.querySelectorAll("source")].map((source) => source.type))
      .toEqual(["video/mp4", "video/webm"]);
  });

  it("loads the film once engaged and paints the frame the scroll asks for", async () => {
    const onProgress = vi.fn<(progress: number) => void>();
    const screen = await render(<Film onProgress={onProgress} />);
    const video = filmOf(screen.container);
    window.dispatchEvent(new Event("scroll"));

    await expect.poll(() => video.preload).toBe("auto");
    await expect
      .poll(() => video.readyState)
      .toBeGreaterThanOrEqual(HTMLMediaElement.HAVE_METADATA);
    window.scrollTo(0, window.innerHeight / 4);

    await expect.poll(() => onProgress.mock.lastCall?.[0]).toBeCloseTo(0.5, 1);
    await expect.poll(() => video.currentTime).toBeCloseTo(video.duration / 2, 1);
  });

  it("holds the last frame over the end of the range", async () => {
    const screen = await render(<Film />);
    const video = filmOf(screen.container);
    window.dispatchEvent(new Event("scroll"));
    await expect
      .poll(() => video.readyState)
      .toBeGreaterThanOrEqual(HTMLMediaElement.HAVE_METADATA);

    window.scrollTo(0, (window.innerHeight * 3) / 4);

    await expect.poll(() => video.currentTime).toBeCloseTo(video.duration, 1);
  });

  it("shows the still and never loads the film when the user prefers reduced motion", async () => {
    await preferReducedMotion();
    const screen = await render(<Film />);

    await expect.element(screen.getByRole("img", { name: "The sun has risen" })).toBeVisible();
    await expect.element(screen.getByAltText("Night over the mountains")).not.toBeVisible();
    expect(filmOf(screen.container).preload).toBe("none");
    expect(filmOf(screen.container).querySelectorAll("source")).toHaveLength(0);
  });

  it("keeps the poster under reduced motion when no still is given", async () => {
    await preferReducedMotion();
    const screen = await render(
      <section className="relative h-svh">
        <VideoScrub sources={{ mp4, webm }} poster={<img src={FRAME} alt="First frame" />} />
      </section>,
    );

    await expect.element(screen.getByRole("img", { name: "First frame" })).toBeVisible();
  });
});
