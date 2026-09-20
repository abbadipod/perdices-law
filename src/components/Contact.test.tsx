import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "./Contact";
import { contactInfo } from "@/content/site";

describe("Contact", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true }),
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
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

  it("posts the fields to the contact API and reports success", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByLabelText("Name"), "Maria Santos");
    await user.type(screen.getByLabelText("Email"), "maria@example.com");
    await user.type(screen.getByLabelText("How can I help?"), "I need help with a visa.");
    await user.click(screen.getByRole("button", { name: /send inquiry/i }));

    expect(fetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" })
    );
    const [, options] = vi.mocked(fetch).mock.calls[0];
    const sentBody = JSON.parse(options!.body as string);
    expect(sentBody).toMatchObject({
      name: "Maria Santos",
      email: "maria@example.com",
      message: "I need help with a visa.",
      company: "",
    });

    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(/message sent/i)
    );
  });

  it("shows an error message when delivery fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ ok: false, error: "Could not send your message." }),
      })
    );
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByLabelText("Name"), "Maria Santos");
    await user.type(screen.getByLabelText("Email"), "maria@example.com");
    await user.type(screen.getByLabelText("How can I help?"), "I need help.");
    await user.click(screen.getByRole("button", { name: /send inquiry/i }));

    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        /could not send your message/i
      )
    );
  });

  it("includes a hidden honeypot field real visitors never see", () => {
    render(<Contact />);
    const honeypot = document.querySelector('input[name="company"]');
    expect(honeypot).not.toBeNull();
    expect(honeypot).toHaveAttribute("tabindex", "-1");
    expect(honeypot?.closest("label")).toHaveClass("sr-only");
  });

  it("no longer promises to open the visitor's email app", () => {
    render(<Contact />);
    expect(screen.queryByText(/opens in your email app/i)).not.toBeInTheDocument();
  });
});
