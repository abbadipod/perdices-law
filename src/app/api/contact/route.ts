import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactInfo } from "@/content/site";

/**
 * In-memory per-IP rate limit rather than a CAPTCHA — see docs/HANDOFF.md.
 * Resets per serverless instance rather than globally, which is a known
 * limitation of not having a database; it still stops a single abusive
 * client from hammering the endpoint, which is the actual threat model for
 * a low-traffic law firm contact form.
 */
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: { name?: string; email?: string; message?: string; company?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { name, email, message, company } = body;

  // Honeypot: a real visitor never fills this hidden field. Report success
  // without sending anything, so the bot has no signal to adapt to.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — contact form cannot deliver mail.");
    return NextResponse.json(
      { ok: false, error: "This form is temporarily unavailable." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL ?? "Perdices Law Website <intake@perdiceslaw.com>";

  const { error } = await resend.emails.send({
    from,
    to: contactInfo.email,
    replyTo: email,
    subject: `Consultation request — ${name}`,
    text: `${message}\n\n—\n${name}\n${email}`,
  });

  if (error) {
    // Never log the message body — see docs/HANDOFF.md.
    console.error("Resend delivery failed:", error.message);
    return NextResponse.json(
      { ok: false, error: "Could not send your message. Please email us directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
