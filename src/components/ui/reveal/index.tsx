"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RevealProps } from "@/types/RevealProps";

gsap.registerPlugin(ScrollTrigger);

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  duration = 0.7,
  stagger = 0,
  selector,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const targets = selector
        ? (Array.from(el.querySelectorAll<HTMLElement>(selector)) as HTMLElement[])
        : (Array.from(el.children) as HTMLElement[]);

      if (stagger > 0) {
        gsap.set(targets, { autoAlpha: 0, y });
        ScrollTrigger.batch(targets, {
          start: "top 85%",
          interval: 0.05,
          onEnter: (batch) => {
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration,
              ease: "power3.out",
              stagger,
            });
          },
          onLeaveBack: (batch) => {
            gsap.to(batch, {
              autoAlpha: 0,
              y,
              duration: 0.4,
              ease: "power2.inOut",
              stagger: 0.05,
            });
          },
        });
      } else {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y },
          {
            autoAlpha: 1,
            y: 0,
            duration,
            ease: "power3.out",
            delay,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [delay, y, duration, stagger, selector]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}