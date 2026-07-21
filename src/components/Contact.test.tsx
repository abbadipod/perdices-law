import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Contact from "./Contact";
import { contactInfo } from "@/content/site";

describe("Contact", () => {
  it("renders a mailto link", () => {
    render(<Contact />);
    const emailLink = screen.getByRole("link", { name: contactInfo.email });
    expect(emailLink).toHaveAttribute("href", `mailto:${contactInfo.email}`);
  });

  it("renders a tel link for every phone number", () => {
    render(<Contact />);
    contactInfo.offices.forEach((office) => {
      const telLink = screen.getByRole("link", { name: office.phone });
      const digitsOnly = office.phone.replace(/[^\d+]/g, "");
      expect(telLink).toHaveAttribute("href", `tel:${digitsOnly}`);
    });
  });

  it("renders every office's address and hours", () => {
    render(<Contact />);
    contactInfo.offices.forEach((office) => {
      expect(screen.getByText(office.city)).toBeInTheDocument();
      expect(screen.getByText(office.address)).toBeInTheDocument();
      expect(screen.getByText(office.hours)).toBeInTheDocument();
    });
  });

  it("renders the crest flourish motif", () => {
    const { container } = render(<Contact />);
    expect(container.querySelector("svg")).not.toBeNull();
  });
});
