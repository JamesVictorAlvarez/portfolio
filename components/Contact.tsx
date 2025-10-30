"use client";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="max-w-2xl mx-auto px-6 py-20 text-center">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-6"
      >
        Get in Touch
      </motion.h2>
      <p className="text-neutral-600 mb-6">
        Want to collaborate or chat? Reach out at{" "}
        <a href="mailto:jamesvictoralvarez@gmail.com" className="text-blue-600 underline">
          jamesvictoralvarez@gmail.com
        </a>
      </p>
      <motion.a
        whileHover={{ scale: 1.05 }}
        href="mailto:jamesvictoralvarez@gmail.com"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium"
      >
        Say Hello
      </motion.a>
    </section>
  );
}
