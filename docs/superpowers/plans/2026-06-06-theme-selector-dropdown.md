# Theme Selector Dropdown Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current simple dark/light mode toggle with a premium, multi-theme selector dropdown containing 8 different dark and light themes (Midnight Dark, Minimal Light, Dracula, Nord, Earthy Forest, Rose Pine, Deep Oceanic, and Sepia Retro) with FOUC prevention and elegant opening micro-animations.

**Architecture:** Define the color palettes using CSS variables inside class selectors on the `html` element. Implement a blocking inline script in the `<head>` of the layout to resolve the user's stored theme instantly. Replace the theme toggle button with a custom Astro component that opens a styled, blurred dropdown menu on click, handling outside clicks and key presses.

**Tech Stack:** Astro, Tailwind CSS, Vanilla CSS variables, JavaScript.

---

### Task 1: CSS Theme Variable Definitions

**Files:**
- Modify: `src/styles/globals.css`

- [ ] **Step 1: Replace light mode variables and add multi-theme classes**
  Update the CSS variables for the light theme and append color variables for Nord, Dracula, Earthy Forest, Rose Pine, Deep Oceanic, and Sepia Retro themes. Update the light-dither rule to support the sepia theme too.
  
  Replace the light mode block (lines 30-41) and the dither block (lines 180-188) in `src/styles/globals.css`:
  
  ```css
  /* ── Minimal Light Theme ── */
  html.theme-light {
    --bg-main: #f3f4f8;
    --bg-alt: #e8eaf0;
    --text-main: #2a2d35;
    --text-muted: #6b7080;
    --accent: #5a73c4;
    --accent-hover: #4960ab;
    --border: #d0d4dc;
    --accent-warn: #b8923a;
    --accent-error: #b5505e;
  }

  /* ── Dracula Cyberpunk Theme ── */
  html.theme-dracula {
    --bg-main: #1e1f29;
    --bg-alt: #282a36;
    --text-main: #f8f8f2;
    --text-muted: #6272a4;
    --accent: #bd93f9;
    --accent-hover: #ff79c6;
    --border: #44475a;
    --accent-warn: #f1fa8c;
    --accent-error: #ff5555;
  }

  /* ── Nord Arctic Theme ── */
  html.theme-nord {
    --bg-main: #2e3440;
    --bg-alt: #3b4252;
    --text-main: #eceff4;
    --text-muted: #d8dee9;
    --accent: #88c0d0;
    --accent-hover: #8fbcbb;
    --border: #4c566a;
    --accent-warn: #ebcb8b;
    --accent-error: #bf616a;
  }

  /* ── Earthy Forest Theme ── */
  html.theme-forest {
    --bg-main: #141c15;
    --bg-alt: #1a261c;
    --text-main: #d0dcd0;
    --text-muted: #788a78;
    --accent: #88b088;
    --accent-hover: #a3c9a3;
    --border: #2b3d2e;
    --accent-warn: #dcb878;
    --accent-error: #c47878;
  }

  /* ── Rose Pine Theme ── */
  html.theme-rosepine {
    --bg-main: #191724;
    --bg-alt: #1f1d2e;
    --text-main: #e0def4;
    --text-muted: #908caa;
    --accent: #c4a7e7;
    --accent-hover: #ebbcba;
    --border: #26233a;
    --accent-warn: #f6c177;
    --accent-error: #eb6f92;
  }

  /* ── Deep Oceanic Theme ── */
  html.theme-oceanic {
    --bg-main: #0b131a;
    --bg-alt: #121e2a;
    --text-main: #d1e2f0;
    --text-muted: #5c7c99;
    --accent: #00b4d8;
    --accent-hover: #90e0ef;
    --border: #1d354e;
    --accent-warn: #ffd166;
    --accent-error: #ef476f;
  }

  /* ── Sepia Retro Theme ── */
  html.theme-sepia {
    --bg-main: #f4eed8;
    --bg-alt: #eae1c4;
    --text-main: #433422;
    --text-muted: #7e6e5a;
    --accent: #a0522d;
    --accent-hover: #cd853f;
    --border: #d3c7a8;
    --accent-warn: #b8860b;
    --accent-error: #8b0000;
  }
  ```

  And update the dither overlay rule for light modes (currently at lines 180-188):
  
  ```css
  /* ── Grain / dither overlay (light modes) ── */
  html.theme-light .bg-dither,
  html.theme-sepia .bg-dither {
    background-image:
      linear-gradient(125deg, rgba(5, 5, 5, 0.05) 0%, rgba(0, 0, 0, 0.015) 100%),
      linear-gradient(45deg, rgba(5, 5, 5, 0.06) 0%, rgba(255, 255, 255, 0.01) 100%);
    mix-blend-mode: multiply;
    opacity: 0.2;
  }
  ```

- [ ] **Step 2: Run build validation**
  Run command: `npm run build`
  Expected: Successful build execution.

- [ ] **Step 3: Commit CSS modifications**
  Run commands:
  ```bash
  git add src/styles/globals.css
  git commit -m "style: define multi-theme color variables and rules"
  ```

---

### Task 2: Robust Theme Resolution Script (FOUC Prevention)

**Files:**
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Add the blocking FOUC prevention script inside the head**
  Insert the inline `<script is:inline>` block directly inside `<head>` (e.g. before `<meta charset="UTF-8" />` or right after the opening `<head>` tag) to evaluate the theme variable immediately before rendering the page content.
  
  Modify `src/layouts/Layout.astro` starting around line 18:
  
  ```html
    <head>
      <script is:inline>
        (function() {
          const saved = localStorage.getItem("theme") || "dark";
          const themes = ["dark", "light", "dracula", "nord", "forest", "rosepine", "oceanic", "sepia"];
          themes.forEach(t => document.documentElement.classList.remove(`theme-${t}`));
          if (saved !== "dark") {
            document.documentElement.classList.add(`theme-${saved}`);
          }
        })();
      </script>
      <meta charset="UTF-8" />
  ```

- [ ] **Step 2: Run build validation**
  Run command: `npm run build`
  Expected: Successful build execution.

- [ ] **Step 3: Commit layout modifications**
  Run commands:
  ```bash
  git add src/layouts/Layout.astro
  git commit -m "feat: add blocking inline theme script in head to prevent FOUC"
  ```

---

### Task 3: Create ThemeSelector Component

**Files:**
- Create: `src/components/ThemeSelector.astro`

- [ ] **Step 1: Write the ThemeSelector component**
  Write a custom paintbrush dropdown with color-preview bubbles, checking off the active theme, handling outside clicks, keyboard interactions, and modern springy transitions.
  
  Create file `src/components/ThemeSelector.astro` with the following content:
  
  ```html
  ---
  ---
  <div class="relative inline-block text-left" id="theme-menu-container">
    <button
      id="theme-select-btn"
      aria-haspopup="true"
      aria-expanded="false"
      aria-label="Select theme"
      class="relative flex items-center justify-center w-8 h-8 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-alt)] border border-transparent hover:border-[var(--border)] transition-all duration-200 cursor-pointer"
    >
      <svg class="w-4 h-4 transition-transform duration-300 hover:rotate-12 active:scale-90" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122A3 3 0 00.22 17.115a3.999 3.999 0 017.595-4.635 1.999 1.999 0 002.32 2.766zm0 0a3 3 0 001.757-2.989 3.999 3.999 0 011.9-4.522 1.999 1.999 0 002.15 3.002 2.999 2.999 0 002.018-4.565 3.999 3.999 0 012.585-4.379l-.54 11.374a4 4 0 01-6.19 3.564l-.887-.485z" />
      </svg>
    </button>

    <div
      id="theme-dropdown"
      role="menu"
      class="absolute right-0 mt-2.5 w-44 rounded-xl border border-[var(--border)] bg-[var(--bg-alt)]/90 backdrop-blur-md shadow-2xl py-1.5 z-50 origin-top-right transition-all cubic-bezier(0.16, 1, 0.3, 1) duration-300 scale-95 opacity-0 pointer-events-none"
    >
      <div class="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Select Theme</div>
      <div class="h-[1px] bg-[var(--border)]/40 my-1 mx-2"></div>
      
      <!-- Option: Dark -->
      <button data-theme="dark" class="theme-option flex items-center justify-between w-[92%] mx-[4%] px-2.5 py-1.5 text-xs rounded-lg text-left hover:bg-[var(--bg-main)] hover:translate-x-0.5 transition-all duration-150 cursor-pointer">
        <span class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full flex overflow-hidden border border-[#262c3a] pointer-events-none">
            <span class="w-1/2 h-full bg-[#10121a]"></span>
            <span class="w-1/2 h-full bg-[#7b93d8]"></span>
          </span>
          Midnight Dark
        </span>
        <span class="active-check hidden text-[var(--accent)] text-[10px]">✓</span>
      </button>

      <!-- Option: Light -->
      <button data-theme="light" class="theme-option flex items-center justify-between w-[92%] mx-[4%] px-2.5 py-1.5 text-xs rounded-lg text-left hover:bg-[var(--bg-main)] hover:translate-x-0.5 transition-all duration-150 cursor-pointer">
        <span class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full flex overflow-hidden border border-[#d0d4dc] pointer-events-none">
            <span class="w-1/2 h-full bg-[#f3f4f8]"></span>
            <span class="w-1/2 h-full bg-[#5a73c4]"></span>
          </span>
          Minimal Light
        </span>
        <span class="active-check hidden text-[var(--accent)] text-[10px]">✓</span>
      </button>

      <!-- Option: Dracula -->
      <button data-theme="dracula" class="theme-option flex items-center justify-between w-[92%] mx-[4%] px-2.5 py-1.5 text-xs rounded-lg text-left hover:bg-[var(--bg-main)] hover:translate-x-0.5 transition-all duration-150 cursor-pointer">
        <span class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full flex overflow-hidden border border-[#44475a] pointer-events-none">
            <span class="w-1/2 h-full bg-[#1e1f29]"></span>
            <span class="w-1/2 h-full bg-[#bd93f9]"></span>
          </span>
          Dracula
        </span>
        <span class="active-check hidden text-[var(--accent)] text-[10px]">✓</span>
      </button>

      <!-- Option: Nord -->
      <button data-theme="nord" class="theme-option flex items-center justify-between w-[92%] mx-[4%] px-2.5 py-1.5 text-xs rounded-lg text-left hover:bg-[var(--bg-main)] hover:translate-x-0.5 transition-all duration-150 cursor-pointer">
        <span class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full flex overflow-hidden border border-[#4c566a] pointer-events-none">
            <span class="w-1/2 h-full bg-[#2e3440]"></span>
            <span class="w-1/2 h-full bg-[#88c0d0]"></span>
          </span>
          Nord Arctic
        </span>
        <span class="active-check hidden text-[var(--accent)] text-[10px]">✓</span>
      </button>

      <!-- Option: Forest -->
      <button data-theme="forest" class="theme-option flex items-center justify-between w-[92%] mx-[4%] px-2.5 py-1.5 text-xs rounded-lg text-left hover:bg-[var(--bg-main)] hover:translate-x-0.5 transition-all duration-150 cursor-pointer">
        <span class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full flex overflow-hidden border border-[#2b3d2e] pointer-events-none">
            <span class="w-1/2 h-full bg-[#141c15]"></span>
            <span class="w-1/2 h-full bg-[#88b088]"></span>
          </span>
          Earthy Forest
        </span>
        <span class="active-check hidden text-[var(--accent)] text-[10px]">✓</span>
      </button>

      <!-- Option: Rose Pine -->
      <button data-theme="rosepine" class="theme-option flex items-center justify-between w-[92%] mx-[4%] px-2.5 py-1.5 text-xs rounded-lg text-left hover:bg-[var(--bg-main)] hover:translate-x-0.5 transition-all duration-150 cursor-pointer">
        <span class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full flex overflow-hidden border border-[#26233a] pointer-events-none">
            <span class="w-1/2 h-full bg-[#191724]"></span>
            <span class="w-1/2 h-full bg-[#c4a7e7]"></span>
          </span>
          Rose Pine
        </span>
        <span class="active-check hidden text-[var(--accent)] text-[10px]">✓</span>
      </button>

      <!-- Option: Oceanic -->
      <button data-theme="oceanic" class="theme-option flex items-center justify-between w-[92%] mx-[4%] px-2.5 py-1.5 text-xs rounded-lg text-left hover:bg-[var(--bg-main)] hover:translate-x-0.5 transition-all duration-150 cursor-pointer">
        <span class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full flex overflow-hidden border border-[#1d354e] pointer-events-none">
            <span class="w-1/2 h-full bg-[#0b131a]"></span>
            <span class="w-1/2 h-full bg-[#00b4d8]"></span>
          </span>
          Deep Oceanic
        </span>
        <span class="active-check hidden text-[var(--accent)] text-[10px]">✓</span>
      </button>

      <!-- Option: Sepia -->
      <button data-theme="sepia" class="theme-option flex items-center justify-between w-[92%] mx-[4%] px-2.5 py-1.5 text-xs rounded-lg text-left hover:bg-[var(--bg-main)] hover:translate-x-0.5 transition-all duration-150 cursor-pointer">
        <span class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full flex overflow-hidden border border-[#d3c7a8] pointer-events-none">
            <span class="w-1/2 h-full bg-[#f4eed8]"></span>
            <span class="w-1/2 h-full bg-[#a0522d]"></span>
          </span>
          Sepia Retro
        </span>
        <span class="active-check hidden text-[var(--accent)] text-[10px]">✓</span>
      </button>
    </div>
  </div>

  <script>
    const container = document.getElementById("theme-menu-container");
    const btn = document.getElementById("theme-select-btn");
    const dropdown = document.getElementById("theme-dropdown");
    const options = document.querySelectorAll(".theme-option");
    const themes = ["dark", "light", "dracula", "nord", "forest", "rosepine", "oceanic", "sepia"];

    if (btn && dropdown && container) {
      // Toggle dropdown open/close
      const toggleDropdown = (show?: boolean) => {
        const isOpen = show !== undefined ? show : dropdown.classList.contains("opacity-100");
        if (isOpen) {
          dropdown.classList.remove("scale-100", "opacity-100", "pointer-events-auto");
          dropdown.classList.add("scale-95", "opacity-0", "pointer-events-none");
          btn.setAttribute("aria-expanded", "false");
        } else {
          dropdown.classList.add("scale-100", "opacity-100", "pointer-events-auto");
          dropdown.classList.remove("scale-95", "opacity-0", "pointer-events-none");
          btn.setAttribute("aria-expanded", "true");
          highlightActiveTheme();
        }
      };

      // Button trigger behavior
      btn.addEventListener("mousedown", () => btn.style.transform = "scale(0.95)");
      btn.addEventListener("mouseup", () => btn.style.transform = "scale(1)");
      btn.addEventListener("mouseleave", () => btn.style.transform = "scale(1)");
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleDropdown();
      });

      // Close on clicking outside
      document.addEventListener("click", () => toggleDropdown(true));

      // Close on Escape key press
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") toggleDropdown(true);
      });

      // Highlight active theme indicator in dropdown list
      const highlightActiveTheme = () => {
        const currentTheme = localStorage.getItem("theme") || "dark";
        options.forEach(opt => {
          const themeName = opt.getAttribute("data-theme");
          const check = opt.querySelector(".active-check");
          if (check) {
            if (themeName === currentTheme) {
              check.classList.remove("hidden");
            } else {
              check.classList.add("hidden");
            }
          }
        });
      };

      // Handle selecting a theme
      options.forEach(opt => {
        opt.addEventListener("click", (e) => {
          e.stopPropagation();
          const targetTheme = opt.getAttribute("data-theme") || "dark";
          
          // Apply classes to document root
          themes.forEach(t => document.documentElement.classList.remove(`theme-${t}`));
          if (targetTheme !== "dark") {
            document.documentElement.classList.add(`theme-${targetTheme}`);
          }
          
          localStorage.setItem("theme", targetTheme);
          highlightActiveTheme();
          toggleDropdown(true);
        });
      });

      // Initialize highlight status
      highlightActiveTheme();
    }
  </script>
  ```

- [ ] **Step 2: Run build validation**
  Run command: `npm run build`
  Expected: Successful build execution.

- [ ] **Step 3: Commit the new component**
  Run commands:
  ```bash
  git add src/components/ThemeSelector.astro
  git commit -m "feat: create custom-animated ThemeSelector component"
  ```

---

### Task 4: Integrate ThemeSelector and Clean Up Toggle

**Files:**
- Modify: `src/components/Nav.astro`
- Delete: `src/components/ThemeToggle.astro`

- [ ] **Step 1: Replace ThemeToggle with ThemeSelector in Nav**
  Modify `src/components/Nav.astro` to swap the component imports and usages.
  
  Replace lines 3 and 32 in `src/components/Nav.astro`:
  
  ```diff
  -import ThemeToggle from './ThemeToggle.astro';
  +import ThemeSelector from './ThemeSelector.astro';
  ```
  
  And:
  
  ```diff
  -    <ThemeToggle />
  +    <ThemeSelector />
  ```

- [ ] **Step 2: Delete ThemeToggle.astro**
  Run command: `rm src/components/ThemeToggle.astro`
  Expected: File deleted.

- [ ] **Step 3: Run final build validation**
  Run command: `npm run build`
  Expected: Successful build execution.

- [ ] **Step 4: Commit integration changes**
  Run commands:
  ```bash
  git add src/components/Nav.astro
  git rm src/components/ThemeToggle.astro
  git commit -m "feat: integrate ThemeSelector into navigation and remove old toggle"
  ```
