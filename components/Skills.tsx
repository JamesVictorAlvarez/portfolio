"use client";
import { motion } from "framer-motion";
import { SiReact, SiTypescript, SiTailwindcss, SiJavascript, SiNextdotjs, SiDocker, SiNodedotjs, SiMysql, SiPhp, SiC, SiGit, SiLinux } from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: <SiReact className="text-sky-400" /> },
      { name: "Next.js", icon: <SiNextdotjs className="text-gray-200" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-blue-400" /> },
      { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
      { name: "TailwindCSS", icon: <SiTailwindcss className="text-cyan-400" /> },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs className="text-green-400" /> },
      { name: "PHP", icon: <SiPhp className="text-blue-300" /> },
      { name: "MySQL", icon: <SiMysql className="text-blue-500" /> },
      { name: "Docker", icon: <SiDocker className="text-sky-400" /> },
    ],
  },
  {
    title: "Programming Languages",
    skills: [
      { name: "C", icon: <SiC className="text-blue-500" /> },
      { name: "Java", icon: <FaJava className="text-orange-400" /> },
    ],
  },
  {
    title: "Tools & OS",
    skills: [
      { name: "Git", icon: <SiGit className="text-orange-500" /> },
      { name: "Linux", icon: <SiLinux className="text-yellow-200" /> },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section container-narrow">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex items-center gap-2 mb-8"
      >
        <Wrench className="text-[var(--accent)]" size={22} />
        <h2 className="h2">Skills</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10">
        {skillCategories.map((category, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-[var(--bg-alt)] border border-[var(--border)] rounded-2xl p-6 shadow-sm hover:shadow-[0_0_10px_rgba(0,0,0,0.3)] transition"
          >
            <h3 className="text-xl font-semibold mb-5 text-[var(--accent)] tracking-wide">
              {category.title}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {category.skills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.1 }}
                  className="flex flex-col items-center text-center text-sm text-[var(--text-main)]"
                >
                  <div className="text-3xl mb-2">{skill.icon}</div>
                  <span>{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
