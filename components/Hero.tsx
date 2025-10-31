"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="section container-narrow pt-48 pb-32 flex flex-col md:flex-row items-center justify-between gap-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 max-w-xl"
      >
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 leading-tight">
          <span className="text-[var(--accent)]">James Victor Alvarez</span>
        </h1>

        <p className="muted text-lg leading-relaxed mb-8">
          Computer Science student at Concordia University. I enjoy making visually minimal software and
          incremental games.
        </p>

        <div className="flex flex-wrap gap-4">
          <a href="https://github.com/JamesVictorAlvarez"> GitHub </a>
          <a href="https://www.linkedin.com/in/jv-alvarez/"> LinkedIn </a>
          <a href="mailto:jamesvictoralvarez@gmail.com"> Email </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex justify-center"
      >
        <div className="relative w-64 h-64 md:w-80 md:h-80 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <Image
            src="/me.jpg"
            alt="James Victor Alvarez"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 256px, 320px"
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
