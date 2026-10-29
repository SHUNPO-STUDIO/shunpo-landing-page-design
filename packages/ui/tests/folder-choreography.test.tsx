import { describe, expect, it } from "vitest";

import { stageFolders } from "../src/motion/folder-choreography.ts";

describe("stageFolders", () => {
  it("names the missing part when a scene has no opening", () => {
    const stage = document.createElement("div");

    expect(() => stageFolders(stage)).toThrow(
      "FolderScene: missing [data-slot=folder-scene-opening].",
    );
  });
});
