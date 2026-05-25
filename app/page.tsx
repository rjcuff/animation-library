import ThemeToggle from "@/components/ThemeToggle";
import TextStatesSwapCard from "@/components/animations/TextStatesSwapCard";
import ProgressBarCard from "@/components/animations/ProgressBarCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-[#111111] px-6 py-16 transition-colors">
      {/* Theme toggle - top right */}
      <div className="fixed top-5 right-5 z-50">
        <ThemeToggle />
      </div>

      {/* Header */}
      <header className="max-w-5xl mx-auto text-center mb-16">
        <svg
          className="w-10 h-10 text-neutral-800 dark:text-white mb-4 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.5 7l4 5-4 5M10.5 7l4 5-4 5M15.5 7l4 5-4 5"
          />
        </svg>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
          Velocity
        </h1>
        <p className="text-neutral-500 dark:text-white/50 max-w-md mx-auto">
          Your personal collection of animations to learn from and build on.
          
        </p>
      </header>

      {/* Grid */}
      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TextStatesSwapCard />
        <ProgressBarCard />
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto mt-32 text-center space-y-4">
        <p className="text-sm text-neutral-500 dark:text-white/40">
          Built by{" "}
          <a
            href="https://x.com/rcuffdev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-900 dark:text-white font-medium hover:underline underline-offset-2"
          >
            Ryan Cuff
          </a>{" "}
          while learning from{" "}
          <a
            href="https://animations.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-900 dark:text-white font-medium underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            Emil Kowalski&apos;s course
          </a>
        </p>
        <p className="text-xs text-neutral-400 dark:text-white/25">
          velocity.dev
        </p>
      </footer>
    </div>
  );
}
