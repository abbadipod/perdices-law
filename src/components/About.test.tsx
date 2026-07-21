import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "./About";

describe("About", () => {
  it("renders the bio, pull-quote, and monogram placeholder", () => {
    render(<About />);
    expect(
      screen.getByRole("heading", { name: /about atty\. perdices/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/dual-qualified attorney/i)).toBeInTheDocument();
    expect(
      screen.getByText("Two legal systems. One point of contact.")
    ).toBeInTheDocument();
    expect(screen.getByText("JP")).toBeInTheDocument();
  });
});
