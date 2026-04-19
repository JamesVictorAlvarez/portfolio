"use client";
import { motion } from "motion/react";
import type { Movie } from "@/app/actions/letterboxd";
import Image from "next/image";

const songs = [
  "https://open.spotify.com/embed/track/5vPUv0xziXbV4lnWeVNXNq?utm_source=generator&theme=0",
  "https://open.spotify.com/embed/track/2F4KHedLtAn8gCvJdViqJQ?utm_source=generator&theme=0",
  "https://open.spotify.com/embed/track/312z6PZ8wwREck8613PkJk?utm_source=generator&theme=0",
  "https://open.spotify.com/embed/track/5e0b9LgOfi3aJSKXFcOWRe?utm_source=generator&theme=0",
  "https://open.spotify.com/embed/track/7AaCqnFCdfEKesBwSzS8NQ?utm_source=generator&theme=0",
];

export default function Hobbies({ initialMovies }: { initialMovies: Movie[] }) {
  const movies = initialMovies;

  return (
    <section id="hobbies" className="section container-narrow flex flex-col pt-12 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <p className="label mb-2">Downtime</p>
        <h2 className="h2">Hobbies & Interests</h2>
      </motion.div>

      {/* ─── Music ─── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="label mb-5">On repeat</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {songs.map((embed, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="overflow-hidden rounded-lg"
            >
              <iframe
                src={embed}
                width="100%"
                height="80"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ display: "block" }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ─── Divider ─── */}
      <div className="my-14" style={{ height: 1, background: "var(--border)" }} />

      {/* ─── Movies ─── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="label mb-5">Recently watched</p>

        {movies.length > 0 ? (
          <div
            className="flex gap-4 sm:gap-5 overflow-x-auto pb-2 -mx-1 px-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style>{`.movies-scroll::-webkit-scrollbar { display: none; }`}</style>
            {movies.map((movie, index) => (
              <motion.a
                href={movie.link}
                target="_blank"
                rel="noreferrer"
                key={movie.id || index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group shrink-0 w-[120px] sm:w-[140px]"
                style={{ textDecoration: "none" }}
              >
                {/* Poster */}
                <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                  {movie.posterUrl ? (
                    <Image
                      src={movie.posterUrl}
                      alt={movie.title}
                      fill
                      sizes="(max-width: 640px) 120px, 140px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center p-3 text-center text-[11px]"
                      style={{
                        color: "var(--text-muted)",
                        background: "var(--bg-alt)",
                      }}
                    >
                      {movie.title}
                    </div>
                  )}
                </div>

                {/* Meta */}
                <div className="mt-2.5 px-0.5">
                  <h4
                    className="text-xs sm:text-[13px] font-medium leading-snug truncate transition-colors duration-200 group-hover:text-[var(--accent)]"
                    style={{ color: "var(--text-main)" }}
                    title={movie.title}
                  >
                    {movie.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    {movie.rating && (
                      <span
                        className="text-[11px] font-medium tracking-wide"
                        style={{ color: "var(--text-main)" }}
                      >
                        {movie.rating}
                      </span>
                    )}
                    <span
                      className="text-[10px] font-mono tracking-wider uppercase"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {movie.watchedDate}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          <div className="text-sm" style={{ color: "var(--text-muted)" }}>
            No movies found.
          </div>
        )}
      </motion.div>
    </section>
  );
}
