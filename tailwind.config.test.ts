import { describe, expect, it } from "vitest";
import config from "./tailwind.config";

describe("tailwind color tokens", () => {
  it("matches the approved brand palette exactly", () => {
    const colors = (config.theme?.extend as { colors?: Record<string, string> })
      ?.colors;

    expect(colors).toEqual({
      sidewalk: "#CBCED0",
      comet: "#97A2AE",
      "hudson-bay": "#3F5266",
      gold: "#C7A05E",
      ink: "#1A1F26",
      paper: "#F7F6F3",
      cream: "#ECE3D2",
    });
  });
});
