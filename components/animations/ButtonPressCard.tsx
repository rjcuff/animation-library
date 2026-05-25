"use client";

import AnimationCard from "@/components/AnimationCard";
import ButtonPress from "./ButtonPress";

export default function ButtonPressCard() {
  return (
    <AnimationCard
      title="Button press"
      description="scale(0.97) on active, ease on hover"
    >
      <ButtonPress />
    </AnimationCard>
  );
}
