import { afterEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import Hero from "./Hero";
import { credentialStats } from "@/content/site";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("Hero", () => {
  it("renders the headline and CTA", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", {
        name: "Dual-Qualified Attorney offering practical legal solutions",
      })
    ).toBeInTheDocument();

    const cta = screen.getByRole("link", { name: /book a consultation/i });
    expect(cta).toHaveAttribute("href", "#contact");
  });

  it("renders the supporting copy", () => {
    render(<Hero />);
    expect(
      screen.getByText(
        /Appellate, litigation, property, and transactional counsel/
      )
    ).toBeInTheDocument();
  });

  it("previews the same credential figures Credentials shows in full", () => {
    // Same source, no separately authored copy — the JSON-LD description
    // drifted exactly this way once already.
    render(<Hero />);
    credentialStats.forEach((stat) => {
      expect(screen.getByText(stat.figure)).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    });
  });

  it("applies a parallax transform to the background on scroll", () => {
    // Parallax is measured from the section's rect, not window.scrollY.
    // A top of -200 means the hero has travelled 200px up past the viewport.
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({
      top: -200,
    } as DOMRect);
    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
      frames.push(cb);
      return frames.length;
    });
    vi.stubGlobal("cancelAnimationFrame", () => {});

    render(<Hero />);
    const bg = screen.getByTestId("hero-bg");

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    act(() => {
      frames.splice(0).forEach((cb) => cb(0));
    });

    // 200 * 0.3 = 60
    expect(bg.style.transform).toBe("translate3d(0, 60.0px, 0) scale(1.05)");
  });
});
