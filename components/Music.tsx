"use client";
import { motion } from "motion/react";

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
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <p className="label mb-2">On repeat</p>
        <h2 className="h2">Music I like</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
        {songs.map((song, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.07, ease: [0.23, 1, 0.32, 1] }}
            className="rounded-xl overflow-hidden border border-[var(--border)] hover:border-[var(--accent)] transition-colors duration-200"
          >
            <iframe
              className="rounded-t-xl"
              src={song.embed}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
