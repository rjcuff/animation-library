"use client";

import AnimationCard from "@/components/AnimationCard";
import ButtonPress from "./ButtonPress";

const reactCode = `"use client";

import styles from "./ButtonPress.module.css";

export default function ButtonPress() {
  return (
    <button className={styles.button} type="button">
      Get started
    </button>
  );
}`;

const cssCode = `.button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  color: #fff;
  background-color: #171717;
  will-change: transform;

  /* Hover: color only → use ease. Fast because it's a simple state change. */
  transition:
    background-color 150ms ease,
    transform 100ms ease;
}

/* Hover only fires on real pointer devices — prevents sticky hover on touch */
@media (hover: hover) and (pointer: fine) {
  .button:hover {
    background-color: #2e2e2e;
  }
}

/*
  Press: scale down slightly so it feels like a physical button.
  0.97 is subtle enough not to look weird, strong enough to feel real.
*/
.button:active {
  transform: scale(0.97);
}

/* Respect the user's motion preference */
@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none;
  }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .button {
    background-color: #f5f5f5;
    color: #171717;
  }

  @media (hover: hover) and (pointer: fine) {
    .button:hover {
      background-color: #e0e0e0;
    }
  }
}`;

export default function ButtonPressCard() {
  return (
    <AnimationCard
      title="Button press"
      description="Subtle scale feedback that makes clicks feel physical"
      reactCode={reactCode}
      cssCode={cssCode}
    >
      <ButtonPress />
    </AnimationCard>
  );
}
