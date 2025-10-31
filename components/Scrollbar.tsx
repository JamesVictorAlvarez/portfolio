"use client";
import { useScrollSpy } from "@/components/hooks/useScrollSpy";

const SECTIONS = ["home", "skills", "projects", "experience", "music"];

export default function ScrollTracker() {
  const active = useScrollSpy({ ids: SECTIONS });

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40">
      {SECTIONS.map((id) => (
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
