"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import styles from "./LikeButton.module.css";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button
      onClick={() => setLiked(!liked)}
      aria-label={liked ? "Unlike" : "Like"}
      className={`${styles.button} ${liked ? styles.liked : ""}`}
    >
      <Heart
        size={28}
        strokeWidth={1.5}
        className={styles.heart}
        fill={liked ? "currentColor" : "none"}
      />
    </button>
  );
}
