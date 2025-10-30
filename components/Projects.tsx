"use client";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Energy API Dashboard",
    description: "Renewable energy budgeting & CO₂ tracking with interactive charts.",
    tech: ["React", "TypeScript", "Node", "PostgreSQL"],
  },
  {
    title: "Smart Home IoT",
    description: "Real-time MQTT dashboard for smart sensors and automation rules.",
    tech: ["React", "Vite", "WebSockets", "MQTT"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold mb-10 text-center">Projects</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            className="border rounded-xl p-6 shadow-sm hover:shadow-md transition bg-white"
          >
            <h3 className="font-semibold text-xl mb-2">{p.title}</h3>
            <p className="text-sm text-neutral-600 mb-3">{p.description}</p>
            <div className="flex flex-wrap gap-2">
              {p.tech.map(t => (
                <span key={t} className="text-xs px-2 py-1 bg-neutral-100 rounded-full">{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
