import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "./About";

describe("About", () => {
  it("renders the About and Approach columns", () => {
    render(<About />);
    expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Approach" })).toBeInTheDocument();
    expect(
      screen.getByText(/Philippine lawyer with over/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/non-attorney roles with US firms/i)
    ).toBeInTheDocument();
  });

  it("renders the attorney portrait with its caption", () => {
    render(<About />);
    expect(
      screen.getByRole("img", { name: "Atty. Jose Mari V. Perdices" })
    ).toBeInTheDocument();
    expect(screen.getByText("Attorney at Law")).toBeInTheDocument();
  });

});
