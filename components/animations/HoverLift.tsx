"use client";

import styles from "./HoverLift.module.css";

export default function HoverLift() {
  return (
    <div className={styles.card}>
      <div className={styles.inner}>
        <p className={styles.title}>Hover me</p>
      </div>
    </div>
  );
}
