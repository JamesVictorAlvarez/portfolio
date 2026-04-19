import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Hackathons from "@/components/Hackathons";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hobbies from "@/components/Hobbies";
import OpeningAnimation from "@/components/OpeningAnimation";


import { getRecentMovies } from "@/app/actions/letterboxd";

export default async function Home() {
  const movies = await getRecentMovies("StepTesTed");

  return (
    <main>
      <OpeningAnimation />
      <Nav />
      <Hero />
      <Experience />
      <Hackathons />
      <Projects />
      <Hobbies initialMovies={movies} />
      <Footer />
    </main>
  );
}
