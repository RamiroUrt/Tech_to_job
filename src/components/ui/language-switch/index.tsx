"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { locales, type Locale } from "@/messages";
import type { Messages } from "@/types/Messages";

type LanguageSwitchProps = {
  locale: Locale;
  ui: Messages["ui"];
  className?: string;
};

export function LanguageSwitch({ locale, ui, className }: LanguageSwitchProps) {
  const blob = useRef<HTMLSpanElement>(null);
  const glow = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const items = useRef<Partial<Record<Locale, HTMLAnchorElement | null>>>({});
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const first = useRef(true);
  const placed = useRef<Locale | null>(null);
  const [target, setTarget] = useState<Locale>(locale);
  const active = target;

  const place = useCallback((next: Locale, animated: boolean) => {
    const node = items.current[next];
    const el = blob.current;
    const halo = glow.current;
    const txt = label.current;
    const parent = el?.offsetParent as HTMLElement | null;
    if (!node || !el || !halo || !txt || !parent) return;

    const parentBox = parent.getBoundingClientRect();
    const parentStyle = getComputedStyle(parent);
    const x =
      node.getBoundingClientRect().left -
      parentBox.left -
      (parseFloat(parentStyle.borderLeftWidth) || 0);
    const y =
      node.getBoundingClientRect().top -
      parentBox.top -
      (parseFloat(parentStyle.borderTopWidth) || 0);

    timeline.current?.kill();
    placed.current = next;

    const setLabelX = gsap.quickSetter(txt, "scaleX");
    const setLabelY = gsap.quickSetter(txt, "scaleY");
    const syncLabel = () => {
      setLabelX(1 / (gsap.getProperty(el, "scaleX") as number));
      setLabelY(1 / (gsap.getProperty(el, "scaleY") as number));
    };

    if (!animated) {
      gsap.set([el, halo], { x, y, scaleX: 1, scaleY: 1 });
      gsap.set(txt, { scaleX: 1, scaleY: 1 });
      return;
    }

    const tl = gsap.timeline();
    tl.to([el, halo], { x, y, duration: 0.38, ease: "power3.out" })
      .to(el, { scaleX: 1.16, scaleY: 0.84, duration: 0.16, ease: "power2.out", onUpdate: syncLabel }, 0.04)
      .to(halo, { scaleX: 1.22, scaleY: 1.22, opacity: 0.8, duration: 0.16, ease: "power2.out" }, 0.04)
      .to(el, { scaleX: 1, scaleY: 1, duration: 0.44, ease: "back.out(1.8)", onUpdate: syncLabel }, 0.14)
      .to(halo, { scaleX: 1, scaleY: 1, opacity: 0.5, duration: 0.44, ease: "power2.out" }, 0.14);

    timeline.current = tl;
  }, []);

  useEffect(() => {
    setTarget(locale);
  }, [locale]);

  useEffect(() => {
    const el = blob.current;
    const halo = glow.current;
    if (!el || !halo) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      place(locale, false);
      gsap.set(el, { opacity: 1 });
      gsap.set(halo, { opacity: 0.5 });
      return;
    }

    if (first.current) {
      first.current = false;
      place(locale, false);
      gsap.fromTo(halo, { opacity: 0 }, { opacity: 0.5, duration: 0.5, ease: "power2.out" });
      gsap.fromTo(
        el,
        { opacity: 0, scaleX: 0.3, scaleY: 0.3 },
        { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.6, ease: "back.out(2.2)" },
      );
      gsap.fromTo(label.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
      return;
    }

    if (placed.current === locale) return;

    place(locale, true);
  }, [locale, place]);

  useEffect(() => {
    const onResize = () => place(locale, false);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      timeline.current?.kill();
    };
  }, [locale, place]);

  const handleClick = (code: Locale) => {
    setTarget(code);
    place(code, true);
  };

  return (
    <div
      role="group"
      aria-label={ui.changeLanguage}
      className={`lang-switch${className ? ` ${className}` : ""}`}
    >
      <span ref={glow} className="lang-switch-glow" aria-hidden="true" />
      <span ref={blob} className="lang-switch-blob" aria-hidden="true">
        <span ref={label} className="lang-switch-blob-label">
          {active.toUpperCase()}
        </span>
      </span>
      {locales.map((code) => (
        <Link
          key={code}
          ref={(node) => {
            items.current[code] = node;
          }}
          href={`/${code}`}
          hrefLang={code}
          lang={code}
          aria-current={code === locale ? "true" : "false"}
          data-active={code === active}
          className="lang-switch-item"
          onClick={() => handleClick(code)}
        >
          <span aria-hidden="true">{code.toUpperCase()}</span>
          <span className="srOnly">{ui.languages[code]}</span>
        </Link>
      ))}
    </div>
  );
}
