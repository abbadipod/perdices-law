import { contactInfo } from "@/content/site";
import Reveal from "@/components/Reveal";
import CrestFlourish from "@/components/CrestFlourish";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative overflow-hidden bg-hudson-bay px-6 py-24"
    >
      <CrestFlourish className="pointer-events-none absolute right-6 top-6 h-16 w-16 rotate-90 text-gold/50" />
      <div className="relative mx-auto max-w-5xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-sidewalk">
            Get In Touch
          </p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            Contact
          </h2>
          <a
            href={`mailto:${contactInfo.email}`}
            className="mt-4 inline-block text-sidewalk hover:text-gold"
          >
            {contactInfo.email}
          </a>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {contactInfo.offices.map((office, index) => {
            const phone = contactInfo.phones[index];
            const digitsOnly = phone.number.replace(/[^\d+]/g, "");
            return (
              <Reveal key={office.city} delay={index * 0.05}>
                <div className="border border-comet/40 p-6">
                  <h3 className="font-display text-lg text-white">
                    {office.city}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-sidewalk">
                    {office.address}
                  </p>
                  <p className="mt-2 text-sm text-sidewalk">{office.hours}</p>
                  <a
                    href={`tel:${digitsOnly}`}
                    className="mt-3 inline-block text-sm text-sidewalk hover:text-gold hover:underline"
                  >
                    {phone.number}
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
