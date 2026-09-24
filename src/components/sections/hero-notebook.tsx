"use client";

import type { RefObject } from "react";
import { HeroPreview } from "./hero-preview";

type HeroNotebookProps = {
  laptopRef: RefObject<HTMLDivElement | null>;
  screenRef: RefObject<HTMLDivElement | null>;
  baseRef: RefObject<HTMLDivElement | null>;
};

export function HeroNotebook({ laptopRef, screenRef, baseRef }: HeroNotebookProps) {
  return (
    <div className="relative flex min-h-[360px] items-center justify-center sm:min-h-[420px] lg:min-h-[480px]">
      <div ref={laptopRef} className="hero-laptop">
        <div ref={screenRef} className="hero-laptop-screen">
          <HeroPreview />
        </div>
        <div ref={baseRef} className="hero-laptop-base" />
      </div>
    </div>
  );
}
