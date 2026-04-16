import Navbar     from "@/src/components/Navbar";
import Hero       from "@/src/components/Hero";
import Skills     from "@/src/components/Skills";
import Projects   from "@/src/components/Projects";
import About      from "@/src/components/About";
import Experience from "@/src/components/Experience";
import Contact    from "@/src/components/Contact";
import Footer     from "@/src/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}