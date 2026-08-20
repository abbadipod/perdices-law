import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home", () => {
  it("offers a skip link to the main landmark", () => {
    const { container } = render(<Home />);
    const skip = screen.getByRole("link", { name: /skip to content/i });

    expect(skip).toHaveAttribute("href", "#main");
    // The target must exist or the link silently does nothing.
    expect(container.querySelector("main#main")).not.toBeNull();
    // Hidden until focused.
    expect(skip.className).toContain("sr-only");
  });

  it("renders every major section", () => {
    render(<Home />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Litigation. Appellate insight. Practical legal solutions.",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Practice Areas" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Bar Admissions & Standing" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Atty. Jose Mari V. Perdices" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Frequently Asked Questions" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Request a consultation" })
    ).toBeInTheDocument();

    const consultationLinks = screen.getAllByRole("link", {
      name: /book a consultation/i,
    });
    expect(consultationLinks.length).toBeGreaterThanOrEqual(2);
  });
});
