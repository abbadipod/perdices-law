import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "./Hero";

describe("Hero", () => {
  it("renders the headline and CTA", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", {
        name: "Practical legal solutions, across two countries.",
      })
    ).toBeInTheDocument();

    const cta = screen.getByRole("link", { name: /book a consultation/i });
    expect(cta).toHaveAttribute("href", "#contact");
  });

  it("renders the eyebrow and supporting copy", () => {
    render(<Hero />);
    expect(
      screen.getByText(/Dual-Qualified Attorney — US & Philippines/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Immigration, real estate, and litigation counsel/)
    ).toBeInTheDocument();
  });

  it("applies a parallax transform to the background on scroll", () => {
    render(<Hero />);
    const bg = screen.getByTestId("hero-bg");

    Object.defineProperty(window, "scrollY", { value: 200, writable: true });
    window.dispatchEvent(new Event("scroll"));

    expect(bg.style.transform).toContain("translate3d(0, 56.0px, 0)");
  });
});
