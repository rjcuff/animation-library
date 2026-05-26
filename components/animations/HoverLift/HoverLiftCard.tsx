"use client";

import AnimationCard from "@/components/AnimationCard";
import HoverLift from "./HoverLift";

const reactCode = `"use client";

import styles from "./HoverLift.module.css";

export default function HoverLift() {
  return (
    <div className={styles.card}>
      <div className={styles.inner}>
        <p className={styles.title}>Hover me</p>
      </div>
    </div>
  );
}`;

const cssCode = `.card {
  cursor: pointer;
}

.inner {
  padding: 20px;
  border-radius: 12px;
  background: white;
  border: 1px solid rgb(0 0 0 / 0.08);
  box-shadow: 0 1px 4px rgb(0 0 0 / 0.06);
  width: 160px;
  text-align: center;
  transition: transform 150ms ease, box-shadow 150ms ease;
}

.title {
  font-size: 13px;
  font-weight: 600;
  color: #111;
  margin: 0;
}

@media (hover: hover) and (pointer: fine) {
  .inner:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgb(0 0 0 / 0.12);
  }
}

@media (prefers-reduced-motion: reduce) {
  .inner {
    transition: none;
  }
}`;

export default function HoverLiftCard() {
  return (
    <AnimationCard
      title="Hover lift"
      description="Animate the child, not the parent — ease, touch media query"
      reactCode={reactCode}
      cssCode={cssCode}
    >
      <HoverLift />
    </AnimationCard>
  );
}
