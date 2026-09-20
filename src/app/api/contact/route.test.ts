import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";

const send = vi.fn();
vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

async function post(body: unknown, ip = "1.2.3.4") {
  const { POST } = await import("./route");
  const request = new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: { "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
  return POST(request);
}

describe("POST /api/contact", () => {
  const originalKey = process.env.RESEND_API_KEY;

  beforeEach(() => {
    vi.resetModules();
    send.mockReset();
    send.mockResolvedValue({ data: { id: "test" }, error: null });
    process.env.RESEND_API_KEY = "test-key";
  });

  afterEach(() => {
    process.env.RESEND_API_KEY = originalKey;
  });

  it("sends mail and reports success for a valid submission", async () => {
    const response = await post({
      name: "Maria Santos",
      email: "maria@example.com",
      message: "I need help with a property matter.",
    });
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json).toEqual({ ok: true });
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "atty.josemari.perdices@gmail.com",
        replyTo: "maria@example.com",
        subject: expect.stringContaining("Maria Santos"),
      })
    );
  });

  it("rejects a submission missing required fields", async () => {
    const response = await post({ name: "", email: "", message: "" });
    expect(response.status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it("silently succeeds without sending when the honeypot is filled", async () => {
    const response = await post({
      name: "Bot",
      email: "bot@example.com",
      message: "spam",
      company: "Acme",
    });
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json).toEqual({ ok: true });
    expect(send).not.toHaveBeenCalled();
  });

  it("returns 502 without logging the message body when Resend fails", async () => {
    send.mockResolvedValue({ data: null, error: { message: "delivery failed" } });
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const response = await post({
      name: "Maria Santos",
      email: "maria@example.com",
      message: "a very private legal matter",
    });

    expect(response.status).toBe(502);
    errorSpy.mock.calls.flat().forEach((arg) => {
      expect(String(arg)).not.toContain("a very private legal matter");
    });
    errorSpy.mockRestore();
  });

  it("returns 500 when RESEND_API_KEY is not configured", async () => {
    delete process.env.RESEND_API_KEY;
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const response = await post({
      name: "Maria Santos",
      email: "maria@example.com",
      message: "I need help.",
    });

    expect(response.status).toBe(500);
    expect(send).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it("rate-limits repeated submissions from the same IP", async () => {
    const ip = "9.9.9.9";
    for (let i = 0; i < 5; i++) {
      const response = await post(
        { name: "A", email: "a@example.com", message: "hi" },
        ip
      );
      expect(response.status).toBe(200);
    }
    const limited = await post(
      { name: "A", email: "a@example.com", message: "hi" },
      ip
    );
    expect(limited.status).toBe(429);
  });
});
