"use server";

import Parser from "rss-parser";
import { unstable_cache } from "next/cache";

export type Movie = {
  title: string;
  link: string;
  pubDate: string;
  posterUrl: string | null;
  rating: string | null;
  id: string;
  watchedDate: string;
  timestamp?: number;
};

async function fetchRecentMovies(username: string): Promise<Movie[]> {
  try {
    const parser = new Parser({
      customFields: {
        item: ['letterboxd:watchedDate'],
      }
    });
    // Use the user's RSS feed
    const feed = await parser.parseURL(`https://letterboxd.com/${username}/rss/`);

    const movies: Movie[] = feed.items.map((item) => {
      const content = item.content || "";

      // Extract poster image URL
      const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
      let posterUrl = imgMatch ? imgMatch[1] : null;

      // Extract rating from the title (e.g., "Movie Name - ★★★★")
      const ratingMatch = item.title?.match(/ - (★+½?)/);
      const rating = ratingMatch ? ratingMatch[1] : null;

      // Clean up the title by removing the year and rating
      let finalTitle = item.title || "Unknown Movie";
      if (item.title) {
        const parts = item.title.split(/(, \d{4} - | - )/);
        finalTitle = parts[0];
      }

      // Format the watched date nicely
      let watchedDate = "";
      const rawDate = item["letterboxd:watchedDate"] || item.pubDate;
      let timestamp = 0;
      if (rawDate) {
        const d = new Date(rawDate);
        if (!isNaN(d.getTime())) {
          timestamp = d.getTime();
          watchedDate = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        }
      }

      return {
        title: finalTitle,
        link: item.link || "",
        pubDate: item.pubDate || "",
        posterUrl,
        rating,
        id: item.guid || item.link || Math.random().toString(),
        watchedDate,
        timestamp,
      };
    });

    // Sort heavily by date (descending), filter ones with images, take first 6
    return movies
      .filter(m => m.posterUrl)
      .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
      .slice(0, 6);
  } catch (error) {
    console.error("Error fetching Letterboxd RSS:", error);
    return [];
  }
}

export const getRecentMovies = unstable_cache(
  async (username: string) => fetchRecentMovies(username),
  ['letterboxd-movies'],
  { revalidate: 3600 }
);
