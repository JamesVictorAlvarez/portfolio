# Design Specification: i18n French Support

This design specification details the architecture, translation resources, and implementation steps for adding French internationalization (i18n) support to the portfolio.

## 1. Objectives
- Enable dual-language support (English and French) across the entire portfolio.
- Use a CSS-based language toggler (`html[lang="en"]` / `html[lang="fr"]`) for instant, flicker-free language switching.
- Save the language preference in `localStorage` and prevent FOUT (Flash of Untranslated Text) using a blocking head script.
- Add a globe-icon language selector next to the theme selector in the header navigation bar.

---

## 2. Technical Architecture & Visibility Rules

### CSS Toggling (`src/styles/globals.css`)
Translations will exist side-by-side in the HTML, wrapped in `.lang-en` and `.lang-fr` tags. We will hide the inactive language using CSS attributes on `html`:
```css
/* ── Language Switcher Visibility ── */
html:not([lang="fr"]) .lang-fr {
  display: none !important;
}
html[lang="fr"] .lang-en {
  display: none !important;
}
```

### Blocking Script (`src/layouts/Layout.astro`)
To prevent FOUT, we evaluate the user's preferred language *before* parsing the HTML body:
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

---

## 3. Translation Maps & Code Changes

### A. Navigation Component (`src/components/Nav.astro`)
Update the `LINKS` array and nav mapping.
- about -> `en: "about"`, `fr: "à propos"`
- experience -> `en: "experience"`, `fr: "expérience"`
- hackathons -> `en: "hackathons"`, `fr: "hackathons"`
- projects -> `en: "projects"`, `fr: "projets"`
- hobbies -> `en: "hobbies"`, `fr: "loisirs"`

### B. Hero Component (`src/components/Hero.astro`)
- Tag:
  - English: `Computer science · Concordia University`
  - French: `Informatique · Université Concordia`
- Description:
  - English: `Currently studying CS and looking for opportunities to ship real products. I love working on side projects that involve AI and Web Development.`
  - French: `Étudie actuellement l'informatique et recherche des opportunités pour concevoir des produits réels. J'adore concevoir des projets personnels impliquant l'IA et le développement Web.`
- Portfolio Trigger Button:
  - English: `Portfolio`
  - French: `Portfolio`
- Modal Header:
  - English: `My Portfolio`
  - French: `Mon Portfolio`
- Download Button:
  - English: `Download`
  - French: `Télécharger`
- Iframe title:
  - English: `James Victor Alvarez Portfolio PDF`
  - French: `Portfolio PDF de James Victor Alvarez`

### C. Experience Component (`src/components/Experience.astro`)
- Section Label:
  - English: `Background`, French: `Parcours`
- Section Title:
  - English: `Experience`, French: `Expérience`
- Job 1 (Université de Montréal):
  - role: `en: "Full Stack Developer"`, `fr: "Développeur Full Stack"`
  - period: `en: "Feb 2026 - Present"`, `fr: "Fév 2026 - Présent"`
  - points:
    - `en: "Designed and built Elearning platform."`, `fr: "Conçu et développé une plateforme d'apprentissage en ligne (E-learning)."`
    - `en: "Managed task delegation as a team lead."`, `fr: "Géré la délégation des tâches en tant que chef d'équipe."`
- Job 2 (MR Control Systems):
  - role: `en: "Software Intern"`, `fr: "Stagiaire Logiciel"`
  - period: `en: "May – Aug 2024"`, `fr: "Mai – Août 2024"`
  - points:
    - `en: "Built IoT automation dashboards."`, `fr: "Conçu des tableaux de bord d'automatisation IoT."`
    - `en: "Integrated Sinolta data sources; improved ops efficiency."`, `fr: "Intégré des sources de données Sinolta ; amélioré l'efficacité opérationnelle."`

### D. Hackathons Component (`src/components/Hackathons.astro`)
- Section Label:
  - English: `Events & Competitions`, French: `Événements & Compétitions`
- Section Title:
  - English: `Hackathons`, French: `Hackathons`
- ConUHacks X:
  - period: `en: "Feb 2026"`, `fr: "Fév 2026"`
  - points:
    - `en: "Engineered a custom web agent to autonomously drop out."`, `fr: "Conçu un agent web personnalisé pour abandonner de manière autonome."`
    - `en: "Integrated AI decision-making to allow the agent to dynamically interpret unclear user flows."`, `fr: "Intégré une prise de décision par IA permettant à l'agent d'interpréter dynamiquement des flux d'utilisateurs ambigus."`
- GameJam UdeM:
  - period: `en: "May 2025"`, `fr: "Mai 2025"`
  - points:
    - `en: "Designed and developed an educational 3D game that helps teachers understand how students feel and learn through interactive level-based experiences."`, `fr: "Conçu et développé un jeu éducatif en 3D qui aide les enseignants à comprendre comment les élèves se sentent et apprennent à travers des expériences interactives par niveaux."`
    - `en: "Built in Unity using C#, with each level presenting unique challenges."`, `fr: "Conçu avec Unity en C#, chaque niveau présentant des défis uniques."`
- ConUHacks IX:
  - period: `en: "Feb 2025"`, `fr: "Fév 2025"`
  - points:
    - `en: "Implemented a first-person ray-casting engine from scratch in C++ using SDL2 for rendering and real-time graphics."`, `fr: "Implémenté à partir de zéro un moteur de ray-casting à la première personne en C++ avec SDL2 pour le rendu et les graphismes en temps réel."`
    - `en: "Developed a multiplayer architecture supporting both TCP and UDP sockets."`, `fr: "Développé une architecture multijoueur prenant en charge les sockets TCP et UDP."`
- JACHacks:
  - period: `en: "May 2024"`, `fr: "Mai 2024"`
  - points:
    - `en: "Winner of Valnet Mini Challenge."`, `fr: "Gagnant du mini-défi Valnet."`
    - `en: "Built an AI-driven web-scraping system to measure news timeliness and implemented keyword extraction using NLP models."`, `fr: "Conçu un système de web-scraping alimenté par l'IA pour mesurer la fraîcheur de l'actualité et implémenté l'extraction de mots-clés à l'aide de modèles NLP."`
    - `en: "Automated data extraction from Excel sheets, GameRant articles, and Twitter posts, handling rate limits and structural differences across websites."`, `fr: "Automatisé l'extraction de données à partir de feuilles Excel, d'articles de GameRant et de publications Twitter, en gérant les limites de requêtes et les différences de structure des sites."`
- GameJam DINGO:
  - period: `en: "Jan 2024"`, `fr: "Jan 2024"`
  - points:
    - `en: "Developed a 2D platformer in Unity where players use magic abilities that dynamically alter parkour mechanics and character effects."`, `fr: "Développé un jeu de plateforme 2D avec Unity où les joueurs utilisent des capacités magiques modifiant dynamiquement les mécaniques de parkour et les effets du personnage."`
    - `en: "Implemented custom C# scripts for camera control, state management."`, `fr: "Implémenté des scripts C# personnalisés pour le contrôle de la caméra et la gestion d'état."`

### E. Projects Component (`src/components/Projects.astro`)
- Section Label:
  - English: `Selected work`, French: `Projets sélectionnés`
- Section Title:
  - English: `Projects`, French: `Projets`
- Projects list:
  - Music Guesser:
    - description: `en: "Web app where you guess songs or artists from 10-second audio clips. Real-time multiplayer with Socket.io."`, `fr: "Application web où vous devez deviner des chansons ou des artistes à partir de clips audio de 10 secondes. Multijoueur en temps réel avec Socket.io."`
  - Zonk:
    - description: `en: "A wave-based 3D shooter built with SDL3 and C++, featuring a raycasting engine, procedural audio, and dynamic obstacle-based gameplay."`, `fr: "Un jeu de tir 3D basé sur des vagues construit avec SDL3 et C++, doté d'un moteur de raycasting, d'audio procédural et d'un gameplay dynamique basé sur des obstacles."`
  - OrderUp:
    - description: `en: "Restaurant order management system. Real-time order tracking across kitchen and front-of-house."`, `fr: "Système de gestion des commandes de restaurant. Suivi des commandes en temps réel entre la cuisine et la salle."`
- Actions:
  - Demo -> `en: "Demo"`, `fr: "Démo"`
  - Source -> `en: "Source"`, `fr: "Code source"`

### F. Hobbies Component (`src/components/Hobbies.astro`)
- Section Label:
  - English: `Downtime`, French: `Temps libre`
- Section Title:
  - English: `Hobbies & Interests`, French: `Loisirs & Intérêts`
- Subsection labels:
  - Music label: `en: "On repeat"`, `fr: "En boucle"`
  - Recent Watches label: `en: "Recent Watches"`, `fr: "Visionnements Récents"`
  - Watches Modal title: `en: "Movie Watch History"`, `fr: "Historique des Films Visionnés"`
- Dynamic date translation:
  Update the movie client loader script in `src/components/Hobbies.astro` to parse date strings and format them in French (e.g. translating month abbreviations) if the active language is French:
  ```javascript
  const monthMap = {
    "Jan": "janv.", "Feb": "févr.", "Mar": "mars", "Apr": "avr.",
    "May": "mai", "Jun": "juin", "Jul": "juil.", "Aug": "août",
    "Sep": "sept.", "Oct": "oct.", "Nov": "nov.", "Dec": "déc."
  };
  function formatWatchDate(dateStr, lang) {
    if (lang !== "fr" || !dateStr) return dateStr;
    let formatted = dateStr;
    Object.keys(monthMap).forEach(m => {
      formatted = formatted.replace(m, monthMap[m]);
    });
    return "Visionné le " + formatted;
  }
  ```
  Listen to the `"lang-change"` custom event inside `initMovies()` to re-render the movie grid dynamically.

---

## 4. Proposed Code Modifications
1. **Modify `src/styles/globals.css`**: Append visibility styles.
2. **Modify `src/layouts/Layout.astro`**: Insert head script to check and apply preferred language attribute.
3. **Create `src/components/LanguageToggle.astro`**: Add globe button switcher component.
4. **Modify `src/components/Nav.astro`**: Add `<LanguageToggle />` component next to `<ThemeSelector />`.
5. **Modify contents of `src/components/Hero.astro`, `src/components/Experience.astro`, `src/components/Hackathons.astro`, `src/components/Projects.astro`, and `src/components/Hobbies.astro`** to use dual-language wrapper structures.
