"use client";
import { motion } from "motion/react";
import Image from "next/image";

export default function Hackathons() {
  const items = [
    {
      role: "ConUHacks X",
      org: "Concordia University",
      period: "Feb 2026",
      logo: "/conuhacks10.png",
      points: [
        "Engineered a custom web agent to autonomously drop out.",
        "Integrated AI decision-making to allow the agent to dynamically interpret unclear user flows.",
      ],
    },
    {
      role: "GameJam UdeM",
      org: "Université de Montréal",
      period: "May 2025",
      logo: "/UdeM_game.png",
      points: [
        "Designed and developed an educational 3D game that helps teachers understand how students feel and learn through interactive level-based experiences.",
        "Built in Unity using C#, with each level presenting unique challenges.",
      ],
    },
    {
      role: "ConUHacks IX",
      org: "Concordia University",
      period: "Feb 2025",
      logo: "/conuhacks9.png",
      points: [
        "Implemented a first-person ray-casting engine from scratch in C++ using SDL2 for rendering and real-time graphics.",
        "Developed a multiplayer architecture supporting both TCP and UDP sockets.",
      ],
    },
    {
      role: "JACHacks",
      org: "John Abbott College",
      period: "May 2024",
      logo: "/jachacks.png",
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
      logo: "/dingo.png",
      points: [
        "Developed a 2D platformer in Unity where players use magic abilities that dynamically alter parkour mechanics and character effects.",
        "Implemented custom C# scripts for camera control, state management.",
      ],
    },
  ];

  const isLeft = (i: number) => i % 2 === 0;

  return (
    <section id="hackathons" className="section container-narrow">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        viewport={{ once: true }}
        className="mb-14 text-center"
      >
        <p className="label mb-2">Events &amp; Competitions</p>
        <h2 className="h2">Hackathons</h2>
      </motion.div>

      {/* ── Timeline wrapper ── */}
      <div className="relative">
        {/* Center vertical line – visible on md+ */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[var(--border)]" />

        {/* Left-side line – visible on mobile only */}
        <div className="block md:hidden absolute left-[11px] top-0 bottom-0 w-px bg-[var(--border)]" />

        <div className="flex flex-col gap-12 md:gap-16">
          {items.map((e, i) => {
            const left = isLeft(i);

            return (
              <div key={i} className="relative md:grid md:grid-cols-2 md:gap-10">
                {/* ── Center dot (md+) ── */}
                <span className="hidden md:block absolute left-1/2 top-3 w-3 h-3 -translate-x-1/2 rounded-full border-2 border-[var(--border)] bg-[var(--bg-main)] z-10 transition-colors duration-300" />

                {/* ── Mobile dot ── */}
                <span className="block md:hidden absolute left-[6px] top-[6px] w-[11px] h-[11px] rounded-full border-2 border-[var(--border)] bg-[var(--bg-main)] z-10 transition-colors duration-300" />

                {/* ── Card content ── */}
                <motion.div
                  initial={{ opacity: 0, x: left ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  viewport={{ once: true }}
                  className={`group pl-8 md:pl-0 ${
                    left
                      ? "md:pr-10 md:text-right md:col-start-1 md:row-start-1"
                      : "md:pl-10 md:text-left md:col-start-2 md:row-start-1"
                  }`}
                >
                  {/* Period pill */}
                  <span className="inline-block text-[10px] uppercase tracking-widest font-semibold py-1 mb-3 text-[var(--accent)]">
                    {e.period}
                  </span>

                  <div className={`flex items-center gap-4 ${left ? "md:flex-row-reverse" : ""}`}>
                    <Image
                      src={e.logo}
                      alt={`${e.role} logo`}
                      width={44}
                      height={44}
                      className="w-auto h-auto rounded-lg object-contain shrink-0 opacity-80"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text-main)] leading-snug">
                        {e.role}
                      </h3>
                      <p className="text-sm text-[var(--text-muted)] mt-0.5">
                        {e.org}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-col space-y-2 text-sm text-[var(--text-muted)] leading-relaxed">
                    {e.points.map((pt, j) => (
                      <p key={j}>{pt}</p>
                    ))}
                  </div>

                  {/* Subtle hover accent bar */}
                  <div
                    className={`hidden md:block mt-4 h-[2px] w-12 rounded-full bg-[var(--border)] group-hover:bg-[var(--accent)] transition-colors duration-300 ${
                      left ? "ml-auto" : "mr-auto"
                    }`}
                  />
                </motion.div>

                {/* ── Empty spacer column (md+) ── */}
                <div
                  className={`hidden md:block ${
                    left ? "md:col-start-2" : "md:col-start-1"
                  } md:row-start-1`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
