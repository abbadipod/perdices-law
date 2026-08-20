import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Eyebrow from "./Eyebrow";

describe("Eyebrow", () => {
  it("renders its label", () => {
    render(<Eyebrow>What we handle</Eyebrow>);
    expect(screen.getByText("What we handle")).toBeInTheDocument();
  });

  it("switches tone for dark surfaces", () => {
    const { container: light } = render(<Eyebrow tone="dark">A</Eyebrow>);
    const { container: dark } = render(<Eyebrow tone="light">B</Eyebrow>);
    expect(light.querySelector("p")?.className).toContain("text-hudson-bay");
    expect(dark.querySelector("p")?.className).toContain("text-sidewalk");
  });

  it("hides the gold rule from screen readers", () => {
    const { container } = render(<Eyebrow>A</Eyebrow>);
    const rule = container.querySelector("span");
    expect(rule).toHaveAttribute("aria-hidden", "true");
    expect(rule?.className).toContain("bg-gold");
  });
});
