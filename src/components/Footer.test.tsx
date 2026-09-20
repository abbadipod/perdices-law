import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { navLinks } from "@/content/site";

describe("Footer", () => {
  it("renders the brand, nav links, and copyright", () => {
    render(<Footer />);
    expect(screen.getByText("Perdices Law")).toBeInTheDocument();

    navLinks.forEach((link) => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });

    // Practicing-capacity/legal-advice disclaimer removed at the client's
    // request — it should not reappear.
    expect(
      screen.queryByText(/does not constitute legal advice/i)
    ).not.toBeInTheDocument();

    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
