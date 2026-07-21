import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react";
import Nav from "./Nav";
import { navLinks } from "@/content/site";

describe("Nav", () => {
  it("renders the brand name and logo", () => {
    render(<Nav />);
    expect(screen.getByText("PERDICES LAW")).toBeInTheDocument();
    expect(screen.getByAltText("Perdices Law crest")).toBeInTheDocument();
  });

  it("renders every nav link", () => {
    render(<Nav />);
    navLinks.forEach((link) => {
      expect(screen.getAllByText(link.label).length).toBeGreaterThan(0);
    });
  });

  it("keeps the mobile menu closed by default", () => {
    render(<Nav />);
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /open menu/i })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("opens the mobile menu on click and closes it when a link is chosen", async () => {
    const user = userEvent.setup();
    render(<Nav />);

    await user.click(screen.getByRole("button", { name: /open menu/i }));
    const menu = screen.getByTestId("mobile-menu");
    expect(menu).toBeInTheDocument();

    await user.click(within(menu).getByText(navLinks[0].label));
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });

  it("switches to a solid background once the page is scrolled", () => {
    render(<Nav />);
    const header = screen.getByRole("banner");
    expect(header.className).not.toContain("bg-hudson-bay");

    Object.defineProperty(window, "scrollY", { value: 100, writable: true });
    fireEvent.scroll(window);

    expect(header.className).toContain("bg-hudson-bay");
  });
});
