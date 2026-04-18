"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getRecentMovies, type Movie } from "@/app/actions/letterboxd";
import { Play, Film } from "lucide-react";

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

export default function Hobbies() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loadingMovies, setLoadingMovies] = useState(false);

  useEffect(() => {
    // Only fetch when expanded
    if (isExpanded && movies.length === 0) {
      setLoadingMovies(true);
      getRecentMovies("StepTesTed")
        .then((data) => {
          setMovies(data);
          setLoadingMovies(false);
        })
        .catch(() => setLoadingMovies(false));
    }
  }, [isExpanded, movies.length]);

  return (
    <section id="hobbies" className="section container-narrow flex flex-col pt-12 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <p className="label mb-2">Downtime</p>
        <h2 className="h2 flex items-center justify-between">
          Hobbies & Interests
        </h2>
      </motion.div>

      {/* Preview Card */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="group relative w-full flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)] transition-all duration-300 text-left gap-4 overflow-hidden"
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/0 via-[var(--accent)]/5 to-[var(--accent)]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="flex-1 flex flex-col sm:flex-row gap-6 relative z-10 w-full sm:w-auto">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 rounded-full bg-[var(--bg-main)] border border-[var(--border)] flex items-center justify-center p-3 text-[var(--text-muted)] group-hover:text-[var(--text-main)] group-hover:border-[var(--text-muted)] transition-colors">
              <Play size={18} />
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-[var(--text-main)] mb-1">On Repeat</h3>
              <p className="text-xs text-[var(--text-muted)]">{songs.length} favorite tracks</p>
            </div>
          </div>

          <div className="hidden sm:block w-px h-12 bg-[var(--border)]" />

          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 rounded-full bg-[var(--bg-main)] border border-[var(--border)] flex items-center justify-center p-3 text-[var(--text-muted)] group-hover:text-[var(--text-main)] group-hover:border-[var(--text-muted)] transition-colors">
              <Film size={18} />
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-[var(--text-main)] mb-1">Recent Watches</h3>
              <p className="text-xs text-[var(--text-muted)]">Letterboxd diary</p>
            </div>
          </div>
        </div>

        <div className="text-sm font-medium text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors flex items-center gap-2 self-start sm:self-center">
          {isExpanded ? "Collapse" : "Explore"}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ ease: [0.23, 1, 0.32, 1], duration: 0.4 }}
          >
            ▼
          </motion.div>
        </div>
      </motion.button>

      {/* Expanded Content Area */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-12 pt-10">
              
              {/* Music Section */}
              <div>
                <div className="flex items-center gap-2 mb-6 text-[var(--text-main)]">
                  <Play size={16} />
                  <h3 className="text-base font-semibold uppercase tracking-widest text-[var(--text-muted)]">Music</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                  {songs.map((song, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
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
              </div>

              {/* Borders separating sections visually if needed */}
              <div className="h-px w-full bg-[var(--border)]/50" />

              {/* Movies Section */}
              <div>
                <div className="flex items-center gap-2 mb-6 text-[var(--text-main)]">
                  <Film size={16} />
                  <h3 className="text-base font-semibold uppercase tracking-widest text-[var(--text-muted)]">Recently Watched</h3>
                </div>
                
                {loadingMovies ? (
                  <div className="text-sm font-mono text-[var(--text-muted)] animate-pulse">
                    Fetching from Letterboxd...
                  </div>
                ) : movies.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4">
                    {movies.map((movie, index) => (
                      <motion.a
                        href={movie.link}
                        target="_blank"
                        rel="noreferrer"
                        key={movie.id || index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
                        className="group flex items-center gap-4 sm:gap-5 py-3 px-2 sm:px-4 rounded-xl hover:bg-[var(--bg-card)]/50 transition-all z-10"
                      >
                        {/* Poster */}
                        <div className="relative w-16 sm:w-20 shrink-0 aspect-[2/3] overflow-hidden rounded-md shadow-sm border border-[var(--border)] group-hover:border-[var(--text-muted)] transition-all bg-[var(--bg-card)]">
                          {movie.posterUrl ? (
                            <img 
                              src={movie.posterUrl} 
                              alt={movie.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center p-2 text-center text-[10px] text-[var(--text-muted)]">
                              {movie.title}
                            </div>
                          )}
                        </div>
                        
                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-center py-1">
                          <h4 className="text-sm sm:text-base font-semibold text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors max-w-full leading-tight" title={movie.title}>
                            {movie.title}
                          </h4>
                          
                          <div className="flex items-center gap-2 mt-2">
                            {movie.rating && (
                              <span className="text-xs text-[var(--text-main)] font-semibold tracking-wider">
                                {movie.rating}
                              </span>
                            )}
                          </div>
                          
                          <div className="mt-1">
                            <span className="text-[10px] sm:text-xs text-[var(--text-muted)] font-mono tracking-widest uppercase group-hover:text-[var(--text-main)] transition-colors">
                              {movie.watchedDate}
                            </span>
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-[var(--text-muted)]">No movies found.</div>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
