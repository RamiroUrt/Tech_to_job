import es from "@/messages/es.json";
import { Reveal } from "@/components/ui/reveal";
import { LogoSymbol } from "@/components/ui/logo-symbol";

export function Tournaments() {
  return (
    <section className="section" id="torneos" aria-labelledby="torneos-title">
      <div className="container">
        <Reveal stagger={0.12}>
          <span className="section-eyebrow">{es.tournaments.eyebrow}</span>
          <h2 id="torneos-title" className="section-title">
            {es.tournaments.title}
          </h2>
          <p className="section-description">
            {es.tournaments.description}
          </p>
        </Reveal>

        <Reveal stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {es.tournaments.items.map((item, i) => (
            <article key={i} className="card bg-gray-50 flex flex-col relative">
              <LogoSymbol className="absolute top-3 right-3 w-5 h-5" />
              <span className="inline-flex self-start px-3 py-1 rounded-full bg-teal text-dark text-xs font-bold uppercase tracking-wide">
                [{item.status}]
              </span>
              <h3 className="text-lg font-bold mt-4">{item.title}</h3>
              <span className="text-xs font-semibold text-dark tracking-wide uppercase mt-2">
                {item.category}
              </span>
              <p className="text-sm text-dark leading-relaxed mt-3 flex-1">
                {item.description}
              </p>
            </article>
          ))}
        </Reveal>

        <div className="mt-10">
          <a
            href="https://discord.gg/h9FFgKdkRd"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            {es.tournaments.discordButton}
          </a>
        </div>
      </div>
    </section>
  );
}
