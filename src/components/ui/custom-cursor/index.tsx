"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor]';

export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    const ball = el.children[0] as HTMLElement;
    const dot = el.children[1] as HTMLElement;

    gsap.set([ball, dot], { xPercent: -50, yPercent: -50 });
    gsap.set(el, { autoAlpha: 0, x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const moveX = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const moveY = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });

    let visible = false;
    let hovering = false;
    let pressed = false;

    const applyScale = () => {
      gsap.to(ball, {
        scale: hovering ? 1.45 : pressed ? 0.85 : 1,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(dot, {
        scale: hovering ? 1.7 : pressed ? 0.7 : 1,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const onMove = (event: MouseEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
      if (!visible) {
        visible = true;
        gsap.to(el, { autoAlpha: 1, duration: 0.3 });
      }
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (target?.closest(INTERACTIVE) && !hovering) {
        hovering = true;
        applyScale();
      }
    };

    const onOut = (event: MouseEvent) => {
      const from = event.target as Element | null;
      const to = event.relatedTarget as Element | null;
      if (from?.closest(INTERACTIVE) && !to?.closest(INTERACTIVE) && hovering) {
        hovering = false;
        applyScale();
      }
    };

    const onDown = () => {
      if (!pressed) {
        pressed = true;
        applyScale();
      }
    };

    const onUp = () => {
      if (pressed) {
        pressed = false;
        applyScale();
      }
    };

    const onEnter = () => {
      if (visible) gsap.to(el, { autoAlpha: 1, duration: 0.2 });
    };

    const onLeave = () => gsap.to(el, { autoAlpha: 0, duration: 0.2 });

    document.documentElement.classList.add("has-custom-cursor");
    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    document.addEventListener("mousedown", onDown, { passive: true });
    document.addEventListener("mouseup", onUp, { passive: true });
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
      gsap.killTweensOf([el, ball, dot]);
      gsap.set([el, ball, dot], { clearProps: "all" });
    };
  }, []);

  return (
    <div ref={ref} className="custom-cursor" aria-hidden="true">
      <span className="custom-cursor-ball" />
      <span className="custom-cursor-dot" />
    </div>
  );
}
