"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold mb-4"
      >
        Hi, I’m <span className="text-blue-600">James Victor Alvarez</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg text-neutral-600 max-w-2xl"
      >
        Computer Science student at Concordia University with a passion for building efficient, elegant software.
      </motion.p>
    </section>
  );
}
