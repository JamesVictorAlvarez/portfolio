"use client";
import { useEffect, useState } from "react";

type Opts = {
  ids: string[];
  thresholds?: number[];
  rootMargin?: string;
};

export function useScrollSpy({ ids, thresholds, rootMargin }: Opts) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      {
        threshold: thresholds ?? [0.15, 0.3, 0.45, 0.6],
        rootMargin: rootMargin ?? "-15% 0px -45% 0px",
      }
    );

    sections.forEach((s) => observer.observe(s));

    // 👇 ADD THIS FALLBACK HERE
    const handleScrollEnd = () => {
      const scrollPos = window.scrollY + window.innerHeight;
      const fullHeight = document.body.scrollHeight;
      if (fullHeight - scrollPos < 5) setActive(ids[ids.length - 1]);
    };

    window.addEventListener("scroll", handleScrollEnd);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScrollEnd);
      observer.disconnect();
    };
  }, [ids, thresholds, rootMargin]);

  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace("#", "");
      if (h && ids.includes(h)) setActive(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [ids]);

  return active;
}
