# Background Silk Ribbon Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a subtle, high-performance HTML5 canvas background ribbon animation that reacts to user scroll velocity and adapts dynamically to dark/light mode themes.

**Architecture:** A new standalone Astro component (`BackgroundAnimation.astro`) containing a canvas and native JavaScript `requestAnimationFrame` loop. The component will be included in the base HTML structure of the site via `Layout.astro`.

**Tech Stack:** Astro, Vanilla HTML5 Canvas 2D API, TypeScript.

---

### Task 1: Create the BackgroundAnimation Astro Component

**Files:**
- Create: `src/components/BackgroundAnimation.astro`

- [x] **Step 1: Write the component markup and script**
  Create the component with a canvas element and a script that handles high-DPI scaling, multi-frequency sine wave calculations, lerped scroll velocity tracking, theme-color detection, and reduced-motion compliance.

  Create `src/components/BackgroundAnimation.astro` with the following content:
  ```html
  ---
  // BackgroundAnimation.astro - Subtle floating silk ribbons
  ---
  <canvas id="bg-animation" class="fixed inset-0 -z-20 pointer-events-none w-full h-full block" aria-hidden="true"></canvas>

  <script>
    interface Wave {
      baseY: number; // base Y position as fraction of viewport height
      amplitude: number; // base amplitude in pixels
      frequency: number; // spatial wavelength frequency
      speed: number; // idle phase change speed
      phase: number; // current phase offset
      colorOpacity: number; // lines alpha opacity
      lineWidth: number; // thickness in pixels
    }

    const canvas = document.getElementById('bg-animation') as HTMLCanvasElement | null;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Track prefers-reduced-motion
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        let isReducedMotion = mediaQuery.matches;

        // Track window dimensions with devicePixelRatio
        let width = 0;
        let height = 0;
        
        function resize() {
          if (!canvas || !ctx) return;
          const dpr = window.devicePixelRatio || 1;
          width = window.innerWidth;
          height = window.innerHeight;
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          ctx.scale(dpr, dpr);
        }
        
        resize();
        window.addEventListener('resize', resize);

        // Initialize waves configuration
        const waves: Wave[] = [
          {
            baseY: 0.35,
            amplitude: 25,
            frequency: 0.002,
            speed: 0.0006,
            phase: 0,
            colorOpacity: 0.06,
            lineWidth: 2
          },
          {
            baseY: 0.5,
            amplitude: 35,
            frequency: 0.0015,
            speed: -0.0004,
            phase: Math.PI / 4,
            colorOpacity: 0.04,
            lineWidth: 1.5
          },
          {
            baseY: 0.65,
            amplitude: 20,
            frequency: 0.003,
            speed: 0.0008,
            phase: Math.PI / 2,
            colorOpacity: 0.05,
            lineWidth: 1
          }
        ];

        // Track scroll position & velocity
        let lastScrollY = window.scrollY;
        let scrollVelocity = 0;
        let targetVelocity = 0;
        let lastScrollTime = performance.now();

        window.addEventListener('scroll', () => {
          const currentScrollY = window.scrollY;
          const currentTime = performance.now();
          const dt = Math.max(currentTime - lastScrollTime, 1);
          
          const deltaY = Math.abs(currentScrollY - lastScrollY);
          targetVelocity = deltaY / dt; // pixels per ms
          
          lastScrollY = currentScrollY;
          lastScrollTime = currentTime;
        }, { passive: true });

        let animationFrameId: number;
        let lastTime = performance.now();

        function loop(time: number) {
          if (isReducedMotion || !canvas || !ctx) return;
          animationFrameId = requestAnimationFrame(loop);

          const dt = time - lastTime;
          lastTime = time;

          // Fade target velocity back to 0
          targetVelocity *= 0.95;
          if (targetVelocity < 0.001) targetVelocity = 0;

          // Smoothly interpolate scroll velocity (lerp)
          scrollVelocity += (targetVelocity - scrollVelocity) * 0.08;

          // Clear background
          ctx.clearRect(0, 0, width, height);

          // Get theme accent color dynamically from CSS custom properties
          const styles = getComputedStyle(document.documentElement);
          const accentColorRaw = styles.getPropertyValue('--accent').trim();
          const accentColor = accentColorRaw || '#7b93d8';
          
          waves.forEach((wave) => {
            // High velocity swells the speed and amplitude
            const dynamicSpeed = wave.speed * (1 + scrollVelocity * 6);
            wave.phase += dynamicSpeed * dt;
            
            const dynamicAmplitude = wave.amplitude * (1 + scrollVelocity * 1.2);

            ctx.beginPath();
            ctx.lineWidth = wave.lineWidth;
            ctx.strokeStyle = accentColor;
            ctx.globalAlpha = wave.colorOpacity;

            // Draw the wave path
            for (let x = 0; x <= width; x += 4) {
              // Multi-frequency wave calculation (sum of sines)
              const y = height * wave.baseY + 
                        dynamicAmplitude * Math.sin(x * wave.frequency + wave.phase) + 
                        (dynamicAmplitude * 0.3) * Math.cos(x * (wave.frequency * 2.5) - wave.phase * 0.7);

              if (x === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            }
            ctx.stroke();
          });

          ctx.globalAlpha = 1.0; // Reset
        }

        // Listener for changes in reduced motion preferences
        mediaQuery.addEventListener('change', (e) => {
          isReducedMotion = e.matches;
          if (isReducedMotion) {
            cancelAnimationFrame(animationFrameId);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          } else {
            lastTime = performance.now();
            loop(lastTime);
          }
        });

        // Start the animation loop
        if (!isReducedMotion) {
          loop(performance.now());
        }
      }
    }
  </script>
  ```

- [x] **Step 2: Verify component TypeScript compile**
  Run: `npx astro check`
  Expected: No syntax or type errors in `BackgroundAnimation.astro`.

- [x] **Step 3: Commit component**
  Run:
  ```bash
  rtk git add src/components/BackgroundAnimation.astro
  rtk git commit -m "feat: add BackgroundAnimation canvas component"
  ```

---

### Task 2: Integrate BackgroundAnimation in Layout

**Files:**
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Import and inject the BackgroundAnimation component**
  We will modify `src/layouts/Layout.astro` to import `BackgroundAnimation.astro` and place it right inside the body tag.

  Modify `src/layouts/Layout.astro` as follows:
  ```diff
  ---
  import '../styles/globals.css';
  import Scrollbar from '../components/Scrollbar.astro';
+ import BackgroundAnimation from '../components/BackgroundAnimation.astro';
  
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
      ...
    </head>
    <body class="relative bg-[var(--bg-main)] text-[var(--text-main)] overflow-x-hidden">
+     <BackgroundAnimation />
      <div class="fixed inset-0 -z-10 pointer-events-none bg-dither" />
      <slot />
      <Scrollbar />
    </body>
  </html>
  ```

- [ ] **Step 2: Run build to verify correct integration**
  Run: `npm run build`
  Expected: Astro build completes successfully.

- [ ] **Step 3: Commit layout changes**
  Run:
  ```bash
  rtk git add src/layouts/Layout.astro
  rtk git commit -m "feat: integrate BackgroundAnimation in Layout layout"
  ```

---

### Task 3: Visual & Accessibility Verification

- [ ] **Step 1: Check dynamic theme updates**
  Launch dev server: `npm run dev`
  Verify that when you switch from dark mode to light mode (and vice versa) using the site's theme toggle, the canvas wave colors dynamically update to use the light/dark mode `--accent` value.

- [ ] **Step 2: Check scroll reactivity**
  While running `npm run dev`, scroll down and up the page. Verify that the waves accelerate smoothly, swell slightly in height, and decelerate back to their default slow motion over ~0.5 seconds when scrolling stops.

- [ ] **Step 3: Check responsiveness**
  Resize the browser window and verify that the canvas expands/shrinks to cover the full width/height without pixelation or stretching.

- [ ] **Step 4: Check prefers-reduced-motion compatibility**
  Set `isReducedMotion` mock to `true` temporarily in the script, or trigger the setting in system preferences, and verify that the animation stops drawing immediately.
