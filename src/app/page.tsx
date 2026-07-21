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
      <Nav />
      <main>
        <Hero />
        <PracticeAreas />
        <Credentials />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
