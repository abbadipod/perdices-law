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

  it("renders the crest flourish motif in both corners", () => {
    const { container } = render(<Hero />);
    expect(container.querySelectorAll("svg").length).toBe(2);
  });
});
