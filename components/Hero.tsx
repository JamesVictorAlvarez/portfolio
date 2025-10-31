"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="section container-narrow pt-36">
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .5 }}
        className="text-4xl md:text-5xl font-bold tracking-tight"
      >
        Hi, I’m James Victor Alvarez.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .1, duration: .6 }}
        className="muted mt-4"
      >
        Computer Science student at Concordia. I like building clean, dependable software—
        mostly React/TypeScript on the front, and Java/C on the systems side.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .2, duration: .5 }}
        className="mt-6 flex flex-wrap gap-4"
      >
        <a href="https://github.com/JamesVictorAlvarez">GitHub</a>
        <a href="https://www.linkedin.com/in/jv-alvarez/">LinkedIn</a>
        <a href="mailto:jamesvictoralvarez@gmail.com">Email</a>
      </motion.div>
    </section>
  );
}
