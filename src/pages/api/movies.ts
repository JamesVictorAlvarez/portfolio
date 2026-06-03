import type { APIRoute } from 'astro';
import Parser from 'rss-parser';

export const GET: APIRoute = async () => {
  try {
    const parser = new Parser({
      customFields: {
        item: ['letterboxd:watchedDate'],
      }
    });
    const feed = await parser.parseURL(`https://letterboxd.com/StepTesTed/rss/`);

    const movies = feed.items.map((item: any) => {
      const content = item.content || "";
      const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
      let posterUrl = imgMatch ? imgMatch[1] : null;

      const ratingMatch = item.title?.match(/ - (★+½?)/);
      const rating = ratingMatch ? ratingMatch[1] : null;

      let finalTitle = item.title || "Unknown Movie";
      if (item.title) {
        const parts = item.title.split(/(, \d{4} - | - )/);
        finalTitle = parts[0];
      }

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
        posterUrl,
        rating,
        id: item.guid || item.link || Math.random().toString(),
        watchedDate,
        timestamp,
      };
    });

    const filtered = movies
      .filter((m: any) => m.posterUrl)
      .sort((a: any, b: any) => b.timestamp - a.timestamp);

    return new Response(JSON.stringify(filtered), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        // Cache API response at the Vercel Edge for 1 hour
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600'
      }
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify([]), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
