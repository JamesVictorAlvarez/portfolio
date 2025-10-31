"use client";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Energy API Dashboard",
    desc: "Renewables budgeting & CO₂ tracking with role-based access and charts.",
    tech: ["React", "TypeScript", "Node", "PostgreSQL"],
    demo: "#",
    code: "#",
  },
  {
    title: "Smart Home IoT",
    desc: "Realtime MQTT control panel for sensors and automations.",
    tech: ["React", "Vite", "WebSockets", "MQTT"],
    demo: "#",
    code: "#",
  },
  {
    title: "Films API",
    desc: "Slim PHP backend + admin UI for films, actors, and categories.",
    tech: ["PHP", "Slim", "MySQL", "React"],
    demo: "#",
    code: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section container-narrow">
      <h2 className="h2 mb-8">Projects</h2>
      <div className="divide-y divide-neutral-200 card p-6">
        {projects.map((p, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: .2 }}
            transition={{ duration: .4 }}
            className="py-6"
          >
            <h3 className="h3">{p.title}</h3>
            <p className="muted mt-1">{p.desc}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {p.tech.map(t => (
                <span key={t} className="text-xs px-2 py-1 bg-neutral-100 rounded-full">{t}</span>
              ))}
            </div>
            <div className="mt-3 flex gap-4">
              <a href={p.demo} target="_blank" rel="noreferrer">Demo</a>
              <a href={p.code} target="_blank" rel="noreferrer">Code</a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
