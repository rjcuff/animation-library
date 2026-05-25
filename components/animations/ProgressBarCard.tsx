"use client";

import AnimationCard from "@/components/AnimationCard";
import ProgressBar from "./ProgressBar";

export default function ProgressBarCard() {
  return (
    <AnimationCard
      title="Progress bar"
      description="Animated fill with easing"
    >
      <ProgressBar />
    </AnimationCard>
  );
}
