"use client";

import AnimationCard from "@/components/AnimationCard";
import IconSwap from "./IconSwap";

const reactCode = `"use client";

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
      <span className={\`\${styles.icon} \${playing ? styles.hidden : styles.visible}\`}>
        <Play size={24} fill="currentColor" />
      </span>
      <span className={\`\${styles.icon} \${playing ? styles.visible : styles.hidden}\`}>
        <Pause size={24} fill="currentColor" />
      </span>
    </button>
  );
}`;

const cssCode = `.button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 32px;
  height: 32px;
  color: #111;
  padding: 0;
}

:global(.dark) .button {
  color: #fff;
}

.icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 150ms ease-out, scale 150ms ease-out, filter 150ms ease-out;
}

.visible {
  opacity: 1;
  scale: 1;
  filter: blur(0px);
}

.hidden {
  opacity: 0;
  scale: 0.3;
  filter: blur(4px);
}

@media (prefers-reduced-motion: reduce) {
  .icon {
    transition: none;
  }
}`;

export default function IconSwapCard() {
  return (
    <AnimationCard
      title="Icon swap"
      description="Scale and blur icon swap"
      reactCode={reactCode}
      cssCode={cssCode}
    >
      <IconSwap />
    </AnimationCard>
  );
}
