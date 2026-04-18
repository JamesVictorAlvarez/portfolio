"use client";
import { motion } from "motion/react";

export default function Hackathons() {
  const items = [
    {
      role: "ConUHacks X",
      org: "Concordia University",
      period: "Feb 2026",
      points: [
        "Engineered a custom web agent to autonomously drop out.",
        "Integrated AI decision-making to allow the agent to dynamically interpret unclear user flows.",
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
        "Built an AI-driven web-scraping system to measure news timeliness and implemented keyword extraction using NLP models.",
        "Automated data extraction from Excel sheets, GameRant articles, and Twitter posts, handling rate limits and structural differences across websites.",
      ],
    },
    {
      role: "GameJam DINGO",
      org: "Vanier College",
      period: "Jan 2024",
      points: [
        "Developed a 2D platformer in Unity where players use magic abilities that dynamically alter parkour mechanics and character effects.",
        "Implemented custom C# scripts for camera control, state management.",
      ],
    },
  ];

  return (
    <section id="hackathons" className="section container-narrow pt-0 md:pt-0">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <p className="label mb-2">Events & Competitions</p>
        <h2 className="h2">Hackathons</h2>
      </motion.div>

      <div className="flex flex-col space-y-10">
        {items.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
            className="relative group border-l-2 border-[var(--border)] pl-6 hover:border-[var(--accent)] transition-colors duration-300"
          >
            <span className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-[var(--border)] group-hover:bg-[var(--accent)] transition-colors duration-300" />

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-base font-semibold text-[var(--text-main)]">
                {e.role}
              </h3>
              <span className="text-sm text-[var(--text-muted)]">
                {e.org}
              </span>
              <span className="muted ml-auto text-xs font-medium tabular-nums">
                {e.period}
              </span>
            </div>

            <div className="mt-4 flex flex-col space-y-2 text-sm text-[var(--text-muted)] leading-relaxed">
              {e.points.map((pt, j) => (
                <p key={j} className="text-[var(--text-muted)]">
                  {pt}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
