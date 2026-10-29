import { useEffect, useEffectEvent } from "react";

/* Runs `onFrame` on mount, then at most once per animation frame while the page scrolls or resizes. */
export function useScrollFrame(onFrame: () => void): void {
  const frame = useEffectEvent(onFrame);

  useEffect(() => {
    let request = 0;
    function schedule(): void {
      if (request !== 0) {
        return;
      }
      request = requestAnimationFrame(() => {
        request = 0;
        frame();
      });
    }

    frame();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(request);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
}
