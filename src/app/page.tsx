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
        {/* Credentials sits between the two sand sections on purpose: it is the
            page's dark beat. About and PracticeAreas are both bg-sand, and
            adjacent they ran 1723px unbroken — a third of the page reading as
            one block. It also reads better here, with the bio flowing into the
            admissions that back it. */}
        <Credentials />
        <PracticeAreas />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
