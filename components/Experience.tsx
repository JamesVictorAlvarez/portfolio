"use client";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

export default function Experience() {
  const items = [
    {
      role: "Software Intern",
      org: "MR Control Systems International",
      period: "May – Aug 2024",
      points: [
        "Built IoT automation dashboards.",
        "Integrated Sinolta data sources; improved ops efficiency.",
      ],
    },
    {
      role: "GameJam UdeM",
      org: "Université de Montréal",
      period: "May 2025",
      points: [
        "Designed and developed an educational 3D game that helps teachers understand how students feel and learn through interactive level-based experiences.",
        "Built in Unity using C#, with each level presenting unique challenges.",
      ],
    },
    {
      role: "ConUHacks IX",
      org: "Concordia University",
      period: "Feb 2025",
      points: [
        "Implemented a first-person ray-casting engine from scratch in C++ using SDL2 for rendering and real-time graphics.",
        "Developed a multiplayer architecture supporting both TCP and UDP sockets.",
      ],
    },
    {
      role: "JACHacks",
      org: "John Abbott College",
      period: "May 2024",
      points: [
        "Winner of Valnet Mini Challenge.",
        "Built an AI-driven web-scraping system to measure news timeliness and implemented keyword extraction using NLP/AI models.",
        "Automated data extraction from Excel sheets, GameRant articles, and Twitter posts, handling rate limits and structural differences across websites.",
      ],
    },
    {
      role: "GameJam DINGO",
      org: "Vanier College",
      period: "Jan 2024",
      points: [
        "Developed a 2D platformer in Unity where players use magic abilities that dynamically alter parkour mechanics and character effects.",
        "Implemented custom C# scripts for camera control, state management",
      ],
    },
  ];

  return (
    <section id="experience" className="section container-narrow">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex items-center gap-2 mb-8"
      >
        <Briefcase className="text-[var(--accent)]" size={22} />
        <h2 className="h2">Experience</h2>
      </motion.div>
      
      <div className="flex flex-col space-y-10">
        {items.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            viewport={{ once: true }}
            className="relative group border-l border-[var(--border)] pl-6 hover:border-[var(--accent)] transition-colors"
          >
            <span className="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-[var(--border)] group-hover:bg-[var(--accent)] transition-colors" />

            <div className="flex flex-wrap items-baseline gap-2">
              <h3 className="text-lg font-semibold text-[var(--text-main)]">
                {e.role}
              </h3>
              <span className="text-[var(--accent)] text-sm">@ {e.org}</span>
              <span className="muted ml-auto text-xs font-medium">
                {e.period}
              </span>
            </div>

            <ul className="mt-3 space-y-1.5 text-sm text-[var(--text-main)]/80 leading-relaxed">
              {e.points.map((pt, j) => (
                <li key={j} className="flex items-start gap-2">
                  <span className="text-[var(--accent)] text-xs mt-0.5">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
