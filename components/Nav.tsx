"use client";
import { useState, useEffect } from "react";

export default function Nav() {
  const links = [
    { name: "about", href: "#home" },
    { name: "projects", href: "#projects" },
    { name: "experience", href: "#experience" },
    { name: "contact", href: "#contact" },
  ];

  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // track scroll direction
  useEffect(() => {
    let timeout: number;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 80) {
          // scrolling down -> hide
          setVisible(false);
        } else {
          // scrolling up -> show
          setVisible(true);
        }
        setLastScrollY(currentScrollY);
      }, 50);
      
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
          className="
            text-sm text-[var(--text-main)]
            hover:text-[var(--accent)]
            underline-offset-4
            transition
          "
        >
          {l.name}
        </a>
      ))}
    </nav>
  );
}
