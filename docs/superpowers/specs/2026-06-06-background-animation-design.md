# Spec: Background Silk Ribbon Animation

**Date:** 2026-06-06  
**Status:** Draft  
**Author:** Antigravity

---

## 1. Overview
The goal is to add a subtle, elegant, and modern background animation to the portfolio website without affecting page load times or blocking page interactions. 

The animation will feature 3 to 4 overlapping, elegant horizontal mathematical wave lines (representing "silk ribbons" flowing in the wind) rendered on an HTML5 Canvas. The animation will run continuously at idle, but when the user scrolls, the speed and complexity of the waves will increase dynamically relative to the scroll velocity, then gently ease back to normal.

---

## 2. Goals & Success Criteria
- **Subtle Visuals:** The animation must be low-contrast (using low-opacity CSS theme colors) so it remains in the background and does not impair readability.
- **High Performance:** Runs at a locked 60 FPS on modern displays by using a lightweight native `<canvas>` context, avoiding DOM layout overhead.
- **Scroll Interactivity:** The waves must react smoothly to the user's scroll speed, using linear interpolation (lerp) for inertia so the changes feel organic.
- **Dynamic Theming:** The canvas must dynamically read the site's CSS variables (`--accent` and `--border`) so that it automatically switches color palettes when dark/light mode is toggled.
- **Responsive & Retinal:** Must render crisp vector-like curves on High-DPI (Retina) screens by accounting for `window.devicePixelRatio`.
- **Accessibility:** Must respect `prefers-reduced-motion` and disable the animation loop entirely when active.
- **Zero Impact on Initial Load:** The animation logic must initialize asynchronously or lazily after the page renders.

---

## 3. Technical Design

### A. Component Architecture
We will create a new Astro component:
- `src/components/BackgroundAnimation.astro`

This component will be imported and placed at the top of the body slot in `src/layouts/Layout.astro` to ensure it is visible across all pages.

### B. DOM Structure
The component will render a single Canvas element:
```html
<canvas id="bg-animation" class="fixed inset-0 -z-20 pointer-events-none w-full h-full block" aria-hidden="true"></canvas>
```

### C. Mathematical Wave Algorithm
Each ribbon (wave) will be drawn as a path across the screen. To make the wave organic, we calculate the Y-coordinate at each X step using a sum of sine functions with varying frequencies:

$$Y(x) = \text{baseY} + A_1 \sin(k_1 x + \phi_1) + A_2 \sin(k_2 x + \phi_2)$$

Where:
- $\text{baseY}$ is the vertical position of the ribbon (e.g. 30%, 50%, or 70% of viewport height).
- $A_n$ is the amplitude (height) of the wave.
- $k_n$ is the spatial frequency (wavelength).
- $\phi_n$ is the temporal phase offset, which advances on every frame to create the animation.

### D. Scroll Velocity Tracking
We will listen to window scroll events and calculate the delta over time to determine velocity:

1. **Scroll Event Handler:**
   Updates the scroll position and registers the current time:
   $$\text{deltaY} = |\text{currentScroll} - \text{lastScroll}|$$
   $$\text{velocity}_{\text{target}} = \frac{\text{deltaY}}{\text{timePassed}}$$
2. **Animation Loop Update:**
   Lerp the current velocity towards the target:
   $$\text{velocity}_{\text{current}} = \text{velocity}_{\text{current}} + (\text{velocity}_{\text{target}} - \text{velocity}_{\text{current}}) \times 0.08$$
   - We will damp the $\text{velocity}_{\text{target}}$ quickly when scrolling stops so it returns to 0.
   - The temporal phase increment on each frame is:
     $$\Delta \phi = \text{idleSpeed} + \text{velocity}_{\text{current}} \times \text{sensitivity}$$
   - The amplitude of the waves will also swell slightly when velocity is high, creating a natural ripple effect.

### E. Theme Integration
Instead of hardcoding colors, the canvas render loop will read the computed styles of the document:
```javascript
const styles = getComputedStyle(document.documentElement);
const accentColor = styles.getPropertyValue('--accent').trim();
```
We will draw the ribbons using a combination of the theme's `--accent` color with low opacities (e.g., `0.08` for the thick ribbons, `0.15` for the thin outline ribbons) to ensure perfect contrast in both dark and light modes.

---

## 4. Edge Cases & Optimization
- **High Refresh Rate Displays:** Frame updates will use delta time ($dt$) from `requestAnimationFrame` to ensure wave speed is uniform on 60Hz, 120Hz, and 144Hz monitors.
- **Window Resizing:** A resize listener will update the canvas width and height, scaled by `devicePixelRatio`, and trigger a redraw to prevent stretching. We will debounce this to avoid lag during active resizing.
- **Offscreen Canvas:** If we navigate away or minimize the browser, `requestAnimationFrame` naturally pauses, preserving system battery.

---

## 5. Verification Plan
- **Performance:** Open Chrome DevTools Performance panel, scroll rapidly, and ensure frame rate stays locked at 60 FPS / screen refresh rate with minimal scripting overhead.
- **Contrast Check:** Toggle between Light Mode and Dark Mode to verify the waves are clearly visible but remain non-distracting.
- **Resizing:** Resize the window and confirm the canvas scales without stretching or showing pixelation.
- **Reduced Motion:** Enable "Reduce Motion" in Mac system preferences, refresh the page, and verify that the canvas stays static and does not run its animation loop.
