# i18n French Support Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement full French translation (i18n) support across the portfolio using a CSS-based toggle system for flicker-free transitions, complete with FOUC/FOUT prevention and a globe selector in the header navigation.

**Architecture:** Render English and French content side-by-side in HTML wrapper elements. Apply a blocking head script in the layout to set the default or stored language on the `html[lang]` attribute, and show/hide content via CSS rules. Implement month-abbreviation translation for dynamically loaded Letterboxd watch dates.

**Tech Stack:** Astro, Tailwind CSS, Vanilla JS.

---

### Task 1: CSS & Language Resolution Script

**Files:**
- Modify: `src/styles/globals.css`
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Add language selector styles in globals.css**
  Append these lines to the very end of `src/styles/globals.css`:
  
  ```css
  /* ── Language Switcher Visibility ── */
  html:not([lang="fr"]) .lang-fr {
    display: none !important;
  }
  html[lang="fr"] .lang-en {
    display: none !important;
  }
  ```

- [ ] **Step 2: Add inline blocking resolution script in Layout.astro**
  Insert the blocking script inside the `<head>` tag, right next to the theme resolution script in `src/layouts/Layout.astro`:
  
  ```html
      <script is:inline>
        (function() {
          let savedLang = "en";
          try {
            savedLang = localStorage.getItem("lang");
            if (!savedLang) {
              const navLang = navigator.language || "en";
              savedLang = navLang.startsWith("fr") ? "fr" : "en";
            }
          } catch (e) {
            // Ignore storage errors
          }
          document.documentElement.setAttribute("lang", savedLang);
        })();
      </script>
  ```

- [ ] **Step 3: Run build validation**
  Run command: `npm run build`
  Expected: Successful compilation.

- [ ] **Step 4: Commit changes**
  Run commands:
  ```bash
  git add src/styles/globals.css src/layouts/Layout.astro
  git commit -m "style: define i18n CSS toggles and FOUT prevention head script"
  ```

---

### Task 2: Create LanguageToggle Component

**Files:**
- Create: `src/components/LanguageToggle.astro`

- [ ] **Step 1: Write the LanguageToggle component**
  Write a custom button showing a globe icon and current language label. Click swaps the attribute, saves to storage, and dispatches a custom event.
  
  Create file `src/components/LanguageToggle.astro` with the following content:
  
  ```html
  ---
  ---
  <button
    id="lang-toggle-btn"
    aria-label="Switch language"
    class="relative flex items-center justify-center gap-1.5 h-8 px-2.5 rounded-lg text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-alt)] border border-transparent hover:border-[var(--border)] transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
  >
    <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
    <span id="lang-label" class="uppercase">EN</span>
  </button>

  <script>
    const btn = document.getElementById("lang-toggle-btn");
    const label = document.getElementById("lang-label");

    if (btn && label) {
      const updateLabel = () => {
        const currentLang = document.documentElement.getAttribute("lang") || "en";
        label.textContent = currentLang === "fr" ? "FR" : "EN";
      };

      btn.addEventListener("mousedown", () => btn.style.transform = "scale(0.95)");
      btn.addEventListener("mouseup", () => btn.style.transform = "scale(1)");
      btn.addEventListener("mouseleave", () => btn.style.transform = "scale(1)");

      btn.addEventListener("click", () => {
        const currentLang = document.documentElement.getAttribute("lang") || "en";
        const newLang = currentLang === "en" ? "fr" : "en";
        
        document.documentElement.setAttribute("lang", newLang);
        try {
          localStorage.setItem("lang", newLang);
        } catch (e) {
          // Ignore storage write errors
        }
        
        updateLabel();
        window.dispatchEvent(new CustomEvent("lang-change", { detail: { lang: newLang } }));
      });

      updateLabel();
      window.addEventListener("lang-change", updateLabel);
    }
  </script>
  ```

- [ ] **Step 2: Run build validation**
  Run command: `npm run build`
  Expected: Successful compilation.

- [ ] **Step 3: Commit the new component**
  Run commands:
  ```bash
  git add src/components/LanguageToggle.astro
  git commit -m "feat: create LanguageToggle component"
  ```

---

### Task 3: Integrate LanguageToggle and Translate Navigation

**Files:**
- Modify: `src/components/Nav.astro`

- [ ] **Step 1: Swap toggle import and translate LINKS mapping**
  Update `src/components/Nav.astro` to render the `<LanguageToggle />` component next to `<ThemeSelector />`, and replace the navigation link texts with dual-language wraps.
  
  Replace lines 1-35 in `src/components/Nav.astro` with:
  
  ```html
  ---
  import Logo from './Logo.astro';
  import ThemeSelector from './ThemeSelector.astro';
  import LanguageToggle from './LanguageToggle.astro';

  const LINKS = [
    { nameEn: "about", nameFr: "à propos", href: "#home", id: "home" },
    { nameEn: "experience", nameFr: "expérience", href: "#experience", id: "experience" },
    { nameEn: "hackathons", nameFr: "hackathons", href: "#hackathons", id: "hackathons" },
    { nameEn: "projects", nameFr: "projets", href: "#projects", id: "projects" },
    { nameEn: "hobbies", nameFr: "loisirs", href: "#hobbies", id: "hobbies" },
  ];
  ---
  <div id="main-nav" class="fixed top-0 left-0 right-0 z-50 hidden md:flex justify-center pointer-events-none" data-animate="1">
    <nav class="flex items-center gap-1 mt-4 px-2 py-1.5 rounded-xl border border-transparent bg-[var(--bg-main)]/80 backdrop-blur-md pointer-events-auto">
      <a href="#home" aria-label="Home" class="px-2 hover:scale-95 transition-transform flex items-center justify-center">
        <Logo className="w-5 h-5" />
      </a>

      <div class="w-px h-4 bg-[var(--border)]/40 mx-1" />

      {LINKS.map((l) => (
        <a
          href={l.href}
          data-nav-item={l.id}
          class="group relative px-3.5 py-1.5 text-[13px] tracking-wide select-none transition-transform duration-200 text-[var(--text-muted)] hover:text-[var(--text-main)] no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg"
        >
          <span class="lang-en">{l.nameEn}</span>
          <span class="lang-fr">{l.nameFr}</span>
        </a>
      ))}

      <div class="w-px h-4 bg-[var(--border)]/40 mx-1" />
      <ThemeSelector />
      <div class="w-px h-4 bg-[var(--border)]/40 mx-1" />
      <LanguageToggle />
    </nav>
  </div>
  ```

- [ ] **Step 2: Run build validation**
  Run command: `npm run build`
  Expected: Successful compilation.

- [ ] **Step 3: Commit navigation modifications**
  Run commands:
  ```bash
  git add src/components/Nav.astro
  git commit -m "feat: integrate LanguageToggle into navigation and translate navbar links"
  ```

---

### Task 4: Translate Hero Component

**Files:**
- Modify: `src/components/Hero.astro`

- [ ] **Step 1: Implement translations in Hero.astro**
  Update static content blocks inside `src/components/Hero.astro` with dual-language wrapper classes.
  
  Replace lines 8-24 in `src/components/Hero.astro`:
  
  ```html
      <p class="label mb-4" data-animate="2">
        <span class="lang-en">Computer science · Concordia University</span>
        <span class="lang-fr">Informatique · Université Concordia</span>
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
        <span class="lang-en">Currently studying CS and looking for opportunities to ship real products. I love working on side projects that involve AI and Web Development.</span>
        <span class="lang-fr">Étudie actuellement l'informatique et recherche des opportunités pour concevoir des produits réels. J'adore travailler sur des projets personnels impliquant l'IA et le développement Web.</span>
      </p>
  ```
  
  And translate trigger buttons and modals (lines 41-51 and lines 94-111):
  
  ```html
        <!-- SVG Portfolio Trigger Button -->
        <button
          id="portfolio-trigger"
          type="button"
          class="inline-flex items-center gap-2 text-sm no-underline text-[var(--text-muted)] hover:text-[var(--accent)] cursor-pointer bg-transparent border-0 p-0 font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <span class="lang-en">Portfolio</span>
          <span class="lang-fr">Portfolio</span>
        </button>
  ```
  
  ```html
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
        <h3 id="portfolio-modal-title" class="text-sm font-semibold uppercase tracking-wider text-[var(--text-main)]">
          <span class="lang-en">My Portfolio</span>
          <span class="lang-fr">Mon Portfolio</span>
        </h3>
        
        <div class="flex items-center gap-3">
          <!-- Download Button -->
          <a
            href="/docs/james-alvarez-cv.pdf"
            download="James-Alvarez-Portfolio.pdf"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--bg-main)] hover:text-[var(--bg-main)] transition-colors duration-200 cursor-pointer no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label="Download PDF"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span class="lang-en">Download</span>
            <span class="lang-fr">Télécharger</span>
          </a>
  ```

  Also translate the iframe title (line 134):
  ```html
        <iframe
          src="/docs/james-alvarez-cv.pdf"
          width="100%"
          height="100%"
          class="border-0 w-full h-full"
          title="James Victor Alvarez Portfolio PDF"
          data-title-en="James Victor Alvarez Portfolio PDF"
          data-title-fr="Portfolio PDF de James Victor Alvarez"
        ></iframe>
  ```

  Add a small script inside `Hero.astro` to dynamically update the iframe title attribute when language switches:
  ```html
  <script>
    const iframe = document.querySelector("#portfolio-modal iframe") as HTMLIFrameElement | null;
    if (iframe) {
      const updateIframeTitle = () => {
        const lang = document.documentElement.getAttribute("lang") || "en";
        const titleVal = iframe.getAttribute(`data-title-${lang}`);
        if (titleVal) iframe.title = titleVal;
      };
      window.addEventListener("lang-change", updateIframeTitle);
      updateIframeTitle();
    }
  </script>
  ```

- [ ] **Step 2: Run build validation**
  Run command: `npm run build`
  Expected: Successful compilation.

- [ ] **Step 3: Commit changes**
  Run commands:
  ```bash
  git add src/components/Hero.astro
  git commit -m "feat: translate Hero component"
  ```

---

### Task 5: Translate Background Experience Component

**Files:**
- Modify: `src/components/Experience.astro`

- [ ] **Step 1: Update items structure and translate in Experience.astro**
  Redefine `items` array with translated role, org, period, and points objects. Modify HTML mapping to handle dual-language layout.
  
  Replace the contents of `src/components/Experience.astro` with:
  
  ```html
  ---
  const items = [
    {
      role: { en: "Full Stack Developer", fr: "Développeur Full Stack" },
      org: "Université de Montréal",
      period: { en: "Feb 2026 - Present", fr: "Fév 2026 - Présent" },
      logo: "/udem.png",
      points: {
        en: [
          "Designed and built Elearning platform.",
          "Managed task delegation as a team lead."
        ],
        fr: [
          "Conçu et développé une plateforme d'apprentissage en ligne (E-learning).",
          "Géré la délégation des tâches en tant que chef d'équipe."
        ]
      }
    },
    {
      role: { en: "Software Intern", fr: "Stagiaire Logiciel" },
      org: "MR Control Systems International",
      period: { en: "May – Aug 2024", fr: "Mai – Août 2024" },
      logo: "/mr_control_logo.jpg",
      points: {
        en: [
          "Built IoT automation dashboards.",
          "Integrated Sinolta data sources; improved ops efficiency."
        ],
        fr: [
          "Conçu des tableaux de bord d'automatisation IoT.",
          "Intégré des sources de données Sinolta ; amélioré l'efficacité opérationnelle."
        ]
      }
    }
  ];
  ---
  <section id="experience" class="section container-narrow">
    <div class="mb-10" data-animate="7">
      <p class="label mb-2">
        <span class="lang-en">Background</span>
        <span class="lang-fr">Parcours</span>
      </p>
      <h2 class="h2">
        <span class="lang-en">Experience</span>
        <span class="lang-fr">Expérience</span>
      </h2>
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
                <span class="lang-en">{e.role.en}</span>
                <span class="lang-fr">{e.role.fr}</span>
              </h3>
              <span class="text-sm text-[var(--text-muted)] mt-0.5">
                {e.org}
              </span>
            </div>
            <span class="muted ml-auto text-xs font-medium tabular-nums pl-4 pt-1">
              <span class="lang-en">{e.period.en}</span>
              <span class="lang-fr">{e.period.fr}</span>
            </span>
          </div>
          
          <div class="mt-4 flex flex-col space-y-2 text-sm leading-relaxed">
            <div class="lang-en flex flex-col space-y-2 text-[var(--text-muted)]">
              {e.points.en.map((pt) => <p>{pt}</p>)}
            </div>
            <div class="lang-fr flex flex-col space-y-2 text-[var(--text-muted)]">
              {e.points.fr.map((pt) => <p>{pt}</p>)}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
  ```

- [ ] **Step 2: Run build validation**
  Run command: `npm run build`
  Expected: Successful compilation.

- [ ] **Step 3: Commit changes**
  Run commands:
  ```bash
  git add src/components/Experience.astro
  git commit -m "feat: translate Experience component"
  ```

---

### Task 6: Translate Hackathons Component

**Files:**
- Modify: `src/components/Hackathons.astro`

- [ ] **Step 1: Translate items list and titles in Hackathons.astro**
  Redefine the items dictionary with full English/French translations for period and points.
  
  Replace the contents of `src/components/Hackathons.astro` with:
  
  ```html
  ---
  const items = [
    {
      role: "ConUHacks X",
      org: "Concordia University",
      period: { en: "Feb 2026", fr: "Fév 2026" },
      logo: "/conuhacks10.png",
      points: {
        en: [
          "Engineered a custom web agent to autonomously drop out.",
          "Integrated AI decision-making to allow the agent to dynamically interpret unclear user flows."
        ],
        fr: [
          "Conçu un agent web personnalisé pour abandonner de manière autonome.",
          "Intégré une prise de décision par IA permettant à l'agent d'interpréter dynamiquement des flux d'utilisateurs ambigus."
        ]
      }
    },
    {
      role: "GameJam UdeM",
      org: "Université de Montréal",
      period: { en: "May 2025", fr: "Mai 2025" },
      logo: "/UdeM_game.png",
      points: {
        en: [
          "Design and developed an educational 3D game that helps teachers understand how students feel and learn through interactive level-based experiences.",
          "Built in Unity using C#, with each level presenting unique challenges."
        ],
        fr: [
          "Conçu et développé un jeu éducatif en 3D qui aide les enseignants à comprendre comment les élèves se sentent et apprennent à travers des expériences interactives par niveaux.",
          "Conçu avec Unity en C#, chaque niveau présentant des défis uniques."
        ]
      }
    },
    {
      role: "ConUHacks IX",
      org: "Concordia University",
      period: { en: "Feb 2025", fr: "Fév 2025" },
      logo: "/conuhacks9.png",
      points: {
        en: [
          "Implemented a first-person ray-casting engine from scratch in C++ using SDL2 for rendering and real-time graphics.",
          "Developed a multiplayer architecture supporting both TCP and UDP sockets."
        ],
        fr: [
          "Implémenté à partir de zéro un moteur de ray-casting à la première personne en C++ avec SDL2 pour le rendu et les graphismes en temps réel.",
          "Développé une architecture multijoueur prenant en charge les sockets TCP et UDP."
        ]
      }
    },
    {
      role: "JACHacks",
      org: "John Abbott College",
      period: { en: "May 2024", fr: "Mai 2024" },
      logo: "/jachacks.png",
      points: {
        en: [
          "Winner of Valnet Mini Challenge.",
          "Built an AI-driven web-scraping system to measure news timeliness and implemented keyword extraction using NLP models.",
          "Automated data extraction from Excel sheets, GameRant articles, and Twitter posts, handling rate limits and structural differences across websites."
        ],
        fr: [
          "Gagnant du mini-défi Valnet.",
          "Conçu un système de web-scraping alimenté par l'IA pour mesurer la fraîcheur de l'actualité et implémenté l'extraction de mots-clés à l'aide de modèles NLP.",
          "Automatisé l'extraction de données à partir de feuilles Excel, d'articles de GameRant et de publications Twitter, en gérant les limites de requêtes et les différences de structure des sites."
        ]
      }
    },
    {
      role: "GameJam DINGO",
      org: "Vanier College",
      period: { en: "Jan 2024", fr: "Jan 2024" },
      logo: "/dingo.png",
      points: {
        en: [
          "Developed a 2D platformer in Unity where players use magic abilities that dynamically alter parkour mechanics and character effects.",
          "Implemented custom C# scripts for camera control, state management."
        ],
        fr: [
          "Développé un jeu de plateforme 2D avec Unity où les joueurs utilisent des capacités magiques modifiant dynamiquement les mécaniques de parkour et les effets du personnage.",
          "Implémenté des scripts C# personnalisés pour le contrôle de la caméra et la gestion d'état."
        ]
      }
    }
  ];

  const isLeft = (i: number) => i % 2 === 0;
  ---
  <section id="hackathons" class="section container-narrow">
    <div class="mb-14 text-center" data-animate="15">
      <p class="label mb-2">
        <span class="lang-en">Events & Competitions</span>
        <span class="lang-fr">Événements & Compétitions</span>
      </p>
      <h2 class="h2">
        <span class="lang-en">Hackathons</span>
        <span class="lang-fr">Hackathons</span>
      </h2>
    </div>

    <div class="relative">
      <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[var(--border)]" />
      <div class="block md:hidden absolute left-[11px] top-0 bottom-0 w-px bg-[var(--border)]" />

      <div class="flex flex-col gap-12 md:gap-16">
        {items.map((e, i) => {
          const left = isLeft(i);

          return (
            <div class="relative md:grid md:grid-cols-2 md:gap-10">
              <span class="hidden md:block absolute left-1/2 top-3 w-3 h-3 -translate-x-1/2 rounded-full border-2 border-[var(--border)] bg-[var(--bg-main)] z-10 transition-colors duration-300" />
              <span class="block md:hidden absolute left-[6px] top-[6px] w-[11px] h-[11px] rounded-full border-2 border-[var(--border)] bg-[var(--bg-main)] z-10 transition-colors duration-300" />

              <div
                data-animate={String(16 + i)}
                class={`group pl-8 md:pl-0 ${
                  left
                    ? "md:pr-10 md:text-right md:col-start-1 md:row-start-1"
                    : "md:pl-10 md:text-left md:col-start-2 md:row-start-1"
                }`}
              >
                <span class="inline-block text-[10px] uppercase tracking-widest font-semibold py-1 mb-3 text-[var(--accent)]">
                  <span class="lang-en">{e.period.en}</span>
                  <span class="lang-fr">{e.period.fr}</span>
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

                <div class="mt-3 flex flex-col space-y-2 text-sm leading-relaxed">
                  <div class="lang-en flex flex-col space-y-2 text-[var(--text-muted)]">
                    {e.points.en.map((pt) => <p>{pt}</p>)}
                  </div>
                  <div class="lang-fr flex flex-col space-y-2 text-[var(--text-muted)]">
                    {e.points.fr.map((pt) => <p>{pt}</p>)}
                  </div>
                </div>

                <div
                  class={`hidden md:block mt-4 h-[2px] w-12 rounded-full bg-[var(--border)] group-hover:bg-[var(--accent)] transition-colors duration-300 ${
                    left ? "ml-auto" : "mr-auto"
                  }`}
                />
              </div>

              <div
                class={`hidden md:block ${
                  left ? "md:col-start-2" : "md:col-start-1"
                } md:row-start-1`}
              />
            </div>
          );
        })}
      </div>
    </div>
  </section>
  ```

- [ ] **Step 2: Run build validation**
  Run command: `npm run build`
  Expected: Successful compilation.

- [ ] **Step 3: Commit changes**
  Run commands:
  ```bash
  git add src/components/Hackathons.astro
  git commit -m "feat: translate Hackathons component"
  ```

---

### Task 7: Translate Projects Component

**Files:**
- Modify: `src/components/Projects.astro`

- [ ] **Step 1: Translate projects list and labels in Projects.astro**
  Redefine the `projects` list with English/French translations for descriptions, and wrap project action buttons.
  
  Replace the contents of `src/components/Projects.astro` with:
  
  ```html
  ---
  const projects = [
    {
      title: "Music Guesser",
      description: {
        en: "Web app where you guess songs or artists from 10-second audio clips. Real-time multiplayer with Socket.io.",
        fr: "Application web où vous devez deviner des chansons ou des artistes à partir de clips audio de 10 secondes. Multijoueur en temps réel avec Socket.io."
      },
      tech: ["React", "Socket.io", "Express", "Vite"],
      demo: "https://music-guesser-eight.vercel.app/",
      code: "https://github.com/JamesVictorAlvarez/MusicGuesser",
    },
    {
      title: "Zonk",
      description: {
        en: "A wave-based 3D shooter built with SDL3 and C++, featuring a raycasting engine, procedural audio, and dynamic obstacle-based gameplay.",
        fr: "Un jeu de tir 3D basé sur des vagues construit avec SDL3 et C++, doté d'un moteur de raycasting, d'audio procédural et d'un gameplay dynamique basé sur des obstacles."
      },
      tech: ["C++", "SDL3"],
      demo: "https://zonk-shooter.netlify.app/",
      code: "https://github.com/JamesVictorAlvarez/Zonk",
    },
    {
      title: "OrderUp",
      description: {
        en: "Restaurant order management system. Real-time order tracking across kitchen and front-of-house.",
        fr: "Système de gestion des commandes de restaurant. Suivi des commandes en temps réel entre la cuisine et la salle."
      },
      tech: ["Flutter", "Firebase"],
      code: "https://github.com/JamesVictorAlvarez/OrderUp",
    },
  ];
  ---
  <section id="projects" class="section container-narrow">
    <div class="mb-10" data-animate="10">
      <p class="label mb-2">
        <span class="lang-en">Selected work</span>
        <span class="lang-fr">Projets sélectionnés</span>
      </p>
      <h2 class="h2">
        <span class="lang-en">Projects</span>
        <span class="lang-fr">Projets</span>
      </h2>
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
              <span class="lang-en">{project.description.en}</span>
              <span class="lang-fr">{project.description.fr}</span>
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
                <span class="lang-en">Demo</span>
                <span class="lang-fr">Démo</span>
              </a>
            )}
            {project.code && (
              <a href={project.code} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 no-underline text-[var(--text-muted)] hover:text-[var(--accent)]">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.44 22 12.017 22 6.484 17.522 2 12 2z"/></svg>
                <span class="lang-en">Source</span>
                <span class="lang-fr">Code source</span>
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  </section>
  ```

- [ ] **Step 2: Run build validation**
  Run command: `npm run build`
  Expected: Successful compilation.

- [ ] **Step 3: Commit changes**
  Run commands:
  ```bash
  git add src/components/Projects.astro
  git commit -m "feat: translate Projects component"
  ```

---

### Task 8: Translate Hobbies Component (and dynamically format Letterboxd date)

**Files:**
- Modify: `src/components/Hobbies.astro`

- [ ] **Step 1: Translate labels and implement French watch date formatter**
  Wrap headers and static text, update Letterboxd date builder script to translate months to French, and trigger movie re-rendering on `"lang-change"` event.
  
  Modify the top section of `src/components/Hobbies.astro` (lines 11-14 and lines 18-20):
  
  ```html
    <div class="mb-10 animate-fade-in">
      <p class="label mb-2">
        <span class="lang-en">Downtime</span>
        <span class="lang-fr">Temps libre</span>
      </p>
      <h2 class="h2">
        <span class="lang-en">Hobbies & Interests</span>
        <span class="lang-fr">Loisirs & Intérêts</span>
      </h2>
    </div>

    <!-- Music -->
    <div class="mb-14">
      <p class="label mb-5">
        <span class="lang-en">On repeat</span>
        <span class="lang-fr">En boucle</span>
      </p>
  ```
  
  And translate movie buttons and modal headers (lines 43-44 and lines 91-93):
  
  ```html
        <span class="lang-en">Recent Watches</span>
        <span class="lang-fr">Visionnements Récents</span>
  ```
  
  ```html
        <h3 id="modal-title" class="text-sm font-semibold uppercase tracking-wider text-[var(--text-main)]">
          <span class="lang-en">Movie Watch History</span>
          <span class="lang-fr">Historique des Films Visionnés</span>
        </h3>
  ```

  Inside `<script>` block in `src/components/Hobbies.astro`, rewrite the dynamic list rendering to format months and refresh on language changes.
  
  Replace the contents from line 123 (the `<script>` opening tag) to the end of the file:
  
  ```html
  <script>
    async function initMovies() {
      const container = document.getElementById("movie-grid");
      const modalContainer = document.getElementById("modal-movie-grid");
      const trigger = document.getElementById("watches-trigger") as HTMLButtonElement | null;
      const modal = document.getElementById("watches-modal");
      const backdrop = document.getElementById("modal-backdrop");
      const closeBtn = document.getElementById("modal-close") as HTMLButtonElement | null;
      const modalContent = document.getElementById("modal-content");
      
      if (!container || !modalContainer) return;

      interface Movie {
        title: string;
        link: string;
        posterUrl: string;
        rating?: string | null;
        watchedDate?: string;
        timestamp: number;
      }

      let movies: Movie[] = [];

      const monthMap: Record<string, string> = {
        "Jan": "janv.", "Feb": "févr.", "Mar": "mars", "Apr": "avr.",
        "May": "mai", "Jun": "juin", "Jul": "juil.", "Aug": "août",
        "Sep": "sept.", "Oct": "oct.", "Nov": "nov.", "Dec": "déc."
      };

      function formatWatchDate(dateStr: string | undefined, lang: string) {
        if (!dateStr) return "";
        if (lang !== "fr") return dateStr;
        let formatted = dateStr;
        Object.keys(monthMap).forEach(m => {
          formatted = formatted.replace(m, monthMap[m]);
        });
        return "Visionné le " + formatted;
      }

      function renderMovieCard(m: Movie, showDate = false, lang = "en") {
        const safeTitle = m.title.replace(/"/g, '&quot;');
        const displayDate = showDate && m.watchedDate ? formatWatchDate(m.watchedDate, lang) : "";
        return `
          <a
            href="${m.link}"
            target="_blank"
            rel="noopener noreferrer"
            class="flex flex-col gap-1.5 group no-underline text-[var(--text-main)] hover:text-[var(--accent)]"
          >
            <div class="relative aspect-[2/3] overflow-hidden rounded-lg border border-[var(--border)] group-hover:border-[var(--accent)] transition-all duration-300">
              <img
                src="${m.posterUrl}"
                alt="${safeTitle}"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div class="flex flex-col gap-0.5">
              <span class="text-[11px] font-semibold leading-tight line-clamp-1 group-hover:text-[var(--accent)] transition-colors">
                ${safeTitle}
              </span>
              <div class="flex flex-col gap-0.5">
                ${m.rating ? `<span class="text-[10px] text-[var(--accent-warn)]">${m.rating}</span>` : ''}
                ${showDate && m.watchedDate ? `<span class="text-[9px] text-[var(--text-muted)] font-normal">${displayDate}</span>` : ''}
              </div>
            </div>
          </a>
        `;
      }

      function populateGrids() {
        const lang = document.documentElement.getAttribute("lang") || "en";
        // Render up to 6 in main grid
        container.innerHTML = movies.slice(0, 6).map(m => renderMovieCard(m, false, lang)).join("");
        // Render all in modal grid
        modalContainer.innerHTML = movies.map(m => renderMovieCard(m, true, lang)).join("");
      }

      let openedWithKeyboard = false;

      function handleEscape(e: KeyboardEvent) {
        if (e.key === "Escape") {
          closeModal();
        }
      }

      function openModal(e?: Event) {
        if (!modal || !modalContent) return;
        document.body.classList.add("overflow-hidden");
        modal.removeAttribute("inert");
        modal.setAttribute("aria-hidden", "false");
        modal.classList.remove("opacity-0", "pointer-events-none");
        modal.classList.add("opacity-100", "pointer-events-auto");
        modalContent.classList.remove("scale-95", "opacity-0");
        modalContent.classList.add("scale-100", "opacity-100");

        openedWithKeyboard = e ? (e as UIEvent).detail === 0 : false;
        if (openedWithKeyboard && closeBtn) closeBtn.focus();

        document.addEventListener("keydown", handleEscape);
      }

      function closeModal() {
        if (!modal || !modalContent) return;
        document.body.classList.remove("overflow-hidden");
        modal.setAttribute("inert", "");
        modal.setAttribute("aria-hidden", "true");
        modal.classList.remove("opacity-100", "pointer-events-auto");
        modal.classList.add("opacity-0", "pointer-events-none");
        modalContent.classList.remove("scale-100", "opacity-100");
        modalContent.classList.add("scale-95", "opacity-0");

        document.removeEventListener("keydown", handleEscape);
        if (openedWithKeyboard && trigger) trigger.focus();
      }

      if (trigger && closeBtn && backdrop) {
        trigger.addEventListener("click", openModal);
        closeBtn.addEventListener("click", closeModal);
        backdrop.addEventListener("click", closeModal);
      }

      // Load data
      try {
        const res = await fetch("/api/watches");
        if (res.ok) {
          movies = await res.json();
          populateGrids();
        }
      } catch (e) {
        console.error("Failed to load watches history", e);
      }

      // Re-populate watches grids on language change
      window.addEventListener("lang-change", () => {
        populateGrids();
      });
    }

    // Run on script load
    initMovies();
  </script>
  ```

- [ ] **Step 2: Run build validation**
  Run command: `npm run build`
  Expected: Successful compilation.

- [ ] **Step 3: Commit changes**
  Run commands:
  ```bash
  git add src/components/Hobbies.astro
  git commit -m "feat: translate Hobbies component and add dynamic Letterboxd watch date formatting"
  ```
