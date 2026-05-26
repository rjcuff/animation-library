"use client";

import AnimationCard from "@/components/AnimationCard";
import TextSwap from "./TextSwap";

const reactCode = `"use client";

import { useRef, useState } from "react";
import styles from "./TextSwap.module.css";

const MESSAGES = ["Saving changes...", "All changes saved"];

export default function TextSwap() {
  const [index, setIndex] = useState(0);
  const ref = useRef(null);

  const handleNext = () => {
    ref.current?.classList.add(styles.exit);

    setTimeout(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
      ref.current?.classList.remove(styles.exit);
      ref.current?.classList.add(styles.enterStart);
      void ref.current?.offsetWidth;
      ref.current?.classList.remove(styles.enterStart);
    }, 150);
  };

  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <span ref={ref} className={styles.text}>
          {MESSAGES[index]}
        </span>
      </div>
      <div className={styles.footer}>
        <button className={styles.button} onClick={handleNext}>
          Toggle
        </button>
      </div>
    </div>
  );
}`;

const cssCode = `.text {
  position: absolute;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  transition: opacity 250ms ease-out, transform 250ms ease-out, filter 250ms ease-out;
}

.exit {
  opacity: 0;
  filter: blur(4px);
  transform: translateY(-4px);
}

.enterStart {
  opacity: 0;
  filter: blur(4px);
  transform: translateY(4px);
  transition: none;
}

@media (prefers-reduced-motion: reduce) {
  .text { transition: none; }
}`;

export default function TextSwapCard() {
  return (
    <AnimationCard
      title="Text swap"
      description="Three-phase text transition with blur and slide"
      reactCode={reactCode}
      cssCode={cssCode}
    >
      <TextSwap />
    </AnimationCard>
  );
}
