"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import CodeModal from "./CodeModal";
import styles from "./AnimationCard.module.css";

interface AnimationCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  onAnimate?: () => void;
  reactCode?: string;
  cssCode?: string;
}

export default function AnimationCard({
  title,
  description,
  children,
  onAnimate,
  reactCode,
  cssCode,
}: AnimationCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasCode = Boolean(reactCode && cssCode);

  return (
    <>
      <div className={styles.card}>
        <div
          className={styles.demo}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex-1 flex items-center justify-center">
            {children}
          </div>
          {onAnimate && (
            <div className="pb-4">
              <button
                onClick={onAnimate}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-neutral-200 dark:border-white/[0.12] text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                aria-label="Play animation"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
          )}
        </div>

        <div
          className={`${styles.meta} ${hasCode ? styles.metaClickable : ""}`}
          onClick={() => hasCode && setIsModalOpen(true)}
        >
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          {hasCode && (
            <span className={styles.codeHint}>{"</>"} view code</span>
          )}
        </div>
      </div>

      {hasCode && (
        <CodeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={title}
          reactCode={reactCode!}
          cssCode={cssCode!}
        />
      )}
    </>
  );
}
