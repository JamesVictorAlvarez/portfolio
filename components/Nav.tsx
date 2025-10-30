"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const links = ["Home", "Projects", "Experience", "Skills", "Contact"];

  return (
    <nav className="fixed top-0 w-full backdrop-blur bg-white/60 z-50 border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center h-16">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          James Alvarez
        </Link>

        <div className="hidden md:flex gap-6 text-sm">
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-neutral-600 transition">
              {link}
            </a>
          ))}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col items-center gap-3 py-4 bg-white border-t">
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
