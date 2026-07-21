import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home", () => {
  it("renders every major section", () => {
    render(<Home />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Practical legal solutions, across two countries.",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Practice Areas" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Bar Admissions & Standing" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /about atty\. perdices/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Frequently Asked Questions" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Contact" })
    ).toBeInTheDocument();

    const consultationLinks = screen.getAllByRole("link", {
      name: /book a consultation/i,
    });
    expect(consultationLinks.length).toBeGreaterThanOrEqual(2);
  });
});
