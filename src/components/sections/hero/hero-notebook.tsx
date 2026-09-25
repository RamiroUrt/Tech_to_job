"use client";

import { HeroPreview } from "./hero-preview";
import type { HeroNotebookProps } from "@/types/HeroNotebookProps";

export function HeroNotebook({ messages, laptopRef, screenRef, baseRef }: HeroNotebookProps) {
  return (
    <div className="relative flex min-h-[360px] items-center justify-center sm:min-h-[420px] lg:min-h-[480px]">
      <div ref={laptopRef} className="hero-laptop">
        <div ref={screenRef} className="hero-laptop-screen">
          <HeroPreview messages={messages} />
        </div>
        <div ref={baseRef} className="hero-laptop-base" />
      </div>
    </div>
  );
}
