import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Credentials from "./Credentials";
import { credentials } from "@/content/site";

describe("Credentials", () => {
  it("renders every credential's label and detail", () => {
    render(<Credentials />);
    credentials.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
      expect(screen.getByText(item.detail)).toBeInTheDocument();
    });
  });
});
