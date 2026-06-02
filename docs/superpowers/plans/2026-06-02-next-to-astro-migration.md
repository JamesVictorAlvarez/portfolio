# Next to Astro Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the portfolio website from Next.js + React to Astro + Vercel integration to eliminate React's runtime JavaScript footprint and achieve instant load times, while preserving all existing styling, custom animations, theme states, and RSS movie integrations.

**Architecture:** Port the app structure into Astro components with inline `<script>` tags for interactive components. Set up `@astrojs/vercel` serverless adapter to serve a cached API proxy for Letterboxd RSS requests, bypassing client CORS blockages.

**Tech Stack:** Astro, Tailwind CSS, TypeScript, `@astrojs/vercel`, `rss-parser`.

---

## File Mapping Table

| Source File | Destination File | Responsibility |
| --- | --- | --- |
| `package.json` | `package.json` | Restructure dependencies and build commands |
| `tsconfig.json` | `tsconfig.json` | Align types for Astro templates |
| N/A | `astro.config.mjs` | Configure Astro, Tailwind, and Vercel serverless integration |
| `app/globals.css` | `src/styles/globals.css` | Global styling rules, variables, keyframe animations |
| `app/layout.tsx` | `src/layouts/Layout.astro` | Root HTML shell and page metadata |
| `app/page.tsx` | `src/pages/index.astro` | Homepage landing template (Astro) |
| `components/Logo.tsx` | `src/components/Logo.astro` | SVG-based Logo component |
| `components/Hero.tsx` | `src/components/Hero.astro` | Hero section with portrait image |
| `components/Experience.tsx` | `src/components/Experience.astro` | Static list of work experience timeline |
| `components/Hackathons.tsx` | `src/components/Hackathons.astro` | Scroll-animated timeline of Hackathons |
| `components/Projects.tsx` | `src/components/Projects.astro` | Portfolio projects grid layout |
| `components/Footer.tsx` | `src/components/Footer.astro` | Contact and footer links |
| `components/ThemeToggle.tsx` | `src/components/ThemeToggle.astro` | Light/Dark mode switcher (Vanilla JS) |
| `components/CustomCursor.tsx` | `src/components/CustomCursor.astro` | Smooth lerped custom circle cursor (Vanilla JS) |
| `components/Scrollbar.tsx` | `src/components/Scrollbar.astro` | Custom scrollbar tracking dot indicators (Vanilla JS) |
| `components/OpeningAnimation.tsx` | `src/components/OpeningAnimation.astro` | CSS curtain slide in/out overlay (Vanilla JS) |
| `app/actions/letterboxd.ts` | `src/pages/api/movies.ts` | Serverless RSS proxy fetching Letterboxd feed |
| `components/Hobbies.tsx` | `src/components/Hobbies.astro` | Hobbies section with real-time movie client fetch |

---

## Tasks

### Task 1: Scaffolding and Dependencies Setup

**Files:**
- Modify: `package.json`
- Create: `astro.config.mjs`
- Modify: `tsconfig.json`

- [ ] **Step 1: Modify package.json**
  Update dependencies to include Astro and remove Next/React libraries.
  ```json
  {
    "name": "portfolio",
    "version": "0.1.0",
    "private": true,
    "type": "module",
    "scripts": {
      "dev": "astro dev",
      "start": "astro dev",
      "build": "astro build",
      "preview": "astro preview",
      "astro": "astro"
    },
    "dependencies": {
      "@astrojs/tailwind": "^6.0.0",
      "@astrojs/vercel": "^8.0.0",
      "astro": "^5.1.0",
      "rss-parser": "^3.13.0",
      "tailwindcss": "^3.4.1",
      "typescript": "^5.0.0"
    },
    "devDependencies": {}
  }
  ```

- [ ] **Step 2: Create astro.config.mjs**
  Define Astro Vercel serverless configurations.
  ```javascript
  import { defineConfig } from 'astro/config';
  import tailwind from '@astrojs/tailwind';
  import vercel from '@astrojs/vercel/serverless';

  export default defineConfig({
    output: 'server',
    adapter: vercel({
      webAnalytics: { enabled: true }
    }),
    integrations: [tailwind()],
  });
  ```

- [ ] **Step 3: Update tsconfig.json**
  Extend Astro compiler features.
  ```json
  {
    "extends": "astro/tsconfigs/strict",
    "compilerOptions": {
      "target": "ESNext",
      "module": "ESNext",
      "moduleResolution": "node",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": true,
      "baseUrl": ".",
      "paths": {
        "@/*": ["src/*"]
      },
      "strict": true,
      "jsx": "preserve",
      "jsxImportSource": "astro"
    }
  }
  ```

- [ ] **Step 4: Clean node_modules & Install**
  Run: `rm -rf node_modules package-lock.json && npm install`
  Expected: Installation finishes cleanly with new Astro packages.

- [ ] **Step 5: Commit config changes**
  Run: `git add package.json tsconfig.json astro.config.mjs package-lock.json && git commit -m "chore: setup astro environment and dependencies"`

---

### Task 2: Layout and CSS Configuration

**Files:**
- Create: `src/styles/globals.css`
- Create: `src/layouts/Layout.astro`

- [ ] **Step 1: Create global CSS file**
  Copy rules from `app/globals.css` into `src/styles/globals.css`. Ensure tailwind imports are correct.
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :root {
    --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
    --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
    --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
    --bg-main: #10121a;
    --bg-alt: #181c28;
    --text-main: #c8cdd8;
    --text-muted: #6b7280;
    --accent: #7b93d8;
    --accent-hover: #94abea;
    --border: #262c3a;
  }

  html.light {
    --bg-main: #f3f4f8;
    --bg-alt: #e8eaf0;
    --text-main: #2a2d35;
    --text-muted: #6b7080;
    --accent: #5a73c4;
    --accent-hover: #4960ab;
    --border: #d0d4dc;
  }

  body {
    background-color: var(--bg-main);
    color: var(--text-main);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  /* Insert other rules from app/globals.css here */
  ```

- [ ] **Step 2: Create Layout.astro**
  Implement the HTML container template.
  ```astro
  ---
  import '../styles/globals.css';
  import Scrollbar from '../components/Scrollbar.astro';

  interface Props {
    title?: string;
    description?: string;
  }

  const { 
    title = "James Victor Alvarez", 
    description = "Computer Science student at Concordia University — portfolio and projects." 
  } = Astro.props;
  ---

  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width" />
      <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="generator" content={Astro.generator} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </head>
    <body class="relative bg-[var(--bg-main)] text-[var(--text-main)] overflow-x-hidden">
      <div class="fixed inset-0 -z-10 pointer-events-none bg-dither" />
      <slot />
      <Scrollbar />
    </body>
  </html>
  ```

- [ ] **Step 3: Commit Layout and Styles**
  Run: `git add src/styles/globals.css src/layouts/Layout.astro && git commit -m "feat: migrate layout and global styles to astro"`

---

### Task 3: Converting Static Components

We port components that render static markup and do not rely on dynamic client execution.

**Files:**
- Create: `src/components/Logo.astro`
- Create: `src/components/Hero.astro`
- Create: `src/components/Experience.astro`
- Create: `src/components/Projects.astro`
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create Logo.astro**
  Translate the Logo SVG.
  ```astro
  ---
  const { className = "w-6 h-6" } = Astro.props;
  ---
  <svg 
    class={className} 
    viewBox="0 0 100 100" 
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <rect x="5" y="5" width="90" height="90" rx="22" style="fill: var(--bg-alt); stroke: var(--border);" stroke-width="2"/>
    <path d="M40 25 H75" style="stroke: var(--text-main);" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M60 25 V60 A 15 15 0 0 1 30 60 V55" style="stroke: var(--text-main);" stroke-width="8" stroke-linecap="round" fill="none"/>
    <circle cx="30" cy="25" r="5" style="fill: var(--accent);"/>
  </svg>
  ```

- [ ] **Step 2: Create Hero.astro**
  Render the intro block with static social icons in SVG format.
  ```astro
  ---
  import { Image } from 'astro:assets';
  ---
  <section
    id="home"
    class="section container-narrow pt-40 md:pt-32 pb-28 flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-16"
  >
    <div class="flex-1 max-w-lg">
      <p class="label mb-4" data-animate="2">
        Computer science · Concordia University
      </p>
      <h1
        class="text-4xl md:text-5xl font-bold mb-5 leading-[1.1]"
        style="letter-spacing: -0.03em; text-wrap: balance;"
        data-animate="3"
      >
        James Victor Alvarez
      </h1>
      <p
        class="muted text-base leading-relaxed mb-10"
        style="max-width: 50ch;"
        data-animate="4"
      >
        Currently studying CS and looking for opportunities to ship real products. I love working on side projects that involve AI and Web Development.
      </p>

      <div class="flex items-center gap-5" data-animate="5">
        <!-- SVG Github -->
        <a href="https://github.com/JamesVictorAlvarez" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm no-underline text-[var(--text-muted)] hover:text-[var(--accent)]">
          <svg class="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.44 22 12.017 22 6.484 17.522 2 12 2z"/></svg>
          <span>GitHub</span>
        </a>
        <!-- SVG LinkedIn -->
        <a href="https://www.linkedin.com/in/jv-alvarez/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm no-underline text-[var(--text-muted)] hover:text-[var(--accent)]">
          <svg class="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          <span>LinkedIn</span>
        </a>
        <!-- SVG Email -->
        <a href="mailto:jamesvictoralvarez@gmail.com" class="inline-flex items-center gap-2 text-sm no-underline text-[var(--text-muted)] hover:text-[var(--accent)]">
          <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          <span>Email</span>
        </a>
      </div>
    </div>

    <div class="flex-shrink-0 md:mt-6" data-animate="6">
      <div class="relative w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
        <img
          src="/me.jpg"
          alt="James Victor Alvarez — portrait photo"
          class="w-full h-full object-cover"
          loading="eager"
        />
      </div>
    </div>
  </section>
  ```

- [ ] **Step 3: Create Experience.astro**
  Map items with custom classes.
  ```astro
  ---
  const items = [
    {
      role: "Full Stack Developer",
      org: "Université de Montréal",
      period: "Feb 2026 - Present",
      logo: "/udem.png",
      points: [
        "Designed and built Elearning platform.",
        "Managed task delegation as a team lead.",
      ],
    },
    {
      role: "Software Intern",
      org: "MR Control Systems International",
      period: "May – Aug 2024",
      logo: "/mr_control_logo.jpg",
      points: [
        "Built IoT automation dashboards.",
        "Integrated Sinolta data sources; improved ops efficiency.",
      ],
    },
  ];
  ---
  <section id="experience" class="section container-narrow">
    <div class="mb-10" data-animate="7">
      <p class="label mb-2">Background</p>
      <h2 class="h2">Experience</h2>
    </div>

    <div class="flex flex-col space-y-10">
      {items.map((e, i) => (
        <div
          data-animate={String(8 + i)}
          class="relative group border-l-2 border-[var(--border)] pl-6 hover:border-[var(--accent)] transition-colors duration-300"
        >
          <span class="absolute -left-[5px] top-6 w-2 h-2 rounded-full bg-[var(--border)] group-hover:bg-[var(--accent)] transition-colors duration-300" />
          <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
            <div class="w-11 h-11 relative overflow-hidden flex-shrink-0 rounded-full bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent)] transition-all duration-300">
              {e.logo ? (
                <img src={e.logo} alt={e.org} class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-300" />
              ) : (
                <span class="text-xs font-bold text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">{e.org.split(" ").slice(0, 2).map(n => n[0]).join("")}</span>
              )}
            </div>
            <div class="flex flex-col">
              <h3 class="text-base font-semibold text-[var(--text-main)] leading-tight">
                {e.role}
              </h3>
              <span class="text-sm text-[var(--text-muted)] mt-0.5">
                {e.org}
              </span>
            </div>
            <span class="muted ml-auto text-xs font-medium tabular-nums pl-4 pt-1">
              {e.period}
            </span>
          </div>
          <div class="mt-4 flex flex-col space-y-2 text-sm text-[var(--text-muted)] leading-relaxed">
            {e.points.map((pt) => (
              <p class="text-[var(--text-muted)]">{pt}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
  ```

- [ ] **Step 4: Create Projects.astro**
  Map items with static HTML.
  ```astro
  ---
  const projects = [
    {
      title: "Music Guesser",
      description: "Web app where you guess songs or artists from 10-second audio clips. Real-time multiplayer with Socket.io.",
      tech: ["React", "Socket.io", "Express", "Vite"],
      demo: "https://music-guesser-eight.vercel.app/",
      code: "https://github.com/JamesVictorAlvarez/MusicGuesser",
    },
    {
      title: "Zonk",
      description: "A wave-based 3D shooter built with SDL3 and C++, featuring a raycasting engine, procedural audio, and dynamic obstacle-based gameplay.",
      tech: ["C++", "SDL3"],
      demo: "https://zonk-shooter.netlify.app/",
      code: "https://github.com/JamesVictorAlvarez/Zonk",
    },
    {
      title: "OrderUp",
      description: "Restaurant order management system. Real-time order tracking across kitchen and front-of-house.",
      tech: ["Flutter", "Firebase"],
      code: "https://github.com/JamesVictorAlvarez/OrderUp",
    },
  ];
  ---
  <section id="projects" class="section container-narrow">
    <div class="mb-10" data-animate="10">
      <p class="label mb-2">Selected work</p>
      <h2 class="h2">Projects</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      {projects.map((project, i) => (
        <article
          data-animate={String(11 + i)}
          class="card p-6 flex flex-col justify-between"
        >
          <div>
            <h3 class="text-lg font-semibold mb-2 text-[var(--text-main)]">
              {project.title}
            </h3>
            <p class="muted text-sm mb-4 leading-relaxed" style="max-width: 45ch;">
              {project.description}
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              {project.tech.map((t) => (
                <span class="text-xs px-2.5 py-1 rounded-md bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--border)]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div class="flex gap-5 text-sm pt-2 border-t border-[var(--border)]">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 no-underline text-[var(--text-muted)] hover:text-[var(--accent)]">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                Demo
              </a>
            )}
            {project.code && (
              <a href={project.code} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 no-underline text-[var(--text-muted)] hover:text-[var(--accent)]">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.44 22 12.017 22 6.484 17.522 2 12 2z"/></svg>
                Source
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  </section>
  ```

- [ ] **Step 5: Create Footer.astro**
  Footer structure with static social SVGs.
  ```astro
  ---
  ---
  <footer class="">
    <div class="section container-narrow py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div class="flex items-center gap-5">
        <a href="https://github.com/JamesVictorAlvarez" target="_blank" rel="noopener noreferrer" class="text-[var(--text-muted)] hover:text-[var(--accent)] no-underline transition-colors" aria-label="GitHub">
          <svg class="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.44 22 12.017 22 6.484 17.522 2 12 2z"/></svg>
        </a>
        <a href="https://www.linkedin.com/in/jv-alvarez/" target="_blank" rel="noopener noreferrer" class="text-[var(--text-muted)] hover:text-[var(--accent)] no-underline transition-colors" aria-label="LinkedIn">
          <svg class="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        </a>
        <a href="mailto:jamesvictoralvarez@gmail.com" class="text-[var(--text-muted)] hover:text-[var(--accent)] no-underline transition-colors" aria-label="Email">
          <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        </a>
      </div>
    </div>
  </footer>
  ```

- [ ] **Step 6: Create Hackathons.astro**
  Implements the timeline grid. Since there is no Framer Motion, we will mark the list container for viewport-entrance animations.
  ```astro
  ---
  const items = [
    {
      role: "ConUHacks X",
      org: "Concordia University",
      period: "Feb 2026",
      logo: "/conuhacks10.png",
      points: [
        "Engineered a custom web agent to autonomously drop out.",
        "Integrated AI decision-making to allow the agent to dynamically interpret unclear user flows.",
      ],
    },
    {
      role: "GameJam UdeM",
      org: "Université de Montréal",
      period: "May 2025",
      logo: "/UdeM_game.png",
      points: [
        "Designed and developed an educational 3D game that helps teachers understand how students feel and learn through interactive level-based experiences.",
        "Built in Unity using C#, with each level presenting unique challenges.",
      ],
    },
    {
      role: "ConUHacks IX",
      org: "Concordia University",
      period: "Feb 2025",
      logo: "/conuhacks9.png",
      points: [
        "Implemented a first-person ray-casting engine from scratch in C++ using SDL2 for rendering and real-time graphics.",
        "Developed a multiplayer architecture supporting both TCP and UDP sockets.",
      ],
    },
    {
      role: "JACHacks",
      org: "John Abbott College",
      period: "May 2024",
      logo: "/jachacks.png",
      points: [
        "Winner of Valnet Mini Challenge.",
        "Built an AI-driven web-scraping system to measure news timeliness and implemented keyword extraction using NLP models.",
        "Automated data extraction from Excel sheets, GameRant articles, and Twitter posts, handling rate limits and structural differences across websites.",
      ],
    },
    {
      role: "GameJam DINGO",
      org: "Vanier College",
      period: "Jan 2024",
      logo: "/dingo.png",
      points: [
        "Developed a 2D platformer in Unity where players use magic abilities that dynamically alter parkour mechanics and character effects.",
        "Implemented custom C# scripts for camera control, state management.",
      ],
    },
  ];
  const isLeft = (i: number) => i % 2 === 0;
  ---
  <section id="hackathons" class="section container-narrow">
    <div class="mb-14 text-center" data-animate="15">
      <p class="label mb-2">Events & Competitions</p>
      <h2 class="h2">Hackathons</h2>
    </div>

    <div class="relative">
      <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[var(--border)]" />
      <div class="block md:hidden absolute left-[11px] top-0 bottom-0 w-px bg-[var(--border)]" />

      <div class="flex flex-col gap-12 md:gap-16">
        {items.map((e, i) => {
          const left = isLeft(i);
          return (
            <div class="relative md:grid md:grid-cols-2 md:gap-10">
              <span class="hidden md:block absolute left-1/2 top-3 w-3 h-3 -translate-x-1/2 rounded-full border-2 border-[var(--border)] bg-[var(--bg-main)] z-10" />
              <span class="block md:hidden absolute left-[6px] top-[6px] w-[11px] h-[11px] rounded-full border-2 border-[var(--border)] bg-[var(--bg-main)] z-10" />

              <div
                data-animate={String(16 + i)}
                class={`group pl-8 md:pl-0 ${
                  left
                    ? "md:pr-10 md:text-right md:col-start-1 md:row-start-1"
                    : "md:pl-10 md:text-left md:col-start-2 md:row-start-1"
                }`}
              >
                <span class="inline-block text-[10px] uppercase tracking-widest font-semibold py-1 mb-3 text-[var(--accent)]">
                  {e.period}
                </span>

                <div class={`flex items-center gap-4 ${left ? "md:flex-row-reverse" : ""}`}>
                  <img
                    src={e.logo}
                    alt={`${e.role} logo`}
                    class="w-11 h-11 rounded-lg object-contain shrink-0 opacity-80"
                  />
                  <div>
                    <h3 class="text-lg font-semibold text-[var(--text-main)] leading-snug">
                      {e.role}
                    </h3>
                    <p class="text-sm text-[var(--text-muted)] mt-0.5">
                      {e.org}
                    </p>
                  </div>
                </div>

                <div class="mt-3 flex flex-col space-y-2 text-sm text-[var(--text-muted)] leading-relaxed">
                  {e.points.map((pt) => (
                    <p>{pt}</p>
                  ))}
                </div>

                <div
                  class={`hidden md:block mt-4 h-[2px] w-12 rounded-full bg-[var(--border)] group-hover:bg-[var(--accent)] transition-colors duration-300 ${
                    left ? "ml-auto" : "mr-auto"
                  }`}
                />
              </div>

              <div class={`hidden md:block ${left ? "md:col-start-2" : "md:col-start-1"} md:row-start-1`} />
            </div>
          );
        })}
      </div>
    </div>
  </section>
  ```

- [ ] **Step 7: Commit Static Components**
  Run: `git add src/components/Logo.astro src/components/Hero.astro src/components/Experience.astro src/components/Projects.astro src/components/Footer.astro src/components/Hackathons.astro && git commit -m "feat: port static portfolio components to astro templates"`

---

### Task 4: Interactive Client Components

Write Astro templates with vanilla `<script>` blocks for elements that require active DOM manipulation.

**Files:**
- Create: `src/components/ThemeToggle.astro`
- Create: `src/components/Scrollbar.astro`
- Create: `src/components/CustomCursor.astro`
- Create: `src/components/OpeningAnimation.astro`
- Create: `src/components/Nav.astro`

- [ ] **Step 1: Create ThemeToggle.astro**
  Uses local storage checking and click events on an HTML button.
  ```astro
  ---
  ---
  <button
    id="theme-toggle"
    aria-label="Toggle theme"
    class="flex items-center justify-center w-8 h-8 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
    style="transition: color 0.2s cubic-bezier(0.16,1,0.3,1), transform 140ms ease-out;"
  >
    <span id="sun-icon" class="hidden flex items-center justify-center text-[15px]">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
    </span>
    <span id="moon-icon" class="flex items-center justify-center text-[15px]">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
    </span>
  </button>

  <script>
    const btn = document.getElementById("theme-toggle");
    const sun = document.getElementById("sun-icon");
    const moon = document.getElementById("moon-icon");

    const updateIcons = (isLight: boolean) => {
      if (isLight) {
        sun?.classList.remove("hidden");
        moon?.classList.add("hidden");
      } else {
        sun?.classList.add("hidden");
        moon?.classList.remove("hidden");
      }
    };

    // Load initial theme
    const saved = localStorage.getItem("theme");
    const isLight = saved === "light";
    document.documentElement.classList.toggle("light", isLight);
    updateIcons(isLight);

    btn?.addEventListener("mousedown", () => btn.style.transform = "scale(0.92)");
    btn?.addEventListener("mouseup", () => btn.style.transform = "scale(1)");
    btn?.addEventListener("mouseleave", () => btn.style.transform = "scale(1)");

    btn?.addEventListener("click", () => {
      const active = document.documentElement.classList.toggle("light");
      localStorage.setItem("theme", active ? "light" : "dark");
      updateIcons(active);
    });
  </script>
  ```

- [ ] **Step 2: Create CustomCursor.astro**
  Lerp cursor updates on custom element coordinates.
  ```astro
  ---
  ---
  <div id="custom-cursor" class="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference hidden md:block">
    <div id="cursor-dot" class="w-6 h-6 rounded-full bg-white shadow-[0_0_10px_var(--accent)] transition-transform duration-200" />
  </div>

  <script>
    const cursor = document.getElementById("custom-cursor");
    const dot = document.getElementById("cursor-dot");
    if (cursor && dot) {
      let mouseX = 0, mouseY = 0;
      let currentX = 0, currentY = 0;
      
      window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      const tick = () => {
        // Simple lerp calculation
        currentX += (mouseX - currentX) * 0.15;
        currentY += (mouseY - currentY) * 0.15;

        cursor.style.transform = `translate3d(${currentX - 12}px, ${currentY - 12}px, 0)`;
        requestAnimationFrame(tick);
      };
      tick();

      const enter = () => dot.style.transform = "scale(1.5)";
      const leave = () => dot.style.transform = "scale(1)";

      const setupListeners = () => {
        document.querySelectorAll("a, button, .hoverable").forEach((el) => {
          el.removeEventListener("mouseenter", enter);
          el.removeEventListener("mouseleave", leave);
          el.addEventListener("mouseenter", enter);
          el.addEventListener("mouseleave", leave);
        });
      };
      
      setupListeners();
      // Re-observe if the dynamic Letterboxd list mounts later
      const obs = new MutationObserver(setupListeners);
      obs.observe(document.body, { childList: true, subtree: true });
    }
  </script>
  ```

- [ ] **Step 3: Create Scrollbar.astro**
  Draw indicators and bind hash links.
  ```astro
  ---
  const SECTIONS = ["home", "experience", "hackathons", "projects", "hobbies"];
  ---
  <div id="scrollbar-spy" class="fixed right-5 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3 z-40">
    {SECTIONS.map((id) => (
      <a
        href={`#${id}`}
        data-section-link={id}
        class="relative block w-[3px] h-10 rounded-full no-underline transition-all duration-300 bg-[var(--border)] hover:bg-[var(--text-muted)]"
      >
        <span class="sr-only">{id}</span>
      </a>
    ))}
  </div>

  <script>
    const links = document.querySelectorAll("[data-section-link]");
    const ids = Array.from(links).map(l => l.getAttribute("data-section-link") || "");

    const updateActive = (activeId: string) => {
      links.forEach((l) => {
        const id = l.getAttribute("data-section-link");
        if (id === activeId) {
          l.className = "relative block w-[3px] h-10 rounded-full no-underline transition-all duration-300 bg-[var(--accent)] scale-110";
        } else {
          l.className = "relative block w-[3px] h-10 rounded-full no-underline transition-all duration-300 bg-[var(--border)] hover:bg-[var(--text-muted)]";
        }
      });
    };

    const sections = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    if (sections.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          updateActive(visible.target.id);
        }
      }, {
        threshold: [0.15, 0.3, 0.45, 0.6],
        rootMargin: "-15% 0px -45% 0px"
      });

      sections.forEach(s => observer.observe(s));

      window.addEventListener("scroll", () => {
        const scrollPos = window.scrollY + window.innerHeight;
        if (document.body.scrollHeight - scrollPos < 5) {
          updateActive(ids[ids.length - 1]);
        }
      });
    }
  </script>
  ```

- [ ] **Step 4: Create OpeningAnimation.astro**
  Fades curtain overlay out using CSS keyframes and locks page scroll.
  ```astro
  ---
  ---
  <div id="opening-overlay" class="opening-overlay">
    <div class="opening-panel opening-panel--top"></div>
    <div class="opening-panel opening-panel--bottom"></div>
  </div>

  <script>
    const overlay = document.getElementById("opening-overlay");
    const topPanel = overlay?.querySelector(".opening-panel--top");

    if (overlay && topPanel) {
      // Reduced motion check
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mq.matches) {
        overlay.remove();
      } else {
        document.documentElement.style.overflow = "hidden";
        
        requestAnimationFrame(() => {
          document.documentElement.classList.add("anim-curtain-open");
        });

        topPanel.addEventListener("animationend", () => {
          document.documentElement.style.overflow = "";
          document.documentElement.classList.add("anim-stagger");
          
          // Fully delete overlay from DOM after animation completes
          setTimeout(() => {
            overlay.remove();
          }, 1800);
        });
      }
    }
  </script>
  ```

- [ ] **Step 5: Create Nav.astro**
  Header bar containing Logo, section link mappings, and ThemeToggle.
  ```astro
  ---
  import Logo from './Logo.astro';
  import ThemeToggle from './ThemeToggle.astro';

  const LINKS = [
    { name: "about", href: "#home", id: "home" },
    { name: "experience", href: "#experience", id: "experience" },
    { name: "hackathons", href: "#hackathons", id: "hackathons" },
    { name: "projects", href: "#projects", id: "projects" },
    { name: "hobbies", href: "#hobbies", id: "hobbies" },
  ];
  ---
  <div id="main-nav" class="fixed top-0 left-0 right-0 z-50 hidden md:flex justify-center pointer-events-none opacity-0 transition-opacity duration-500" data-animate="1">
    <nav class="flex items-center gap-1 mt-4 px-2 py-1.5 rounded-xl border border-transparent bg-[var(--bg-main)]/80 backdrop-blur-md pointer-events-auto">
      <a href="#home" aria-label="Home" class="px-2 hover:scale-95 transition-transform flex items-center justify-center">
        <Logo className="w-5 h-5" />
      </a>

      <div class="w-px h-4 bg-[var(--border)]/40 mx-1" />

      {LINKS.map((l, i) => (
        <a
          href={l.href}
          data-nav-item={l.id}
          class="group relative px-3.5 py-1.5 text-[13px] tracking-wide select-none transition-transform duration-200 text-[var(--text-muted)] hover:text-[var(--text-main)] no-underline"
        >
          {l.name}
        </a>
      ))}

      <div class="w-px h-4 bg-[var(--border)]/40 mx-1" />
      <ThemeToggle />
    </nav>
  </div>

  <script>
    const nav = document.getElementById("main-nav");
    if (nav) {
      setTimeout(() => {
        nav.classList.remove("opacity-0");
      }, 80);
      
      const navLinks = nav.querySelectorAll("[data-nav-item]");
      
      // Make nav links respond to scale transformations
      navLinks.forEach((link) => {
        const el = link as HTMLElement;
        el.addEventListener("mousedown", () => el.style.transform = "scale(0.97)");
        el.addEventListener("mouseup", () => el.style.transform = "scale(1)");
        el.addEventListener("mouseleave", () => el.style.transform = "scale(1)");
      });

      // Update current active link highlights
      const links = document.querySelectorAll("[data-section-link]");
      const observer = new MutationObserver(() => {
        let activeId = "";
        links.forEach((l) => {
          if (l.classList.contains("bg-[var(--accent)]")) {
            activeId = l.getAttribute("data-section-link") || "";
          }
        });
        navLinks.forEach((nl) => {
          const id = nl.getAttribute("data-nav-item");
          if (id === activeId) {
            nl.className = "group relative px-3.5 py-1.5 text-[13px] tracking-wide select-none transition-transform duration-200 text-[var(--text-main)] underline underline-offset-[6px] decoration-[var(--text-main)] decoration-1";
          } else {
            nl.className = "group relative px-3.5 py-1.5 text-[13px] tracking-wide select-none transition-transform duration-200 text-[var(--text-muted)] hover:text-[var(--text-main)] no-underline";
          }
        });
      });
      observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
    }
  </script>
  ```

- [ ] **Step 6: Commit Interactive Components**
  Run: `git add src/components/ThemeToggle.astro src/components/Scrollbar.astro src/components/CustomCursor.astro src/components/OpeningAnimation.astro src/components/Nav.astro && git commit -m "feat: add interactive component shells with vanilla script bindings"`

---

### Task 5: Dynamic letterboxd RSS API Endpoint

**Files:**
- Create: `src/pages/api/movies.ts`

- [ ] **Step 1: Create movies.ts API Endpoint**
  Extract RSS details. Add Edge headers to leverage Vercel's caching.
  ```typescript
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
        .sort((a: any, b: any) => b.timestamp - a.timestamp)
        .slice(0, 6);

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
      return new Response(JSON.stringify([]), { status: 500 });
    }
  };
  ```

- [ ] **Step 2: Commit API Route**
  Run: `git add src/pages/api/movies.ts && git commit -m "feat: implement vercel edge cached serverless API for letterboxd parsing"`

---

### Task 6: Hobbies & Dynamic Client Loading

**Files:**
- Create: `src/components/Hobbies.astro`

- [ ] **Step 1: Create Hobbies.astro**
  Renders the Spotify embeds and loads Letterboxd movie lists dynamically.
  ```astro
  ---
  const songs = [
    "https://open.spotify.com/embed/track/5vPUv0xziXbV4lnWeVNXNq?utm_source=generator&theme=0",
    "https://open.spotify.com/embed/track/2F4KHedLtAn8gCvJdViqJQ?utm_source=generator&theme=0",
    "https://open.spotify.com/embed/track/312z6PZ8wwREck8613PkJk?utm_source=generator&theme=0",
    "https://open.spotify.com/embed/track/5e0b9LgOfi3aJSKXFcOWRe?utm_source=generator&theme=0",
    "https://open.spotify.com/embed/track/7AaCqnFCdfEKesBwSzS8NQ?utm_source=generator&theme=0",
  ];
  ---
  <section id="hobbies" class="section container-narrow flex flex-col pt-12 overflow-hidden">
    <div class="mb-10 animate-fade-in">
      <p class="label mb-2">Downtime</p>
      <h2 class="h2">Hobbies & Interests</h2>
    </div>

    <!-- Music -->
    <div class="mb-14">
      <p class="label mb-5">On repeat</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        {songs.map((embed) => (
          <div class="overflow-hidden rounded-lg">
            <iframe
              src={embed}
              width="100%"
              height="80"
              frameborder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style="display: block;"
            />
          </div>
        ))}
      </div>
    </div>

    <!-- Movies -->
    <div>
      <p class="label mb-5">Recent Watches</p>
      <div id="movie-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <!-- Skeleton loaders -->
        {[1, 2, 3, 4, 5, 6].map(() => (
          <div class="animate-pulse flex flex-col gap-2">
            <div class="bg-[var(--border)] rounded-md aspect-[2/3] w-full" />
            <div class="h-4 bg-[var(--border)] rounded w-3/4" />
          </div>
        ))}
      </div>
    </div>
  </section>

  <script>
    async function loadMovies() {
      const container = document.getElementById("movie-grid");
      if (!container) return;

      try {
        const res = await fetch("/api/movies");
        const movies = await res.json();
        
        if (!movies || movies.length === 0) {
          container.innerHTML = `<p class="text-sm text-[var(--text-muted)] col-span-full">Failed to load movies.</p>`;
          return;
        }

        container.innerHTML = movies.map((m: any) => `
          <a
            href="${m.link}"
            target="_blank"
            rel="noopener noreferrer"
            class="flex flex-col gap-2 group no-underline text-[var(--text-main)] hover:text-[var(--accent)]"
          >
            <div class="relative aspect-[2/3] overflow-hidden rounded-lg border border-[var(--border)] group-hover:border-[var(--accent)] transition-all duration-300">
              <img
                src="${m.posterUrl}"
                alt="${m.title}"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div class="flex flex-col">
              <span class="text-xs font-semibold leading-tight line-clamp-1 group-hover:text-[var(--accent)] transition-colors">
                ${m.title}
              </span>
              ${m.rating ? `<span class="text-[10px] text-[var(--accent-warn)] mt-0.5">${m.rating}</span>` : ''}
            </div>
          </a>
        `).join("");
      } catch (err) {
        console.error(err);
        container.innerHTML = `<p class="text-sm text-[var(--text-muted)] col-span-full">Failed to load movies.</p>`;
      }
    }

    loadMovies();
  </script>
  ```

- [ ] **Step 2: Commit Hobbies**
  Run: `git add src/components/Hobbies.astro && git commit -m "feat: add hobbies page layout and asynchronous client-side movie grid loader"`

---

### Task 7: Homepage and Global Scroll Animations

**Files:**
- Create: `src/pages/index.astro`

- [ ] **Step 1: Create index.astro**
  Pre-renders page statically on CDNs. Injects global scroll animation observers to fade elements with `data-animate` attributes into view seamlessly.
  ```astro
  ---
  import Layout from '../layouts/Layout.astro';
  import Nav from '../components/Nav.astro';
  import Hero from '../components/Hero.astro';
  import Experience from '../components/Experience.astro';
  import Hackathons from '../components/Hackathons.astro';
  import Projects from '../components/Projects.astro';
  import Hobbies from '../components/Hobbies.astro';
  import Footer from '../components/Footer.astro';
  import OpeningAnimation from '../components/OpeningAnimation.astro';
  import CustomCursor from '../components/CustomCursor.astro';

  // Instruct Astro to pre-render this index page statically
  export const prerender = true;
  ---

  <Layout>
    <OpeningAnimation />
    <CustomCursor />
    <Nav />
    <main>
      <Hero />
      <Experience />
      <Hackathons />
      <Projects />
      <Hobbies />
    </main>
    <Footer />
  </Layout>

  <script>
    // General scroll animations using IntersectionObserver to replace Framer Motion
    const animatedElements = document.querySelectorAll("[data-animate]");
    if (animatedElements.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.classList.add("visible");
            observer.unobserve(el); // Fire animation only once
          }
        });
      }, {
        threshold: 0.05,
        rootMargin: "0px 0px -5% 0px"
      });

      animatedElements.forEach((el) => {
        // Prepare initial animation states
        el.classList.add("scroll-trigger");
        observer.observe(el);
      });
    }
  </script>

  <style is:global>
    /* Styling rules for scroll triggered animations */
    .scroll-trigger {
      opacity: 0;
      transform: translateY(12px);
      transition: opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1), transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    }
    .scroll-trigger.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Handle specific staggering delay modifiers based on data-animate values */
    [data-animate="1"] { transition-delay: 80ms; }
    [data-animate="2"] { transition-delay: 150ms; }
    [data-animate="3"] { transition-delay: 220ms; }
    [data-animate="4"] { transition-delay: 290ms; }
    [data-animate="5"] { transition-delay: 360ms; }
    [data-animate="6"] { transition-delay: 430ms; }
  </style>
  ```

- [ ] **Step 2: Commit index page**
  Run: `git add src/pages/index.astro && git commit -m "feat: complete homepage template assembly with viewport entry scroll spy hooks"`

---

### Task 8: Cleanup and Verification

**Files:**
- Modify: `package.json`
- Delete: `app/`
- Delete: `components/`
- Delete: `next-env.d.ts`
- Delete: `next.config.ts`
- Delete: `postcss.config.mjs`
- Delete: `tailwind.config.ts`

- [ ] **Step 1: Delete Next.js files**
  Run: `rm -rf app components next-env.d.ts next.config.ts postcss.config.mjs tailwind.config.ts`
  Expected: Unused folders and configurations deleted.

- [ ] **Step 2: Run production build verification**
  Run: `npm run build`
  Expected: Passes with no typescript or bundle compilation errors, creating a `.vercel` or `.astro` output structure.

- [ ] **Step 3: Commit all deletions**
  Run: `git add -A && git commit -m "cleanup: remove obsolete nextjs, react, and framer motion source files"`

---
