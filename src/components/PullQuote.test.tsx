import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PullQuote from "./PullQuote";

describe("PullQuote", () => {
  it("renders the quote", () => {
    render(<PullQuote />);
    expect(screen.getByText(/Two legal systems\./)).toBeInTheDocument();
    expect(screen.getByText(/One point of contact\./)).toBeInTheDocument();
  });

  it("is a labelled section so it is not an anonymous region", () => {
    const { container } = render(<PullQuote />);
    const section = container.querySelector("section");
    expect(section).toHaveAttribute("aria-label");
  });

  it("carries the crest as a decorative mark", () => {
    const { container } = render(<PullQuote />);
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    // Decorative: the quote carries the meaning.
    expect(img).toHaveAttribute("alt", "");
  });
});
