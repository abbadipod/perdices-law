import { afterEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import Reveal from "./Reveal";

const VIEWPORT_HEIGHT = 800;

function setup({
  top,
  reducedMotion = false,
}: {
  top: number;
  reducedMotion?: boolean;
}) {
  window.innerHeight = VIEWPORT_HEIGHT;
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query: string) =>
      ({
        matches: reducedMotion,
        media: query,
        addEventListener: () => {},
        removeEventListener: () => {},
      }) as unknown as MediaQueryList
  );
  vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({
    top,
  } as DOMRect);
  // Queue frames rather than running them inline, so the component's
  // `frame = requestAnimationFrame(...)` latch is assigned before the
  // callback clears it — the ordering a real browser gives you.
  const frames: FrameRequestCallback[] = [];
  vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
    frames.push(cb);
    return frames.length;
  });
  vi.stubGlobal("cancelAnimationFrame", () => {});

  return {
    flushFrames: () =>
      act(() => {
        frames.splice(0).forEach((cb) => cb(0));
      }),
  };
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("Reveal", () => {
  it("renders its children", () => {
    setup({ top: 100 });
    render(
      <Reveal>
        <p>Hello world</p>
      </Reveal>
    );
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("leaves content above the trigger point visible", () => {
    // 100px down a 800px viewport is well inside the 90% trigger line.
    setup({ top: 100 });
    const { container } = render(
      <Reveal>
        <p>Hello world</p>
      </Reveal>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.dataset.reveal).toBe("shown");
    expect(wrapper.style.opacity).toBe("");
  });

  it("hides content that is still below the fold", () => {
    // 790px is past 90% of an 800px viewport (720px).
    setup({ top: 790 });
    const { container } = render(
      <Reveal>
        <p>Hello world</p>
      </Reveal>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.dataset.reveal).toBe("hidden");
    expect(wrapper.style.opacity).toBe("0");
    expect(wrapper.style.transform).toBe("translateY(18px)");
  });

  it("reveals hidden content once it scrolls past the trigger", () => {
    const { flushFrames } = setup({ top: 790 });
    const { container } = render(
      <Reveal>
        <p>Hello world</p>
      </Reveal>
    );
    const wrapper = container.firstChild as HTMLElement;

    // The mount-time measurement runs but the element is still below the fold.
    flushFrames();
    expect(wrapper.dataset.reveal).toBe("hidden");

    // Element scrolls up into view, then a scroll event fires.
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({
      top: 200,
    } as DOMRect);
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    flushFrames();

    expect(wrapper.dataset.reveal).toBe("shown");
    expect(wrapper.style.opacity).toBe("");
  });

  it("never hides content when reduced motion is preferred", () => {
    setup({ top: 790, reducedMotion: true });
    const { container } = render(
      <Reveal>
        <p>Hello world</p>
      </Reveal>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.dataset.reveal).toBe("shown");
    expect(wrapper.style.opacity).toBe("");
  });
});
