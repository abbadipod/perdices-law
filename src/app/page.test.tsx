import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home", () => {
  it("renders the firm name", () => {
    render(<Home />);
    expect(screen.getByText("Perdices Law")).toBeInTheDocument();
  });
});
