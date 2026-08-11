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
});
