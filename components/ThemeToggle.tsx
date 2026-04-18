"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      document.documentElement.classList.add("light");
      setIsLight(true);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const newTheme = isLight ? "dark" : "light";
    html.classList.toggle("light", newTheme === "light");
    localStorage.setItem("theme", newTheme);
    setIsLight(!isLight);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        flex items-center justify-center
        w-7 h-7
        rounded-full
        text-[var(--text-muted)] hover:text-[var(--accent)]
        transition-colors duration-200
      "
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isLight ? "light" : "dark"}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
          className="text-xs font-medium select-none"
        >
          {isLight ? "dark" : "light"}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
