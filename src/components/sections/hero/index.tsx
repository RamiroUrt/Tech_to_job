"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroNotebook } from "./hero-notebook";
import { GlueBalls } from "@/components/ui/glue-balls";
import type { MessagesProps } from "@/types/MessagesProps";

gsap.registerPlugin(ScrollTrigger);

export function Hero({ messages }: MessagesProps) {
  const { hero } = messages;
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const copy = copyRef.current;
    const laptop = laptopRef.current;
    const screen = screenRef.current;
    const base = baseRef.current;
    if (!section || !copy || !laptop || !screen || !base) return;

    const offsetWithin = (el: HTMLElement, ancestor: HTMLElement) => {
      let x = 0;
      let y = 0;
      let node: HTMLElement | null = el;
      while (node && node !== ancestor) {
        x += node.offsetLeft;
        y += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      return { x, y };
    };

    let scale = 1;
    let targetX = 0;
    let targetY = 0;

    const measure = () => {
      const withinLaptop = offsetWithin(screen, laptop);
      gsap.set(laptop, {
        transformOrigin: `${withinLaptop.x + screen.offsetWidth / 2}px ${
          withinLaptop.y + screen.offsetHeight / 2
        }px`,
      });

      const withinSection = offsetWithin(screen, section);
      const screenW = screen.offsetWidth;
      const screenH = screen.offsetHeight;

      scale = Math.max(window.innerWidth / screenW, window.innerHeight / screenH);
      targetX = window.innerWidth / 2 - (withinSection.x + screenW / 2);
      targetY = (screenH * scale) / 2 - withinSection.y - screenH / 2;
    };

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      measure();
      const nav = document.querySelector("header");

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onRefresh: measure,
          onUpdate: (self) => {
            document.body.classList.toggle("hero-zoomed", self.progress > 0.7);
          },
          onToggle: (self) => {
            document.body.classList.toggle("hero-zooming", self.isActive);
          },
        },
      });

      tl.to(copy, { autoAlpha: 0, y: -48, duration: 0.3 }, 0)
        .to(nav, { opacity: 0, duration: 0.08 }, 0.02)
        .to(
          laptop,
          {
            scale: () => scale,
            x: () => targetX,
            y: () => targetY,
            duration: 0.7,
            ease: "power2.inOut",
            force3D: false,
          },
          0.08
        )
        .to(
          screen,
          {
            borderColor: "rgba(0, 0, 0, 0)",
            borderRadius: 0,
            boxShadow:
              "inset 0 0 0 1px rgba(255, 255, 255, 0), 0 24px 50px -18px rgba(0, 0, 0, 0)",
            duration: 0.34,
          },
          0.66
        )
        .to(base, { autoAlpha: 0, duration: 0.34 }, 0.66)
        .to(nav, { opacity: 1, duration: 0.08 }, 0.92);

      return () => {
        document.body.classList.remove("hero-zooming", "hero-zoomed");
      };
    });

    return () => {
      mm.revert();
      document.body.classList.remove("hero-zooming", "hero-zoomed");
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      className="section relative min-h-dvh bg-dark text-white"
      aria-labelledby="hero-title"
    >
      <GlueBalls />
      <div className="container relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-4">
        <div ref={copyRef}>
          <h1 id="hero-title" className="section-title text-white mt-4">
            {hero.title}
            <br />
            <span className="text-teal">{hero.titleHighlight}</span>
          </h1>
          <p className="section-description text-teal mt-6 max-w-[560px]">
            {hero.description}
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
            <a
              href="https://discord.gg/h9FFgKdkRd"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-discord"
            >
              {hero.discordButton}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
            <span className="text-xs font-semibold tracking-widest text-gray-400 self-center">
              {hero.discordHint}
            </span>
          </div>
        </div>

        <HeroNotebook
            messages={messages}
            laptopRef={laptopRef}
            screenRef={screenRef}
            baseRef={baseRef}
          />
      </div>
    </section>
  );
}
