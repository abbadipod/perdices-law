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
    render(<PracticeAreas />);
    practiceAreas.forEach((area) => {
      // Present for crawlers even while hidden from sighted users.
      expect(screen.getByText(area.detail)).toBeInTheDocument();
      expect(screen.getByText(area.detail)).not.toBeVisible();
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
    expect(screen.getByText(practiceAreas[0].detail)).toBeVisible();
    const openToggle = screen.getByRole("button", { name: /show less/i });
    expect(openToggle).toHaveAttribute("aria-expanded", "true");

    await user.click(openToggle);
    expect(screen.getByText(practiceAreas[0].detail)).not.toBeVisible();
  });

  it("opens one card at a time", async () => {
    const user = userEvent.setup();
    render(<PracticeAreas />);
    const toggles = screen.getAllByRole("button", {
      name: /what this covers/i,
    });

    await user.click(toggles[0]);
    expect(screen.getByText(practiceAreas[0].detail)).toBeVisible();

    // Opening another card closes the first.
    await user.click(
      screen.getAllByRole("button", { name: /what this covers/i })[0]
    );
    expect(screen.getByText(practiceAreas[1].detail)).toBeVisible();
    expect(screen.getByText(practiceAreas[0].detail)).not.toBeVisible();
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
