"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useScrollSpy } from "@/components/hooks/useScrollSpy";
import ThemeToggle from "@/components/ThemeToggle";

const LINKS = [
  { name: "about", href: "#home", id: "home" },
  { name: "experience", href: "#experience", id: "experience" },
  { name: "hackathons", href: "#hackathons", id: "hackathons" },
  { name: "projects", href: "#projects", id: "projects" },
  { name: "hobbies", href: "#hobbies", id: "hobbies" },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Nav() {
  const active = useScrollSpy({ ids: LINKS.map((l) => l.id) });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted ? 1 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="
          flex items-center gap-1
          mt-4 px-2 py-1.5
          rounded-xl
          border border-transparent
          bg-[var(--bg-main)]/80 backdrop-blur-md
          pointer-events-auto
        "
      >
        {LINKS.map((l, i) => {
          const isActive = active === l.id;

          return (
            <motion.a
              key={l.id}
              href={l.href}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.1 + i * 0.04,
                ease: EASE,
              }}
              className={`
                group relative px-3.5 py-1.5 text-[13px] tracking-wide select-none transition-colors duration-200
                ${isActive ? "text-[var(--text-main)] underline underline-offset-[6px] decoration-[var(--text-main)] decoration-1" : "text-[var(--text-muted)] hover:text-[var(--text-main)] no-underline"}
              `}
              onMouseDown={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(0.97)";
              }}
              onMouseUp={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}
            >
              {l.name}
            </motion.a>
          );
        })}

        <div className="w-px h-4 bg-[var(--border)]/40 mx-1" />

        <ThemeToggle />
      </motion.nav>
    </div>
  );
}
