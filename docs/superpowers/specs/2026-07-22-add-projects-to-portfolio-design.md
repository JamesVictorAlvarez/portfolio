# Add projects to portfolio design

## Goal

Add three recent projects to the portfolio's existing project-card list without changing the established layout or interaction model.

## Scope

Update the project data in `src/components/Projects.astro` with:

- `Kindred`, listed first because it is the latest project. Describe it as a movie discovery and recommendation app with personalized recommendations, search, watchlist, favorites, diary, and social/profile features. Use `React`, `AWS Amplify`, `TMDB API`, and `Cloudflare Pages` as technology labels. Link the supplied live demo.
- `FCCSS`, listed second among the new entries. Describe it as a bilingual community website for the Filipino Canadian Community of the South Shore with organization information, activities, events, and contact navigation. Use `Next.js`, `Tailwind CSS`, and `Vercel` as technology labels. Link the supplied live demo.
- `MacWidget`, listed third among the new entries. Describe it as a native macOS desktop widget app with customizable widgets, theming, persistence, and menu-bar integration. Use `Swift`, `SwiftUI`, and `AppKit` as technology labels. Link the supplied repository as Source; no demo link is supplied.

The existing card layout, bilingual rendering pattern, and link styling remain unchanged. No visible “Latest” badge is added; ordering communicates recency without introducing a new UI concept.

## Validation

- Run the project type/content check or build command available in `package.json`.
- Confirm the three titles and supplied URLs are present in the rendered source/data.
- Review the diff to ensure the existing untracked `.github/PULL_REQUEST_DESCRIPTION.md` file is not modified.
