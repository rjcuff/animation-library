"use client";

import AnimationCard from "@/components/AnimationCard";
import TextStatesSwap from "./TextStatesSwap";

export default function TextStatesSwapCard() {
  return (
    <AnimationCard
      title="Text states swap"
      description="Smooth transition between text states"
    >
      <TextStatesSwap />
    </AnimationCard>
  );
}
