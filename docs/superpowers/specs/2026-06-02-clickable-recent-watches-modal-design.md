# Design Spec: Clickable Recent Watches with Letterboxd Modal

This document describes the design for modifying the "Recent Watches" section of the portfolio site's Hobbies component. It transitions the section from a static list of 6 movies to an interactive component that can trigger a modal displaying all recently watched movies (up to 20 items) from the Letterboxd RSS feed.

## Context & Objectives
- **File to modify**: [Hobbies.astro](file:///Users/jamesalvarez/Documents/Projects/portfolio/src/components/Hobbies.astro)
- **API to modify**: [movies.ts](file:///Users/jamesalvarez/Documents/Projects/portfolio/src/pages/api/movies.ts)
- **Goal**: Make "Recent Watches" a clickable button that triggers a modal overlay displaying all 20 movies fetched from the RSS feed, improving user engagement and visibility of the user's movie history.

## Technical Details

### 1. API Modifications (`src/pages/api/movies.ts`)
- Currently, the API slices the list of movies to 6.
- We will modify the API to remove the `.slice(0, 6)` call, returning all parsed movies (normally 20 items from the Letterboxd RSS feed).
- The cache headers will remain to prevent frequent RSS fetches.

### 2. UI Modifications (`src/components/Hobbies.astro`)

#### A. Header Update
- Replace `<p class="label mb-5">Recent Watches</p>` with a `<button id="watches-trigger">` element.
- The button will display:
  - An inline SVG Film icon on the left.
  - The text "Recent Watches".
  - An inline SVG Chevron-Right icon on the right, which animates (translates X-axis) on hover.

#### B. Modal Markup
- Add a hidden modal container (`#watches-modal`) at the bottom of the section.
- The modal structure:
  - Backdrop overlay: `fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center`
  - Modal Card: `bg-[var(--bg-alt)] border border-[var(--border)] rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto m-4 flex flex-col`
  - Modal Header: Title "All Watched Movies" and a Close (`×`) button.
  - Modal Body: A responsive grid layout `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-6` which will hold the full list of movies.

### 3. Interaction & Keyboard Support
- Clicking the trigger button opens the modal.
- Clicking the close button or clicking the backdrop closes the modal.
- Pressing the `Escape` key closes the modal.
- Body scroll is disabled (`overflow-hidden`) while the modal is open.
- Opening and closing will be animated using smooth transitions.
