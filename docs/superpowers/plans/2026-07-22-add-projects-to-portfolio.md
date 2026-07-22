# Add projects to portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Kindred, FCCSS, and MacWidget to the portfolio project-card list, with Kindred first.

**Architecture:** Keep the existing `projects` array in `src/components/Projects.astro` as the single source of project metadata. Reuse the current bilingual description fields, technology tags, and optional demo/source link rendering without changing the card component or styles.

**Tech Stack:** Astro 5, TypeScript, Tailwind CSS, npm scripts.

## Global Constraints

- Preserve the existing project-card layout, bilingual rendering pattern, and link styling.
- List Kindred first because it is the latest project.
- Do not add a visible “Latest” badge.
- Do not modify `.github/PULL_REQUEST_DESCRIPTION.md`.

---

### Task 1: Add the three project entries

**Files:**
- Modify: `src/components/Projects.astro:2-31`
- Test: `npm run build`

**Interfaces:**
- Consumes: the existing `projects` array shape and the existing `projects.map` renderer.
- Produces: three new project cards with bilingual descriptions and the supplied URLs.

- [ ] **Step 1: Insert the new entries in latest-first order**

Add these objects at the beginning of the existing `projects` array:

```ts
  {
    title: "Kindred",
    description: {
      en: "Movie discovery and recommendation app with personalized recommendations, search, watchlists, favorites, a movie diary, and social profiles.",
      fr: "Application de découverte et de recommandation de films avec recommandations personnalisées, recherche, listes de films, favoris, journal de films et profils sociaux."
    },
    tech: ["React", "AWS Amplify", "TMDB API", "Cloudflare Pages"],
    demo: "https://kindred-movie-recommender.pages.dev/",
  },
  {
    title: "FCCSS",
    description: {
      en: "Bilingual community website for the Filipino Canadian Community of the South Shore, featuring organization information, activities, events, and contact details.",
      fr: "Site web bilingue pour la Filipino Canadian Community of the South Shore, présentant l'organisation, ses activités, ses événements et ses coordonnées."
    },
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    demo: "https://fccss.vercel.app/en",
  },
  {
    title: "MacWidget",
    description: {
      en: "Native macOS desktop widget app with customizable widgets, theming, persistence, and menu-bar integration.",
      fr: "Application native macOS de widgets de bureau avec widgets personnalisables, thèmes, sauvegarde persistante et intégration à la barre des menus."
    },
    tech: ["Swift", "SwiftUI", "AppKit"],
    code: "https://github.com/JamesVictorAlvarez/MacWidget",
  },
```

- [ ] **Step 2: Run the build validation**

Run:

```bash
npm run build
```

Expected: Astro completes the production build with exit code 0 and no content or TypeScript errors.

- [ ] **Step 3: Verify the exact data and diff scope**

Run:

```bash
rg -n "Kindred|FCCSS|MacWidget|kindred-movie-recommender|fccss\.vercel\.app/en|JamesVictorAlvarez/MacWidget" src/components/Projects.astro
git diff --check
git status --short
```

Expected: all three titles and supplied URLs appear in `Projects.astro`, `git diff --check` is clean, and `.github/PULL_REQUEST_DESCRIPTION.md` remains unmodified.

- [ ] **Step 4: Commit the implementation**

```bash
git add src/components/Projects.astro
git commit -m "feat: add recent portfolio projects"
```
