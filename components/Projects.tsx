"use client";
import { motion } from "motion/react";
import { FaGithub } from "react-icons/fa6";
import { HiOutlineExternalLink } from "react-icons/hi";

const projects = [
  {
    title: "Music Guesser",
    description:
      "Web app where you guess songs or artists from 10-second audio clips. Real-time multiplayer with Socket.io.",
    tech: ["React", "Socket.io", "Express", "Vite"],
    demo: "https://music-guesser-eight.vercel.app/",
    code: "https://github.com/JamesVictorAlvarez/MusicGuesser",
  },
  {
    title: "Zonk",
    description:
      "A wave-based 3D shooter built with SDL3 and C++, featuring a raycasting engine, procedural audio, and dynamic obstacle-based gameplay.",
    tech: ["C++", "SDL3"],
    demo: "https://zonk-shooter.netlify.app/",
    code: "https://github.com/JamesVictorAlvarez/Zonk",
  },
  {
    title: "OrderUp",
    description:
      "Restaurant order management system. Real-time order tracking across kitchen and front-of-house.",
    tech: ["Flutter", "Firebase"],
    code: "https://github.com/JamesVictorAlvarez/OrderUp",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section container-narrow">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <p className="label mb-2">Selected work</p>
        <h2 className="h2">Projects</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((project, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
            className="card p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-main)]">
                {project.title}
              </h3>
              <p className="muted text-sm mb-4 leading-relaxed" style={{ maxWidth: "45ch" }}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-md bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--border)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-5 text-sm pt-2 border-t border-[var(--border)]">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 no-underline text-[var(--text-muted)] hover:text-[var(--accent)]"
                >
                  <HiOutlineExternalLink size={15} />
                  Demo
                </a>
              )}
              {project.code && (
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 no-underline text-[var(--text-muted)] hover:text-[var(--accent)]"
                >
                  <FaGithub size={14} />
                  Source
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
