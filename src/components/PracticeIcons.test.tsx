import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { practiceIcons } from "./PracticeIcons";
import { practiceAreas } from "@/content/site";

describe("practiceIcons", () => {
  it("has one icon per practice area", () => {
    expect(practiceIcons).toHaveLength(practiceAreas.length);
  });

  it("every icon renders a decorative, screen-reader-hidden SVG", () => {
    practiceIcons.forEach((Icon) => {
      const { container } = render(<Icon />);
      const svg = container.querySelector("svg");
      expect(svg).not.toBeNull();
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });
  });
});
