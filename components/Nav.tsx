"use client";
import { useState, useEffect } from "react";

export default function Nav() {
  const links = [
    { name: "about", href: "#home" },
    { name: "skills", href: "#skills" },
    { name: "projects", href: "#projects" },
    { name: "experience", href: "#experience" },
    { name: "music", href: "#music" },
  ];

  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [active, setActive] = useState("home");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
          setVisible(false);
        } else {
          setVisible(true);
        }
        setLastScrollY(currentScrollY);
      }, 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) setActive(id);
          }
        });
      },
      {
        threshold: 0.6, 
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

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
      {links.map((l) => (
        <a
          key={l.name}
          href={l.href}
          className={`
            text-sm underline-offset-4 transition
            ${
              active === l.href.substring(1)
                ? "text-[var(--accent)] font-semibold"
                : "text-[var(--text-main)] hover:text-[var(--accent)]"
            }
          `}
        >
          {l.name}
        </a>
      ))}
    </nav>
  );
}
