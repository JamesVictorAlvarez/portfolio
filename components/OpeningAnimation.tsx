"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * Opening animation with a diagonal clip-path wipe reveal.
 *
 * Two overlay panels (top-left & bottom-right halves of the viewport)
 * slide apart along a diagonal seam, revealing the page beneath.
 * Once the wipe completes, page-content elements stagger in with a
 * blur-fade-up effect driven by CSS `animation-delay` via
 * `[data-animate]` attributes.
 *
 * The overlay is removed from the DOM after completing so it never
 * interferes with interaction.
 */
export default function OpeningAnimation() {
  const [phase, setPhase] = useState<"curtain" | "stagger" | "done">("curtain");

  const handleCurtainEnd = useCallback(() => {
    setPhase("stagger");
    // Give stagger animations time, then clean up entirely
    const cleanup = setTimeout(() => setPhase("done"), 1800);
    return () => clearTimeout(cleanup);
  }, []);

  useEffect(() => {
    // Check reduced-motion preference
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setPhase("done");
      return;
    }

    // Lock scroll during curtain
    document.documentElement.style.overflow = "hidden";

    // Start the curtain opening after a tiny paint delay
    const id = requestAnimationFrame(() => {
      document.documentElement.classList.add("anim-curtain-open");
    });

    return () => cancelAnimationFrame(id);
  }, []);

  // Unlock scroll when curtain finishes
  useEffect(() => {
    if (phase !== "curtain") {
      document.documentElement.style.overflow = "";
    }
  }, [phase]);

  // Trigger stagger class on body
  useEffect(() => {
    if (phase === "stagger") {
      document.documentElement.classList.add("anim-stagger");
    }
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className="opening-overlay"
      style={{ pointerEvents: phase === "curtain" ? "all" : "none" }}
    >
      {/* Top-left panel — slides up-left */}
      <div
        className="opening-panel opening-panel--top"
        onAnimationEnd={handleCurtainEnd}
      />
      {/* Bottom-right panel — slides down-right */}
      <div className="opening-panel opening-panel--bottom" />
    </div>
  );
}
