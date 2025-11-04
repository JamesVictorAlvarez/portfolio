"use client";
import { motion } from "framer-motion";
import { Music2 } from "lucide-react";

const songs = [
  {
    title: "Roommates",
    artist: "Malcolm Todd",
    embed: "https://open.spotify.com/embed/track/5vPUv0xziXbV4lnWeVNXNq?utm_source=generator",
  },
  {
    title: "한숨",
    artist: "GRACE",
    embed: "https://open.spotify.com/embed/track/2F4KHedLtAn8gCvJdViqJQ?utm_source=generator",
  },
  {
    title: "A couple minutes",
    artist: "Olivia Dean",
    embed: "https://open.spotify.com/embed/track/312z6PZ8wwREck8613PkJk?utm_source=generator",
  },
  {
    title: "Beanie",
    artist: "Chezile",
    embed: "https://open.spotify.com/embed/track/5e0b9LgOfi3aJSKXFcOWRe?utm_source=generator",
  },
  {
    title: "Bodies",
    artist: "Keshi",
    embed: "https://open.spotify.com/embed/track/7AaCqnFCdfEKesBwSzS8NQ?utm_source=generator",
  },
];

export default function Music() {
  return (
    <section id="music" className="section container-narrow flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex items-center gap-2 mb-8"
      >
        <Music2 className="text-[var(--accent)]" size={22} />
        <h2 className="h2">My Favourite Music</h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="muted mb-8 max-w-md"
      >
        Music I&apos;ve been listening to on repeat :)
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
        {songs.map((song, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-[var(--bg-alt)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_var(--accent)] transition"
          >
            <iframe
              style={{ borderRadius: "12px" }}
              src={song.embed}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
            <div className="p-3 text-left">
              <h3 className="text-[var(--text-main)] font-semibold text-base leading-tight">
                {song.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)]">{song.artist}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
