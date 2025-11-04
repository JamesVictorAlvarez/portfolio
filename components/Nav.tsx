"use client";
import { useEffect, useState } from "react";
import { useScrollSpy } from "@/components/hooks/useScrollSpy";
import ThemeToggle from "@/components/ThemeToggle";

const LINKS = [
  { name: "about", href: "#home", id: "home" },
  { name: "experience", href: "#experience", id: "experience" },
  { name: "skills", href: "#skills", id: "skills" },
  { name: "projects", href: "#projects", id: "projects" },
  { name: "music", href: "#music", id: "music" },
];

export default function Nav() {
  const active = useScrollSpy({
    ids: LINKS.map((l) => l.id),
  });

  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const y = window.scrollY;
        if (y > lastY && y > 80) setVisible(false);
        else setVisible(true);
        setLastY(y);
      }, 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <nav
      className={`
        fixed top-4 left-1/2 -translate-x-1/2 z-50
        bg-[var(--bg-alt)]/80 backdrop-blur-md border border-[var(--border)]
        rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.4)]
        px-8 py-3 flex items-center gap-8
        transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
      `}
    >
      {LINKS.map((l) => (
        <a
          key={l.id}
          href={l.href}
          className={`text-sm underline-offset-4 transition ${
            active === l.id
              ? "text-[var(--accent)] font-semibold"
              : "text-[var(--text-main)] hover:text-[var(--accent)]"
          }`}
        >
          {l.name}
        </a>
      ))}
      <ThemeToggle />
    </nav>
  );
}
