"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "Energy API Dashboard",
    description:
      "A renewable energy platform for budgeting, CO₂ tracking, and real-time analytics.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    title: "Smart Home IoT",
    description:
      "Realtime MQTT dashboard to monitor and control smart devices.",
    tech: ["React", "Vite", "WebSockets", "MQTT"],
  },
  {
    title: "Films API",
    description:
      "REST backend for managing films, actors, and categories.",
    tech: ["PHP", "Slim", "MySQL", "Docker"],
  },
  {
    title: "Lorem Ipsum",
    description:
      "Gamified sustainability tracker with CO₂ analytics.",
    tech: ["Next.js", "Supabase", "TailwindCSS"],
  },
  {
    title: "Lorem Ipsum",
    description:
      "Minimal floating-UI portfolio built with Next.js & Framer Motion.",
    tech: ["Next.js", "Framer Motion", "TailwindCSS"],
  },
];

export default function Projects() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const groupSize = 3;
  const totalGroups = Math.ceil(projects.length / groupSize);

  useEffect(() => {
    const timer = setInterval(() => next(), 6000);
    return () => clearInterval(timer);
  });

  const next = () => {
    if (!carouselRef.current) return;
    const width = carouselRef.current.clientWidth;
    carouselRef.current.scrollTo({
      left: width * ((index + 1) % totalGroups),
      behavior: "smooth",
    });
    setIndex((prev) => (prev + 1) % totalGroups);
  };

  const prev = () => {
    if (!carouselRef.current) return;
    const width = carouselRef.current.clientWidth;
    carouselRef.current.scrollTo({
      left: width * ((index - 1 + totalGroups) % totalGroups),
      behavior: "smooth",
    });
    setIndex((prev) => (prev - 1 + totalGroups) % totalGroups);
  };

  return (
    <section id="projects" className="section container-narrow">
      <h2 className="h2 mb-10 text-[var(--accent)]">Projects</h2>
      <div className="relative">
        <button
          onClick={prev}
          className="absolute z-10 left-2 md:-left-8 top-1/2 -translate-y-1/2 bg-[var(--bg-alt)]/80 hover:bg-[var(--bg-alt)] border border-[var(--border)] rounded-full p-3 text-[var(--text-main)] hover:text-[var(--accent)] transition"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="absolute z-10 right-2 md:-right-8 top-1/2 -translate-y-1/2 bg-[var(--bg-alt)]/80 hover:bg-[var(--bg-alt)] border border-[var(--border)] rounded-full p-3 text-[var(--text-main)] hover:text-[var(--accent)] transition"
        >
          <ChevronRight size={20} />
        </button>

        <div
          ref={carouselRef}
          className="
            flex overflow-hidden snap-x snap-mandatory scroll-smooth
          "
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="
                basis-full sm:basis-1/2 lg:basis-1/3 flex-shrink-0 snap-center
                p-4
              "
            >
              <div className="card h-full p-6 flex flex-col justify-between hover:shadow-[0_0_15px_var(--accent)] transition">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-main)]">
                    {project.title}
                  </h3>
                  <p className="muted text-sm mb-3 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-main)] text-[var(--text-muted)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-4 text-sm">
                  <a
                    href="#"
                    className="flex items-center gap-1 text-[var(--accent)] hover:text-[var(--accent-warn)]"
                  >
                    <ExternalLink size={14} /> Demo
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-1 text-[var(--accent)] hover:text-[var(--accent-warn)]"
                  >
                    <Github size={14} /> Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="text-center mt-12">
        <a href="/projects" className="btn">
          View All Projects
        </a>
      </div>
    </section>
  );
}
