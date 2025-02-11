import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { FaHome } from "react-icons/fa";
import Head from "next/head";


export default function Home() {
  return (
    <>
    <Head>
        <link rel="icon" href="public/favicon.ico" />
    </Head>
    <main className="bg-black-100">
      <div className="">
        <FloatingNav navItems={[
          {name: "Home", link: "/", icon:<FaHome />},
        ]}/>
        <Hero />
      </div>
    </main>
    </>
  );
}
