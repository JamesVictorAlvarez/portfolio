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
        w-8 h-8
        rounded-lg
        text-[var(--text-muted)] hover:text-[var(--text-main)]
        cursor-pointer
      "
      style={{
        transition:
          "color 0.2s cubic-bezier(0.16,1,0.3,1), transform 140ms ease-out",
      }}
      onMouseDown={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(0.92)";
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isLight ? "light" : "dark"}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="text-[11px] font-medium tracking-wide select-none leading-none"
        >
          {isLight ? "Dark" : "Light"}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
