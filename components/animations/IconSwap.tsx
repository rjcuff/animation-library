"use client";

import { useState } from "react";
import { Play, Pause } from "lucide-react";
import styles from "./IconSwap.module.css";

export default function IconSwap() {
  const [playing, setPlaying] = useState(false);

  return (
    <button
      className={styles.button}
      onClick={() => setPlaying(!playing)}
      aria-label={playing ? "Pause" : "Play"}
    >
      <span className={`${styles.icon} ${playing ? styles.hidden : styles.visible}`}>
        <Play size={24} fill="currentColor" />
      </span>
      <span className={`${styles.icon} ${playing ? styles.visible : styles.hidden}`}>
        <Pause size={24} fill="currentColor" />
      </span>
    </button>
  );
}
