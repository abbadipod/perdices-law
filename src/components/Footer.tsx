import Image from "next/image";
import { navLinks } from "@/content/site";

export default function Footer() {
  return (
    <footer className="bg-hudson-bay px-6 py-12 text-sidewalk">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.jpg"
            alt="Perdices Law crest"
            width={28}
            height={28}
            className="rounded-full"
          />
          <span className="font-display text-sm tracking-wide text-white">
            PERDICES LAW
          </span>
        </div>
        <ul className="flex flex-wrap gap-6 text-xs tracking-wide">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-gold">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-xs leading-relaxed text-comet">
        Atty. Jose Mari Perdices is admitted to practice law in California,
        United States, and is a member of the Integrated Bar of the
        Philippines. This website is for informational purposes only and does
        not constitute legal advice. Prior results do not guarantee a similar
        outcome.
      </p>
      <p className="mx-auto mt-4 max-w-6xl text-xs text-comet">
        © {new Date().getFullYear()} Perdices Law. All rights reserved.
      </p>
    </footer>
  );
}
