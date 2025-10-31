import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import Music from "@/components/Music";


export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Music />
      <Footer />
    </main>
  );
}
