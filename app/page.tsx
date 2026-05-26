import NavActions from "@/components/NavActions";
import ButtonPressCard from "@/components/animations/ButtonPressCard";
import HoverLiftCard from "@/components/animations/HoverLiftCard";
import IconSwapCard from "@/components/animations/IconSwapCard";
import ToggleSwitchCard from "@/components/animations/ToggleSwitchCard";
import LikeButtonCard from "@/components/animations/LikeButtonCard";
import ErrorShakeCard from "@/components/animations/ErrorShakeCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f2f2f2] dark:bg-[#111111] px-6 py-16 transition-colors [background-image:radial-gradient(rgb(0_0_0/0.07)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgb(255_255_255/0.04)_1px,transparent_1px)] [background-size:20px_20px]">

      {/* Top left — avatar, frosted so content doesn't bleed behind it */}
      <div className="fixed top-4 left-4 z-50 rounded-full p-[3px] bg-white/70 dark:bg-[#111]/75 backdrop-blur-md ring-1 ring-black/[0.07] dark:ring-white/[0.07] shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://github.com/rjcuff.png"
          alt="Ryan Cuff"
          width={32}
          height={32}
          className="w-8 h-8 rounded-full block"
        />
      </div>

      {/* Top right — frosted pill so content doesn't bleed between the buttons */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-1 p-1 rounded-full bg-white/70 dark:bg-[#111]/75 backdrop-blur-md ring-1 ring-black/[0.07] dark:ring-white/[0.07] shadow-sm">
        <NavActions />
      </div>

      <header className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-[2rem] font-semibold tracking-tight text-neutral-900 dark:text-white mb-3">
          tweens
        </h1>
        <p className="text-[0.875rem] text-neutral-500 dark:text-white/40 max-w-sm mx-auto leading-relaxed">
          A personal collection of web animations built with React and plain CSS.
        </p>
      </header>

      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <ButtonPressCard />
        <HoverLiftCard />
        <IconSwapCard />
        <ToggleSwitchCard />
        <LikeButtonCard />
        <ErrorShakeCard />
      </main>

      <footer className="max-w-5xl mx-auto mt-32 text-center">
        <p className="text-sm text-neutral-400 dark:text-white/25">
          Built by{" "}
          <a
            href="https://x.com/rcuffdev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 dark:text-white/40 hover:text-neutral-900 dark:hover:text-white/70 transition-colors underline underline-offset-2 decoration-neutral-300 dark:decoration-white/20"
          >
            Ryan Cuff
          </a>
        </p>
      </footer>
    </div>
  );
}
