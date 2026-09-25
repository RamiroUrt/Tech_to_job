import { Reveal } from "@/components/ui/reveal";
import { LogoSymbol } from "@/components/ui/logo-symbol";
import type { MessagesProps } from "@/types/MessagesProps";

export function Empresas({ messages }: MessagesProps) {
  const { empresas } = messages;

  return (
    <section className="section bg-teal-light" id="empresas" aria-labelledby="empresas-title">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="order-2 lg:order-1">
            <Reveal stagger={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {empresas.features.map((feature, i) => (
                <article key={i} className="card bg-white relative">
                  <LogoSymbol className="absolute top-3 right-3 w-5 h-5" />
                  <h3 className="text-base font-bold">{feature.title}</h3>
                  <p className="text-sm text-dark leading-relaxed mt-2">
                    {feature.description}
                  </p>
                </article>
              ))}
            </Reveal>
          </div>

          <div className="order-1 lg:order-2">
            <Reveal stagger={0.1}>
              <span className="section-eyebrow">{empresas.eyebrow}</span>
              <h2 id="empresas-title" className="section-title">
                {empresas.title}
              </h2>
              <p className="section-description">
                {empresas.description}
              </p>
              <a
                href="https://discord.gg/h9FFgKdkRd"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-discord mt-8"
              >
                {empresas.discordButton}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}