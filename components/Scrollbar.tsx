"use client";
import { useEffect, useState } from "react";

const sections = ["home", "skills", "projects", "experience", "music"];

export default function Scrollbar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40">
      {sections.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className={`relative block w-[3px] h-10 rounded-full transition-all duration-300
            ${
              active === id
                ? "bg-[var(--accent)] scale-110 shadow-[0_0_6px_var(--accent)]"
                : "bg-[var(--border)] hover:bg-[var(--text-muted)]"
            }
          `}
        >
          <span className="sr-only">{id}</span>
        </a>
      ))}
    </div>
  );
}
