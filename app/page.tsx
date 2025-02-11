import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Head from "next/head";


export default function Home() {
  return (
    <>
    <Head>
        <link rel="icon" href="public/favicon.ico" />
    </Head>
    <main className="bg-black-100">
      <div className="">
        <Menu />
        <Hero />
      </div>
    </main>
    </>
  );
}
