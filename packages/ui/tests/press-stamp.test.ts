import { gsap } from "gsap";
import { describe, expect, it } from "vitest";

import { pressStamp } from "../src/motion/press-stamp.ts";

describe("pressStamp", () => {
  it("drops the stamp in and leaves it printed at full size", () => {
    const target = { opacity: 0, scale: 1, rotate: 0 };
    const timeline = pressStamp(gsap.timeline({ paused: true }), target);

    timeline.progress(1);

    expect(target).toMatchObject({ opacity: 1, scale: 1, rotate: -3 });
  });

  it("starts invisible and enlarged, as if held above the paper", () => {
    const target = { opacity: 1, scale: 1, rotate: 0 };
    const timeline = pressStamp(gsap.timeline({ paused: true }), target);

    timeline.progress(0);

    expect(target).toMatchObject({ opacity: 0, scale: 1.8, rotate: -12 });
  });
});
