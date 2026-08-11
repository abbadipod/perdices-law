import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "./About";

describe("About", () => {
  it("renders the About and Approach columns", () => {
    render(<About />);
    expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Approach" })).toBeInTheDocument();
    expect(screen.getByText(/dual-qualified attorney admitted/i)).toBeInTheDocument();
  });

  it("renders the attorney portrait with its caption", () => {
    render(<About />);
    expect(
      screen.getByRole("img", { name: "Atty. Jose Mari Perdices" })
    ).toBeInTheDocument();
    expect(screen.getByText("Attorney at Law")).toBeInTheDocument();
  });

  it("renders the pull-quote", () => {
    render(<About />);
    expect(
      screen.getByText(/Two legal systems\./)
    ).toBeInTheDocument();
    expect(screen.getByText(/One point of contact\./)).toBeInTheDocument();
  });
});
