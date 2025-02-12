import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { House, CircleUserRound } from 'lucide-react';
import Head from "next/head";
import AboutMe from "@/components/AboutMe";


export default function Home() {
  return (
    <>
    <Head>
        <link rel="icon" href="public/favicon.ico" />
    </Head>
    <main className="bg-black-100">
      <div className="">
        <FloatingNav navItems={[
          {name: "Home", link: "#home", icon:<House />},
          {name: "About", link: "#about", icon:<CircleUserRound />},
        ]}/>
        <Hero />
        <AboutMe /> 
      </div>
    </main>
    </>
  );
}
