"use client";

import Image from "next/image";
import { useRef } from "react";
import es from "@/messages/es.json";
import { Reveal } from "@/components/ui/reveal";

export function Testimonials() {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("[data-card]");
    if (!first) return;
    el.scrollBy({ left: direction * first.offsetWidth, behavior: "smooth" });
  };

  return (
    <section className="section" id="testimonios" aria-labelledby="testimonios-title">
      <div className="container">
        <Reveal stagger={0.12}>
          <span className="section-eyebrow">{es.testimonials.eyebrow}</span>
          <h2 id="testimonios-title" className="section-title">
            {es.testimonials.title}
          </h2>
        </Reveal>

        <div className="relative mt-12">
          <Reveal stagger={0.12} selector="[data-card]">
            <div
              ref={scroller}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            >
              {es.testimonials.items.map((item) => (
                <article
                  key={item.name}
                  data-card
                  className="snap-center shrink-0 w-full sm:w-1/2 lg:w-1/3 px-3"
                >
                  <div className="card bg-teal-light h-full flex flex-col justify-between p-6">
                    <div>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-teal opacity-50"
                        aria-hidden="true"
                      >
                        <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                      </svg>

                      <blockquote className="text-sm text-dark leading-relaxed mt-4">
                        {es.testimonials.quotePrefix}
                        {item.quote}
                        {es.testimonials.quoteSuffix}
                      </blockquote>
                    </div>

                    <footer className="mt-6 flex items-center gap-3">
                      <Image
                        src={item.avatar.src}
                        alt={item.avatar.alt}
                        width={96}
                        height={96}
                        className="h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-white"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{item.name}</p>
                        <span className="block text-xs text-dark">{item.role}</span>
                      </div>
                      <a
                        href={item.linkedin}
                        aria-label={`Perfil de ${item.name} en LinkedIn`}
                        className="text-dark-subtle hover:text-teal-dark transition-colors"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    </footer>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>

          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Testimonios anteriores"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-dark shadow-md border border-gray-200 hover:bg-gray-50"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Siguientes testimonios"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-dark shadow-md border border-gray-200 hover:bg-gray-50"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}