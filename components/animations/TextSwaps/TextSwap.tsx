"use client";

import { useRef, useState } from "react";
import styles from "./TextSwap.module.css";

const MESSAGES = ["Saving changes...", "All changes saved"];

export default function TextSwap() {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

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
}
