import NavActions from "@/components/NavActions";
import ButtonPressCard from "@/components/animations/ButtonPressCard";
import HoverLiftCard from "@/components/animations/HoverLiftCard";
import IconSwapCard from "@/components/animations/IconSwapCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-[#111111] px-6 py-16 transition-colors">

      {/* Top left — avatar */}
      <div className="fixed top-5 left-5 z-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://github.com/rjcuff.png"
          alt="Ryan Cuff"
          width={32}
          height={32}
          className="w-8 h-8 rounded-full"
        />
      </div>

      {/* Top right — GitHub + theme toggle */}
      <div className="fixed top-5 right-5 z-50">
        <NavActions />
      </div>

      <header className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
          tweens
        </h1>
        <p className="text-neutral-500 dark:text-white/50 max-w-md mx-auto">
          A personal collection of web animations built with React and plain CSS.
          Click any card to copy the code.
        </p>
      </header>

      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ButtonPressCard />
        <HoverLiftCard />
        <IconSwapCard />
      </main>

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
          </a>
        </p>
        <p className="text-xs text-neutral-400 dark:text-white/25">
          tweens.dev
        </p>
      </footer>
    </div>
  );
}
