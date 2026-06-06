# 3D Projected Ribbon Background Animation Spec

## 1. Overview
Replace the 3D strange attractor particle swarm in `src/components/BackgroundAnimation.astro` with a single, highly refined, smooth 3D projected ribbon (parametric wave) animation. This design eliminates visual noise, visual clutter, and eye strain, creating a premium, subtle, and calming aesthetic suitable for a high-end portfolio.

## 2. Technical Design

### 2.1 Wave Mathematics
The ribbon path is generated dynamically along a sequence of $N$ points (typically $N = 120$ to $150$) using overlapping low-frequency trigonometric functions. For each point $i \in [0, N-1]$, its local 3D coordinates $(x_i, y_i, z_i)$ are computed as:

$$x_i = 7 \cdot \sin(0.025 \cdot i + t) + 3 \cdot \cos(0.05 \cdot i)$$
$$y_i = 4 \cdot \cos(0.03 \cdot i + t \cdot 0.8)$$
$$z_i = 6 \cdot \sin(0.02 \cdot i)$$

Where:
- $t$ is the elapsed animation time scaled by a drift factor (slow time evolution).
- The frequencies and amplitudes are tuned to produce an asymmetric, organic twisting path.

### 2.2 3D Perspective Projection
The 3D coordinates are rotated based on camera yaw ($\theta$) and pitch ($\phi$):
1. **Yaw Rotation (Y-axis)**:
   $$x_1 = x_i \cos\theta - z_i \sin\theta$$
   $$z_1 = x_i \sin\theta + z_i \cos\theta$$
2. **Pitch Rotation (X-axis)**:
   $$y_2 = y_i \cos\phi - z_1 \sin\phi$$
   $$z_2 = y_i \sin\phi + z_1 \cos\phi$$

The points are projected to 2D screen coordinates centering the ribbon in the viewport:
$$\text{perspective} = \frac{D}{D + z_2}$$
$$x_{\text{screen}} = x_1 \cdot \text{perspective} \cdot \text{scale} + \text{width} / 2$$
$$y_{\text{screen}} = y_2 \cdot \text{perspective} \cdot \text{scale} + \text{height} / 2$$

Where:
- $D = 24$ (the field-of-view depth factor).
- $\text{scale}$ is dynamically scaled based on screen dimensions: $\min(\text{width}, \text{height}) / 20$.

### 2.3 Interactive Scroll Reactions
- **Parallax camera shift**: Camera yaw ($\theta$) accumulates scroll position, letting the ribbon slowly rotate around its axis as the user scrolls.
- **Scroll velocity response**: Scroll velocity acts as a physical force that temporarily boosts both wave amplitude and speed, making the ribbon stretch and ripple dynamically on active scrolling. It uses a frame-rate independent easing decay:
  $$\text{scrollVelocity} \leftarrow \text{scrollVelocity} \cdot 0.95^{dt / 16.67}$$

### 2.4 Rendering Method
Instead of drawing independent points, the canvas uses a single continuous stroke:
- **Path Stroke**: Draw connected lines or quadratic/bezier segments through all screen points.
- **Dynamic Gradient Styling**: To create depth:
  - We define a linear gradient aligned with the screen bounds (or coordinate extremes).
  - The stroke color is mapped to the cached CSS custom variable `--accent`.
  - The overall canvas opacity is low (e.g. `globalAlpha` of `0.06` to `0.15`), and individual points have variable thickness/opacity based on $z_2$ depth. Closer parts of the ribbon are thicker ($1.8\text{px}$) and more opaque, while distant parts fade away to thin threads ($0.5\text{px}$) at near-zero opacity.

### 2.5 Performance & Lifecycle Optimizations
- **MutationObserver**: Caches `--accent` property updates to prevent layout thrashing inside the animation loop.
- **Viewport Scaling & Debounce**: Prevents resizing overhead on mobile address bar shifts.
- **Astro View Transitions Support**: Hooks into `'astro:page-load'` and `'astro:before-swap'` to initialize and cleanly tear down event listeners, canceling pending animation frames.
