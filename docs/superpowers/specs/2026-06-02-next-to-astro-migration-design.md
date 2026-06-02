# Spec: Porting Portfolio from Next.js + React to Astro

This specification details the plan to migrate the existing Next.js portfolio project to Astro. The goal is to eliminate React's runtime overhead (~150-200 KB of client-side JS) and achieve instantaneous page loads (near-zero latency) on Vercel, while retaining all custom animations, scroll tracking, themes, and dynamic Letterboxd integrations.

---

## 1. Objectives & Success Criteria

- **Performance:** Instantaneous load time (LCP < 0.5s, TTI < 0.5s) on Vercel CDN.
- **JavaScript Overhead:** Under 5 KB of client-side JS (down from ~200 KB).
- **Functionality:** 
  - Retain all visual design elements, fonts, colors, and layout exactly.
  - Keep the opening overlay animation and scroll-driven reveal animations.
  - Maintain the custom cursor and dark/light theme toggle.
  - Dynamically load the user's latest 6 Letterboxd movies in the browser via client-side fetch from a serverless API proxy (to bypass CORS).

---

## 2. Directory Layout & Package Restructuring

We will replace the Next.js setup with an Astro structure.

### 2.1 Dependencies to Add:
- `astro` (Astro core framework)
- `@astrojs/vercel` (Astro serverless adapter for Vercel functions)
- `@astrojs/tailwind` (Tailwind integration for Astro)
- `rss-parser` (kept for RSS parsing on the server API route)

### 2.2 Dependencies to Remove:
- `next`
- `react`, `react-dom`
- `motion` (Framer Motion)
- `react-icons` (icons will be replaced with inline SVGs to avoid bundle bloat)
- `@types/react`, `@types/react-dom`, `@eslint/eslintrc`, `eslint-config-next`

### 2.3 Proposed Directory Structure:
```
├── astro.config.mjs          # Astro configuration
├── package.json              # Managed dependencies and run scripts
├── tsconfig.json             # TypeScript configuration for Astro
├── public/                   # Static assets (images, logos, manifests)
└── src/
    ├── components/           # Astro components (zero-JS by default)
    │   ├── CustomCursor.astro
    │   ├── Experience.astro
    │   ├── Footer.astro
    │   ├── Hackathons.astro
    │   ├── Hero.astro
    │   ├── Hobbies.astro
    │   ├── Logo.astro
    │   ├── Nav.astro
    │   ├── OpeningAnimation.astro
    │   ├── Projects.astro
    │   ├── Scrollbar.astro
    │   └── ThemeToggle.astro
    ├── layouts/
    │   └── Layout.astro      # Master layout replacing layout.tsx
    ├── pages/
    │   ├── index.astro       # Landing page replacing page.tsx
    │   └── api/
    │       └── movies.ts     # Letterboxd CORS proxy endpoint (Vercel Serverless Function)
    └── styles/
        └── globals.css       # Clean Tailwind and custom CSS classes
```

---

## 3. Migration Plan Details

### 3.1 Astro Configuration (`astro.config.mjs`)
We will configure Astro with the Vercel serverless adapter:
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'server', // Ensures API endpoints function as serverless routes
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  integrations: [tailwind()],
});
```
*Note: While `output: 'server'` is used, Astro allows us to mark all static pages to be pre-rendered using `export const prerender = true;` at the top of `index.astro`. This achieves full CDN caching for pages while keeping `/api/movies` dynamic.*

### 3.2 Layout & Global Styles
- **`Layout.astro`:** Receives the basic structure from `app/layout.tsx`. It will output the HTML shell, inject metadata, load the Geist font, and place the `<Scrollbar />` element.
- **`globals.css`:** Ported directly. All custom easing curves, scrollbar stylings, card designs, and keyframe animations from `app/globals.css` are standard CSS and will function perfectly.

### 3.3 Component Transpilation (React -> Astro)
All component structures will be rewritten as Astro components (`.astro` files):

1. **Static Components (`Hero`, `Experience`, `Hackathons`, `Projects`, `Footer`, `Logo`):**
   - Rewritten with Astro syntax.
   - Any dynamic mapping (e.g. `items.map(...)`) will use JSX-like map arrays inside Astro code blocks.
   - Icons from `react-icons` are replaced with inline SVGs inside code templates.
   - Next.js `<Image>` component is replaced by Astro's optimized `<Image />` component from `astro:assets` or standard `<img>` tags for raw static speed.

2. **Scroll-Spy Reveal Animations:**
   - Instead of Framer Motion (`motion.div` / `whileInView`), we will use native CSS transitions triggered by a lightweight client-side `IntersectionObserver` script.
   - Any element with `data-animate` or scroll-in classes will fade and slide up automatically when entering the viewport.

3. **Opening Animation (`OpeningAnimation.astro`):**
   - The curtain reveal uses CSS keyframe animations. 
   - A tiny `<script>` inside `OpeningAnimation.astro` will manage adding the class `anim-curtain-open` on page paint, lock/unlock scroll, and clean up the overlay elements on transition finish.

4. **Theme Toggle (`ThemeToggle.astro`):**
   - Rewritten to use inline SVGs for Sun and Moon.
   - A inline client `<script>` handles click listeners on the theme button, toggles the `.light` class on `document.documentElement`, and writes preference to `localStorage`.

5. **Custom Cursor (`CustomCursor.astro`):**
   - Standard HTML cursor elements.
   - An inline client-side `<script>` tracks mouse position and uses a lightweight linear interpolation (lerp) inside a `requestAnimationFrame` loop to render smooth lagging cursor motion.

6. **Scroll Tracker (`Scrollbar.astro`):**
   - Renders a list of section links.
   - The client-side scroll spy logic matches elements currently in view to color/scale the appropriate sidebar indicator.

### 3.4 Hobbies & Letterboxd Integration
- **Client Fetch:** In `Hobbies.astro`, the movie list container renders a skeleton loader state by default.
- **API Handler (`src/pages/api/movies.ts`):**
  - Parses the Letterboxd RSS feed at `https://letterboxd.com/StepTesTed/rss/` using `rss-parser`.
  - Filters, formats, and returns the 6 most recent movies.
  - Adds cache-control headers (`Cache-Control: public, s-maxage=3600`) so Vercel caches the API response at the edge for 1 hour.
- **Client Script:** An inline client script in `Hobbies.astro` fetches `/api/movies` on load, builds the HTML string dynamically, and replaces the skeleton with the real movie cards.

---

## 4. Implementation Steps

1. **Scaffold Astro:** Install Astro, Tailwind integration, Vercel adapter, and remove Next.js dependencies.
2. **Move and adapt configuration files:** Establish `astro.config.mjs` and clean up `tsconfig.json`.
3. **Migrate layouts and styles:** Put global CSS in `src/styles/globals.css` and implement `Layout.astro`.
4. **Convert static components:** Adapt HTML, inline SVG icons, and Astro component structures.
5. **Convert interactive components:** Write vanilla JS scripts to replace Framer Motion and React states.
6. **Set up API endpoint:** Implement `/api/movies.ts` to parse the feed.
7. **Client-side Letterboxd rendering:** Bind fetch in `Hobbies.astro` to render items.
8. **Verify build and clean up:** Remove all old Next.js files and directories (`app/`, `components/`, `next.config.ts`, `postcss.config.mjs`, `tailwind.config.ts`, etc.) and ensure `astro build` passes.
