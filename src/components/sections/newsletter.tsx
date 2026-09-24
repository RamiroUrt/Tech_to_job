"use client";

import es from "@/messages/es.json";
import { Reveal } from "@/components/animations/reveal";

export function Newsletter() {
  return (
    <section className="section" id="newsletter" aria-labelledby="newsletter-title">
      <div className="container max-w-[640px] text-center">
        <Reveal stagger={0.1}>
          <span className="section-eyebrow justify-center">{es.newsletter.eyebrow}</span>
          <h2 id="newsletter-title" className="section-title mx-auto">
            {es.newsletter.title}
          </h2>
          <p className="section-description mx-auto">
            {es.newsletter.description}
          </p>

          <form className="flex flex-col sm:flex-row gap-3 mt-8" onSubmit={(e) => e.preventDefault()}>
            <label className="srOnly" htmlFor="newsletter-email">
              Correo electrónico
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder={es.newsletter.placeholder}
              className="input flex-1"
            />
            <button type="submit" className="btn btn-discord whitespace-nowrap">
              {es.newsletter.button}
            </button>
          </form>
          <p className="text-xs text-dark mt-3">
            {es.newsletter.spamNotice}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
