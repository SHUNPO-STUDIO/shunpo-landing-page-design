export interface VideoSources {
  mp4: string;
  webm: string;
}

export interface VideoSeeker {
  /* Attaches the sources (MP4 first, for Safari's precise seeking, then WebM) and downloads the film. */
  load: () => void;
  /* Shows the frame at this progress of the film (0 to 1). */
  seek: (progress: number) => void;
  dispose: () => void;
}

/* Some browsers paint nothing when asked for the very last instant of a video. */
const END_MARGIN_SECONDS = 0.03;
/* Closer than a fifth of a 24 fps frame, the requested frame is already on screen. */
const MIN_STEP_SECONDS = 0.008;
const IDLE_TIMEOUT_MS = 2000;
const FALLBACK_IDLE_MS = 200;

function clamp(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function frameTime(progress: number, duration: number): number {
  if (!Number.isFinite(duration) || duration <= 0) {
    return 0;
  }
  return Math.min(duration - END_MARGIN_SECONDS, clamp(progress) * duration);
}

/* Progress of the film along a scroll range whose last `hold` share keeps the final frame. */
export function filmProgress(rangeProgress: number, hold: number): number {
  const playing = 1 - hold;
  return playing <= 0 ? 1 : clamp(rangeProgress / playing);
}

/* iOS Safari paints no frame of a video that never played: it plays, muted, for an instant. */
async function primeFrames(video: HTMLVideoElement): Promise<void> {
  try {
    await video.play();
    video.pause();
  } catch {
    /* Playback refused: seeking still paints frames everywhere else. */
  }
}

/* One seek at a time: the next one starts when the requested frame is painted (`seeked`),
   so fast scrolling never queues stale frames. */
function attachSources(video: HTMLVideoElement, sources: VideoSources): void {
  for (const [src, type] of [
    [sources.mp4, "video/mp4"],
    [sources.webm, "video/webm"],
  ] as const) {
    const source = document.createElement("source");
    source.src = src;
    source.type = type;
    video.append(source);
  }
}

export function createVideoSeeker(video: HTMLVideoElement, sources: VideoSources): VideoSeeker {
  let wanted = 0;
  let shown = Number.NaN;

  function apply(): void {
    if (video.readyState < HTMLMediaElement.HAVE_METADATA || video.seeking) {
      return;
    }
    const time = frameTime(wanted, video.duration);
    if (Math.abs(time - shown) < MIN_STEP_SECONDS) {
      return;
    }
    shown = time;
    // oxlint-disable-next-line eslint/no-param-reassign -- moving the playhead of the film it was given is the seeker's purpose
    video.currentTime = time;
  }

  function resync(): void {
    shown = Number.NaN;
    apply();
  }

  video.addEventListener("loadedmetadata", apply);
  video.addEventListener("seeked", apply);
  video.addEventListener("pause", resync);

  return {
    load() {
      if (video.preload === "auto") {
        return;
      }
      attachSources(video, sources);
      video.setAttribute("preload", "auto");
      video.load();
      void primeFrames(video);
    },
    seek(progress) {
      wanted = progress;
      apply();
    },
    dispose() {
      video.removeEventListener("loadedmetadata", apply);
      video.removeEventListener("seeked", apply);
      video.removeEventListener("pause", resync);
    },
  };
}

function whenIdle(callback: () => void): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const handle = window.requestIdleCallback(callback, { timeout: IDLE_TIMEOUT_MS });
    return () => {
      window.cancelIdleCallback(handle);
    };
  }
  const handle = window.setTimeout(callback, FALLBACK_IDLE_MS);
  return () => {
    window.clearTimeout(handle);
  };
}

/* Runs `callback` once the browser is idle, when the element is at most a screen away. */
export function whenNear(element: Element, callback: () => void): () => void {
  let cancelIdle: (() => void) | undefined;
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) {
        return;
      }
      observer.disconnect();
      cancelIdle = whenIdle(callback);
    },
    { rootMargin: "100% 0px" },
  );
  observer.observe(element);
  return () => {
    observer.disconnect();
    cancelIdle?.();
  };
}
