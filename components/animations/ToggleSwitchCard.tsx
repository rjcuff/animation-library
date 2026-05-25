"use client";

import AnimationCard from "@/components/AnimationCard";
import ToggleSwitch from "./ToggleSwitch";

const reactCode = `"use client";

import { useState } from "react";
import styles from "./ToggleSwitch.module.css";

export default function ToggleSwitch() {
  const [on, setOn] = useState(false);

  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => setOn(!on)}
      className={\`\${styles.track} \${on ? styles.on : ""}\`}
    >
      <span className={\`\${styles.thumb} \${on ? styles.thumbOn : ""}\`} />
    </button>
  );
}`;

const cssCode = `.track {
  width: 48px;
  height: 28px;
  border-radius: 999px;
  background-color: #d4d4d4;
  border: none;
  cursor: pointer;
  padding: 3px;
  display: flex;
  align-items: center;
  transition: background-color 150ms ease;
}

.on {
  background-color: #171717;
}

:global(.dark) .track {
  background-color: #404040;
}

:global(.dark) .on {
  background-color: #fff;
}

.thumb {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.2);
  transition: transform 150ms ease-in-out;
}

:global(.dark) .on .thumb {
  background-color: #171717;
}

.thumbOn {
  transform: translateX(20px);
}

@media (prefers-reduced-motion: reduce) {
  .track,
  .thumb {
    transition: none;
  }
}`;

export default function ToggleSwitchCard() {
  return (
    <AnimationCard
      title="Toggle switch"
      description="Sliding pill with a bouncy cubic-bezier"
      reactCode={reactCode}
      cssCode={cssCode}
    >
      <ToggleSwitch />
    </AnimationCard>
  );
}
