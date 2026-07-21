import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import CrestFlourish from "./CrestFlourish";

describe("CrestFlourish", () => {
  it("renders a decorative, screen-reader-hidden SVG", () => {
    const { container } = render(<CrestFlourish />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("accepts a className for positioning and color", () => {
    const { container } = render(<CrestFlourish className="text-gold" />);
    expect(container.querySelector("svg")).toHaveClass("text-gold");
  });
});
