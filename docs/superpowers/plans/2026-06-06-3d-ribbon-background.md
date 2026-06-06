# 3D Projected Ribbon Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 3D attractor particle swarm with a single, smooth, elegant 3D projected ribbon wave that rotates on scroll and reacts gently to scroll speed.

**Architecture:** A parametric wave curve of 150 points generated in 3D using low-frequency sines/cosines. Points are rotated via camera angles and perspective-projected to 2D, then drawn segment-by-segment on the canvas with dynamic width and opacity based on depth.

**Tech Stack:** Astro, HTML5 Canvas, Tailwind CSS, TypeScript

---

### Task 1: Rewrite BackgroundAnimation component

**Files:**
- Modify: `src/components/BackgroundAnimation.astro`

- [ ] **Step 1: Rewrite BackgroundAnimation component logic**
  Replace the contents of `src/components/BackgroundAnimation.astro` with the new 3D Projected Ribbon logic.

  Overwrite `src/components/BackgroundAnimation.astro` with:
  ```html
  ---
  // BackgroundAnimation.astro - Subtle floating 3D parametric ribbon wave
  ---
  <canvas id="bg-animation" class="fixed inset-0 -z-20 pointer-events-none w-full h-full block" aria-hidden="true"></canvas>

  <script>
    interface Point3D {
      x: number;
      y: number;
      z: number;
    }

    const DEFAULT_ACCENT_COLOR = '#7b93d8';
    const POINTS_COUNT = 150;

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
        // Dynamically scale the ribbon boundaries
        scale = Math.min(width, height) / 20;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
      let angleY = 0; // Camera rotation around Y axis
      let angleX = 0.4; // Camera tilt (X axis)

      function loop(time: number) {
        if (isReducedMotion || !canvas || !ctx) return;
        animationFrameId = requestAnimationFrame(loop);

        const rawDt = time - lastTime;
        const dt = Math.min(rawDt, 100);
        lastTime = time;

        const dtRatio = dt / 16.67;

        // Easing decay for scroll velocity
        targetVelocity *= Math.pow(0.95, dtRatio);
        if (targetVelocity < 0.001) targetVelocity = 0;

        const lerpFactor = 1 - Math.pow(1 - 0.08, dtRatio);
        scrollVelocity += (targetVelocity - scrollVelocity) * lerpFactor;

        // Camera yaw rotates slowly, accelerated by scroll position changes
        angleY += (0.0005 + scrollVelocity * 0.03) * dtRatio;
        // Pitch oscillates slowly over time
        angleX = 0.4 + Math.sin(time * 0.0001) * 0.08;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Compute precalculated sines/cosines
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);

        // 1. Generate 3D ribbon path with scroll velocity wave-distortions
        // Higher velocity slightly increases frequency and amplitude of the ripples
        const ampMultiplier = 1 + scrollVelocity * 1.2;
        const speedMultiplier = 1 + scrollVelocity * 0.8;
        const tOffset = time * 0.0008 * speedMultiplier;

        const points: Point3D[] = [];
        for (let i = 0; i < POINTS_COUNT; i++) {
          const x = (7 * Math.sin(0.025 * i + tOffset) + 3 * Math.cos(0.05 * i)) * ampMultiplier;
          const y = (4 * Math.cos(0.03 * i + tOffset * 0.8)) * ampMultiplier;
          const z = (6 * Math.sin(0.02 * i)) * ampMultiplier;
          points.push({ x, y, z });
        }

        // 2. Rotate and project ribbon points
        const projected = points.map((p) => {
          // Rotate Y
          const x1 = p.x * cosY - p.z * sinY;
          const z1 = p.x * sinY + p.z * cosY;
          // Rotate X
          const y2 = p.y * cosX - z1 * sinX;
          const z2 = p.y * sinX + z1 * cosX;

          // Project
          const fov = 24;
          const perspective = fov / (fov + z2);
          const screenX = x1 * perspective * scale + width / 2;
          const screenY = y2 * perspective * scale + height / 2;

          return { x: screenX, y: screenY, z: z2 };
        });

        // 3. Render ribbon segment-by-segment with depth-based stroke styles
        for (let i = 0; i < POINTS_COUNT - 1; i++) {
          const p1 = projected[i];
          const p2 = projected[i + 1];

          // Average depth of segment
          const avgZ = (p1.z + p2.z) / 2;
          const fov = 24;

          // Normalized opacity based on depth (smaller avgZ means closer, hence more opaque)
          // Range of avgZ is roughly [-12, 12]
          const zAlpha = (15 - avgZ) / 30;
          const alpha = Math.max(Math.min(zAlpha, 1), 0) * 0.16; // Max opacity 16%

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          ctx.strokeStyle = accentColor;
          ctx.globalAlpha = alpha;
          // Line thickness scales with perspective/depth
          ctx.lineWidth = Math.max((fov / (fov + avgZ)) * 1.5, 0.4);
          ctx.stroke();
        }

        ctx.globalAlpha = 1.0; // Reset
      }

      function handleMotionChange(e: MediaQueryListEvent) {
        isReducedMotion = e.matches;
        if (isReducedMotion) {
          cancelAnimationFrame(animationFrameId);
          if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        } else {
          lastTime = performance.now();
          loop(lastTime);
        }
      }
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleMotionChange);
      } else {
        mediaQuery.addListener(handleMotionChange);
      }

      if (!isReducedMotion) {
        loop(performance.now());
      }

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', scrollHandler);
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleMotionChange);
        } else {
          mediaQuery.removeListener(handleMotionChange);
        }
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
      if (cleanup) return;
    }
    if (cleanup) cleanup();
    cleanup = initBackgroundAnimation();
  });

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    if (!cleanup) cleanup = initBackgroundAnimation();
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      if (!cleanup) cleanup = initBackgroundAnimation();
    });
  }
</script>
  ```

- [ ] **Step 2: Verify component TypeScript compile**

  Run: `rtk npx astro check`
  Expected: Result (20 files): 0 errors, 0 warnings

- [ ] **Step 3: Commit changes**

  Run:
  ```bash
  rtk git add src/components/BackgroundAnimation.astro
  rtk git commit -m "feat: replace attractor swarm with subtle 3D projected ribbon wave"
  ```

---

### Task 2: Verify and Test integration

- [ ] **Step 1: Run local production build to confirm bundling**

  Run: `rtk npm run build`
  Expected: Complete! Server built in X.XXs. 0 errors.

- [ ] **Step 2: Spin up local server and verify responsive load**

  Run: `rtk npm run dev`
  Expected: Server starts on http://localhost:4321

- [ ] **Step 3: Visual inspection**
  - Verify that the background is a slow-moving, subtle, elegant ribbon line.
  - Verify there is no screen jitter, high CPU usage, or eye strain.
  - Verify scroll speed slightly swells the wave, and scroll position rotates camera perspective.
