"use client";

import { Play } from "lucide-react";

interface AnimationCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  onAnimate?: () => void;
}

export default function AnimationCard({
  title,
  description,
  children,
  onAnimate,
}: AnimationCardProps) {
  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-[#1a1a1a] p-5 h-[360px] flex flex-col">
      {/* Inner container — animation + button live here */}
      <div className="flex-1 flex flex-col items-center justify-center rounded-xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-100 dark:border-white/[0.05] overflow-hidden">
        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>
        <div className="pb-4">
          <button
            onClick={onAnimate}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-neutral-200 dark:border-white/[0.12] text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
            aria-label="Play animation"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>
      </div>

      {/* Title + description */}
      <div className="mt-4">
        <h3 className="text-sm font-medium text-neutral-900 dark:text-white">{title}</h3>
        <p className="text-xs text-neutral-500 dark:text-white/50 mt-0.5">{description}</p>
      </div>
    </div>
  );
}
