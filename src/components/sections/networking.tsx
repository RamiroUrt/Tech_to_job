import es from "@/messages/es.json";
import { GlueBalls } from "@/components/background/glue-balls";
import { Reveal } from "@/components/animations/reveal";

export function Networking() {
  return (
    <section className="section relative bg-dark text-white" id="networking" aria-labelledby="networking-title">
      <GlueBalls />
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <Reveal stagger={0.1}>
            <span className="section-eyebrow text-white">{es.networking.eyebrow}</span>
            <h2 id="networking-title" className="section-title text-white">
              {es.networking.title}
            </h2>
            <p className="section-description text-teal">
              {es.networking.description}
            </p>
            <a
              href="https://discord.gg/h9FFgKdkRd"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-discord mt-8"
            >
              {es.networking.discordButton}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </Reveal>

          <Reveal stagger={0.08} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {es.networking.channels.map((channel, i) => (
              <article key={i} className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/5">
                <span className="text-teal font-bold text-sm">{channel.name}</span>
                <span className="text-sm text-teal">{channel.description}</span>
              </article>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}