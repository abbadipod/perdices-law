import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "./About";

describe("About", () => {
  it("renders the About column and the unlabelled second column", () => {
    render(<About />);
    expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
    // Second column carries no heading of its own — removed deliberately.
    expect(
      screen.queryByRole("heading", { name: "Approach" })
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(/Philippine lawyer with over/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/working as a paralegal with US law firms/i)
    ).toBeInTheDocument();
    expect(screen.queryByText(/fluent in English/i)).not.toBeInTheDocument();
  });

  it("renders the attorney portrait with its caption", () => {
    render(<About />);
    expect(
      screen.getByRole("img", { name: "Atty. Jose Mari V. Perdices" })
    ).toBeInTheDocument();
    expect(screen.getByText("Attorney at Law")).toBeInTheDocument();
  });

});
