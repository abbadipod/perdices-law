import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Credentials from "./Credentials";
import { credentials } from "@/content/site";

describe("Credentials", () => {
  it("renders every credential's label and detail", () => {
    render(<Credentials />);
    // Education is a multi-line entry; each degree gets its own line.
    const educationRow = credentials.find((c) => c.label === "Education");
    expect(Array.isArray(educationRow?.detail)).toBe(true);
    (educationRow?.detail as string[]).forEach((line) => {
      expect(screen.getByText(line)).toBeInTheDocument();
    });

    credentials.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
      const lines = Array.isArray(item.detail) ? item.detail : [item.detail];
      lines.forEach((line) => {
        expect(screen.getByText(line)).toBeInTheDocument();
      });
    });
  });
});
