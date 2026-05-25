# tweens.dev

A personal collection of web animations built with React and plain CSS. No Framer Motion, no animation libraries — just `transform`, `opacity`, and good easing curves.

Each animation is a self-contained component you can copy directly into any project.

**Live:** [tweens.dev](https://tweens.dev)

---

## Stack

- [Next.js](https://nextjs.org) (App Router)
- TypeScript
- Plain CSS Modules (no animation libraries)
- Tailwind CSS (layout only)

---

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Adding a new animation

Every animation follows the same three-file pattern:

### 1. The animation component
`components/animations/MyAnimation.tsx` + `MyAnimation.module.css`

The component renders the element. The CSS module holds all the animation code — transitions, keyframes, hover states, and the `prefers-reduced-motion` query.

### 2. The card wrapper
`components/animations/MyAnimationCard.tsx`

Wraps the component in `AnimationCard` and passes the source code as strings so the copy modal works:

```tsx
import AnimationCard from "@/components/AnimationCard";
import MyAnimation from "./MyAnimation";

const reactCode = `...`;  // paste the component source
const cssCode = `...`;    // paste the CSS module source

export default function MyAnimationCard() {
  return (
    <AnimationCard
      title="My animation"
      description="One line description of what it does"
      reactCode={reactCode}
      cssCode={cssCode}
    >
      <MyAnimation />
    </AnimationCard>
  );
}
```

### 3. Add to the page
Import and drop `<MyAnimationCard />` into the grid in `app/page.tsx`.

---

## Animation rules (the short version)

| Situation | Easing | Duration |
|---|---|---|
| Element entering / exiting | `ease-out` | 150–250ms |
| Element already on screen, moving | `ease-in-out` | 200–300ms |
| Hover / color change | `ease` | 150ms |
| Micro-interaction (button press) | `ease-out` | 100ms |

- Only animate `transform` and `opacity` — everything else triggers layout
- Always add `@media (prefers-reduced-motion: reduce) { transition: none }`
- Always wrap hover styles in `@media (hover: hover) and (pointer: fine)`
- Animate the child, not the parent (prevents hover flicker)
- Never start an entrance animation at `scale(0)` — use `scale(0.95)`

---

## By

[Ryan Cuff](https://x.com/rcuffdev)

---

Shoutout to [Emil Kowalski](https://x.com/emilkowalski_) and his course at [animations.dev](https://animations.dev) — the principles behind every animation in this library.
