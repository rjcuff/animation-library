"use client";

import AnimationCard from "@/components/AnimationCard";
import LikeButton from "./LikeButton";

const reactCode = `"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import styles from "./LikeButton.module.css";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button
      onClick={() => setLiked(!liked)}
      aria-label={liked ? "Unlike" : "Like"}
      className={\`\${styles.button} \${liked ? styles.liked : ""}\`}
    >
      <Heart
        size={28}
        strokeWidth={1.5}
        className={styles.heart}
        fill={liked ? "currentColor" : "none"}
      />
    </button>
  );
}`;

const cssCode = `.button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a3a3a3;
}

.liked {
  color: #e11d48;
}

:global(.dark) .button {
  color: #525252;
}

:global(.dark) .liked {
  color: #e11d48;
}

.button.liked .heart {
  transform: scale(1.3);
}

.heart {
  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

@media (hover: hover) and (pointer: fine) {
  .button:hover {
    color: #e11d48;
  }
}

@media (prefers-reduced-motion: reduce) {
  .heart {
    transition: none;
  }
}`;

export default function LikeButtonCard() {
  return (
    <AnimationCard
      title="Like button"
      description="Heart fills with a bouncy scale on click"
      reactCode={reactCode}
      cssCode={cssCode}
    >
      <LikeButton />
    </AnimationCard>
  );
}
