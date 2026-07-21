import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { navLinks } from "@/content/site";

describe("Footer", () => {
  it("renders the brand, nav links, disclaimer, and copyright", () => {
    render(<Footer />);
    expect(screen.getByText("PERDICES LAW")).toBeInTheDocument();

    navLinks.forEach((link) => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });

    expect(
      screen.getByText(/does not constitute legal advice/i)
    ).toBeInTheDocument();

    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
