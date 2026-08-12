import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import PracticeAreas from "@/components/PracticeAreas";
import Credentials from "@/components/Credentials";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Offscreen until focused, so keyboard users can jump the fixed nav. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:border focus:border-gold focus:bg-ink focus:px-5 focus:py-3 focus:text-[11px] focus:uppercase focus:tracking-[0.2em] focus:text-paper"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <PracticeAreas />
        <Credentials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
