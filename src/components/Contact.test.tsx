import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "./Contact";
import { contactInfo } from "@/content/site";

describe("Contact", () => {
  beforeEach(() => {
    Object.defineProperty(window, "location", {
      writable: true,
      configurable: true,
      value: { href: "" },
    });
  });

  it("renders a mailto link", () => {
    render(<Contact />);
    const emailLink = screen.getByRole("link", { name: contactInfo.email });
    expect(emailLink).toHaveAttribute("href", `mailto:${contactInfo.email}`);
  });

  it("renders a tel link for every office", () => {
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
      // Hours are optional — only rendered when supplied.
      if (office.hours) {
        expect(screen.getByText(office.hours)).toBeInTheDocument();
      }
    });
  });

  it("renders the consultation form", () => {
    render(<Contact />);
    expect(screen.getByRole("heading", { name: "Request a consultation" })).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeRequired();
    expect(screen.getByLabelText("Email")).toBeRequired();
    expect(screen.getByLabelText("How can I help?")).toBeRequired();
    expect(screen.getByRole("button", { name: /send inquiry/i })).toBeInTheDocument();
  });

  it("hands off to the visitor's email client with the fields encoded", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByLabelText("Name"), "Maria Santos");
    await user.type(screen.getByLabelText("Email"), "maria@example.com");
    await user.type(screen.getByLabelText("How can I help?"), "I need help with a visa.");
    await user.click(screen.getByRole("button", { name: /send inquiry/i }));

    const href = window.location.href;
    expect(href).toContain(`mailto:${contactInfo.email}`);
    expect(href).toContain(encodeURIComponent("Consultation request — Maria Santos"));
    expect(href).toContain(encodeURIComponent("I need help with a visa."));
    expect(href).toContain(encodeURIComponent("maria@example.com"));
  });

  it("tells the visitor the form opens their email app", () => {
    render(<Contact />);
    expect(screen.getByText(/opens in your email app/i)).toBeInTheDocument();
  });
});
