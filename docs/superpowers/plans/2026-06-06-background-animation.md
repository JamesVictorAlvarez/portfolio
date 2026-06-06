# Background Halvorsen Attractor Particle Swarm Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the subtle background waves with a highly unique, modern 3D Halvorsen strange attractor particle swarm that reacts to page scroll position and scroll velocity.

**Architecture:** Rewrite the `<script>` contents of `src/components/BackgroundAnimation.astro`. The integration in `src/layouts/Layout.astro` remains unchanged.

**Tech Stack:** Astro, HTML5 Canvas 2D API, TypeScript.

---

### Task 1: Rewrite BackgroundAnimation component

**Files:**
- Modify: `src/components/BackgroundAnimation.astro`

- [x] **Step 1: Rewrite BackgroundAnimation component logic**
  Replace the contents of `src/components/BackgroundAnimation.astro` with the new 3D Halvorsen Attractor particle swarm logic, complete with dynamic coordinate updates, 3D rotations, perspective projection, depth-based sizing, and tail histories.

  Overwrite `src/components/BackgroundAnimation.astro` with the following code:
  ```html
  ---
  // BackgroundAnimation.astro - Subtle floating 3D strange attractor swarm
  ---
  <canvas id="bg-animation" class="fixed inset-0 -z-20 pointer-events-none w-full h-full block" aria-hidden="true"></canvas>

  <script>
    // Setup requestAnimationFrame loop for Halvorsen Attractor particle swarm
    interface Particle {
      x: number;
      y: number;
      z: number;
      // History array for drawing tails: stores 5 past projected screen coordinates
      history: { x: number; y: number; size: number; alpha: number }[];
    }

    const DEFAULT_ACCENT_COLOR = '#7b93d8';
    const PARTICLES_COUNT = 800;
    const ATTR_A = 1.4; // Halvorsen constant parameter

    function initBackgroundAnimation() {
      const canvas = document.getElementById('bg-animation') as HTMLCanvasElement | null;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Track prefers-reduced-motion
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      let isReducedMotion = mediaQuery.matches;

      // Track window dimensions with devicePixelRatio
      let width = 0;
      let height = 0;
      let scale = 0;
      let lastWidth = window.innerWidth;
      let lastHeight = window.innerHeight;

      function resize() {
        if (!canvas || !ctx) return;
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        
        // Prevent layout shifts on mobile scroll (due to url bar popping up)
        if (newWidth === lastWidth && Math.abs(newHeight - lastHeight) < 80) return;
        
        lastWidth = newWidth;
        lastHeight = newHeight;
        
        width = newWidth;
        height = newHeight;
        // Dynamically scale the size of the attractor based on window bounds
        scale = Math.min(width, height) / 22;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }

      resize();

      let resizeTimeout = 0;
      function handleResize() {
        if (resizeTimeout) cancelAnimationFrame(resizeTimeout);
        resizeTimeout = requestAnimationFrame(resize);
      }
      window.addEventListener('resize', handleResize);

      // Initialize particles swarm
      const particles: Particle[] = [];
      for (let i = 0; i < PARTICLES_COUNT; i++) {
        // Distribute starting coordinates with a very tiny spread around the attractor path
        particles.push({
          x: (Math.random() - 0.5) * 10,
          y: (Math.random() - 0.5) * 10,
          z: (Math.random() - 0.5) * 10,
          history: []
        });
      }

      // Track scroll position & velocity
      let lastScrollY = window.scrollY;
      let scrollVelocity = 0;
      let targetVelocity = 0;
      let lastScrollTime = performance.now();

      function scrollHandler() {
        const currentScrollY = window.scrollY;
        const currentTime = performance.now();
        const timeDiff = currentTime - lastScrollTime;
        
        if (timeDiff > 100) {
          // Restart velocity calculation on new gesture
          targetVelocity = 0;
        } else {
          const dt = Math.max(timeDiff, 1);
          const deltaY = Math.abs(currentScrollY - lastScrollY);
          targetVelocity = deltaY / dt; // pixels per ms
        }
        
        lastScrollY = currentScrollY;
        lastScrollTime = currentTime;
      }

      window.addEventListener('scroll', scrollHandler, { passive: true });

      // Cache theme color
      let accentColor = DEFAULT_ACCENT_COLOR;
      function updateAccentColor() {
        const styles = getComputedStyle(document.documentElement);
        accentColor = styles.getPropertyValue('--accent').trim() || DEFAULT_ACCENT_COLOR;
      }
      updateAccentColor();

      const themeObserver = new MutationObserver(() => {
        updateAccentColor();
      });
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });

      let animationFrameId = 0;
      let lastTime = performance.now();
      let angleY = 0;
      let angleX = 0.5; // slight initial tilt

      function loop(time: number) {
        if (isReducedMotion || !canvas || !ctx) return;
        animationFrameId = requestAnimationFrame(loop);

        const rawDt = time - lastTime;
        const dt = Math.min(rawDt, 100); // Clamp to avoid leaps on tab resume
        lastTime = time;

        const dtRatio = dt / 16.67;

        // Frame-rate independent velocity decay
        targetVelocity *= Math.pow(0.95, dtRatio);
        if (targetVelocity < 0.001) targetVelocity = 0;

        // Frame-rate independent velocity lerping
        const lerpFactor = 1 - Math.pow(1 - 0.08, dtRatio);
        scrollVelocity += (targetVelocity - scrollVelocity) * lerpFactor;

        // Physics step calculation: higher velocity increases physics speed
        // Base dt is 0.003, scroll swells it up to ~0.02
        const simDt = 0.0035 + scrollVelocity * 0.04;

        // Slow camera rotation + scroll mapping
        angleY += 0.001 * dtRatio + scrollVelocity * 0.05;
        // Shift camera X tilt slightly with scroll velocity
        angleX = 0.5 + Math.sin(time * 0.0002) * 0.1;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Precompute rotation sines/cosines
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);

        ctx.fillStyle = accentColor;

        particles.forEach((p) => {
          // 1. Update attractor physics (Halvorsen differential equations)
          const dx = -ATTR_A * p.x - 4 * p.y - 4 * p.z - p.y * p.y;
          const dy = -ATTR_A * p.y - 4 * p.z - 4 * p.x - p.z * p.z;
          const dz = -ATTR_A * p.z - 4 * p.x - 4 * p.y - p.x * p.x;

          p.x += dx * simDt;
          p.y += dy * simDt;
          p.z += dz * simDt;

          // Stability Guard: if values drift to NaN or exceed bounds, reset to core
          const distSq = p.x * p.x + p.y * p.y + p.z * p.z;
          if (isNaN(distSq) || distSq > 350) {
            p.x = (Math.random() - 0.5) * 5;
            p.y = (Math.random() - 0.5) * 5;
            p.z = (Math.random() - 0.5) * 5;
            p.history = [];
            return;
          }

          // 2. Rotate in 3D
          // Rotate Y (Yaw)
          const x1 = p.x * cosY - p.z * sinY;
          const z1 = p.x * sinY + p.z * cosY;
          // Rotate X (Pitch)
          const y2 = p.y * cosX - z1 * sinX;
          const z2 = p.y * sinX + z1 * cosX;

          // 3. Project to 2D
          const fov = 28;
          const perspective = fov / (fov + z2);
          
          // Draw coordinates centered in viewport
          const screenX = x1 * perspective * scale + width / 2;
          const screenY = y2 * perspective * scale + height / 2;

          // Determine scale and opacity based on z-depth
          // Range of z2 is roughly [-12, 12]. Scale size and alpha accordingly.
          const size = Math.max((fov / (fov + z2)) * 1.5, 0.4);
          
          // Front particles are opaque (~0.12), back are very faint (~0.02)
          const zAlpha = (z2 + 15) / 30; // normalized 0 to 1
          const alpha = Math.max(Math.min(zAlpha, 1), 0) * 0.12;

          // 4. Render Trails
          // Draw history points (oldest first, with lower alpha/size)
          p.history.forEach((hist, index) => {
            const ratio = (index + 1) / (p.history.length + 1);
            ctx.beginPath();
            ctx.globalAlpha = hist.alpha * ratio;
            ctx.arc(hist.x, hist.y, hist.size * ratio, 0, Math.PI * 2);
            ctx.fill();
          });

          // Draw active particle
          ctx.beginPath();
          ctx.globalAlpha = alpha;
          ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
          ctx.fill();

          // Update trailing history
          p.history.push({ x: screenX, y: screenY, size, alpha });
          if (p.history.length > 5) {
            p.history.shift();
          }
        });

        ctx.globalAlpha = 1.0; // Reset
      }

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

      if (!isReducedMotion) {
        loop(performance.now());
      }

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', scrollHandler);
        themeObserver.disconnect();
        cancelAnimationFrame(animationFrameId);
        if (resizeTimeout) cancelAnimationFrame(resizeTimeout);
      };
    }
  }

  let cleanup: (() => void) | undefined;
  let isInitialPageLoad = true;

  document.addEventListener('astro:page-load', () => {
    if (isInitialPageLoad) {
      isInitialPageLoad = false;
      if (cleanup) return; // Prevent double init on DOMContentLoaded
    }
    if (cleanup) cleanup();
    cleanup = initBackgroundAnimation();
  });

  // Fallback for non-transition setups
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    if (!cleanup) cleanup = initBackgroundAnimation();
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      if (!cleanup) cleanup = initBackgroundAnimation();
    });
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
  rtk git commit -m "feat: implement Halvorsen Attractor strange attractor background swarm"
  ```

---

### Task 2: Visual & Accessibility Verification

- [ ] **Step 1: Run build to verify correct integration**
  Run: `npm run build`
  Expected: Astro build completes successfully.

- [ ] **Step 2: Check dynamic theme updates**
  Launch dev server: `npm run dev`
  Verify that when you switch from dark mode to light mode (and vice versa) using the site's theme toggle, the canvas particle colors dynamically update to use the light/dark mode `--accent` value.

- [ ] **Step 3: Check scroll reactivity**
  While running `npm run dev`, scroll down and up the page. Verify that the swarm accelerates smoothly, rotates horizontal perspective, and decelerates back to default slow motion over ~0.5 seconds when scrolling stops.

- [ ] **Step 4: Check responsiveness**
  Resize the browser window and verify that the canvas expands/shrinks to cover the full width/height without pixelation or stretching. On mobile devices, verify that scrolling does not cause layout reset loops when URL bar state toggles.

- [ ] **Step 5: Check prefers-reduced-motion compatibility**
  Set system preferences to reduce motion, and verify that the animation stops drawing immediately.
