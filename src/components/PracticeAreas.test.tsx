import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("keeps every detail in the markup but collapsed by default", () => {
    // aria-hidden, not toBeVisible: the collapse is now an animated
    // grid-template-rows transition rather than the hidden attribute, and
    // jsdom never loads the compiled Tailwind stylesheet, so it has no way
    // to compute that a 0fr row track is visually collapsed. aria-hidden
    // is the real accessibility contract the animation has to uphold
    // regardless, so it's the more meaningful assertion either way.
    render(<PracticeAreas />);
    practiceAreas.forEach((area) => {
      // Present for crawlers even while hidden from sighted users.
      const detail = screen.getByText(area.detail);
      expect(detail).toBeInTheDocument();
      expect(detail).toHaveAttribute("aria-hidden", "true");
    });
    screen.getAllByRole("button", { name: /what this covers/i }).forEach((b) => {
      expect(b).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("expands a card's detail on click and collapses it again", async () => {
    const user = userEvent.setup();
    render(<PracticeAreas />);
    const toggle = screen.getAllByRole("button", {
      name: /what this covers/i,
    })[0];

    await user.click(toggle);
    expect(screen.getByText(practiceAreas[0].detail)).toHaveAttribute(
      "aria-hidden",
      "false"
    );
    const openToggle = screen.getByRole("button", { name: /show less/i });
    expect(openToggle).toHaveAttribute("aria-expanded", "true");

    await user.click(openToggle);
    expect(screen.getByText(practiceAreas[0].detail)).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });

  it("never changes the grid's row-sizing based on which card is open", async () => {
    // Regression: the grid used to swap auto-rows-fr for items-start the
    // moment any card opened. auto-rows-fr equalises every row in the
    // grid, not just the row a card sits in, so removing it reset every
    // OTHER row's height too - opening one card shrank cards in unrelated
    // rows that hadn't changed. Uniform closed-card height now comes from
    // md:min-h-[286px] on each card instead, so the grid's own className
    // has nothing left to toggle.
    const user = userEvent.setup();
    const { container } = render(<PracticeAreas />);
    const grid = container.querySelector(
      "#practice-areas > div > div:nth-of-type(2)"
    ) as HTMLElement;
    const classNameClosed = grid.className;

    await user.click(
      screen.getAllByRole("button", { name: /what this covers/i })[0]
    );

    expect(grid.className).toBe(classNameClosed);
  });

  it("opens one card at a time", async () => {
    const user = userEvent.setup();
    render(<PracticeAreas />);
    const toggles = screen.getAllByRole("button", {
      name: /what this covers/i,
    });

    await user.click(toggles[0]);
    expect(screen.getByText(practiceAreas[0].detail)).toHaveAttribute(
      "aria-hidden",
      "false"
    );

    // Opening another card closes the first.
    await user.click(
      screen.getAllByRole("button", { name: /what this covers/i })[0]
    );
    expect(screen.getByText(practiceAreas[1].detail)).toHaveAttribute(
      "aria-hidden",
      "false"
    );
    expect(screen.getByText(practiceAreas[0].detail)).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });

  it("points each toggle at the detail it controls", () => {
    const { container } = render(<PracticeAreas />);
    container.querySelectorAll("article").forEach((card) => {
      const button = within(card as HTMLElement).getByRole("button");
      const id = button.getAttribute("aria-controls");
      expect(id).toBeTruthy();
      expect(card.querySelector(`#${id}`)).not.toBeNull();
    });
  });
});
