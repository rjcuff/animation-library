"use client";

import styles from "./ButtonPress.module.css";

export default function ButtonPress() {
  return (
    <button className={styles.button} type="button">
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
      Get started
    </button>
  );
}
