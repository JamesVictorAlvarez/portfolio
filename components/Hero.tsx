"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";

export default function Hero() {
  return (
    <section
      id="home"
      className="section container-narrow pt-40 md:pt-32 pb-28 flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-16"
    >
      {/* Text — left-aligned, asymmetric weight */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="flex-1 max-w-lg"
      >
        <p className="label mb-4">Computer science · Concordia University</p>

        <h1
          className="text-4xl md:text-5xl font-bold mb-5 leading-[1.1]"
          style={{ letterSpacing: "-0.03em", textWrap: "balance" }}
        >
          James Victor Alvarez
        </h1>

        <p
          className="muted text-base leading-relaxed mb-10"
          style={{ maxWidth: "50ch" }}
        >
          I build visually minimal software and incremental games.
          Currently studying CS and looking for opportunities to
          ship real products.
        </p>

        <div className="flex items-center gap-5">
          <a
            href="https://github.com/JamesVictorAlvarez"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm no-underline text-[var(--text-muted)] hover:text-[var(--accent)]"
          >
            <FaGithub size={18} />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/jv-alvarez/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm no-underline text-[var(--text-muted)] hover:text-[var(--accent)]"
          >
            <FaLinkedinIn size={18} />
            <span>LinkedIn</span>
          </a>
          <a
            href="mailto:jamesvictoralvarez@gmail.com"
            className="inline-flex items-center gap-2 text-sm no-underline text-[var(--text-muted)] hover:text-[var(--accent)]"
          >
            <HiOutlineMail size={18} />
            <span>Email</span>
          </a>
        </div>
      </motion.div>

      {/* Photo — right side, slight vertical offset for asymmetry */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="flex-shrink-0 md:mt-6"
      >
        <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
          <Image
            src="/Me.jpg"
            alt="James Victor Alvarez — portrait photo"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 224px, 288px"
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
