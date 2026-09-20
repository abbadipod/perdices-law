"use client";

import { useState } from "react";
import { contactInfo } from "@/content/site";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";

const FIELD_LABEL = "text-[10px] uppercase tracking-[0.24em] text-sidewalk";
// No outline-none here — the global focus-visible ring in globals.css is the
// keyboard indicator; the gold border change is the supporting cue.
const FIELD_BASE = "bg-transparent text-base text-paper transition-colors";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    // Hidden honeypot field — see the "company" input below.
    const company = String(data.get("company") ?? "");

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Something went wrong.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="bg-hudson-bay px-7 py-[104px]"
    >
      <div className="mx-auto max-w-[1120px]">
        <Reveal>
          <Eyebrow tone="light">Get in touch</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(28px,3.4vw,44px)] font-medium uppercase leading-[1.1] text-paper">
            Request a consultation
          </h2>
        </Reveal>

        <div className="mt-[46px] grid items-start gap-14 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <form onSubmit={handleSubmit} className="grid gap-[22px]">
            <label className="grid gap-2">
              <span className={FIELD_LABEL}>Name</span>
              <input
                type="text"
                name="name"
                required
                className={`${FIELD_BASE} border-0 border-b border-sidewalk/70 px-0.5 py-2.5 focus:border-gold`}
              />
            </label>
            <label className="grid gap-2">
              <span className={FIELD_LABEL}>Email</span>
              <input
                type="email"
                name="email"
                required
                className={`${FIELD_BASE} border-0 border-b border-sidewalk/70 px-0.5 py-2.5 focus:border-gold`}
              />
            </label>
            <label className="grid gap-2">
              <span className={FIELD_LABEL}>How can I help?</span>
              <textarea
                name="message"
                rows={5}
                required
                className={`${FIELD_BASE} resize-y border border-sidewalk/70 p-3 leading-[1.6] focus:border-gold`}
              />
            </label>
            {/* Honeypot — hidden from sighted and keyboard users, so a real
                visitor never fills it in. Bots that fill every field trip
                it, and the response looks identical either way. */}
            <label className="sr-only" aria-hidden="true">
              Company
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
            <div className="flex flex-wrap items-center gap-5">
              <button
                type="submit"
                disabled={status === "sending"}
                className="border border-gold px-8 py-[15px] text-[11px] uppercase tracking-[0.24em] text-paper transition-colors hover:bg-gold hover:text-ink disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send inquiry"}
              </button>
              <span role="status" className="text-[13px] text-sidewalk">
                {status === "sent" &&
                  "Message sent — I'll get back to you shortly."}
                {status === "error" && errorMessage}
              </span>
            </div>
            <p className="text-xs leading-[1.6] text-sidewalk/95">
              Submitting this form does not create an attorney-client
              relationship.
            </p>
          </form>

          <div className="grid gap-[22px]">
            <a
              href={`mailto:${contactInfo.email}`}
              className="justify-self-start border-b border-gold/60 pb-1 text-[15px] text-sidewalk transition-colors hover:text-gold"
            >
              {contactInfo.email}
            </a>
            {contactInfo.offices.map((office) => {
              const digitsOnly = office.phone.replace(/[^\d+]/g, "");
              return (
                <div key={office.city} className="border border-comet/45 p-[26px]">
                  <h3 className="mb-3.5 font-display text-base font-normal uppercase tracking-[0.06em] text-paper">
                    {office.city}
                  </h3>
                  <p className="mb-2 text-sm leading-[1.7] text-sidewalk">
                    {office.address}
                  </p>
                  {office.hours && (
                    <p className="mb-3 text-sm text-sidewalk/95">
                      {office.hours}
                    </p>
                  )}
                  <a
                    href={`tel:${digitsOnly}`}
                    className="inline-block py-1.5 text-sm text-sidewalk transition-colors hover:text-gold"
                  >
                    {office.phone}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
