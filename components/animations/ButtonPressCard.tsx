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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  color: #fff;
  background-color: #171717;
  transition: background-color 150ms ease, transform 100ms ease-out;
}

:global(.dark) .button {
  background-color: #fff;
  color: #171717;
}

@media (hover: hover) and (pointer: fine) {
  .button:hover {
    background-color: #2e2e2e;
  }

  :global(.dark) .button:hover {
    background-color: #e5e5e5;
  }
}

.button:active {
  transform: scale(0.97);
}

@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none;
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
