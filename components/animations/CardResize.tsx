"use client";

// ═══════════════════════════════════════════════════════════════
// Velocity — Card Resize Animation
// ═══════════════════════════════════════════════════════════════
//
// WHAT THIS DOES:
// Smoothly transitions an element's width and height between
// two sizes using CSS transitions.
//
// HOW IT WORKS:
// 1. We define CSS custom properties (variables) for duration & easing
// 2. A class (.t-resize) applies the transition to width + height
// 3. We toggle between two size states via inline styles
// 4. The browser tweens between the old and new values automatically
//
// KEY CONCEPTS:
//
// - CSS `transition` property:
//   Tells the browser "when this property changes, don't jump —
//   animate smoothly over X time with Y easing"
//   Format: transition: <property> <duration> <easing>;
//
// - CSS custom properties (--variables):
//   Let you define values once and reuse them. Makes it easy to
//   tweak timing in one place instead of hunting through code.
//
// - `will-change: width, height`:
//   Hints to the browser that these properties will change soon,
//   so it can optimize rendering. Use sparingly — only on elements
//   that actually animate.
//
// - `cubic-bezier(0.22, 1, 0.36, 1)`:
//   A custom easing curve. This one starts fast and decelerates —
//   feels snappy and natural. The 4 numbers control the curve shape.
//   Play with curves at https://cubic-bezier.com
//
// - `prefers-reduced-motion`:
//   Accessibility media query. Some users have motion sensitivity
//   and enable "reduce motion" in their OS settings. This disables
//   the animation for them. Always include this.
//
// ─────────────────────────────────────────────────────────────────
//
// PATTERN (this is how transitions.dev structures every animation):
//
// 1. Define your transition CSS (variables + utility class)
// 2. Apply the class to the element you want to animate
// 3. Change the property values (via React state, CSS class, etc.)
// 4. The browser handles the tweening — no requestAnimationFrame,
//    no JS animation loop, no library needed
//
// ─────────────────────────────────────────────────────────────────
//
// TO CUSTOMIZE:
// - Change --resize-dur: try 500ms for slower, 150ms for snappier
// - Change --resize-ease: try "ease-in-out" or "linear"
// - Add more properties: border-radius, opacity, background-color
//   Just add them to the transition shorthand, comma-separated
//
// ═══════════════════════════════════════════════════════════════

import { useState } from "react";

// ── Styles ──────────────────────────────────────────────────────
//
// We inject CSS into the document <head> at runtime.
//
// WHY THIS APPROACH:
// - Keeps the component 100% self-contained (one file = everything)
// - No need to remember to import a separate CSS file
// - The `id` check makes it safe to import multiple times
//
// The alternative is putting this in globals.css — totally fine too,
// just means the animation CSS lives in a different file.
//
// ─────────────────────────────────────────────────────────────────

const STYLES = `
/* ── Custom properties ─────────────────────────────────────── */
/* Single source of truth for timing values.                    */
/* Change these to adjust ALL resize animations at once.        */

:root {
  --resize-dur: 300ms;
  --resize-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

/* ── The transition class ──────────────────────────────────── */
/* Apply this to any element. When its width or height changes, */
/* the browser will animate the change instead of jumping.      */

.t-resize {
  transition:
    width  var(--resize-dur) var(--resize-ease),
    height var(--resize-dur) var(--resize-ease);
  will-change: width, height;
}

/* ── Accessibility ─────────────────────────────────────────── */
/* Disable animation for users who prefer reduced motion.       */

@media (prefers-reduced-motion: reduce) {
  .t-resize {
    transition: none !important;
  }
}
`;

// Inject once, client-side only (SSR-safe with typeof check)
if (typeof document !== "undefined" && !document.getElementById("velocity-card-resize")) {
  const style = document.createElement("style");
  style.id = "velocity-card-resize";
  style.textContent = STYLES;
  document.head.appendChild(style);
}

// ── Component ───────────────────────────────────────────────────
//
// The animation itself is just 3 things:
// 1. A state boolean (small or not)
// 2. The .t-resize class on the element
// 3. Inline styles that change based on state
//
// When you click the play button in AnimationCard, it calls
// the toggle prop we pass up. State flips, inline styles change,
// CSS transition kicks in. That's it.
//
// ─────────────────────────────────────────────────────────────────

export default function CardResize({ animate }: { animate?: boolean }) {
  return (
    <div
      // This class is what makes the magic happen
      className="t-resize rounded-xl border border-neutral-200 dark:border-white/[0.08] bg-neutral-100 dark:bg-white/[0.04]"
      style={{
        // These values change when `animate` prop flips
        // The CSS transition smoothly tweens between them
        width: animate ? 120 : 200,
        height: animate ? 80 : 140,
      }}
    />
  );
}
