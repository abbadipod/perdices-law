"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/content/site";
import CrestMark from "@/components/CrestMark";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      role="banner"
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-comet/30 bg-ink" : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-7 py-3.5"
      >
        <a href="#top" className="flex items-center gap-2.5">
          <CrestMark size={38} />
          <span className="whitespace-nowrap font-display text-[13px] uppercase tracking-[0.18em] text-white">
            Perdices Law
          </span>
        </a>

        <ul className="hidden items-center gap-[34px] lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-[11px] uppercase tracking-[0.2em] text-sidewalk transition-colors hover:text-gold"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden whitespace-nowrap border border-gold px-[18px] py-[9px] text-[10px] uppercase tracking-[0.22em] text-sidewalk transition-colors hover:bg-gold hover:text-ink lg:inline-block"
        >
          Book a consultation
        </a>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="text-[11px] uppercase tracking-[0.2em] text-white lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {menuOpen && (
        <ul
          id="mobile-menu"
          data-testid="mobile-menu"
          className="flex flex-col gap-1 bg-ink px-7 pb-6 lg:hidden"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block py-2 text-[11px] uppercase tracking-[0.2em] text-sidewalk transition-colors hover:text-gold"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="mt-2 inline-block border border-gold px-[18px] py-2.5 text-[10px] uppercase tracking-[0.22em] text-sidewalk"
              onClick={() => setMenuOpen(false)}
            >
              Book a consultation
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
