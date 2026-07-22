"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { navLinks } from "@/content/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      role="banner"
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-hudson-bay" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <a href="#top" className="flex items-center gap-2">
          <Image
            src="/logo.jpg"
            alt="Perdices Law crest"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="font-display text-sm tracking-wide text-white">
            PERDICES LAW
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-sm tracking-wide text-sidewalk hover:text-gold"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden border border-gold px-5 py-2 text-xs tracking-wide text-sidewalk transition-colors hover:bg-gold hover:text-ink md:inline-block"
        >
          BOOK A CONSULTATION
        </a>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="text-white md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {menuOpen && (
        <ul
          id="mobile-menu"
          data-testid="mobile-menu"
          className="flex flex-col gap-1 bg-hudson-bay px-6 pb-6 md:hidden"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block py-2 text-sm text-sidewalk hover:text-gold"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="block py-2 text-sm font-semibold text-sidewalk"
              onClick={() => setMenuOpen(false)}
            >
              Book a Consultation
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
