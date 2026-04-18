"use client";
import { motion } from "motion/react";
import Image from "next/image";

export default function Experience() {
  const items = [
    {
      role: "Full Stack Developer",
      org: "Université de Montréal",
      period: "Feb 2026 - Present",
      logo: "/udem.png",
      points: [
        "Designed and built Elearning platform.",
        "Managed task delegation as a team lead.",
      ],
    },
    {
      role: "Software Intern",
      org: "MR Control Systems International",
      period: "May – Aug 2024",
      logo: "/mr_control_logo.jpg",
      points: [
        "Built IoT automation dashboards.",
        "Integrated Sinolta data sources; improved ops efficiency.",
      ],
    },
  ];

  return (
    <section id="experience" className="section container-narrow">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <p className="label mb-2">Background</p>
        <h2 className="h2">Experience</h2>
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
            <span className="absolute -left-[5px] top-6 w-2 h-2 rounded-full bg-[var(--border)] group-hover:bg-[var(--accent)] transition-colors duration-300" />

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="w-11 h-11 relative overflow-hidden flex-shrink-0 rounded-full bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent)] transition-all duration-300">
                {e.logo ? (
                  <Image src={e.logo} alt={e.org} fill className="object-cover opacity-90 group-hover:opacity-100 transition-all duration-300" sizes="44px" unoptimized={true} />
                ) : (
                  <span className="text-xs font-bold text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">{e.org.split(" ").slice(0, 2).map(n => n[0]).join("")}</span>
                )}
              </div>
              <div className="flex flex-col">
                <h3 className="text-base font-semibold text-[var(--text-main)] leading-tight">
                  {e.role}
                </h3>
                <span className="text-sm text-[var(--text-muted)] mt-0.5">
                  {e.org}
                </span>
              </div>
              <span className="muted ml-auto text-xs font-medium tabular-nums pl-4 pt-1">
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
