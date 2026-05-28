@AGENTS.md

# Role: Lead Senior Frontend Engineer

This is the official docs and showcase site for **@tweens/tweens** — a physics-based spring animation engine for the DOM built by Ryan Cuff.

**Site:** tweens.dev
**Package:** @tweens/tweens on npm
**Library source:** ~/Desktop/tweens

---

## What This Site Is

A live interactive showcase and documentation site. Every demo on the page uses `@tweens/tweens` directly. The goal is to show developers what the library feels like — not explain it, *show* it.

The site should feel like the library: fast, physical, alive.

---

## The Library API

```ts
import { spring, enter, tween, snap, stop, cascade } from '@tweens/tweens'

// Animate TO target values
spring(el, { x: 100, scale: 1.1 }, 'bouncy')

// Enter from a state (element arrives from offscreen)
enter(el, { y: 24, opacity: 0 }, 'snappy')

// Animate between two explicit states
tween(el, { x: -100, opacity: 0 }, { x: 0, opacity: 1 }, 'gentle')

// Instant set, no animation
snap(el, { x: 0, opacity: 1 })

// Cancel animation
stop(el)

// Staggered cascade across multiple elements
cascade(items, { y: 0, opacity: 1 }, 'snappy', 0.06)
```

### SpringProps (animatable properties)
| Prop | Unit |
|---|---|
| x | px |
| y | px |
| scale | – |
| rotate | degrees |
| opacity | 0–1 |
| blur | px |

### SpringConfig
```ts
{
  // Physics
  stiffness?: number   // default 170
  damping?: number     // default 26
  mass?: number        // default 1

  // Feel-based
  duration?: number    // seconds
  bounce?: number      // 0–1

  // Orchestration
  delay?: number
  repeat?: number      // -1 = infinite
  yoyo?: boolean

  // Callbacks
  onStart?: () => void
  onUpdate?: (value: number) => void
  onComplete?: () => void
}
```

### Presets
- `'bouncy'` — ζ 0.612, lively overshoot
- `'snappy'` — ζ 0.850, decisive
- `'gentle'` — ζ 0.783, slow and smooth
- `'stiff'`  — ζ 1.02,  instant, no overshoot

### Relative values
```ts
spring(el, { x: '+=100' })  // add to current
spring(el, { x: '-=50'  })  // subtract from current
```

---

## Using the Library in Components

All components use `useRef` to get the DOM element. Spring calls go in event handlers or `useEffect` — never in render.

```tsx
'use client'
import { useRef } from 'react'
import { spring } from '@tweens/tweens'

export default function Card() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      onMouseEnter={() => spring(ref.current!, { scale: 1.04, y: -6 }, 'snappy')}
      onMouseLeave={() => spring(ref.current!, { scale: 1, y: 0 }, 'snappy')}
    />
  )
}
```

---

## Site Structure

```
app/
  page.tsx              — main showcase page
components/
  animations/           — existing CSS animation cards (keep as-is)
  tweens/               — new tweens showcase components
    Hero.tsx            — install command + big spring demo
    Playground.tsx      — interactive physics sliders
    ShowcaseGrid.tsx    — grid of demo cards
    demos/
      HoverCard.tsx
      ButtonPress.tsx
      MagneticButton.tsx
      Toast.tsx
      CascadeList.tsx
      Interruptible.tsx
      Parallax.tsx
      PresetsRow.tsx
```

---

## Design Direction

- Dark background: `#0a0a0a`
- Same dotted grid pattern as current site
- Each demo card: dark surface, minimal UI, the animation is the content
- Code snippets: monospace, muted color, shown alongside each demo
- No heavy UI framework — keep it lean, the animations do the work

---

## Rules

- Every interactive demo uses `@tweens/tweens` — no CSS transitions, no Framer Motion
- `'use client'` on all interactive components
- `useRef` for DOM access, never query selectors
- Respect `prefers-reduced-motion` — the library handles it automatically
- No `console.log` in production components
