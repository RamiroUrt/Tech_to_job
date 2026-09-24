import es from "@/messages/es.json";
import { Reveal } from "@/components/animations/reveal";
import { LogoSymbol } from "@/components/brand/logo-symbol";

export function Talento() {
  return (
    <section className="section talento-offset" id="talento" aria-labelledby="talento-title">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <Reveal stagger={0.1}>
            <span className="section-eyebrow">{es.talento.eyebrow}</span>
            <h2 id="talento-title" className="section-title">
              {es.talento.title}
            </h2>
            <p className="section-description">
              {es.talento.description}
            </p>
            <a
              href="https://discord.gg/h9FFgKdkRd"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-discord mt-8"
            >
              {es.talento.discordButton}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </Reveal>

          <Reveal stagger={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {es.talento.features.map((feature, i) => (
              <article key={i} className="card bg-gray-50 relative">
                <LogoSymbol className="absolute top-3 right-3 w-5 h-5" />
                <h3 className="text-base font-bold">{feature.title}</h3>
                <p className="text-sm text-dark leading-relaxed mt-2">
                  {feature.description}
                </p>
              </article>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}