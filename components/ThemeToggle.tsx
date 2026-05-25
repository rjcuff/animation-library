"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-10 h-10" />;

  const isDark = resolvedTheme === "dark";

  const handleToggle = () => {
    setAnimating(true);
    setTimeout(() => {
      setTheme(isDark ? "light" : "dark");
      setAnimating(false);
    }, 100);
  };

  return (
    <button
      onClick={handleToggle}
      className="group w-10 h-10 flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      <span
        className="inline-flex transition-all duration-100 ease-in"
        style={{
          transform: animating ? "scale(0.3)" : "scale(1)",
          opacity: animating ? 0 : 1,
        }}
      >
        {isDark ? (
          <Sun className="w-[18px] h-[18px] text-neutral-400 group-hover:text-white transition-colors" />
        ) : (
          <Moon className="w-[18px] h-[18px] text-neutral-500 group-hover:text-neutral-900 transition-colors" />
        )}
      </span>
    </button>
  );
}
