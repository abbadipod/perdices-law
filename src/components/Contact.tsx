"use client";

import { contactInfo } from "@/content/site";
import Reveal from "@/components/Reveal";

const FIELD_LABEL = "text-[10px] uppercase tracking-[0.24em] text-sidewalk";
const FIELD_BASE =
  "bg-transparent text-base text-paper outline-none transition-colors";

export default function Contact() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = `Consultation request — ${name}`;
    const body = `${message}\n\n—\n${name}\n${email}`;
    window.location.href = `mailto:${contactInfo.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="bg-hudson-bay px-7 py-[104px]"
    >
      <div className="mx-auto max-w-[1120px]">
        <Reveal>
          <p className="mb-2.5 text-[11px] uppercase tracking-[0.28em] text-sidewalk">
            Get in touch
          </p>
          <h2 className="font-display text-[clamp(30px,3.6vw,46px)] font-medium uppercase leading-[1.1] text-paper">
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
                className={`${FIELD_BASE} border-0 border-b border-sidewalk/45 px-0.5 py-2.5 focus:border-gold`}
              />
            </label>
            <label className="grid gap-2">
              <span className={FIELD_LABEL}>Email</span>
              <input
                type="email"
                name="email"
                required
                className={`${FIELD_BASE} border-0 border-b border-sidewalk/45 px-0.5 py-2.5 focus:border-gold`}
              />
            </label>
            <label className="grid gap-2">
              <span className={FIELD_LABEL}>How can I help?</span>
              <textarea
                name="message"
                rows={5}
                required
                className={`${FIELD_BASE} resize-y border border-sidewalk/45 p-3 leading-[1.6] focus:border-gold`}
              />
            </label>
            <div>
              <button
                type="submit"
                className="border border-gold px-8 py-[15px] text-[11px] uppercase tracking-[0.24em] text-paper transition-colors hover:bg-gold hover:text-ink"
              >
                Send inquiry
              </button>
            </div>
            <p className="text-xs leading-[1.6] text-sidewalk/75">
              Opens in your email app so you keep a copy of what you sent.
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
                  <h3 className="mb-3.5 font-display text-lg font-medium uppercase text-paper">
                    {office.city}
                  </h3>
                  <p className="mb-2 text-sm leading-[1.7] text-sidewalk">
                    {office.address}
                  </p>
                  <p className="mb-3 text-sm text-sidewalk/80">{office.hours}</p>
                  <a
                    href={`tel:${digitsOnly}`}
                    className="text-sm text-sidewalk transition-colors hover:text-gold"
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
