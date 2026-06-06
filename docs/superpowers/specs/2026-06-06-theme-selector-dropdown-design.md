# Design Specification: Premium Multi-Theme Selector Dropdown

This design specification details the architecture and implementation details for upgrading the portfolio's theme system from a binary dark/light mode to a modern, multi-theme selector dropdown.

## 1. Objectives
- Replace the existing `ThemeToggle.astro` binary switch with a custom-animated `ThemeSelector.astro` dropdown.
- Provide a curated selection of 8 distinct themes (6 dark, 2 light) using semantic CSS variables.
- Maintain seamless transition animations between themes and ensure absolute prevention of Flash of Unstyled Content (FOUC).
- Enhance UI polish with micro-animations, glassmorphism dropdown menus, and color-preview dots.

---

## 2. CSS Theme Variables (`src/styles/globals.css`)
Each theme overrides core variables that represent the palette of the portfolio. 

### Current Color Variables
- `--bg-main`: Page background
- `--bg-alt`: Card, container, and nav backgrounds
- `--text-main`: Main text color
- `--text-muted`: Muted/secondary text color
- `--accent`: Brand accent color
- `--accent-hover`: Active/hover state of accent color
- `--border`: Borders and dividers
- `--accent-warn`: Warnings/alerts
- `--accent-error`: Errors/destructive actions

### Theme Palette Specifications
1. **Midnight Dark** (Default Dark Mode, applied via `:root`):
   - `--bg-main`: `#10121a`
   - `--bg-alt`: `#181c28`
   - `--text-main`: `#c8cdd8`
   - `--text-muted`: `#6b7280`
   - `--accent`: `#7b93d8`
   - `--accent-hover`: `#94abea`
   - `--border`: `#262c3a`
   - `--accent-warn`: `#d4a64e`
   - `--accent-error`: `#c7616f`

2. **Minimal Light** (Applied via `html.theme-light`):
   - `--bg-main`: `#f3f4f8`
   - `--bg-alt`: `#e8eaf0`
   - `--text-main`: `#2a2d35`
   - `--text-muted`: `#6b7080`
   - `--accent`: `#5a73c4`
   - `--accent-hover`: `#4960ab`
   - `--border`: `#d0d4dc`
   - `--accent-warn`: `#b8923a`
   - `--accent-error`: `#b5505e`

3. **Dracula Cyberpunk** (Applied via `html.theme-dracula`):
   - `--bg-main`: `#1e1f29`
   - `--bg-alt`: `#282a36`
   - `--text-main`: `#f8f8f2`
   - `--text-muted`: `#6272a4`
   - `--accent`: `#bd93f9`
   - `--accent-hover`: `#ff79c6`
   - `--border`: `#44475a`
   - `--accent-warn`: `#f1fa8c`
   - `--accent-error`: `#ff5555`

4. **Nord Arctic** (Applied via `html.theme-nord`):
   - `--bg-main`: `#2e3440`
   - `--bg-alt`: `#3b4252`
   - `--text-main`: `#eceff4`
   - `--text-muted`: `#d8dee9`
   - `--accent`: `#88c0d0`
   - `--accent-hover`: `#8fbcbb`
   - `--border`: `#4c566a`
   - `--accent-warn`: `#ebcb8b`
   - `--accent-error`: `#bf616a`

5. **Earthy Forest** (Applied via `html.theme-forest`):
   - `--bg-main`: `#141c15`
   - `--bg-alt`: `#1a261c`
   - `--text-main`: `#d0dcd0`
   - `--text-muted`: `#788a78`
   - `--accent`: `#88b088`
   - `--accent-hover`: `#a3c9a3`
   - `--border`: `#2b3d2e`
   - `--accent-warn`: `#dcb878`
   - `--accent-error`: `#c47878`

6. **Rose Pine** (Applied via `html.theme-rosepine`):
   - `--bg-main`: `#191724`
   - `--bg-alt`: `#1f1d2e`
   - `--text-main`: `#e0def4`
   - `--text-muted`: `#908caa`
   - `--accent`: `#c4a7e7`
   - `--accent-hover`: `#ebbcba`
   - `--border`: `#26233a`
   - `--accent-warn`: `#f6c177`
   - `--accent-error`: `#eb6f92`

7. **Deep Oceanic** (Applied via `html.theme-oceanic`):
   - `--bg-main`: `#0b131a`
   - `--bg-alt`: `#121e2a`
   - `--text-main`: `#d1e2f0`
   - `--text-muted`: `#5c7c99`
   - `--accent`: `#00b4d8`
   - `--accent-hover`: `#90e0ef`
   - `--border`: `#1d354e`
   - `--accent-warn`: `#ffd166`
   - `--accent-error`: `#ef476f`

8. **Sepia Retro** (Applied via `html.theme-sepia`):
   - `--bg-main`: `#f4eed8`
   - `--bg-alt`: `#eae1c4`
   - `--text-main`: `#433422`
   - `--text-muted`: `#7e6e5a`
   - `--accent`: `#a0522d`
   - `--accent-hover`: `#cd853f`
   - `--border`: `#d3c7a8`
   - `--accent-warn`: `#b8860b`
   - `--accent-error`: `#8b0000`

---

## 3. UI and Layout Specs (`src/components/ThemeSelector.astro`)
The component replaces `ThemeToggle.astro` and will be loaded in `src/components/Nav.astro`.

### Button Trigger
- Paintbrush/palette vector graphic.
- Rotates slightly on hover, scale-compresses on click.

### Custom Dropdown list
- Positioned absolute below the trigger.
- Framed in a blurred glass container (`backdrop-blur-md bg-[var(--bg-alt)]/90 border border-[var(--border)]`).
- Slides down and fades in with spring-like cubic bezier transition:
  `transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease-out;`

### Theme List Items
- Each option contains:
  - Small indicator dot displaying key colors of that theme.
  - Theme title.
  - Active checkmark icon (visible when selected).
- Hover state: shifts slightly to the right with background highlight color.

---

## 4. State Management and FOUC Prevention
To eliminate Flash of Unstyled Content (FOUC), an inline blocking script must be embedded in the document's `<head>`:

```html
<script is:inline>
  (function() {
    const saved = localStorage.getItem("theme") || "dark";
    const themes = ["dark", "light", "dracula", "nord", "forest", "rosepine", "oceanic", "sepia"];
    
    // Set theme class on html element
    themes.forEach(t => document.documentElement.classList.remove(`theme-${t}`));
    if (saved !== "dark") {
      document.documentElement.classList.add(`theme-${saved}`);
    }
  })();
</script>
```

---

## 5. Proposed Code Modifications
1. **Modify `src/styles/globals.css`**: Append the theme class overrides.
2. **Create `src/components/ThemeSelector.astro`**: Full HTML layout, icons, CSS animation rules, and interactive JavaScript.
3. **Update `src/components/Nav.astro`**: Remove import and usage of `<ThemeToggle />`, replace with `<ThemeSelector />`.
4. **Remove `src/components/ThemeToggle.astro`**: Clean up unused component.
5. **Update `<head>` script in `src/layouts/Layout.astro`**: Integrate blocking inline script for theme resolution to make FOUC prevention robust and centralized.
