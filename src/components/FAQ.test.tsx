import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FAQ from "./FAQ";
import { faqItems } from "@/content/site";

describe("FAQ", () => {
  it("renders every question, all closed by default", () => {
    render(<FAQ />);
    faqItems.forEach((item) => {
      const button = screen.getByRole("button", { name: item.question });
      expect(button).toHaveAttribute("aria-expanded", "false");
      expect(screen.getByText(item.answer)).not.toBeVisible();
    });
  });

  it("opens a question on click and closes it on a second click", async () => {
    const user = userEvent.setup();
    render(<FAQ />);

    const firstButton = screen.getByRole("button", {
      name: faqItems[0].question,
    });

    const icon = firstButton.querySelector('[aria-hidden="true"]');

    await user.click(firstButton);
    expect(firstButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(faqItems[0].answer)).toBeVisible();
    expect(icon).toHaveClass("rotate-45");

    await user.click(firstButton);
    expect(firstButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText(faqItems[0].answer)).not.toBeVisible();
    expect(icon).not.toHaveClass("rotate-45");
  });

  it("closes the previously open question when a different one is opened", async () => {
    const user = userEvent.setup();
    render(<FAQ />);

    const firstButton = screen.getByRole("button", {
      name: faqItems[0].question,
    });
    const secondButton = screen.getByRole("button", {
      name: faqItems[1].question,
    });

    await user.click(firstButton);
    expect(firstButton).toHaveAttribute("aria-expanded", "true");

    await user.click(secondButton);
    expect(secondButton).toHaveAttribute("aria-expanded", "true");
    expect(firstButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText(faqItems[0].answer)).not.toBeVisible();
  });
});
