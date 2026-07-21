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
});
