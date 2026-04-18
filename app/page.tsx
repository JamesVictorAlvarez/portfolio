import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Hackathons from "@/components/Hackathons";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hobbies from "@/components/Hobbies";
import OpeningAnimation from "@/components/OpeningAnimation";


export default function Home() {
  return (
    <main>
      <OpeningAnimation />
      <Nav />
      <Hero />
      <Experience />
      <Hackathons />
      <Projects />
      <Hobbies />
      <Footer />
    </main>
  );
}
