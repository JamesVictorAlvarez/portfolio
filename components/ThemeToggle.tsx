"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

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
        w-6 h-6 /* visually slim */
        cursor-pointer
        text-[var(--text-main)] hover:text-[var(--accent)]
        transition-transform duration-300
        hover:scale-110
      "
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isLight ? 'sun' : 'moon'}
          initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {isLight ? (
            <Sun size={18} strokeWidth={1.5} />
          ) : (
            <Moon size={18} strokeWidth={1.5} />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
