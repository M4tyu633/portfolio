import About from "@/components/About";
import CommandPalette from "@/components/CommandPalette";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import ScrollProgress from "@/components/ScrollProgress";
import Services from "@/components/Services";
import Skills from "@/components/Skills";

/**
 * The whole site is one scrolling page. To reorder sections, move the lines
 * below. To remove one, delete its line (and drop its entry from `navLinks`
 * in src/content/data.ts).
 */
export default function Page() {
  return (
    <>
      <ScrollProgress />
      <CommandPalette />
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
