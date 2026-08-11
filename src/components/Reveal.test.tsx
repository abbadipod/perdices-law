import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const mocks = vi.hoisted(() => ({ reduceMotion: false }));

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return { ...actual, useReducedMotion: () => mocks.reduceMotion };
});

import Reveal from "./Reveal";

afterEach(() => {
  mocks.reduceMotion = false;
});

describe("Reveal", () => {
  it("renders its children", () => {
    render(
      <Reveal>
        <p>Hello world</p>
      </Reveal>
    );
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("starts hidden so the reveal has something to animate from", () => {
    const { container } = render(
      <Reveal>
        <p>Hello world</p>
      </Reveal>
    );
    expect((container.firstChild as HTMLElement).style.opacity).toBe("0");
  });

  it("renders children outright when reduced motion is preferred", () => {
    mocks.reduceMotion = true;
    const { container } = render(
      <Reveal>
        <p>Hello world</p>
      </Reveal>
    );

    expect(screen.getByText("Hello world")).toBeInTheDocument();
    // No inline opacity means nothing was ever faded out to begin with.
    expect((container.firstChild as HTMLElement).style.opacity).toBe("");
  });
});
