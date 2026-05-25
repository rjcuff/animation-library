# Animation Cheat Sheet

Based on Emil Kowalski's "Animations on the Web" course via [animations.dev](https://animations.dev).

---

## Quick Start — First Questions to Ask

1. **Is this element entering or exiting?** → Use `ease-out`
2. **Is an on-screen element moving?** → Use `ease-in-out`
3. **Is this a hover/color transition?** → Use `ease`
4. **Will users see this 100+ times daily?** → Don't animate it

---

## The Easing Blueprint

### ease-out (Most Common)

Use for **user-initiated interactions**: dropdowns, modals, tooltips, any element entering or exiting.

```css
--ease-out-quad:  cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
--ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
--ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);
--ease-out-expo:  cubic-bezier(0.19, 1, 0.22, 1);
--ease-out-circ:  cubic-bezier(0.075, 0.82, 0.165, 1);
```

### ease-in-out (For On-Screen Movement)

Use when **elements already on screen move or morph**. Mimics a car accelerating then braking.

```css
--ease-in-out-quad:  cubic-bezier(0.455, 0.03, 0.515, 0.955);
--ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
--ease-in-out-quart: cubic-bezier(0.77, 0, 0.175, 1);
--ease-in-out-quint: cubic-bezier(0.86, 0, 0.07, 1);
--ease-in-out-expo:  cubic-bezier(1, 0, 0, 1);
--ease-in-out-circ:  cubic-bezier(0.785, 0.135, 0.15, 0.86);
```

### ease (For Hover / Color Transitions)

```css
transition: background-color 150ms ease;
```

### linear — Avoid in UI

Only for constant-speed animations (marquees, tickers, hold-to-delete progress indicators).

### ease-in — Almost Never

Avoid for UI. The slow start delays visual feedback and feels sluggish.

### Paired Elements Rule

Elements that animate together must share the same easing and duration.

```css
.modal   { transition: transform 200ms ease-out; }
.overlay { transition: opacity  200ms ease-out; }
```

---

## Duration Guidelines

| Element Type                      | Duration  |
| --------------------------------- | --------- |
| Micro-interactions                | 100–150ms |
| Standard UI (tooltips, dropdowns) | 150–250ms |
| Modals, drawers                   | 200–300ms |

**Rules:**
- Stay under 300ms for UI animations
- Larger elements animate slower than smaller ones
- Exit animations can be ~20% faster than entrance
- Match duration to distance — longer travel = longer duration

---

## When to Animate

**Do animate:**
- Enter/exit transitions for spatial consistency
- State changes that benefit from visual continuity
- Responses to user actions (feedback)
- Rarely-used interactions where delight adds value

**Don't animate:**
- Keyboard-initiated actions
- Hover effects on frequently-used elements
- Anything users interact with 100+ times daily
- When speed matters more than smoothness

**Marketing vs. Product:**
- Marketing: more elaborate, longer durations OK
- Product: fast, purposeful, never frivolous

---

## Spring Animations

Springs feel natural because they simulate real physics without fixed durations.

**When to use:**
- Drag interactions with momentum
- Interruptible gestures (like Dynamic Island)
- Organic, playful interfaces

**Configuration:**

```js
// Apple's approach — easier to reason about
{ type: "spring", duration: 0.5, bounce: 0.2 }

// Traditional physics
{ type: "spring", mass: 1, stiffness: 100, damping: 10 }
```

**Bounce guidelines:**
- Avoid bounce in most UI contexts
- Use for drag-to-dismiss or playful interactions
- Keep subtle (0.1–0.3) when used

Springs maintain velocity when interrupted — CSS animations restart from zero. Use springs for gestures users might change mid-motion.

---

## Performance

### The Golden Rule

**Only animate `transform` and `opacity`.** These run entirely on the GPU, skipping layout and paint.

**Avoid animating:**
- `padding`, `margin`, `height`, `width` (trigger layout)
- `blur` filters above 20px (expensive, especially Safari)
- CSS variables in deep component trees

### GPU Acceleration

```css
.animated-element {
  will-change: transform;
}
```

### React-Specific

- Animate outside React's render cycle when possible
- Use refs to update styles directly instead of state
- Re-renders on every frame = dropped frames

### Framer Motion

```jsx
// Hardware accelerated (transform as string)
<motion.div animate={{ transform: "translateX(100px)" }} />

// NOT hardware accelerated (more readable, but slower)
<motion.div animate={{ x: 100 }} />
```

### CSS vs. JavaScript

- CSS animations run off the main thread — smoother under load
- JS animations (Framer Motion, React Spring) use `requestAnimationFrame`
- CSS: simple, predetermined animations
- JS: dynamic, interruptible animations

---

## Accessibility

### prefers-reduced-motion (Required on Every Animation)

```css
.modal {
  animation: fadeIn 200ms ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .modal {
    animation: none;
  }
}
```

- Every animated element needs its own media query
- Set `animation: none` or `transition: none` (no `!important`)
- Disable all animations — no exceptions for opacity or color

### Framer Motion

```jsx
import { useReducedMotion } from "framer-motion";

function Component() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    />
  );
}
```

### Touch Devices — Disable Hover

```css
@media (hover: hover) and (pointer: fine) {
  .element:hover {
    transform: scale(1.05);
  }
}
```

Touch devices trigger hover on tap — this prevents false positives. Tailwind v4's `hover:` does this automatically.

---

## Practical Tips

| Scenario                        | Solution                                                    |
| ------------------------------- | ----------------------------------------------------------- |
| Make buttons feel responsive    | Add `transform: scale(0.97)` on `:active`                  |
| Element appears from nowhere    | Start from `scale(0.95)` + `opacity: 0`, not `scale(0)`    |
| Shaky/jittery animations        | Add `will-change: transform`                                |
| Hover causes flicker            | Animate child element, not the parent                       |
| Popover scales from wrong point | Set `transform-origin` to trigger location                  |
| Sequential tooltips feel slow   | Skip delay/animation after first tooltip                    |
| Small buttons hard to tap       | Use 44px minimum hit area via pseudo-element                |
| Something still feels off       | Add subtle blur (under 20px) to mask it                     |
| Hover triggers on mobile        | Use `@media (hover: hover) and (pointer: fine)`             |

---

## Common Patterns

### Button Press Feedback

```css
button:active {
  transform: scale(0.97);
}
```

### Enter/Exit — Don't Start from scale(0)

```css
/* Bad */
.element         { transform: scale(0); }
.element.visible { transform: scale(1); }

/* Good */
.element         { transform: scale(0.95); opacity: 0; }
.element.visible { transform: scale(1);    opacity: 1; }
```

### Tooltip — Skip Animation on Subsequent Tooltips

```css
.tooltip {
  transition: transform 125ms ease-out, opacity 125ms ease-out;
  transform-origin: var(--transform-origin);
}

.tooltip[data-starting-style],
.tooltip[data-ending-style] {
  opacity: 0;
  transform: scale(0.97);
}

.tooltip[data-instant] {
  transition-duration: 0ms;
}
```

### Popover — Scale from Trigger Point

```css
/* Base UI */
.popover { transform-origin: var(--transform-origin); }

/* Radix UI */
.popover { transform-origin: var(--radix-dropdown-menu-content-transform-origin); }
```

### Fix Hover Flicker

```html
<div class="box">
  <div class="box-inner"></div>
</div>
```

```css
.box:hover .box-inner {
  transform: translateY(-20%);
}
.box-inner {
  transition: transform 200ms ease;
}
```

### Minimum Touch Target (44px)

```css
@utility touch-hitbox {
  position: relative;
}

@utility touch-hitbox::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  min-height: 44px;
  min-width: 44px;
  z-index: 9999;
}
```

```jsx
<button className="touch-hitbox">
  <BellIcon />
</button>
```

### Blur as a Fallback

```css
.button-transition {
  transition: transform 150ms ease-out, filter 150ms ease-out;
}

.button-transition:active {
  transform: scale(0.97);
  filter: blur(2px);
}
```

Keep blur under 20px, especially on Safari.

---

## Easing Decision Flowchart

```
Is the element entering or exiting the viewport?
├── Yes → ease-out
└── No
    ├── Is it moving/morphing on screen?
    │   └── Yes → ease-in-out
    └── Is it a hover change?
        ├── Yes → ease
        └── Is it constant motion?
            ├── Yes → linear
            └── Default → ease-out
```

---

## Debugging Tips

- **Record animations** and play back frame by frame to spot issues invisible at normal speed.
- **Shaky 1px shifts** at start/end = GPU/CPU handoff. Fix with `will-change: transform`.
- **Step away** — review animations with fresh eyes. The best ones are refined over days, not hours.

---

> "All those unseen details combine to produce something that's just stunning, like a thousand barely audible voices all singing in tune." — Paul Graham
