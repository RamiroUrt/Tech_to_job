"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  stagger?: number;
  selector?: string;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  duration = 0.9,
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
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration,
              ease: "power2.out",
              stagger,
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
            ease: "power2.out",
            delay,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
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