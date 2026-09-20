import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PracticeAreas from "./PracticeAreas";
import { practiceAreas } from "@/content/site";

describe("PracticeAreas", () => {
  it("renders a heading for every practice area in order", () => {
    render(<PracticeAreas />);
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings).toHaveLength(practiceAreas.length);
    headings.forEach((heading, index) => {
      expect(heading).toHaveTextContent(practiceAreas[index].title);
    });
  });

  it("renders one icon per practice area card", () => {
    const { container } = render(<PracticeAreas />);
    const icons = container.querySelectorAll("article svg");
    expect(icons).toHaveLength(practiceAreas.length);
  });

  it("numbers the cards sequentially in order", () => {
    render(<PracticeAreas />);
    practiceAreas.forEach((_, index) => {
      expect(
        screen.getByText(String(index + 1).padStart(2, "0"))
      ).toBeInTheDocument();
    });
  });

  it("renders each card's description without an expandable detail", () => {
    render(<PracticeAreas />);
    practiceAreas.forEach((area) => {
      expect(screen.getByText(area.description)).toBeInTheDocument();
      expect(screen.queryByText(area.detail)).not.toBeInTheDocument();
    });
    expect(
      screen.queryByRole("button", { name: /what this covers/i })
    ).not.toBeInTheDocument();
  });

  it("never changes the grid's row-sizing based on which card is open", () => {
    // Regression: the grid used to swap auto-rows-fr for items-start the
    // moment any card opened. auto-rows-fr equalises every row in the
    // grid, not just the row a card sits in, so removing it reset every
    // OTHER row's height too - opening one card shrank cards in unrelated
    // rows that hadn't changed. Uniform closed-card height now comes from
    // md:min-h-[286px] on each card instead, so the grid's own className
    // has nothing left to toggle. There is no longer an open/closed state
    // at all, but the className is still asserted as a guard against the
    // conditional class coming back.
    const { container } = render(<PracticeAreas />);
    const grid = container.querySelector(
      "#practice-areas > div > div:nth-of-type(2)"
    ) as HTMLElement;
    expect(grid.className).toContain("items-start");
    expect(grid.className).not.toContain("auto-rows-fr");
  });
});
