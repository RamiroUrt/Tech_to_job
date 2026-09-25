"use client";

import { Reveal } from "@/components/ui/reveal";
import type { MessagesProps } from "@/types/MessagesProps";

export function Newsletter({ messages }: MessagesProps) {
  const { newsletter, ui } = messages;

  return (
    <section className="section" id="newsletter" aria-labelledby="newsletter-title">
      <div className="container max-w-[640px] text-center">
        <Reveal stagger={0.1}>
          <span className="section-eyebrow justify-center">{newsletter.eyebrow}</span>
          <h2 id="newsletter-title" className="section-title mx-auto">
            {newsletter.title}
          </h2>
          <p className="section-description mx-auto">
            {newsletter.description}
          </p>

          <form className="flex flex-col sm:flex-row gap-3 mt-8" onSubmit={(e) => e.preventDefault()}>
            <label className="srOnly" htmlFor="newsletter-email">
              {ui.emailLabel}
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder={newsletter.placeholder}
              className="input flex-1"
            />
            <button type="submit" className="btn btn-discord whitespace-nowrap">
              {newsletter.button}
            </button>
          </form>
          <p className="text-xs text-dark mt-3">
            {newsletter.spamNotice}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
