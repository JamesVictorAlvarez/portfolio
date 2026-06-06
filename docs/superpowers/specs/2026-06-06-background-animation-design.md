# Spec: Background Halvorsen Attractor Particle Swarm

**Date:** 2026-06-06  
**Status:** Approved  
**Author:** Antigravity

---

## 1. Overview
The goal is to implement a highly unique, modern, and interactive background animation based on a 3D chaotic strange attractor. 

Instead of traditional lines, the animation features a swarm of 800 floating particles orbiting along the paths of the **Halvorsen Attractor**. The swarm acts like mathematical space dust. Scrolling down the page shifts the 3D perspective camera (rotating the attractor) and dynamically accelerates the particles along their orbits, returning to a slow, floating drift when scrolling stops.

---

## 2. Goals & Success Criteria
- **Chaotic Math Aesthetics:** Uses the Halvorsen Attractor equations to create a beautiful, triangular, cyclic chaotic shape.
- **Unique Visuals:** Renders as glowing, low-opacity particles with transparent-friendly trailing comets, ensuring it is prominent but not eye-straining.
- **Scroll Interactivity:** Ties camera rotation and orbital velocity directly to scroll position and scroll speed.
- **Dynamic Theming:** Resolves color configurations dynamically from the site's `--accent` CSS variable.
- **Responsive & Retinal:** Scale is normalized by viewport height/width and device pixel ratio.
- **Accessibility:** Stops execution and clears the canvas immediately if `prefers-reduced-motion` is active.

---

## 3. Technical Design

### A. Mathematical Simulation
The Halvorsen attractor is defined by the following system of cyclic differential equations:

$$\frac{dx}{dt} = -a \cdot x - 4y - 4z - y^2$$
$$\frac{dy}{dt} = -a \cdot y - 4z - 4x - z^2$$
$$\frac{dz}{dt} = -a \cdot z - 4x - 4y - x^2$$

Where:
- $a = 1.4$ is the constant parameter.
- $dt$ is the simulation time step, which scales with scroll velocity:
  $$dt = dt_{\text{idle}} + \text{scrollVelocity} \times \text{sensitivity}$$

To ensure numerical stability under variable frame rates and velocity spikes, particles are reset to a random location near the core if their distance from the origin exceeds a bounding radius ($x^2 + y^2 + z^2 > 400$).

### B. 3D Rotation and Perspective Projection
On each frame, coordinates are rotated around the Y (yaw) and X (pitch) axes:
- Rotation angle Y: $\theta_y = \text{time} \times 0.0001 + \text{scrollY} \times 0.0012$
- Rotation angle X: $\theta_x = \text{time} \times 0.00005 + \text{scrollY} \times 0.0004$

The rotated coordinates are mapped to 2D screen positions using perspective projection:

$$px = x' \times \left(\frac{\text{fov}}{\text{fov} + z'}\right) \times \text{scale} + \frac{\text{width}}{2}$$
$$py = y' \times \left(\frac{\text{fov}}{\text{fov} + z'}\right) \times \text{scale} + \frac{\text{height}}{2}$$

Where:
- $\text{scale} = \min(\text{width}, \text{height}) / 22$ to keep the attractor appropriately sized on all screens.
- $\text{fov} = 30$ is the camera's field of view.

### C. Particle Trailing History
To render high-quality trails without drawing solid background blocks (which would break backdrop transparency), each particle maintains an array of its 5 most recent projected screen positions.
On each draw tick:
1. We draw the oldest history point with the smallest size and lowest opacity.
2. We iterate forward, drawing increasingly larger and more opaque trail circles.
3. We draw the current particle position at full size and opacity.

---

## 4. Optimization & Lifecycle
- **Theme Color Observation:** Accent color is resolved from the computed style of the document root and cached. A `MutationObserver` updates this cached color only when the document class changes, preventing layout thrashing inside the render loop.
- **Debounced Resize:** Canvas dimensions are updated on resize events using a `requestAnimationFrame` guard to throttle scaling operations.
- **Clean Handoff:** Listens to Astro's `astro:page-load` and custom lifecycle hooks to clean up listeners and cancel active animation frames on page transitions.
