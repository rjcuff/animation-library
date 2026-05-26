"use client";

import { useState } from "react";
import styles from "./ToggleSwitch.module.css";

export default function ToggleSwitch() {
  const [on, setOn] = useState(false);

  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => setOn(!on)}
      className={`${styles.track} ${on ? styles.on : ""}`}
    >
      <span className={`${styles.thumb} ${on ? styles.thumbOn : ""}`} />
    </button>
  );
}
