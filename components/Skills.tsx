"use client";
import { motion } from "motion/react";
import { SiReact, SiTypescript, SiTailwindcss, SiJavascript, SiNextdotjs, SiDocker, SiNodedotjs, SiMysql, SiPhp, SiC, SiGit, SiLinux } from "react-icons/si";
import { FaJava } from "react-icons/fa6";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: <SiReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "TailwindCSS", icon: <SiTailwindcss /> },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "PHP", icon: <SiPhp /> },
      { name: "MySQL", icon: <SiMysql /> },
      { name: "Docker", icon: <SiDocker /> },
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "C", icon: <SiC /> },
      { name: "Java", icon: <FaJava /> },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: <SiGit /> },
      { name: "Linux", icon: <SiLinux /> },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section container-narrow">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <p className="label mb-2">Technical</p>
        <h2 className="h2">Skills</h2>
      </motion.div>

      <div className="space-y-10">
        {skillCategories.map((category, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
          >
            <h3 className="text-sm font-medium text-[var(--text-muted)] mb-4 tracking-wide">
              {category.title}
            </h3>

            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="flex items-center gap-2.5 text-sm text-[var(--text-main)] px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-alt)] hover:border-[var(--accent)] transition-colors duration-200"
                >
                  <span className="text-base text-[var(--text-muted)]">{skill.icon}</span>
                  <span>{skill.name}</span>
                </motion.div>
              ))}
            </div>

            {i < skillCategories.length - 1 && (
              <div className="border-t border-[var(--border)] mt-10" />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
